import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { func, number, string } from "prop-types";

const propTypes = {
  id: number,
  onPress: func,
  time: string,
};

const TimePickerOption = ({ id, onPress, time }) => {
  return (
    <TouchableOpacity
      key={id}
      onPress={() => onPress({ id, time })}
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "center",
      }}
    >
      <Text>{time}</Text>
    </TouchableOpacity>
  );
};

TimePickerOption.propTypes = propTypes;

export default TimePickerOption;
