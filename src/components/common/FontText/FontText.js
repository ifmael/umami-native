import React from "react";
import { any, object } from "prop-types";
import { Text } from "react-native-elements";

const propTypes = {
  children: any,
  style: object,
};

const FontText = ({ children, style, ...rest }) => {
  return (
    <Text {...rest} style={{ ...style, fontFamily: "Confortaa" }}>
      {children}
    </Text>
  );
};

FontText.propTypes = propTypes;
export default FontText;
