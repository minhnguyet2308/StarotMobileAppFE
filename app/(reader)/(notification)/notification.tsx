import HeaderReader from "@/components/HeaderReader";
import NotiInfo from "@/components/NotiInfo";
import { getAllNotify } from "@/service/userService";
import React, { useEffect, useState } from "react";
import {
  Platform,
  FlatList,
  StyleSheet,
  View,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationItem = {
  customerName: string;
  notificationMessage: string;
  timeAgo: string;
  customerImage: ImageSourcePropType;
};

const Notification: React.FC = () => {
  const [listNotify, setListNotify] = useState<NotificationItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllNotify();
      if (res?.data?.length) {
        setListNotify(res.data);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View className="mb-[200px]">
        <HeaderReader title="THÔNG BÁO" />
        <View style={styles.content}>
          <FlatList
            data={listNotify}
            keyExtractor={(_: NotificationItem, index: number) =>
              index.toString()
            }
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }: { item: NotificationItem }) => (
              <NotiInfo
                customerName={item.customerName}
                message={item.notificationMessage}
                time={item.timeAgo}
                image={item.customerImage}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  content: {
    padding: 16,
  },
});

export default Notification;
