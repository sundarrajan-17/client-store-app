// import SelectDropdown from "react-native-select-dropdown";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { View, Text, StyleSheet } from "react-native";

// const UpdateProducts = () => {
//   const emojisWithIcons = [
//     { title: "happy", icon: "emoticon-happy-outline" },
//     { title: "cool", icon: "emoticon-cool-outline" },
//     { title: "lol", icon: "emoticon-lol-outline" },
//     { title: "sad", icon: "emoticon-sad-outline" },
//     { title: "cry", icon: "emoticon-cry-outline" },
//     { title: "angry", icon: "emoticon-angry-outline" },
//     { title: "confused", icon: "emoticon-confused-outline" },
//     { title: "excited", icon: "emoticon-excited-outline" },
//     { title: "kiss", icon: "emoticon-kiss-outline" },
//     { title: "devil", icon: "emoticon-devil-outline" },
//     { title: "dead", icon: "emoticon-dead-outline" },
//     { title: "wink", icon: "emoticon-wink-outline" },
//     { title: "sick", icon: "emoticon-sick-outline" },
//     { title: "frown", icon: "emoticon-frown-outline" },
//   ];
//   return (
//     <SelectDropdown
//       data={emojisWithIcons}
//       onSelect={(selectedItem, index) => {
//         console.log(selectedItem, index);
//       }}
//       renderButton={(selectedItem, isOpened) => {
//         return (
//           <View style={styles.dropdownButtonStyle}>
//             {selectedItem && (
//               <Icon
//                 name={selectedItem.icon}
//                 style={styles.dropdownButtonIconStyle}
//               />
//             )}
//             <Text style={styles.dropdownButtonTxtStyle}>
//               {(selectedItem && selectedItem.title) || "Select Image"}
//             </Text>
//             <Icon
//               name={isOpened ? "chevron-up" : "chevron-down"}
//               style={styles.dropdownButtonArrowStyle}
//             />
//           </View>
//         );
//       }}
//       renderItem={(item, index, isSelected) => {
//         return (
//           <View
//             style={{
//               ...styles.dropdownItemStyle,
//               ...(isSelected && { backgroundColor: "#D2D9DF" }),
//             }}
//           >
//             <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
//             <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
//           </View>
//         );
//       }}
//       showsVerticalScrollIndicator={false}
//       dropdownStyle={styles.dropdownMenuStyle}
//     />
//   );
// };

// export default UpdateProducts;
// const styles = StyleSheet.create({
//   dropdownButtonStyle: {
//     width: 200,
//     height: 50,
//     backgroundColor: "#E9ECEF",
//     borderRadius: 12,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 12,
//     margin: 20,
//   },
//   dropdownButtonTxtStyle: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#151E26",
//   },
//   dropdownButtonArrowStyle: {
//     fontSize: 28,
//   },
//   dropdownButtonIconStyle: {
//     fontSize: 28,
//     marginRight: 8,
//   },
//   dropdownMenuStyle: {
//     backgroundColor: "#E9ECEF",
//     borderRadius: 8,
//   },
//   dropdownItemStyle: {
//     width: "100%",
//     flexDirection: "row",
//     paddingHorizontal: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 8,
//   },
//   dropdownItemTxtStyle: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#151E26",
//   },
//   dropdownItemIconStyle: {
//     fontSize: 28,
//     marginRight: 8,
//   },
// });

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
import { useRouter } from "expo-router";

const ProductCard = ({ product }) => {
  const router = useRouter();
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
          Available: {product.quantity}
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
      <Pressable
        style={[styles.addButton]}
        onPress={() =>
          router.replace({ pathname: "/Product", params: product })
        }
      >
        <Text style={styles.addButtonText}>Update</Text>
      </Pressable>
    </Pressable>
  );
};

const Products = () => {
  const router = useRouter();
  const orgId = useSelector((state) => state.auth.orgId);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  // const appDispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const orgIdToPass = orgId;
      const bearerToken = token;
      console.log("orgid tokennnn.....", orgId, token, userId);
      const response = await axios.get(
        `https://store-app-vykv.onrender.com/products/orgId/`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      // console
      console.log(response);
      const filteredProducts = response.data.Products.filter(
        (product) => product.category === "Propulsion System"
      );
      console.log(filteredProducts);
      setProducts(response.data.Products);
      setLoading(false);
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getProducts();
      setRefreshing(false);
    }, 2000);
  }, []);

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
            renderItem={({ item }) => <ProductCard product={item} />}
            contentContainerStyle={styles.listContainer}
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
