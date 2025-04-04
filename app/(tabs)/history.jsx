import { ScrollView, Text } from "react-native";
import React from "react";
import HistoryPage from "../../components/History/HistoryPage";
import Header from "../../components/History/Header";

export default function History() {
  return (
    <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 60 }}>
      <Header />
      <HistoryPage />
    </ScrollView>
  );
}
