import * as React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
} from "react-native";


const Loader = ({ visible, label, style, color, colorText }) => {
  const { height, width } = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, { width }, [style]]}>
        <View style={{ backgroundColor: color, ...styles.loader }}>
          <ActivityIndicator size={20} color={colorText} />
          <Text style={{ color: colorText, ...styles.text }}>{label}</Text>
        </View>
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "100%",
  },
  loader: {
    height: 60,
    marginHorizontal: 60,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  text: {
    fontFamily: "font18",
    fontSize: 16,
    marginLeft: 10,
  },
});