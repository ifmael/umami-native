import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
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
      <Text style={styles.fontItem}>{`${name}`}</Text>
      <Text style={styles.fontItem}>{`${price.toFixed(2)} €`}</Text>
    </TouchableOpacity>
  );
}

PickerDefaultItem.propTypes = propTypes;
