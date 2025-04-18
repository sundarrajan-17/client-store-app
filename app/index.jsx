import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const getData = async () => {
    try {
      await AsyncStorage.clear();
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem("token");
      console.log(jsonValue);
      setToken(jsonValue);
      setLoading(false);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log("tokennnnn", token);
  return (
    <>
      {token !== "" && token !== null ? (
        <Redirect href="/(tabs)/home" />
      ) : (
        <Redirect href="/LogInPage" />
      )}
    </>
  );
}
