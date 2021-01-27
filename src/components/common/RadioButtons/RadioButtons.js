import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import styles, { priceView, radioButtonStyles } from "./RadioButtons.styles";
import { array, func, any, bool } from "prop-types";

const RadioButtons = ({ options, setOption, extraComponent, extraInfoComponent, horizontal = false }) => {
  return (
    <View style={horizontal ? { flexDirection: "row", justifyContent: "space-around" } : null}>
      {options &&
        options.map(({ id, name, price, isSelected }) => {
          return (
            <View key={id}>
              <TouchableOpacity onPress={() => setOption(id)} style={styles.container}>
                {price ? (
                  <View style={priceView}>
                    <Text style={{ fontSize: 16 }}>{name}</Text>
                    <Text style={{ fontSize: 16 }}>{price} €</Text>
                  </View>
                ) : (
                  <Text style={{ fontSize: 16 }}>{name}</Text>
                )}
                <CheckBox
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={isSelected}
                  containerStyle={radioButtonStyles.container}
                  onIconPress={() => setOption(id)}
                  checkedColor="#fc0"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>

              {isSelected ? extraInfoComponent : null}
              {isSelected ? extraComponent : null}
            </View>
          );
        })}
    </View>
  );
};

RadioButtons.propTypes = {
  options: array,
  setOption: func,
  extraComponent: any,
  extraInfoComponent: any,
  horizontal: bool,
};

export default RadioButtons;
