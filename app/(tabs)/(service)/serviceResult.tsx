import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { User } from "@/type/User.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamCartList, RootStackParamList } from "@/type/navigation";
import { Reader } from "@/type/Reader.type";
import { PackageQuestion } from "@/type/PackageQuestion.type";

type ServiceResultRouteProp = RouteProp<
  {
    ServiceResult: {
      date: number;
      time: string;
      finalPrice: number;
    };
  },
  "ServiceResult"
>;

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function ServiceResultScreen() {
  const [selectedPayment, setSelectedPayment] = useState("Ví Starot");
  const navigation = useNavigation<NavigationProps>();
  const [discountCode, setDiscountCode] = useState("");
  const route = useRoute<ServiceResultRouteProp>();
  const { date, time, finalPrice } = route.params;
  const [user, setUser] = useState<User>();
  const [reader, setReader] = useState<Reader>();
  const [packageQuestion, setPackageQuestion] = useState<PackageQuestion>();
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const today = new Date();

  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPackage();
      fetchUser();
      fetchReader();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
            <TouchableOpacity
              onPress={() => navigation.navigate("ReaderService")}
            >
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
              THANH TOÁN THÀNH CÔNG
            </Text>
          </View>

          <View
            style={{
              marginBottom: 16,
              padding: 50,
              backgroundColor: "#3014BA",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>
              Starot xin cảm ơn quý khách đã tin tưởng sử dụng dịch vụ của chúng
              tôi!
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#3014BA" }}>
              ORD-20241022-4EDC
            </Text>
            <Text style={{ color: "#3014BA" }}>{formattedDate}</Text>
          </View>

          <View
            style={{
              height: 1,
              marginBottom: 30,
              marginTop: 0,
              backgroundColor: "#392C7A",
              marginVertical: 10,
            }}
          />

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 16, color: "#3014BA" }}
            >
              THÔNG TIN GIAO DỊCH
            </Text>
          </View>

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
              marginBottom: 10,
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

          <View
            style={{
              height: 1,
              marginBottom: 40,
              marginTop: 0,
              backgroundColor: "#392C7A",
              marginVertical: 10,
            }}
          />

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
                {formatNumber(finalPrice)} VND
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
                {formatNumber(finalPrice)} VND
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
