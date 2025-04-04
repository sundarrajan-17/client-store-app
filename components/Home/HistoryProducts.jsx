import { Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

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
  const ListHeader = () => {
    return (
      <View className="flex flex-row items-center justify-between p-2">
        <Text className="text-xl font-semibold">Product History</Text>
        <Text className="text-l font-normal">view all</Text>
      </View>
    );
  };
  return (
    <View className="p-4">
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Card className="rounded-2xl min-w-2">
              {/* <Card.Title title={item.userId} titleVariant="labelLarge" /> */}
              <Card.Content style={{ gap: 5, backgroundColor: "#E4EFE7" }}>
                <View className="flex flex-row items-center justify-between">
                  <View>
                    <Text>{item.userId}</Text>
                  </View>
                  <View>
                    <Pressable onPress={() => console.log("pressed")}>
                      <Text>View</Text>
                    </Pressable>
                  </View>
                </View>
                <View className="flex flex-row items-center justify-between">
                  <Text>{item.name}</Text>
                  <Text className="text-slate-800">{item.numOfItems}</Text>
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
    </View>
  );
}
