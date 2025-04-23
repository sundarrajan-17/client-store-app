import { ScrollView, View } from "react-native";
import React from "react";
import HistoryPage from "../../components/History/HistoryPage";
import Header from "../../components/History/Header";
import { useSelector } from "react-redux";
import OrgHistory from "../../components/History/OrgHistory";

export default function History() {
  const org = useSelector((state) => state.auth.isOrg);
  console.log("orggggggggggg", org);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 60, backgroundColor: "#BBF7D0" }}
    >
      <View className="p-4">
        {/* Header */}
        <Header />
        {/* History Products */}
        {org ? <OrgHistory /> : <HistoryPage />}
      </View>
    </ScrollView>
  );
}
