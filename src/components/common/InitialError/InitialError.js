import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

const InitialError = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 15 }}>
      <Text h4 style={{ marginBottom: 30 }}>
        Lo sentimos, ha habido un problema al cargar la aplicación.
      </Text>
      <Text h4 style={{ marginBottom: 5 }}>
        Intentelo de nuevo o le recordamos que puede también estamos en:
      </Text>
      <Text h4>· Llamando al 858 69 33 02</Text>
      <Text h4>· Plaza Pintor Velázquez 2</Text>
    </View>
  );
};

export default InitialError;
