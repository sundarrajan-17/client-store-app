import { View, Text } from "react-native";
import React from "react";
// import { useSelector } from "react-redux";

export default function HeaderInventory({ isOrg }) {
  // const isOrg = useSelector((state) => state.auth.isOrg);
  console.log(isOrg);
  return (
    <View
      className="p-6 gap-3 bg-green-200"
      style={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}
    >
      <Text className="text-3xl font-bold">Welcome To CASR STORE,</Text>
      <Text className="text-2xl font-semibold">
        Here You Can Easily Get The Items Available In The Store And Returns To
        The Store.
      </Text>
      <Text className="text-xl font-medium">
        Book Menu Is To Book The Item You Needed
      </Text>
      <Text className="text-xl font-medium">
        Return Menu Is To List Of The Item You Needed To Return
      </Text>
      <Text className="text-xl font-medium">
        History Menu Is To See The History Of Items That You Have Booked In The
        Store
      </Text>
      {isOrg && (
        <>
          <Text className="text-xl font-medium">
            Add Menu Is To Add The List Of Items In The Store.This Is Accessed
            Only By Store Incharge.
          </Text>
          <Text className="text-xl font-medium">
            Update Menu Is To Update The List Of Items In The Store.This Is
            Accessed Only By Store Incharge.
          </Text>
          <Text className="text-xl font-medium">
            Remove Menu Is To Remove The List Of Items In The Store.This Is
            Accessed Only By Store Incharge.
          </Text>
        </>
      )}
    </View>
  );
}
