import HeaderUser from "@/components/HeaderUser";
import UserHistoryOrderInfo from "@/components/UserHistoryOrderInfo";
import { useAuth } from "@/context/authContext";
import { getBooking } from "@/service/bookingSevice";
import { getOrder } from "@/service/orderService";
import { orderType, ResponseTypeOJPagi } from "@/utils/datatype";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryOrder = () => {
  const { user } = useAuth();
  const [orderData, setOrderData] = useState<orderType[]>([]);
  const fetchOrder = async () => {
    const res = await getOrder({
      UserName: user?.name,
    });
    if (res.data?.length) {
      setOrderData(res.data);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="LỊCH SỬ MUA HÀNG" />
      <FlatList
        data={orderData}
        renderItem={({ item }: { item: orderType }) => (
          <UserHistoryOrderInfo item={item} />
        )}
        keyExtractor={(item: any) => item.id.toString()}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
export default HistoryOrder;
