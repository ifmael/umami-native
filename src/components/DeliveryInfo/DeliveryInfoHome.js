import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { string } from "prop-types";

const propTypes = {
  block: string,
  flat: string,
  locality: string,
  number: string,
  phone: string,
  street: string,
};

export default function DeliveryInfoHome({ block, flat, locality, number, phone, street }) {
  return (
    <View>
      {street ? <Text>{street}</Text> : null}
      {number ? <Text>Número: {number}</Text> : null}º{block ? <Text>Bloque: {block}</Text> : null}º
      {flat ? <Text>Piso: {flat}</Text> : null}
      {locality ? <Text>Localidad: {locality}</Text> : null}
      {phone ? <Text>Telefono: {phone}</Text> : null}
    </View>
  );
}

DeliveryInfoHome.propTypes = propTypes;
