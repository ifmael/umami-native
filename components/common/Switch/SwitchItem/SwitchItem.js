import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SwitchItem = ({ id, name, isSelected, setState }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isSelected ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setState(id)}
        value={isSelected}
      />
    </View>
  );
};

export default SwitchItem;
