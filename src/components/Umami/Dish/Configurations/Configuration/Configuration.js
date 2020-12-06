import React, { useContext, useEffect } from "react";
import { array, string, bool } from "prop-types";
import { View, Text } from "react-native";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import ProductDetailContext from "/context/ProductDetailContext";

const UmamiDishConfiguration = ({ __typename, data, description, isRadioButton }) => {
  const { setDishConfiguration } = useContext(ProductDetailContext);
  const { options, setOption } = useRadioButtons(data);

  useEffect(() => {
    if (!options || !__typename) return;

    const [optionSelected] = options?.filter(({ isSelected }) => isSelected);

    if (optionSelected) {
      const type =
        __typename === "ComponentBurgerMeats"
          ? "typeOfMeat"
          : __typename === "ComponentBurgerPointCooking"
          ? "meatPoint"
          : __typename === "ComponentSandwichBreads"
          ? "typeOfBread"
          : null;
      if (type) {
        setDishConfiguration(optionSelected, type);
      }
    }
  }, [options, __typename]);

  return (
    <View>
      <Text> {description}</Text>
      {isRadioButton ? <RadioButtons options={options} setOption={setOption} /> : null}
    </View>
  );
};
UmamiDishConfiguration.propTypes = {
  data: array,
  description: string,
  isRadioButton: bool,
  __typename: string,
};
export default UmamiDishConfiguration;
