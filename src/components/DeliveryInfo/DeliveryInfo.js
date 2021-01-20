import React, { useContext } from "react";
import { func } from "prop-types";
import { View } from "react-native";
import { Divider, Button } from "react-native-elements";
import FontText from "/components/common/FontText";
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
        <FontText h3 style={styles.deliveryInfoTitle}>
          Datos para la entrega
        </FontText>
        <View style={styles.deliveryInfoViewOptions}>
          {isDeliveryOption ? (
            deliveryOptions?.option === "restaurant" ? (
              <DeliveryInfoRestaurant {...deliveryOptions?.contactInfo} />
            ) : deliveryOptions?.option === "home" ? (
              <DeliveryInfoHome {...deliveryOptions?.contactInfo} />
            ) : (
              <FontText>No data</FontText>
            )
          ) : (
            <FontText>No data</FontText>
          )}

          <Button title="Cambiar" type="outline" onPress={showDeliveryOptions} />
        </View>
      </View>
    </View>
  );
}

DeliveryInfo.propTypes = propTypes;
