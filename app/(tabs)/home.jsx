import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import { useDispatch } from "react-redux";
import { setOrgIdUserIdToken } from "../../features/Auth";
import Slider from "../../components/Home/Slider";
import HistoryProducts from "../../components/Home/HistoryProducts";
import Category from "../../components/Home/Category";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function home() {
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const get_access_token = await AsyncStorage.getItem("token");
      const getorgId = await AsyncStorage.getItem("orgId");
      const getuserId = await AsyncStorage.getItem("userId");
      console.log("hhhhhhhhhhhh", get_access_token, getorgId, getuserId);
      console.log("setteddddddd");
      dispatch(
        setOrgIdUserIdToken({
          token: get_access_token,
          orgId: getorgId,
          userId: getuserId,
        })
      );
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    // getData();
  }, []);
  return (
    <ScrollView>
      {/* Header */}
      <Header />
      {/* slider carousel */}
      <Slider />
      {/* Search By Category */}
      <Category />
      {/* history of products */}
      <HistoryProducts />
    </ScrollView>
  );
}
