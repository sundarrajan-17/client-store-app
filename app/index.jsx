import { ActivityIndicator, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOrgIdUserIdToken } from "@/features/Auth";

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const verifyToken = async () => {
    try {
      setLoading(true);
      const access_token = await AsyncStorage.getItem("token");
      const getorgId = await AsyncStorage.getItem("orgId");
      const getuserId = await AsyncStorage.getItem("userId");
      const userName = await AsyncStorage.getItem("userName");
      let isOrg = await AsyncStorage.getItem("isOrg");
      if (isOrg === "true") {
        isOrg = true;
      } else {
        isOrg = false;
      }
      if (
        access_token == null &&
        getorgId == null &&
        getuserId == null &&
        userName == null &&
        isOrg == null
      ) {
        Alert.alert("Storeage");
        setLoading(false);
      } else {
        if (access_token) {
          const body = { token: access_token };
          console.log("jsonValueeeeee", { token: access_token });
          axios
            .post("https://store-app-vykv.onrender.com/verifyJWT", body)
            .then((response) => {
              console.log(response.data.isValid);
              dispatch(
                setOrgIdUserIdToken({
                  token: access_token,
                  orgId: getorgId,
                  userId: getuserId,
                  userName: userName,
                  isOrg: isOrg,
                })
              );
              setValid(response.data.isValid);
              setLoading(false);
            })
            .catch((error) => console.log(error));
        }
        setLoading(false);
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);
  // console.log("tokennnnn", token);
  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <>
          {valid ? (
            <Redirect href="/(tabs)/" />
          ) : (
            <Redirect href="/LogInPage" />
          )}
        </>
      )}
    </>
  );
}
