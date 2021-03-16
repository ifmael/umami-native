import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";

// Styles
import styles, { stylesRNEComponents } from "./Payments.styles";
import { outlineButtonStyles } from "/styles/theme";
import { red } from "/styles/theme";

import { func, object } from "prop-types";

const propTypes = {
  method: object,
  showPaymentMethods: func,
};

const noData = `Sin información\n`;

const Payments = ({ method, showPaymentMethods }) => {
  return (
    <View style={styles.paymentMethodViewContainer}>
      <Text h3 style={stylesRNEComponents.paymentMethodTitle}>
        Método de pago
      </Text>
      <View style={styles.paymentMethodViewOptions}>
        <Text style={{ color: method?.name ? "inherit" : red }}>{method?.name ? method.name : noData}</Text>
        <Button
          buttonStyle={outlineButtonStyles.button}
          onPress={() => showPaymentMethods(true)}
          title="Cambiar"
          titleStyle={outlineButtonStyles.title}
          type="outline"
        />
      </View>
    </View>
  );
};

Payments.propTypes = propTypes;

export default Payments;
