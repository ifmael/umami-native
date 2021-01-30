import { Dimensions } from "react-native";

/**
 * DEFAULT FONT
 */
export const defaultFont = "Comfortaa_400Regular";
const boldFont = { fontFamily: "Comfortaa_700Bold", fontWeight: "normal" };

/**
 *  COLORS
 */

// Palette of colors
export const brown = "#cc9966";
export const red = "#cc3333";
export const green = "#669966";
export const yellow = "#ffcc00";
export const white = "white";
const colors = {
  primary: yellow,
  secondary: green,
};

/**
 *  SHADOW STYLES
 */
const shadowStyles = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2,
};

/**
 *  WINDOWS
 */
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

/**
 *  BUTTON
 */
const Button = {
  buttonStyle: {
    backgroundColor: yellow,
  },
  titleStyle: {
    fontFamily: defaultFont,
  },
};

export const outlineButtonStyles = {
  title: {
    color: brown,
    fontFamily: "Comfortaa_700Bold",
  },
  button: {
    borderColor: brown,
  },
};

/**
 * CARD
 */
const Card = {
  containerStyle: shadowStyles,
};

/**
 *  IMAGE
 */
const Image = {
  style: {
    borderRadius: 20,
    height: 200,
    resizeMode: "cover",
  },
};
const imageViewShadow = { ...shadowStyles, shadowOffset: { width: 0, height: 2 }, elevation: 5 };
export const imageViewShadowWrapper = { borderRadius: 20, marginBottom: 10, ...imageViewShadow };

/**
 *  INPUT
 */
export const Input = {
  inputStyle: {
    fontFamily: defaultFont,
  },
  labelStyle: boldFont,
};

/**
 *  PICKER
 */
export const pickerStyles = {
  text: defaultFont,
};

/**
 *  SHARE STYLES
 */
export const productDetailCustomActionStyles = {
  fontSize: 18,
  fontFamily: "Comfortaa_700Bold",
};

/**
 *  SCREENS & NAVIGATIONS
 */
export const menuStackStyles = {
  headerTitleStyle: {
    textAlign: "center",
    fontFamily: "Comfortaa_700Bold",
    fontSize: 22,
  },
  cardStyle: { backgroundColor: white },
};
export const tabBarStyles = {
  activeTintColor: brown,
  labelStyle: { fontSize: 12, fontFamily: defaultFont },
};

/**
 *  TEXT COMPONENT
 */
const Text = {
  style: { fontFamily: defaultFont, fontSize: 16 },
  h1Style: boldFont,
  h2Style: boldFont,
  h3Style: boldFont,
  h4Style: boldFont,
};

const themeRNElements = {
  Button,
  Card,
  colors,
  Image,
  Input,
  Text,
};

export const lineHeight = 22;
export default themeRNElements;

/*

  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,

  */

// textShadowColor: "rgba(0, 0, 0, 0.75)",
// textShadowOffset: { width: -1, height: 1 },
// textShadowRadius: 10,
