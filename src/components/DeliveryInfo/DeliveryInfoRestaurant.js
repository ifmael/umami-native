import React from "react";
import { string } from "prop-types";
import { View } from "react-native";
import FontText from "/components/common/FontText";

const propTypes = {
  name: string,
  phone: string,
};

export default function DeliveryInfoRestaurant({ name, phone }) {
  return (
    <View>
      {name ? <FontText>Nombre: {name}</FontText> : null}
      {phone ? <FontText>Telefono: {phone}</FontText> : null}
    </View>
  );
}

DeliveryInfoRestaurant.propTypes = propTypes;
