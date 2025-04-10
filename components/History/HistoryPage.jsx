import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import PropImage from "../../assets/images/propeller.jpg";
import MotorImage from "../../assets/images/motor.jpg";
import Battery4s from "../../assets/images/battery-4s.jpg";
import Battery6s from "../../assets/images/battery-6s.jpg";
import Battery12s from "../../assets/images/battery-12s.jpg";
import DHQ4Model from "../../assets/images/dhq4.jpg";

// Define the type for each purchased product

// Sample purchase history data
const purchasedProducts = [
  {
    name: "Propeller(set) 18-Inch",
    quantity: 3,
    image: PropImage,
    date: "24-02-2025",
  },
  {
    name: "Motor",
    quantity: 4,
    image: MotorImage,
    date: "01-03-2025",
  },
  {
    name: "Battery-4s",
    quantity: 5,
    image: Battery4s,
    date: "05-03-2025",
  },
  {
    name: "Battery-6s",
    quantity: 6,
    image: Battery6s,
    date: "05-03-2025",
  },
  {
    name: "Battery-12s",
    quantity: 4,
    image: Battery12s,
    date: "05-03-2025",
  },
  {
    name: "DHQ4-Model",
    quantity: 2,
    image: DHQ4Model,
    date: "15-03-2025",
  },
  {
    name: "Propeller(set) 18-Inch",
    quantity: 3,
    image: PropImage,
    date: "24-02-2025",
  },
  {
    name: "Motor",
    quantity: 4,
    image: MotorImage,
    date: "01-03-2025",
  },
  {
    name: "Battery-4s",
    quantity: 5,
    image: Battery4s,
    date: "05-03-2025",
  },
  {
    name: "Battery-6s",
    quantity: 6,
    image: Battery6s,
    date: "05-03-2025",
  },
  {
    name: "Battery-12s",
    quantity: 4,
    image: Battery12s,
    date: "05-03-2025",
  },
  {
    name: "DHQ4-Model",
    quantity: 2,
    image: DHQ4Model,
    date: "15-03-2025",
  },
];

const History = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={purchasedProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={styles.card}
            className="border-l-2 border-r-2 border-gray-400"
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>Quantity: {item.quantity}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#BBF7D0",
    // padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: "#000",
  },
  date: {
    color: "#000",
    fontSize: 12,
  },
});

export default History;
