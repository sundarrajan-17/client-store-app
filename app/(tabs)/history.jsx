import { ScrollView, View } from "react-native";
import React from "react";
import HistoryPage from "../../components/History/HistoryPage";
import Header from "../../components/History/Header";

export default function History() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 60, backgroundColor: "#BBF7D0" }}
    >
      <View className="p-4">
        {/* Header */}
        <Header />
        {/* History Products */}
        <HistoryPage />
      </View>
    </ScrollView>
  );
}
