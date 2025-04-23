import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";

const data = [
  {
    id: "1",
    name: "XT60-MaleConnectors",
    numOfItems: "10",
    userId: "sharan152",
  },
  {
    id: "2",
    name: "XT60-FemaleConnectors",
    numOfItems: "10",
    userId: "sharan152",
  },
  { id: "3", name: "Propeller-18-inch", numOfItems: "5", userId: "jyothi1110" },
  { id: "4", name: "4s-Battey", numOfItems: "2", userId: "jaswa1706" },
  { id: "5", name: "Dhq4-Model", numOfItems: "1", userId: "sundar1708" },
];

export default function HistoryProducts() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();

  const getProducts = async () => {
    try {
      setLoading(true);
      const bearerToken = token;
      const response = await axios.get(
        `https://store-app-vykv.onrender.com/request/orghistory/`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log(response.data.history);
      setProducts(response.data.history);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response !== undefined) {
        const errorReceived = error.response.data.message;
        if (errorReceived === "No token provided.") alert("Please LogIn First");
        else alert(error);
      } else if (error.message == "Network Error") {
        router.replace("/(tabs)/home");
        alert("Server Issue Please Try After Some Time");
        setLoading(false);
      } else {
        router.replace("/(tabs)/home");
        alert(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const ListHeader = () => {
    console.log(products);
    return (
      <View className="flex flex-row items-center justify-between p-2">
        <Text className="text-xl font-semibold">Product History</Text>
        <Text className="text-l font-normal">view all</Text>
      </View>
    );
  };
  return (
    <View className="p-4">
      {loading ? (
        <Text className="text-xl font-bold">Loading Products........</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <Card className="rounded-2xl min-w-2">
                {/* <Card.Title title={item.userId} titleVariant="labelLarge" /> */}
                <Card.Content style={{ gap: 5, backgroundColor: "#E4EFE7" }}>
                  <View className="flex flex-row items-center justify-between">
                    <View>
                      <Text>{item.userId.username}</Text>
                    </View>
                    <View>
                      <Pressable onPress={() => console.log("pressed")}>
                        <Text>View</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <Text>{item.productId.name}</Text>
                    <Text className="text-slate-800">
                      {item.productId.quantity}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            );
          }}
          scrollEnabled={false}
          contentContainerStyle={{
            //   display: "flex",
            //   flexDirection: "row",
            //   flexWrap: "wrap",
            gap: 15,
            margin: 10,
          }}
          ListHeaderComponent={ListHeader}
        />
      )}
    </View>
  );
}
