import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { isLoaded } from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

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
  const [description, setDescription] = useState(false);
  const handlePress = () => {
    // console.log("pressed");
    if (description === true) setDescription(false);
    else setDescription(true);
  };
  return (
    <Pressable
      style={[styles.card]}
      onPress={handlePress}
      className="border-l-2 border-r-2 border-gray-400"
    >
      <Image source={{ uri: product.url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={[styles.name, styles.textStyle]}>{product.name}</Text>
        <Text style={[styles.info, styles.textStyle]}>
          Available:{" "}
          {product.quantity === 0 ? (
            <Text style={[styles.outofstock, styles.textStyle]}>
              Out Of Stock
            </Text>
          ) : (
            <Text style={[styles.info, styles.textStyle]}>
              {product.quantity}
            </Text>
          )}
        </Text>
        <Text style={[styles.info, styles.textStyle]}>
          Category: {product.category}
        </Text>
        {description && (
          <Text style={[styles.info, styles.textStyle]}>
            Description: {product.description}
          </Text>
        )}
      </View>
      {product.quantity === 0 ? (
        <></>
      ) : (
        <>
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
        </>
      )}
    </Pressable>
  );
};

const Products = ({ route }) => {
  //   const { categoryName } = route.params;
  const categoryName = useLocalSearchParams();
  console.log(categoryName);
  const router = useRouter();
  const orgId = useSelector((state) => state.auth.orgId);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
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
    try {
      setLoading(true);
      const orgIdToPass = orgId;
      const bearerToken = token;
      console.log("orgid tokennnn.....", orgId, token, userId);
      const response = await axios.get(
        `https://store-app-vykv.onrender.com/request?category=${categoryName.name}&name=`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      // console
      console.log(response);
      // const filteredProducts = response.data.Products.filter(
      //   (product) => product.category === categoryName.name
      // );
      // console.log(filteredProducts);
      // setProducts(response.data.Products);
      setProducts(response.data.products);
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

  const SubmitBooking = async () => {
    console.log("Submitted");
    console.log(counts);
    const productsBook = Object.entries(counts).map(([key, value]) => ({
      productId: key,
      quantity: value,
      userId: userId,
    }));
    console.log(productsBook);
    axios
      .post(
        "https://store-app-vykv.onrender.com/products/request",
        productsBook[0]
      )
      .then((response) => {
        console.log(response.data);
        router.replace("/(tabs)/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getProducts();
      setRefreshing(false);
    }, 2000);
  }, []);

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
      ) : products !== undefined && products.length === 0 ? (
        <Text style={[styles.name, styles.textStyle]}>
          No Products To Display Add Some Products/Please Login First.
        </Text>
      ) : (
        <ScrollView
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          contentContainerStyle={{ paddingBottom: 60 }}
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
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
    marginVertical: 8,
    padding: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    color: "#000",
    fontSize: 17,
    fontWeight: "semibold",
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
  outofstock: {
    color: "#ff0000",
    fontSize: 17,
    fontWeight: "semibold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    // borderRadius: 6,
    // paddingHorizontal: 8,
    // paddingVertical: 4,
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
