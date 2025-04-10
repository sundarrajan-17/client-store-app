import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

const products = [
  {
    name: "Battery-4s",
    QuantityAvailable: 10,
    image: "https://picsum.photos/200/300",
    deadline: "10-04-2025",
  },
  {
    name: "Battery-6s",
    QuantityAvailable: 40,
    image: "https://picsum.photos/200/300",
    deadline: "25-03-2025",
  },
];

// const colorScheme = useColorScheme();

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={[styles.name, styles.textStyle]}>{product.name}</Text>
        <Text style={[styles.info, styles.textStyle]}>
          Quantity: {product.QuantityAvailable}
        </Text>
        <Text style={[styles.info, styles.textStyle]}>
          Deadline: {product.deadline}
        </Text>
      </View>
    </View>
  );
};

const ReturnProducts = () => {
  const getHeader = () => {
    return (
      <Text className="font-bold text-2xl text-green-900 m-4">
        Need To Return Products
      </Text>
    );
  };
  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={getHeader}
    />
  );
};

export default ReturnProducts;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    margin: 8,
    padding: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: "gray",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  counterButton: {
    padding: 8,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
});
