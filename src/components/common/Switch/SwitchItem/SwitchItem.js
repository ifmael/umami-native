import React from "react";
import { string, bool, func } from "prop-types";
import { View, Switch } from "react-native";
import styles from "/styles/switch.styles";
import FontText from "/components/common/FontText";

const SwitchItem = ({ id, name, isSelected, setState }) => {
  return (
    <View style={styles.container}>
      <FontText>{name}</FontText>
      <Switch
        trackColor={{ false: "#767577", true: "#c96" }}
        thumbColor={isSelected ? "#fc0" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setState(id)}
        value={isSelected}
        style={{ paddingVertical: 5 }}
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
