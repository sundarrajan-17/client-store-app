import { View, Text, Image, TextInput, ActivityIndicator } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendLogInData } from "../../features/Auth";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  const orgId = useSelector((state) => state.auth.orgId);
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.userName);
  console.log("orgid token .....", orgId, token, typeof userName);
  console.log(sendLogInData);
  const appDispatch = useDispatch();

  const handlePress = () => {
    appDispatch(
      sendLogInData({ email: "rajakarthik547@gmail.com", password: "12345678" })
    );
  };
  return (
    <View
      className="p-10 bg-[#ACE1AF]"
      style={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}
    >
      {userName !== "" ? (
        <>
          <View className="flex flex-row items-center gap-8">
            <Image
              source={require("../../assets/images/poster.jpg")}
              style={{ width: 100, height: 100 }}
            />
            <View className="gap-3">
              <Text className="font-bold text-3xl ">Welcome</Text>
              <Text className="font-bold text-3xl">{userName}</Text>
            </View>
          </View>
          <View className="flex flex-row items-center p-2 rounded-2xl bg-white m-4 pl-6 mt-10">
            <Ionicons name="search" size={24} color="black" />
            <TextInput
              placeholder="Search Here"
              className="p-2 font-medium text-xl border-none m-2 w-[100%] focus:border-0 focus:outline-none"
            />
          </View>
        </>
      ) : (
        <ActivityIndicator size={"large"} color="black" />
      )}
    </View>
  );
}
