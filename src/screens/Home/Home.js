import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Image, Animated, Dimensions } from "react-native";
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

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: heightPosition }] }}>
        <Image source={logo} style={styles.image} />
      </Animated.View>
      <Animated.View style={{ translateY: -80, opacity: fadeAnim }}>
        <Text h3 style={{ color: red }}>
          Hamburguesería gourmet
        </Text>
        <Text h3 style={{ color: red, textAlign: "center" }}>
          858 69 33 02
        </Text>
      </Animated.View>
    </View>
  );
};

export default Home;
