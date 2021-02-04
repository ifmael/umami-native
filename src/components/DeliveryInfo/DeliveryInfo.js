import React, { useContext } from "react";
import { func } from "prop-types";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import DeliveryInfoRestaurant from "./DeliveryInfoRestaurant";
import DeliveryInfoHome from "./DeliveryInfoHome";
import { GlobalContext } from "/context/GlobalContext";
import styles, { stylesRNEComponents } from "./DeliveryInfo.styles";
import { outlineButtonStyles } from "/styles/theme";

const propTypes = {
  showDeliveryOptions: func,
};

export default function DeliveryInfo({ showDeliveryOptions }) {
  const { deliveryOptions } = useContext(GlobalContext);

  const isDeliveryOption = deliveryOptions?.option && deliveryOptions?.contactInfo;

  return (
    <View>
      <View style={styles.deliveryInfoViewContainer}>
        <Text h3 style={stylesRNEComponents.deliveryInfoTitle}>
          Datos para la entrega
        </Text>
        <View style={styles.deliveryInfoViewOptions}>
          {isDeliveryOption ? (
            deliveryOptions?.option === "restaurant" ? (
              <DeliveryInfoRestaurant {...deliveryOptions?.contactInfo} />
            ) : deliveryOptions?.option === "home" ? (
              <DeliveryInfoHome {...deliveryOptions?.contactInfo} />
            ) : (
              <Text>Sin información</Text>
            )
          ) : (
            <Text>Sin información</Text>
          )}

          <Button
            buttonStyle={outlineButtonStyles.button}
            onPress={showDeliveryOptions}
            title="Cambiar"
            titleStyle={outlineButtonStyles.title}
            type="outline"
          />
        </View>
      </View>
    </View>
  );
}

DeliveryInfo.propTypes = propTypes;
