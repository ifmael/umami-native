import React from "react";
import { string, bool, func } from "prop-types";
import { View, Text, Switch } from "react-native";
import styles from "/styles/switch.styles";

const SwitchItem = ({ id, name, isSelected, setState }) => {
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

SwitchItem.propTypes = {
  id: string,
  name: string,
  isSelected: bool,
  setState: func,
};

export default SwitchItem;
