import React, { useEffect, useContext } from "react";
import { array, bool, string } from "prop-types";
import { View } from "react-native";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import FontText from "/components/common/FontText";
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
        <FontText>Precio extra de la bebida {selected.extraPrice}</FontText>
      </View>
    ) : null;

  return (
    <View>
      <FontText style={{ textAlign: "center", fontSize: 18 }}>{name}</FontText>
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
