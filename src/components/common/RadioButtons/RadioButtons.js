import React from "react";
import { array, func, any } from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import styles, { radioButtonStyles } from "./RadioButtons.styles";

const RadioButtons = ({ options, setOption, extraComponent, extraInfoComponent }) => {
  return (
    <View>
      {options &&
        options.map(({ id, name, isSelected }) => {
          return (
            <View key={id}>
              <TouchableOpacity onPress={() => setOption(id)} style={styles.container}>
                <Text style={styles.text}>{name}</Text>
                <CheckBox
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={isSelected}
                  containerStyle={radioButtonStyles.container}
                  onIconPress={() => setOption(id)}
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
};

export default RadioButtons;
