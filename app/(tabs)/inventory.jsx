import { ScrollView } from "react-native";
import React from "react";
import InventoryPage from "../../components/Inventory/InventoryPage";
import HeaderInventory from "../../components/Inventory/Header";
import { useSelector } from "react-redux";

export default function Inventory() {
  const isOrg = useSelector((state) => state.auth.isOrg);

  return (
    <ScrollView>
      {/* Header  */}
      <HeaderInventory isOrg={isOrg} />
      {/* Navigations */}
      <InventoryPage isOrg={isOrg} />
    </ScrollView>
  );
}
