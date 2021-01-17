import React from "react";
import { array, func } from "prop-types";
import { View } from "react-native";

import RadioButtons from "/components/common/RadioButtons";

const propTypes = {
  options: array,
  setOption: func,
};

export default function ChoosePlace({ options, setOption }) {
  return (
    <View>
      <RadioButtons options={options} setOption={setOption} />
    </View>
  );
}

ChoosePlace.propTypes = propTypes;
