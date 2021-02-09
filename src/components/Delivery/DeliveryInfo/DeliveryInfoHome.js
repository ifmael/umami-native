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
  time: string,
};

export default function DeliveryInfoHome({ block, flat, locality, number, phone, street, time }) {
  return (
    <View>
      {street ? <Text>{street}</Text> : null}
      {number ? <Text>Número: {number}</Text> : null}
      {block ? <Text>Bloque: {block}</Text> : null}
      {flat ? <Text>Piso: {flat}</Text> : null}
      {locality ? <Text>Localidad: {locality}</Text> : null}
      {phone ? <Text>Telefono: {phone}</Text> : null}
      {time ? <Text>Hora de entrega: {time}</Text> : null}
    </View>
  );
}

DeliveryInfoHome.propTypes = propTypes;
