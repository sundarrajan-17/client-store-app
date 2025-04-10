import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

const AddProducts = () => {
  const router = useRouter();
  const orgId = useSelector((state) => state.auth.orgId);
  const token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    description: "",
    orgId: orgId,
    category: "",
    image: {
      name: "",
      uri: "",
      type: "",
    },
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Name is required";
    if (product.quantity === 0) newErrors.quantity = "Quantity is required";
    if (!product.description.trim())
      newErrors.description = "Description is required";
    if (!product.category.trim()) newErrors.category = "Category is required";
    if (!product.image.uri.trim()) newErrors.image = "Image is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("resultttt", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // console.log(result.assets[0].uri);
      // console.log(result.assets[0].fileName);
      // console.log(result.assets[0].fileName.split("."));
      const filename = result.assets[0].uri.split("/").pop();
      setProduct({
        ...product,
        image: {
          name: filename,
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
        },
      });
    }
  };
  // const { addProduct } = useProductStore();

  const handleAddProduct = async (newProduct) => {
    console.log(typeof newProduct.name);
    if (validate()) {
      setLoading(true);
      // Alert.alert("✅ Product Submitted", JSON.stringify(product, null, 2));

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("category", newProduct.category);
      formData.append("orgId", newProduct.orgId);
      formData.append("quantity", newProduct.quantity);
      formData.append("image", {
        uri: newProduct.image.uri,
        name: newProduct.image.name || "photo.jpg",
        type: newProduct.image.type,
      });
      console.log(formData);

      // Check contents
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      // console.log(formData.entries());

      axios
        .post("https://store-app-vykv.onrender.com/products/create", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          router.push("/(tabs)/home");
        })
        .catch((error) => {
          console.log(error);
          if (error.response !== undefined) {
            const errorReceived = error.response.data.message;
            if (errorReceived === "No token provided.")
              alert("Please LogIn First");
            else alert(error);
          } else if (error.message == "Network Error") {
            setLoading(false);
            router.replace("/(tabs)/home");
            alert("Server Issue Please Try After Some Time");
          } else {
            setLoading(false);
            router.replace("/(tabs)/home");
            alert(error);
          }
        });
    } else {
      Alert.alert("⚠️ Please fill all required fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEW PRODUCT</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={product.name}
            onChangeText={(value) =>
              setProduct({
                ...product,
                name: value,
              })
            }
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Enter Quantity"
            value={product.quantity}
            onChangeText={(value) =>
              setProduct({
                ...product,
                quantity: value,
              })
            }
          />
          {errors.quantity && (
            <Text style={styles.error}>{errors.quantity}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={product.description}
            onChangeText={(value) =>
              setProduct({
                ...product,
                description: value,
              })
            }
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Category"
            value={product.category}
            onChangeText={(value) =>
              setProduct({
                ...product,
                category: value,
              })
            }
          />
          {errors.category && (
            <Text style={styles.error}>{errors.category}</Text>
          )}
          {image && (
            <Image source={{ uri: image }} className="w-[25%] h-[25%] m-4" />
          )}
          <Button title="Pick an image" onPress={pickImage} className="m-10" />
          {errors.image && <Text style={styles.error}>{errors.image}</Text>}
          <Pressable
            style={styles.button}
            onPress={() => handleAddProduct(product)}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 4,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default AddProducts;
