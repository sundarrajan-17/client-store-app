import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { useSelector } from "react-redux";

const AddProducts = () => {
  const router = useRouter();
  const orgId = useSelector((state) => state.auth.orgId);
  const token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    description: "",
    orgId: orgId,
    category: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Name is required";
    if (!product.quantity.trim()) newErrors.quantity = "Quantity is required";
    if (!product.description.trim())
      newErrors.description = "Description is required";
    if (!product.category.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert("✅ Product Submitted", JSON.stringify(product, null, 2));
    } else {
      Alert.alert("⚠️ Please fill all required fields");
    }
  };

  // const { addProduct } = useProductStore();

  const handleAddProduct = async (newProduct) => {
    console.log(newProduct);
    if (validate()) {
      setLoading(true);
      // Alert.alert("✅ Product Submitted", JSON.stringify(product, null, 2));

      await axios
        .post("http://192.168.6.164:8001/products/create", newProduct, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => router.push("/SuccessScreen"))
        .catch((error) => {
          if (error.response !== undefined) {
            const errorReceived = error.response.data.message;
            if (errorReceived === "No token provided.")
              alert("Please LogIn First");
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
  },
  buttonText: { color: "white", fontWeight: "bold" },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default AddProducts;
