import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  // Animated,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import logo from "/assets/umami.png";
import { Text, Icon } from "react-native-elements";
import { red } from "/styles/theme";

const windowWidth = Dimensions.get("window").width;
const windowHeigth = Dimensions.get("window").height;
const widthRatioAspect = 0.54;
const heightRatioAspect = 0.77;

const imageWidth = parseInt(widthRatioAspect * windowWidth);
const imageHeight = parseInt(widthRatioAspect * windowWidth * heightRatioAspect);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: "cover",
  },
});
const phoneNumber = 858693302;

const Home = () => {
  // const heightPosition = useRef(new Animated.Value(0)).current;
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.sequence([
  //     Animated.timing(heightPosition, {
  //       toValue: -100,
  //       duration: 2000,
  //       useNativeDriver: true,
  //     }).start(),

  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 5000,
  //       useNativeDriver: true,
  //     }).start(),
  //   ]);
  // }, [heightPosition, fadeAnim]);

  const call = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const goToInstagram = () => {
    Linking.openURL(`instagram://user?username=umamisantafe`);
  };

  return (
    <View style={styles.container}>
      {/* <Animated.View style={{ transform: [{ translateY: heightPosition }] }}>
        <Image source={logo} style={styles.image} />
      </Animated.View> */}
      {/* <Animated.View
        style={{ position: "absolute", top: windowHeigth / 2 - 20, opacity: fadeAnim, paddingHorizontal: 10 }}
      > */}
      <Text h3 style={{ color: red }} numberOfLines={1} adjustsFontSizeToFit>
        Hamburguesería gourmet
      </Text>
      <TouchableOpacity
        onPress={call}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          type="font-awesome-5"
          name="phone"
          size={24}
          color={red}
          iconStyle={{ transform: [{ rotate: "120deg" }], marginTop: 4 }}
        />
        <Text h3 style={{ color: red, textAlign: "center" }}>
          858 69 33 02
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goToInstagram}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          type="font-awesome-5"
          name="instagram"
          size={30}
          color={red}
          iconStyle={{ marginRight: 6, marginTop: 4 }}
        />
        <Text h3 style={{ color: red, textAlign: "center" }}>
          umamisantafe
        </Text>
      </TouchableOpacity>
      {/* </Animated.View> */}
    </View>
  );
};

export default Home;
