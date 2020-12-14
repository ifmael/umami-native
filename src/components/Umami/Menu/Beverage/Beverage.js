import React, { useState, useEffect, useContext } from "react";
import { array, bool, string } from "prop-types";
import { View } from "react-native";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import FontText from "/components/common/FontText";
import ProductDetailContext from "/context/ProductDetailContext";
import useCheckErrors from "/hooks/useCheckErrors";
import extractProducts from "../utils/extractProducts";

const UmamiMenuBeverage = ({ beverages, isRadioButton, name }) => {
  const { productDetailInfo, removeError, setBeverage } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  const newBeverages = extractProducts(beverages);
  const { options, setOption, selected } = useRadioButtons(newBeverages);
  useCheckErrors("ComponentMenuBeverage", productDetailInfo, setIsError);

  useEffect(() => {
    if (!selected) return;

    if (isError) removeError("ComponentMenuBeverage");
    setBeverage(selected);
  }, [selected, setBeverage, isError, removeError]);

  const ExtraPriceComponent =
    selected && selected.extraPrice ? (
      <View>
        <FontText>Precio extra de la bebida {selected.extraPrice}</FontText>
      </View>
    ) : null;

  return (
    <View>
      <FontText style={{ textAlign: "center", fontSize: 18, color: isError ? "red" : "black" }}>{name}</FontText>
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
