import { View, Image, Text, Button } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import Image1 from "../../assets/images/sliderimage1.jpg";
import Image2 from "../../assets/images/sliderimage2.jpg";
import Image3 from "../../assets/images/sliderimage3.jpg";
import Image4 from "../../assets/images/poster.jpg";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const carouselData = [
  { item: "1", index: "0", image: Image1 },
  { item: "2", index: "1", image: Image2 },
  { item: "3", index: "2", image: Image3 },
  { item: "4", index: "3", image: Image4 },
];

export default function Slider() {
  const handlePress = async () => {
    try {
      await AsyncStorage.clear();
      console.log(AsyncStorage.getItem("token"));
      // console.log('✅ AsyncStorage cleared!');
    } catch (e) {
      // console.error('❌ Error clearing storage:', e);
      alert(e);
    }
  };
  return (
    <View>
      {/* <View className="p-4">
        <Text className="font-medium text-2xl">
          *Here You Can Easily Get The Items Available In The Store And Returns
          To The Store.
        </Text>
      </View> */}
      <View className="flex flex-row items-center justify-between p-8">
        <Text className="text-xl font-semibold">About Us</Text>
        <Text className="text-l">view all</Text>
      </View>
      <Carousel
        data={carouselData}
        renderItem={({ item }) => {
          return (
            <View className="bg-slate-500">
              <Image
                source={item.image}
                style={{ width: width, height: 300, borderRadius: 30 }}
              />
            </View>
          );
        }}
        width={width}
        height={300}
        autoPlay={true}
        loop={true}
        autoPlayInterval={2000}
        scrollAnimationDuration={2000}
        // vertical={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.8,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.8,
        }}
        style={{ marginTop: -40 }}
      />
      {/* <Button title="click to clear Storage" onPress={handlePress} /> */}
    </View>
  );
}
