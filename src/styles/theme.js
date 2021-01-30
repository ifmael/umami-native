/**
 * DEFAULT FONT
 */
const defaultFont = "Comfortaa_400Regular";
const boldFont = { fontFamily: "Comfortaa_700Bold", fontWeight: "normal" };

/**
 *  COLORS
 */

// Palette of colors
export const brown = "#cc9966";
export const red = "#cc3333";
export const green = "#669966";
export const yellow = "#ffcc00";
const colors = {
  primary: yellow,
  secondary: green,
};

/**
 *  BUTTON
 */
const Button = {
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
 *  INPUT
 *
 */
export const Input = {
  inputStyle: {
    fontFamily: defaultFont,
  },
  labelStyle: boldFont,
};

/**
 * NAVIGATION
 */
export const tabBarOptionStyles = {
  activeTintColor: brown,
  labelStyle: { fontSize: 12, fontFamily: defaultFont },
};
export const headerTextStyles = {
  textAlign: "center",
  fontFamily: "Comfortaa_700Bold",
  fontSize: 22,
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
  colors,
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
