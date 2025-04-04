import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Checkbox } from "react-native-paper";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductCard = ({ product, setIdsDelete, idsDelete }) => {
  console.log(setIdsDelete, idsDelete, product);
  const [checked, setChecked] = useState(false);

  const handleCheckBox = (checked, product) => {
    console.log(checked);
    if (checked.checked === true) {
      setChecked({ checked: false });
      setIdsDelete((prevIds) => prevIds.filter((id) => id !== product._id));
    } else {
      setIdsDelete((prevIds) => [...prevIds, product._id]);
      setChecked({ checked: true });
    }
  };

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
      <Checkbox
        status={checked.checked ? "checked" : "unchecked"}
        onPress={() => handleCheckBox(checked, product)}
      />
    </View>
  );
};

const RemoveProducts = () => {
  const router = useRouter();
  const orgId = useSelector((state) => state.auth.orgId);
  const token = useSelector((state) => state.auth.token);

  const [idsDelete, setIdsDelete] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const SubmitBooking = () => {
    console.log("Submitted");
    console.log(idsDelete);
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

  const onRefresh = () => {
    setRefreshing(true);
    getProducts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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
        <TouchableOpacity onPress={onRefresh} style={{ paddingRight: 14 }}>
          <Feather name="refresh-cw" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const getFooter = () => {
    return (
      <Button title="Remove" onPress={SubmitBooking} style={{ margin: 5 }} />
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#fff", margin: 5 }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {loading ? (
        <Text style={[styles.name, styles.textStyle]}>Loading products...</Text>
      ) : products.length === 0 ? (
        <Text style={[styles.name, styles.textStyle]}>
          No Products To Display Add Some Products/Please Login First.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              setIdsDelete={setIdsDelete}
              idsDelete={idsDelete}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFooter}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
};

export default RemoveProducts;

const styles = StyleSheet.create({
  listContainer: {
    padding: 13,
  },
  textStyle: {
    // color: Colors[colorScheme ?? "light"].text,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BBF7D0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 10,
    padding: 20,
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
    backgroundColor: "#BBF7D0",
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
