import React, { useEffect, useContext } from "react";
import { array, bool, string } from "prop-types";
import { View, Text } from "react-native";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import ProductDetailContext from "/context/ProductDetailContext";
import extractProducts from "../utils/extractProducts";

const UmamiMenuBeverage = ({ beverages, isRadioButton, name }) => {
  const { setBeverage } = useContext(ProductDetailContext);
  const newBeverages = extractProducts(beverages);
  const { options, setOption, selected } = useRadioButtons(newBeverages);

  useEffect(() => {
    if (!selected) return;

    setBeverage(selected);
  }, [selected, setBeverage]);

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
