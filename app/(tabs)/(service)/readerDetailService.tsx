// ReaderDetailService.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/type/navigation";
import { Reader } from "@/type/Reader.type";

const ReaderDetailService = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "ReaderDetailService">>();
  const { readerId } = route.params;

  const [readers, setReaders] = useState<Reader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const response = await fetch(
          "https://exestarotapi20241007212754.azurewebsites.net/api/v1/reader"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReaders(data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchReaders();
  }, []);

  const selectedReader = readers.find((reader) => reader.readerId === readerId);

  return (
    <SafeAreaView>
      {selectedReader ? (
        <View>
          <Text>
            {selectedReader.firstName} {selectedReader.lastName}
          </Text>
          <Image source={{ uri: selectedReader.image }} />
          <Text>{selectedReader.quote}</Text>
        </View>
      ) : (
        <Text>Reader not found</Text>
      )}
    </SafeAreaView>
  );
};

export default ReaderDetailService;
