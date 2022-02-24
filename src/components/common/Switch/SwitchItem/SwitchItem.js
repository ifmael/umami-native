import React from "react";
import { string, bool, func, number } from "prop-types";
import { View, Switch, Platform } from "react-native";
import { Text } from "react-native-elements";
import { switchStyles, switchStyleView } from "/styles/theme";

const SwitchItem = ({ id, name, price, showPrice, isSelected, setState }) => {
  const platformStyle = Platform.OS === "android" ? { marginVertical: 0 } : {};

  return (
    <View style={{ ...switchStyleView, ...platformStyle, flexWrap: "wrap" }}>
      <Text adjustsFontSizeToFit>{name}</Text>
      {showPrice ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text adjustsFontSizeToFit style={{ marginRight: 4 }}>
            {price?.toFixed(2) ?? ""} €
          </Text>
          <Switch
            trackColor={{ false: switchStyles.trackColor.false, true: switchStyles.trackColor.true }}
            thumbColor={isSelected ? switchStyles.thumbColor.false : switchStyles.thumbColor.true}
            ios_backgroundColor={switchStyles.ios_backgroundColor}
            onValueChange={() => setState(id)}
            value={isSelected}
            style={Platform.OS === "ios" ? { paddingVertical: 5 } : {}}
          />
        </View>
      ) : (
        <Switch
          trackColor={{ false: switchStyles.trackColor.false, true: switchStyles.trackColor.true }}
          thumbColor={isSelected ? switchStyles.thumbColor.false : switchStyles.thumbColor.true}
          ios_backgroundColor={switchStyles.ios_backgroundColor}
          onValueChange={() => setState(id)}
          value={isSelected}
          style={Platform.OS === "ios" ? { paddingVertical: 5 } : {}}
        />
      )}
    </View>
  );
};

SwitchItem.propTypes = {
  id: string,
  name: string,
  price: number,
  isSelected: bool,
  setState: func,
  showPrice: bool,
};

export default SwitchItem;
