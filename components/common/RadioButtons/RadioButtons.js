import React from "react";
import { array, func, any } from "prop-types";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./RadioButtons.styles";

const RadioButtons = ({ options, setOption, extraComponent, extraInfoComponent }) => {
  return (
    <View>
      {options &&
        options.map(({ id, name, isSelected }) => {
          return (
            <View key={id} style={styles.container}>
              <Text style={styles.radioText}>{name}</Text>
              <TouchableOpacity style={styles.radioCircle} onPress={() => setOption(id)}>
                {isSelected ? <View style={styles.selectedRb} /> : null}
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
