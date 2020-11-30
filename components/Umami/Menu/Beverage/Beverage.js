import React from "react";
import { array, bool, string } from "prop-types";
import { View, Text } from "react-native";
import RadioButtons from "../../../common/RadioButtons";
import useRadioButtons from "../../../common/RadioButtons/useRadioButtons";
import extractProducts from "../utils/extractProducts";

const UmamiMenuBeverage = ({ beverages, isRadioButton, name }) => {
  const newBeverages = extractProducts(beverages);
  const { options, setOption, selected } = useRadioButtons(newBeverages);

  const ExtraPriceComponent =
    selected && selected.extraPrice ? (
      <View>
        <Text>Precio extra de la bebida {selected.extraPrice}</Text>
      </View>
    ) : null;

  return (
    <View>
      <Text>{name}</Text>
      {isRadioButton ? (
        <RadioButtons options={options} setOption={setOption} extraInfoComponent={ExtraPriceComponent} />
      ) : null}
    </View>
  );
};

UmamiMenuBeverage.propTypes = {
  beverages: array,
  isRadioButton: bool,
  name: string,
};

export default UmamiMenuBeverage;
