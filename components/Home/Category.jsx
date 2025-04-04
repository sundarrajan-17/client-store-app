import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const itemWidth = width / 4;

const listOfCategorys = [
  { name: "Propulsion System" },
  { name: "Airframe" },
  { name: "Airframe-Accessories" },
  { name: "Avionics System" },
  { name: "Spraying System" },
  { name: "Electronics Accessories" },
  { name: "Mechanical Accessories" },
  { name: "Communication Systems" },
  { name: "Ground Equipments" },
];

export default function Category() {
  return (
    <View className="p-4">
      <View className="flex flex-row items-center justify-between p-2">
        <Text className="text-xl font-semibold">Category</Text>
        <Text className="text-l font-normal">view all</Text>
      </View>
      <FlatList
        data={listOfCategorys}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              className="p-3 rounded-xl bg-green-200 m-1 justify-center border-r-2 border-l-2 border-gray-400"
              style={{ width: itemWidth }}
            >
              <Pressable onPress={() => console.log(item.name)}>
                <Text className="text-center text-l font-semibold">
                  {item.name}
                </Text>
              </Pressable>
            </View>
          );
        }}
        scrollEnabled={false}
        horizontal={false}
        contentContainerStyle={{
          padding: 10,
          gap: 15,
          alignItems: "center",
        }}
        numColumns={3}
      />
    </View>
  );
}
