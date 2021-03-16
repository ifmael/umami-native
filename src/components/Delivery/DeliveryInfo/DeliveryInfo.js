import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import DeliveryInfoRestaurant from "./DeliveryInfoRestaurant";
import DeliveryInfoHome from "./DeliveryInfoHome";
import styles, { stylesRNEComponents } from "./DeliveryInfo.styles";
import { outlineButtonStyles } from "/styles/theme";
import { red } from "/styles/theme";
import { func, object } from "prop-types";

const propTypes = {
  options: object,
  showDeliveryOptions: func,
};

const noData = `Sin información\n`;

const DeliveryInfo = ({ options, showDeliveryOptions }) => {
  const isDeliveryOption = options?.option && options?.contactInfo;

  return (
    <View style={styles.deliveryInfoViewContainer}>
      <Text h3 style={stylesRNEComponents.deliveryInfoTitle}>
        Datos para la entrega
      </Text>
      <View style={styles.deliveryInfoViewOptions}>
        {isDeliveryOption ? (
          options?.option === "restaurant" ? (
            <DeliveryInfoRestaurant {...options?.contactInfo} />
          ) : options?.option === "home" ? (
            <DeliveryInfoHome {...options?.contactInfo} />
          ) : (
            <Text style={{ color: red }}>{noData}</Text>
          )
        ) : (
          <Text style={{ color: red }}>{noData}</Text>
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
  );
};

DeliveryInfo.propTypes = propTypes;

export default DeliveryInfo;
