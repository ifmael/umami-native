import React from "react";
import { string, bool, func } from "prop-types";
import { View, Switch } from "react-native";
import { Text } from "react-native-elements";
import { switchStyles, switchStyleView } from "/styles/theme";

const SwitchItem = ({ id, name, isSelected, setState }) => {
  return (
    <View style={switchStyleView}>
      <Text>{name}</Text>
      <Switch
        trackColor={{ false: switchStyles.trackColor.false, true: switchStyles.trackColor.true }}
        thumbColor={isSelected ? switchStyles.thumbColor.false : switchStyles.thumbColor.true}
        ios_backgroundColor={switchStyles.ios_backgroundColor}
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
