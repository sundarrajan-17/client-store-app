import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Pressable,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { isLoaded } from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "expo-router";

const products = [
  {
    _id: 1,
    name: "Motor-420Kv",
    orgId: "12ADE",
    category: "Motor",
    quantity: 10,
    description: "420Kv Max Take-Off Weight 10 kg",
  },
];

const ProductCard = ({ product, count, increment, decrement }) => {
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: product.image }} style={styles.image} /> */}
      <View style={styles.details}>
        <Text style={[styles.name, styles.textStyle]}>{product.name}</Text>
        <Text style={[styles.info, styles.textStyle]}>
          Available: {product.quantity}
        </Text>
        <Text style={[styles.info, styles.textStyle]}>
          Description: {product.description}
        </Text>
      </View>
      {count === 0 ? (
        // Add Button
        <Pressable
          style={[styles.addButton]}
          onPress={() => increment(product)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      ) : (
        // Counter Buttons
        <View style={styles.counterContainer}>
          <Pressable
            onPress={() => decrement(product)}
            style={styles.counterButton}
          >
            <Text style={styles.counterText}>-</Text>
          </Pressable>
          <Text style={[styles.counterText]}>{count}</Text>
          <Pressable
            onPress={() => increment(product)}
            style={styles.counterButton}
          >
            <Text style={styles.counterText}>+</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const Products = () => {
  const router = useRouter();
  const orgId = useSelector((state) => state.auth.orgId);
  const token = useSelector((state) => state.auth.token);
  // console.log(appSelector, sendLogInData);
  const appDispatch = useDispatch();

  const [counts, setCounts] = useState({});
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);

  const increment = (product) => {
    setCounts((prev) => ({
      ...prev,
      [product._id]: Math.min((prev[product._id] || 0) + 1, product.quantity),
    }));
    console.log(counts[product._id]);
  };

  const decrement = (product) => {
    setCounts((prev) => ({
      ...prev,
      [product._id]: Math.max((prev[product._id] || 0) - 1, 0),
    }));
  };

  const getProducts = async () => {
    // Prevent multiple API calls
    try {
      // setRefreshing(false);
      setLoading(true);
      const orgIdToPass = orgId;
      const bearerToken = token;
      const response = await axios.get(
        `http://192.168.6.164:8001/products/orgId/${orgIdToPass}`,
        {
          headers: {
            authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      // console
      setProducts(response.data.Products);
    } catch (error) {
      console.log(error);
      if (error.response !== undefined) {
        const errorReceived = error.response.data.message;
        if (errorReceived === "No token provided.") alert("Please LogIn First");
        else alert(error);
      } else if (error.message == "Network Error") {
        router.replace("/(tabs)/home");
        alert("Server Issue Please Try After Some Time");
        setLoading(false);
      } else {
        router.replace("/(tabs)/home");
        alert(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const SubmitBooking = () => {
    console.log("Submitted");
    console.log(counts);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getProducts();
      setRefreshing(false);
    }, 2000);
  }, []);

  const getHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[
            styles.info,
            styles.textStyle,
            { fontSize: 30, paddingLeft: 20, fontWeight: 700 },
          ]}
        >
          Products
        </Text>
        <Pressable onPress={onRefresh} style={{ paddingRight: 14 }}>
          <Feather name="refresh-cw" size={24} color="black" />
        </Pressable>
      </View>
    );
  };

  const getFooter = () => {
    return (
      <Pressable
        onPress={SubmitBooking}
        className="p-2 bg-green-200 text-center  flex items-center justify-center m-2 rounded-xl"
      >
        <Text className="font-semibold text-xl text-green-800">Book</Text>
      </Pressable>
    );
  };
  return (
    <>
      {loading ? (
        <Text style={[styles.name, styles.textStyle]}>Loading products...</Text>
      ) : products.length === 0 ? (
        <Text style={[styles.name, styles.textStyle]}>
          No Products To Display Add Some Products/Please Login First.
        </Text>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                count={counts[item._id] | 0}
                increment={increment}
                decrement={decrement}
              />
            )}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={getHeader}
            ListFooterComponent={getFooter}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </>
  );
};

export default Products;

const styles = StyleSheet.create({
  listContainer: {
    padding: 13,
    margin: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BBF7D0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 3,
    margin: 10,
    padding: 25,
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
