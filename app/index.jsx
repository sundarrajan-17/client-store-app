import { View, Text } from "react-native";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function IndexScreen() {
  const router = useRouter();
  const loginstatus = useSelector((state) => state.auth.loginstatus);
  console.log(loginstatus);
  return (
    <>
      {loginstatus ? (
        <Redirect href="/(tabs)/home" />
      ) : (
        <Redirect href="/LogInPage" />
      )}
    </>
  );
}
