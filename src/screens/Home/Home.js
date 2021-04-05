import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Image, Animated, Dimensions, Linking, TouchableOpacity } from "react-native";
import logo from "/assets/umami.png";
import { Text } from "react-native-elements";
import { red } from "/styles/theme";

const windowWidth = Dimensions.get("window").width;
const widthRatioAspect = 0.54;
const heightRatioAspect = 0.77;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: parseInt(widthRatioAspect * windowWidth),
    height: parseInt(widthRatioAspect * windowWidth * heightRatioAspect),
    resizeMode: "cover",
  },
});
const phoneNumber = 858693302;

const Home = () => {
  const heightPosition = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(heightPosition, {
        toValue: -100,
        duration: 2000,
        useNativeDriver: true,
      }).start(),

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start(),
    ]);
  }, [heightPosition, fadeAnim]);

  const call = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: heightPosition }] }}>
        <Image source={logo} style={styles.image} />
      </Animated.View>
      <Animated.View style={{ translateY: -80, opacity: fadeAnim, paddingHorizontal: 10 }}>
        <Text h3 style={{ color: red }} numberOfLines={1} adjustsFontSizeToFit>
          Hamburguesería gourmet
        </Text>
        <TouchableOpacity onPress={call}>
          <Text h3 style={{ color: red, textAlign: "center" }}>
            858 69 33 02
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Home;
