import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const getData = async () => {
    try {
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
  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : token !== null ? (
        <Redirect href="/(tabs)/home" />
      ) : (
        <Redirect href="/LogInPage" />
      )}
    </>
  );
}
