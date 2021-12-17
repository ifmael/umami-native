import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "sentry-expo";

import { any } from "prop-types";

const propTypes = {
  children: any,
};

const propTypesError = {
  error: any,
};

const ErrorFallback = ({ error }) => {
  Sentry.captureMessage(error);

  return (
    <View>
      <Text>Algo ha ido mal.</Text>
    </View>
  );
};

const CatchError = ({ children }) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};

CatchError.propTypes = propTypes;
ErrorFallback.propTpes = propTypesError;

export default CatchError;
