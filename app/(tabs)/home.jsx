import { ScrollView, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import { useSelector, useDispatch } from "react-redux";
import { getLoginStatus } from "../../features/Auth";
import Slider from "../../components/Home/Slider";
import HistoryProducts from "../../components/Home/HistoryProducts";
import Category from "../../components/Home/Category";

export default function home() {
  // const appSelector = useSelector((state) => state.auth.loginStatus);
  // console.log(appSelector, getLoginStatus);
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
