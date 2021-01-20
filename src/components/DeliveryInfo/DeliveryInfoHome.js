import React from "react";
import { string } from "prop-types";
import { View } from "react-native";
import FontText from "/components/common/FontText";

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
      {street ? <FontText>{street}</FontText> : null}
      {number ? <FontText>Número: {number}</FontText> : null}
      {block ? <FontText>Bloque: {block}</FontText> : null}
      {flat ? <FontText>Piso: {flat}</FontText> : null}
      {locality ? <FontText>Localidad: {locality}</FontText> : null}
      {phone ? <FontText>Telefono: {phone}</FontText> : null}
    </View>
  );
}

DeliveryInfoHome.propTypes = propTypes;
