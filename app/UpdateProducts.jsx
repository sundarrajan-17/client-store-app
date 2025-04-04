import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native";

const UpdateProducts = () => {
  const emojisWithIcons = [
    { title: "happy", icon: "emoticon-happy-outline" },
    { title: "cool", icon: "emoticon-cool-outline" },
    { title: "lol", icon: "emoticon-lol-outline" },
    { title: "sad", icon: "emoticon-sad-outline" },
    { title: "cry", icon: "emoticon-cry-outline" },
    { title: "angry", icon: "emoticon-angry-outline" },
    { title: "confused", icon: "emoticon-confused-outline" },
    { title: "excited", icon: "emoticon-excited-outline" },
    { title: "kiss", icon: "emoticon-kiss-outline" },
    { title: "devil", icon: "emoticon-devil-outline" },
    { title: "dead", icon: "emoticon-dead-outline" },
    { title: "wink", icon: "emoticon-wink-outline" },
    { title: "sick", icon: "emoticon-sick-outline" },
    { title: "frown", icon: "emoticon-frown-outline" },
  ];
  return (
    <SelectDropdown
      data={emojisWithIcons}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && (
              <Icon
                name={selectedItem.icon}
                style={styles.dropdownButtonIconStyle}
              />
            )}
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || "Select Image"}
            </Text>
            <Icon
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default UpdateProducts;
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    margin: 20,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
