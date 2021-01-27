import React, { useContext } from "react";
import { func } from "prop-types";
import { View } from "react-native";
import { Divider, Button, Text } from "react-native-elements";
import DeliveryInfoRestaurant from "./DeliveryInfoRestaurant";
import DeliveryInfoHome from "./DeliveryInfoHome";
import { GlobalContext } from "/context/GlobalContext";
import styles from "./DeliveryInfo.styles";

const propTypes = {
  showDeliveryOptions: func,
};

export default function DeliveryInfo({ showDeliveryOptions }) {
  const { deliveryOptions } = useContext(GlobalContext);

  const isDeliveryOption = deliveryOptions?.option && deliveryOptions?.contactInfo;

  console.log(deliveryOptions);
  return (
    <View>
      <Divider style={styles.deliveryInfoDivider} />
      <View style={styles.deliveryInfoViewContainer}>
        <Text h3 style={styles.deliveryInfoTitle}>
          Datos para la entrega
        </Text>
        <View style={styles.deliveryInfoViewOptions}>
          {isDeliveryOption ? (
            deliveryOptions?.option === "restaurant" ? (
              <DeliveryInfoRestaurant {...deliveryOptions?.contactInfo} />
            ) : deliveryOptions?.option === "home" ? (
              <DeliveryInfoHome {...deliveryOptions?.contactInfo} />
            ) : (
              <Text>No data</Text>
            )
          ) : (
            <Text>No data</Text>
          )}

          <Button title="Cambiar" type="outline" onPress={showDeliveryOptions} />
        </View>
      </View>
    </View>
  );
}

DeliveryInfo.propTypes = propTypes;
