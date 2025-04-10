import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOrgIdUserIdToken, setOrg } from "../features/Auth";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function AuthScreen() {
  console.log(setOrgIdUserIdToken);
  const [isOrg, setIsOrg] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setOrgSelection = () => {
    setIsUser(false);
    setIsOrg(true);
  };

  const setUserSelection = () => {
    setIsUser(true);
    setIsOrg(false);
  };

  const storeData = async (value) => {
    try {
      console.log("valueeeee", value);
      await AsyncStorage.setItem("token", value.token);
      await AsyncStorage.setItem("orgId", value.organisationId);
      await AsyncStorage.setItem("userId", value.user);
    } catch (e) {
      alert(e);
    }
  };

  const LoginUser = async (data) => {
    console.log(data);
    setLoading(true);
    axios
      .post("https://store-app-vykv.onrender.com/auth/user/login", data)
      .then((response) => {
        console.log(response);
        console.log(response.data.user.orgId);
        console.log(response.data.token);
        const access_token = response.data.token;
        const user = response.data.user.id;
        const organisationId = response.data.user.orgId;
        // localStorage.setItem("token", access_token);
        // localStorage.setItem("userId", user);
        // localStorage.setItem("organisationId", organisationId);
        storeData({
          token: access_token,
          organisationId: organisationId,
          user: user,
        });
        dispatch(
          setOrgIdUserIdToken({
            orgId: response.data.user.orgId,
            userId: response.data.user.id,
            token: response.data.token,
          })
        );
        router.push("/(tabs)/home");
      })
      .catch((error) => {
        if (error.response !== undefined) {
          alert(error.response.data.message);
        } else if (error.message == "Network Error") {
          alert("Server Issue Please Try After Some Time");
        } else {
          alert(error);
        }
      });
    setLoading(false);
  };

  const LoginOrg = async (data) => {
    setLoading(true);
    console.log(data);
    console.log(setOrg);
    // router.replace("/(tabs)/home");

    axios
      .post("https://store-app-vykv.onrender.com/auth/org/login", data)
      .then((response) => {
        // console.log(response);
        console.log(response.data.user.orgId);
        console.log(response.data.token);
        const access_token = response.data.token;
        const organisationId = response.data.user.orgId;
        const user = "";
        storeData({
          token: access_token,
          organisationId: organisationId,
          user: user,
        });
        dispatch(setOrg());
        dispatch(
          setOrgIdUserIdToken({
            orgId: response.data.user.orgId,
            userId: "",
            token: response.data.token,
          })
        );
        // setOrgId(response.data.user.orgId, response.data.token);
        // setTimeout(() => {}, 5000);
        // console.log(orgId, token);
        router.push("/(tabs)/home");
      })
      .catch((error) => {
        if (error.response !== undefined) {
          alert(error.response.data.message);
        } else if (error.message == "Network Error") {
          alert("Server Issue Please Try After Some Time");
        } else {
          alert(error);
        }
      });

    setLoading(false);
  };

  return (
    <ScrollView className="p-5">
      <Image
        source={require("../assets/images/logindesign.png")}
        style={{
          width: width * 0.5,
          height: height * 0.45,
          alignSelf: "center",
        }}
        resizeMode="stretch"
      />
      <View className="p-5">
        <Text className="font-semibold text-xl">
          <Text className="text-green-700 text-2xl font-bold">
            👋 Here You Can Easily
          </Text>{" "}
          Get and Return The Stocks Available In The Store{" "}
          <Text className="text-green-700 text-2xl font-bold">
            Whenever You Needs It.
          </Text>
        </Text>
      </View>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Login</Text> */}
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Checkbox
            status={isOrg ? "checked" : "unchecked"}
            onPress={setOrgSelection}
          />
          <Text style={{ fontSize: 20, fontweight: 500 }}>Org</Text>
          <Checkbox
            status={isUser ? "checked" : "unchecked"}
            onPress={setUserSelection}
          />
          <Text style={{ fontSize: 20, fontweight: 500, textAlign: "center" }}>
            User
          </Text>
        </View>
        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        {/* Submit Button */}
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <Pressable
            style={styles.button}
            onPress={handleSubmit(
              isOrg
                ? LoginOrg
                : isUser
                ? LoginUser
                : alert("Please Select User/Org CheckBox")
            )}
          >
            <Text className="font-bold text-xl">Login</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    borderColor: "#aaa",
  },
  button: {
    backgroundColor: "#BBF7D0",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#222",
  },
  link: {
    marginTop: 15,
    color: "#0a7ea4",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
  },
});
