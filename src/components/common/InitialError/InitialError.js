import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { SERVER, TOKEN, MAPS_TOKEN, PLACES_TOKEN } from "/constant";
import Constants from "expo-constants";
import { any } from "prop-types";

const propTypes = {
  error: any,
};

const InitialError = ({ error }) => {
  console.log(error);
  let releaseChannel = process.env.RELEASE_CHANNEL ?? Constants.manifest.releaseChannel;
  return (
    <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 15 }}>
      <Text>server: {SERVER}</Text>
      <Text>token: {TOKEN}</Text>
      <Text>maps:{MAPS_TOKEN}</Text>
      <Text>places:{PLACES_TOKEN}</Text>
      <Text>sentry:{process.env.SENTRY_ORG}</Text>
      <Text>Error graphl</Text>
      <Text>message: {error.message}</Text>
      <Text>buildProfile: {process.env.EAS_BUILD_PROFILE}</Text>
      <Text>releaseChannel: {releaseChannel}</Text>
      {/* <Text h4 style={{ marginBottom: 30 }}>
        Lo sentimos, ha habido un problema al cargar la aplicación.
      </Text>
      <Text h4 style={{ marginBottom: 5 }}>
        Intentelo de nuevo o le recordamos que puede también estamos en:
      </Text>
      <Text h4>· Llamando al 858 69 33 02</Text>
      <Text h4>· Plaza Pintor Velázquez 2</Text> */}
    </View>
  );
};

InitialError.propTypes = propTypes;

export default InitialError;
