import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native";
import store from "../store/store";
import "../global.css";

export default function StackLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookProducts"
          options={{
            headerShown: true,
            title: "Products",
            headerStyle: {
              backgroundColor: "#BBF7D0",
            },
          }}
        />
        <Stack.Screen
          name="ReturnProducts"
          options={{
            headerShown: true,
            title: "Return Products",
            headerStyle: {
              backgroundColor: "#BBF7D0",
            },
          }}
        />
        <Stack.Screen
          name="AddProducts"
          options={{
            headerShown: true,
            title: "Add Products",
            headerStyle: {
              backgroundColor: "#BBF7D0",
            },
          }}
        />
        <Stack.Screen
          name="UpdateProducts"
          options={{
            headerShown: true,
            title: "Update Products",
            headerStyle: {
              backgroundColor: "#BBF7D0",
            },
          }}
        />
        <Stack.Screen
          name="RemoveProducts"
          options={{
            headerShown: true,
            title: "Remove Products",
            headerStyle: {
              backgroundColor: "#BBF7D0",
            },
          }}
        />
        <Stack.Screen
          name="LoadCategory"
          options={{
            headerShown: true,
            title: "Products",
            headerStyle: {
              backgroundColor: "#BBF7D0",
            },
          }}
        />
      </Stack>
    </Provider>
  );
}
