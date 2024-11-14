import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { User } from "@/type/User.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamPayment,
  RootStackParamPaymentResult,
  RootStackParamServiceResult,
} from "@/type/navigation";
import { PackageQuestion } from "@/type/PackageQuestion.type";
import { Reader } from "@/type/Reader.type";

type ServiceConfirmationRouteProp = RouteProp<
  { ServiceConfirmation: { date: number; time: string } },
  "ServiceConfirmation"
>;

type NavigationProps = StackNavigationProp<RootStackParamPayment>;
type NavigationProps2 = StackNavigationProp<RootStackParamServiceResult>;

export default function ServiceConfirmation() {
  const [selectedPayment, setSelectedPayment] = useState("Ví Starot");
  const navigation = useNavigation<NavigationProps>();
  const navigation2 = useNavigation<NavigationProps2>();
  const [discountCode, setDiscountCode] = useState("");
  const [address, setAddress] = useState("");
  const route = useRoute<ServiceConfirmationRouteProp>();
  const { date, time } = route.params;
  const [user, setUser] = useState<User>();
  const [finalPrice, setFinalPrice] = useState(0);
  const [packageQuestion, setPackageQuestion] = useState<PackageQuestion>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reader, setReader] = useState<Reader>();
  const isBalanceEnough = (user?.balance ?? 0) >= (packageQuestion?.price ?? 0);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const generateOrderId = () => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

    const randomString = Math.random().toString(36).substr(2, 4).toUpperCase();

    return `ORD-${formattedDate}-${randomString}`;
  };

  const today = new Date();

  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const fetchPackage = async () => {
    try {
      const packageId = await AsyncStorage.getItem("selectedPackageId");
      const response = await fetch(
        `https://exestarotapi20241021202520.azurewebsites.net/api/v1/package-question/${packageId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch package details");
      }

      const data = await response.json();
      setPackageQuestion(data.data);
    } catch (err) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchReader = async () => {
    try {
      const readerId = await AsyncStorage.getItem("ReaderId");
      const response = await fetch(
        `https://exestarotapi20241021202520.azurewebsites.net/api/v1/reader`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch package details");
      }

      const data = await response.json();
      const readers: Reader[] = data.data;

      const readerFind = readers.find((reader) => reader.readerId === readerId);

      if (readerFind) {
        setReader(readerFind);
      } else {
        console.log("No reader found with the provided readerId");
      }
    } catch (err) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          "https://exestarotapi20241021202520.azurewebsites.net/api/v1/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data);
      } else {
        console.log("No token found.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchPackage();
    fetchUser();
    fetchReader();

    const interval = setInterval(() => {
      fetchPackage();
      fetchUser();
      fetchReader();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleRecharge = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://exestarotapi20241021202520.azurewebsites.net/api/v1/payOs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: (packageQuestion?.price ?? 0) - (user?.balance ?? 0),
          }),
        }
      );

      const data = await response.json();

      if (data.status === 200) {
        setPaymentUrl(data.data.url);

        if (data.data.url) {
          Linking.openURL(data.data.url);
        }
      } else {
        console.error("Error creating payment:", data.message);
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const handlePayment = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const packageId = packageQuestion?.id;
      const readerId = reader?.readerId;
      if (packageId === undefined || readerId === undefined) {
        throw new Error("Missing packageId or readerId");
      }

      const day = date;
      const timeRange = time;
      const [startTime, _] = timeRange.split(" - ");

      const year = 2024;
      const month = 11;

      const startDate = new Date(
        `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}T${startTime}:00.000Z`
      );

      const formData = new FormData();
      formData.append("PackageId", packageId.toString());
      formData.append("ReaderId", readerId.toString());
      formData.append("StartDate", startDate.toISOString());

      console.log(formData);

      if (token) {
        const res = await fetch(
          "https://exestarotapi20241021202520.azurewebsites.net/api/v1/booking",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Error while submitting booking.");
        }

        const data = await res.json();
        setResponse(data);
      } else {
        console.log("No token available for authentication.");
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
    if (isBalanceEnough) {
      navigation2.navigate("ServiceResult", {
        date: date,
        time: time,
        finalPrice: packageQuestion?.price ?? 0,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#3014BA" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 16,
                color: "#3014BA",
                flex: 1,
                textAlign: "center",
              }}
            >
              XÁC NHẬN GIAO DỊCH
            </Text>
          </View>

          <View
            style={{
              height: 1,
              marginTop: 0,
              backgroundColor: "#392C7A",
              marginVertical: 10,
            }}
          />

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>DỊCH VỤ</Text>
            <View style={styles.serviceItem}>
              <Image
                source={{ uri: packageQuestion?.image }}
                style={styles.serviceIcon}
              />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{packageQuestion?.name}</Text>
                <Text style={styles.servicePrice}>
                  {formatNumber(packageQuestion?.price ?? 0)} VNĐ
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>TAROT READER</Text>
            <View style={styles.readerProfile}>
              <Image
                source={{ uri: reader?.image }}
                style={styles.readerImage}
              />
              <Text style={styles.readerName}>
                {reader?.firstName} {reader?.lastName}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 1,
              marginBottom: 40,
              marginTop: 0,
              backgroundColor: "#392C7A",
              marginVertical: 10,
            }}
          />

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 8, color: "#3014BA" }}
            >
              THỜI GIAN
            </Text>
            <View style={styles.dateContent}>
              <Text style={styles.dateText}>
                Ngày {date}/11/2024 - Time: {time} PM
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 50 }}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 8, color: "#3014BA" }}
            >
              PHƯƠNG THỨC THANH TOÁN
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                borderRadius: 8,
                backgroundColor:
                  selectedPayment === "Ví Starot" ? "#3014BA" : "#FFFFFF",
                borderWidth: 1,
                borderColor: "#3014BA",
                marginBottom: 10,
              }}
              onPress={() => setSelectedPayment("Ví Starot")}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor:
                    selectedPayment === "Ví Starot" ? "#3014BA" : "#3014BA",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 8,
                }}
              >
                {selectedPayment === "Ví Starot" && (
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 7,
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  color:
                    selectedPayment === "Ví Starot" ? "#FFFFFF" : "#3014BA",
                }}
              >
                Ví Starot
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 50 }}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 8, color: "#3014BA" }}
            >
              MÃ ƯU ĐÃI
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  flex: 1,
                  padding: 8,
                  borderBottomWidth: 1,
                  borderColor: "#3014BA",
                  color: "#3014BA",
                }}
                value={discountCode}
                onChangeText={setDiscountCode}
                placeholder="ABCDEF"
                placeholderTextColor="#A0AEC0"
              />
              <TouchableOpacity
                style={{
                  padding: 8,
                  backgroundColor: "#3014BA",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                }}
                onPress={() => console.log("Apply discount code")}
              >
                <Text style={{ color: "white" }}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginBottom: 16,
              padding: 20,
              backgroundColor: "#3014BA",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Tạm tính</Text>
              <Text style={{ color: "#FFFFFF" }}>
                {formatNumber(packageQuestion?.price ?? 0)} VND
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Ưu đãi</Text>
              <Text style={{ color: "#FFFFFF" }}>0 VND</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Thành tiền
              </Text>
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {formatNumber(packageQuestion?.price ?? 0)} VND
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Số dư ví Starot
              </Text>
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {formatNumber(user?.balance ?? 0)} VND
              </Text>
            </View>
          </View>

          {!isBalanceEnough && (
            <View style={{ padding: 16 }}>
              <Text
                style={{ fontSize: 16, color: "#FF0000", fontWeight: "400" }}
              >
                Cần Nạp{" "}
                {formatNumber(
                  (packageQuestion?.price ?? 0) - (user?.balance ?? 0)
                )}{" "}
                VND để tiếp tục thanh toán
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: "#3014BA",
              padding: 16,
              alignItems: "center",
              borderRadius: 4,
              marginBottom: 10,
            }}
            onPress={handleRecharge}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>NẠP TIỀN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: !isBalanceEnough ? "gray" : "#3014BA",
              padding: 16,
              alignItems: "center",
              borderRadius: 4,
            }}
            disabled={!isBalanceEnough}
            onPress={handlePayment}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              THANH TOÁN
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    color: "#3014BA",
    marginBottom: 8,
  },
  input: {
    borderColor: "#3014BA",
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    color: "#3014BA",
    minHeight: 60,
    textAlignVertical: "top",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#3014BA",
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  serviceIcon: {
    width: 70,
    height: 120,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3014BA",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: "#3014BA",
  },
  readerProfile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  readerImage: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  readerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3014BA",
  },
  dateContent: {
    flex: 1,
    padding: 12,
    backgroundColor: "#3014BA",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
