import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function InventoryPage({ isOrg }) {
  const router = useRouter();
  console.log(isOrg);
  return (
    <View className="flex flex-row flex-wrap items-center gap-5 p-10 justify-center">
      <Pressable
        onPress={() => router.push("/BookProducts")}
        className="bg-green-200 p-5 rounded-2xl border-l-2 border-r-2 border-gray-400"
      >
        <View>
          <Text className="text-center font-semibold text-xl">Book</Text>
        </View>
      </Pressable>
      {/* <Pressable
        onPress={() => router.push("/ReturnProducts")}
        className="bg-green-200 p-5 rounded-2xl border-l-2 border-r-2 border-gray-400"
      >
        <View>
          <Text className="text-center font-semibold text-xl">Return</Text>
        </View>
      </Pressable> */}
      <Pressable
        onPress={() => router.push("/(tabs)/history")}
        className="bg-green-200 p-5 rounded-2xl border-l-2 border-r-2 border-gray-400"
      >
        <View>
          <Text className="text-center font-semibold text-xl">History</Text>
        </View>
      </Pressable>
      {isOrg && (
        <>
          <Pressable
            onPress={() => router.push("/AddProducts")}
            className="bg-green-200 p-5 rounded-2xl border-l-2 border-r-2 border-gray-400"
          >
            <View>
              <Text className="text-center font-semibold text-xl">Add</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => router.push("/UpdateProducts")}
            className="bg-green-200 p-5 rounded-2xl border-l-2 border-r-2 border-gray-400"
          >
            <View>
              <Text className="text-center font-semibold text-xl">Update</Text>
            </View>
          </Pressable>
          {/* <Pressable
            onPress={() => router.push("/RemoveProducts")}
            className="bg-green-200 p-5 rounded-2xl border-l-2 border-r-2 border-gray-400"
          >
            <View>
              <Text className="text-center font-semibold text-xl">Remove</Text>
            </View>
          </Pressable> */}
        </>
      )}
    </View>
  );
}
