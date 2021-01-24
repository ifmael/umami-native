import React from "react";
import { TouchableOpacity } from "react-native";
import FontText from "/components/common/FontText";
import { func, number, string } from "prop-types";
import styles from "./Picker.styles";

const propTypes = {
  id: string,
  name: string,
  onPress: func,
  price: number,
};

export default function PickerDefaultItem(props) {
  const { id, name, onPress, price } = props;
  return (
    <TouchableOpacity key={id} onPress={() => onPress({ id, name, price })} style={styles.rowItem}>
      <FontText style={styles.fontItem}>{`${name}`}</FontText>
      <FontText style={styles.fontItem}>{`${price.toFixed(2)} €`}</FontText>
    </TouchableOpacity>
  );
}

PickerDefaultItem.propTypes = propTypes;
