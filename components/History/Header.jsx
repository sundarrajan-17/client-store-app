import { View, Text, Pressable } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

export default function Header() {
  return (
    <View className="flex flex-row items-center justify-between p-2">
      <View>
        <Text className="text-xl font-semibold">Products History</Text>
      </View>
      <View className="flex flex-row items-center gap-1">
        <Pressable
          onPress={() => console.log("Filter")}
          className="flex flex-row items-center gap-2 bg-[#BBF7D0] p-3"
        >
          <FontAwesome name="filter" size={18} color="black" />
        </Pressable>
        <Pressable
          onPress={() => console.log("Clear Filters")}
          className="flex flex-row items-center gap-1 bg-[#BBF7D0] p-3"
        >
          <Entypo name="cross" size={18} color="black" />
          <Text className="text-md font-medium">Clear Filters</Text>
        </Pressable>
      </View>
    </View>
  );
}
