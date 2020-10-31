import React from "react";
import { View, Text } from "react-native";
import RadioButtons from "../../../../common/RadioButtons";
import useRadioButtons from "../../../../common/RadioButtons/useRadioButtons";

const UmamiDishConfiguration = ({ data, description, isRadioButton }) => {
  const { options, setOption } = useRadioButtons(data);
  return (
    <View>
      <Text> {description}</Text>
      {isRadioButton ? (
        <RadioButtons options={options} setOption={setOption} />
      ) : null}
    </View>
  );
};

export default UmamiDishConfiguration;
