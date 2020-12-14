import React, { useContext, useEffect, useState } from "react";
import { array, string, bool } from "prop-types";
import { View } from "react-native";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import FontText from "/components/common/FontText";
import ProductDetailContext from "/context/ProductDetailContext";
import useCheckErrors from "/hooks/useCheckErrors";

const UmamiDishConfiguration = ({ __typename, data, description, isRadioButton }) => {
  const { setDishConfiguration, productDetailInfo, removeError } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  const { options, setOption, selected } = useRadioButtons(data);
  useCheckErrors(__typename, productDetailInfo, setIsError);

  useEffect(() => {
    if (!options || !__typename) return;

    if (selected) {
      const type =
        __typename === "ComponentBurgerMeats"
          ? "typeOfMeat"
          : __typename === "ComponentBurgerPointCooking"
          ? "meatPoint"
          : __typename === "ComponentSandwichBreads"
          ? "typeOfBread"
          : null;
      if (type) {
        if (isError) removeError(__typename);
        setDishConfiguration(selected, type);
      }
    }
  }, [selected, options, setDishConfiguration, __typename, removeError, isError]);

  return (
    <View style={{ marginBottom: 5 }}>
      <FontText h4 style={{ textAlign: "center", color: isError ? "red" : "black" }}>
        {isError ? "⚠" : null} {description} {isError ? "⚠" : null}
      </FontText>
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
