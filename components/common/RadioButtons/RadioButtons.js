import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./RadioButtons.styles";

const RadioButtons = ({
  options,
  setOption,
  extraComponent,
  extraInfoComponent,
}) => {
  return (
    <View>
      {options &&
        options.map(({ id, name, isSelected }) => {
          return (
            <View key={id} style={styles.container}>
              <Text style={styles.radioText}>{name}</Text>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => setOption(id)}
              >
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

export default RadioButtons;
