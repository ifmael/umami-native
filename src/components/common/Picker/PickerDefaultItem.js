import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { bool, func, number, string } from "prop-types";
import styles from "./Picker.styles";

const propTypes = {
  id: string,
  name: string,
  onPress: func,
  price: number,
  showPrice: bool,
  setStep: func,
  isCustom: bool,
};

export default function PickerDefaultItem({ id, name, onPress, price, setStep, isCustom, showPrice = true }) {
  // console.log(`name: ${name}, custom: ${isCustom}`);
  return (
    <TouchableOpacity
      key={id}
      onPress={() => {
        isCustom ? setStep(id) : onPress({ id, name, price });
      }}
      style={{ ...styles.rowItem, justifyContent: showPrice ? "space-between" : "center" }}
    >
      <Text style={styles.fontItem}>{`${name}`}</Text>
      {showPrice ? <Text style={styles.fontItem}>{`${price?.toFixed(2)} €`}</Text> : null}
    </TouchableOpacity>
  );
}

PickerDefaultItem.propTypes = propTypes;
