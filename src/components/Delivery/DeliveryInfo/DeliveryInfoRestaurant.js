import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { string } from "prop-types";

const propTypes = {
  name: string,
  phone: string,
};

export default function DeliveryInfoRestaurant({ name, phone }) {
  return (
    <View>
      {name ? <Text>Nombre: {name}</Text> : null}
      {phone ? <Text>Telefono: {phone}</Text> : null}
    </View>
  );
}

DeliveryInfoRestaurant.propTypes = propTypes;
