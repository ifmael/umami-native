import React from "react";
import { object } from "prop-types";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import FontText from "/components/common/FontText";

const propTypes = {
  handlers: object,
  selectors: object,
};

export default function PickUpInLocal({ selectors, handlers }) {
  return (
    <View>
      <Input
        errorMessage={selectors.nameError ? "¿Cómo te llamas?" : ""}
        label="Tu nombre"
        onChangeText={handlers.onChangeTextName}
        onBlur={handlers.onBlurName}
        value={selectors.name}
      />
      <Input
        errorMessage={selectors.phoneError ? "Dinos un telefono de contacto" : ""}
        keyboardType="numeric"
        label="Telefono"
        onChangeText={handlers.onChangeTextPhone}
        onBlur={handlers.onBlurPhone}
        value={selectors.phone}
      />
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}
      >
        <FontText>Hora de recogida: </FontText>
        <Picker style={{ width: 150 }}>
          <Picker.Item label="Hour 1" value="date-1" />
        </Picker>
      </View>
    </View>
  );
}

PickUpInLocal.propTypes = propTypes;
