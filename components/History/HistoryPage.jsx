import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import PropImage from "../../assets/images/propeller.jpg";
import MotorImage from "../../assets/images/motor.jpg";
import Battery4s from "../../assets/images/battery-4s.jpg";
import Battery6s from "../../assets/images/battery-6s.jpg";
import Battery12s from "../../assets/images/battery-12s.jpg";
import DHQ4Model from "../../assets/images/dhq4.jpg";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "expo-router";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const bearerToken = token;
      const response = await axios.get(
        `https://store-app-vykv.onrender.com/request/history/`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log(response);
      setProducts(response.data.history);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response !== undefined) {
        const errorReceived = error.response.data.message;
        if (errorReceived === "No token provided.") alert("Please LogIn First");
        else alert(error);
      } else if (error.message == "Network Error") {
        router.replace("/(tabs)/");
        alert("Server Issue Please Try After Some Time");
        setLoading(false);
      } else {
        router.replace("/(tabs)/");
        alert(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={styles.card}
            className="border-l-2 border-r-2 border-gray-400 p-5"
          >
            <Image source={item.productId.url} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.productId.name}</Text>
              <Text style={styles.info}>Quantity: {item.quantity}</Text>
              <Text style={styles.date}>{item.productId.createdAt}</Text>
              <Text style={styles.date}>Status: {item.status}</Text>
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
    marginRight: 20,
    padding: 5,
  },
  details: {
    flex: 1,
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: "#000",
    fontSize: 15,
  },
  date: {
    color: "#000",
    fontSize: 14,
  },
});

export default History;
