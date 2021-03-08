import React from "react";
import { View } from "react-native";
import { Input, Text } from "react-native-elements";
import Picker from "/components/common/Picker";
import TimePickerOption from "/components/Delivery/DeliveryOptions/TimePickerOption";
import useTime from "../useTime";
import { deliveryTime } from "../DeliveryOptions.styles";
import { object } from "prop-types";

const propTypes = {
  handlers: object,
  selectors: object,
};

const PickUpInLocal = ({ selectors, handlers }) => {
  const listOfTimes = useTime();

  return (
    <View>
      <Input
        errorMessage={selectors.nameError ? "¿Cómo te llamas?" : ""}
        label="Tu nombre"
        onChangeText={handlers.onChangeTextName}
        onBlur={handlers.onBlurName}
        value={selectors.name ? selectors.name : ""}
      />
      <Input
        errorMessage={selectors.phoneError ? "Dinos un telefono de contacto" : ""}
        keyboardType="numeric"
        label="Telefono"
        onChangeText={handlers.onChangeTextPhone}
        onBlur={handlers.onBlurPhone}
        value={selectors.phone ? selectors.phone : ""}
      />
      <View style={deliveryTime}>
        <Text>Hora de recogida</Text>
        {
          <Picker
            inputProps={{
              containerStyle: { width: 250 },
              value: selectors?.time ? selectors?.time : "",
            }}
            onValueChange={handlers.onValuePickerChange}
            options={listOfTimes}
            renderItem={TimePickerOption}
          />
        }
      </View>
    </View>
  );
};

PickUpInLocal.propTypes = propTypes;

export default PickUpInLocal;
