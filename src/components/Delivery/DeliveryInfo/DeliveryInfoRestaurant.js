import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { string } from "prop-types";

const propTypes = {
  name: string,
  phone: string,
  time: string,
};

const DeliveryInfoRestaurant = ({ name, phone, time }) => {
  return (
    <View>
      {name ? <Text>Nombre: {name}</Text> : null}
      {phone ? <Text>Telefono: {phone}</Text> : null}
      {time ? <Text>Hora de recogida: {time}</Text> : null}
    </View>
  );
};

DeliveryInfoRestaurant.propTypes = propTypes;

export default DeliveryInfoRestaurant;
