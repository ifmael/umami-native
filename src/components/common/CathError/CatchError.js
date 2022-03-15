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
  if (Sentry.Native.captureMessage) {
    Sentry.Native.captureMessage(error);
  } else if (Sentry.Browser.captureMessage) {
    Sentry.Browser.captureMessage(error);
  }

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
