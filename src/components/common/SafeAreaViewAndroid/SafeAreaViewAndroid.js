import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import { white } from "/styles/theme";
import { element } from "prop-types";

const SafeAreaViewAndroid = ({ children }) => {
  const styles = StyleSheet.create({
    androidSafeArea: {
      flex: 1,
      backgroundColor: white,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });

  return <SafeAreaView style={[styles.container, styles.androidSafeArea]}>{children}</SafeAreaView>;
};

SafeAreaViewAndroid.propTypes = { children: element };

export default SafeAreaViewAndroid;
