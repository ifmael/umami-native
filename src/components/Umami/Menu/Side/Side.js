import React, { useContext, useEffect, useState } from "react";
import { array, bool, string } from "prop-types";
import { View } from "react-native";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import ProductDetailContext from "/context/ProductDetailContext";
import extractProducts from "../utils/extractProducts";
import FontText from "/components/common/FontText";
import useCheckErrors from "/hooks/useCheckErrors";

const UmamiMenuSide = ({ sides, isRadioButton, name }) => {
  const { setSide, productDetailInfo, removeError } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  const newSides = extractProducts(sides);
  const { options: optionsV1, setOption: setOptionV1, selected: selectedV1 } = useRadioButtons(newSides);
  const {
    options: potatoesOptions,
    setOption: setPotatoOption,
    selected: potatoSelected,
    setOptions,
    setSelected,
  } = useRadioButtons(selectedV1?.options);
  useCheckErrors("ComponentMenuSide", productDetailInfo, setIsError);

  const setInnerSide = (idSelected) => {
    const { options } = optionsV1.find(({ id }) => idSelected === id);

    setOptionV1(idSelected);

    if (options.length > 0) setOptions(options);
    else {
      if (isError) removeError("ComponentMenuSide");
      setSelected(null);
    }
  };

  useEffect(() => {
    if (!selectedV1) return;

    if (potatoSelected) {
      const { name } = potatoSelected;

      if (isError) removeError("ComponentMenuSide");
      setSide({ ...potatoSelected, name: `Patatas: ${name}` });
    } else {
      const { options, ...rest } = selectedV1;
      options.length === 0 ? setSide(rest) : setSide(null);
    }
  }, [selectedV1, potatoSelected, setSide, removeError, isError]);

  const ExtraPriceComponent =
    selectedV1 && selectedV1.extraPrice ? (
      <FontText style={{ marginLeft: 10 }}>Precio extra del menú: {selectedV1.extraPrice}€</FontText>
    ) : null;

  const ExtraRadioButtons =
    selectedV1 && selectedV1?.isRadioButton ? (
      <RadioButtons options={potatoesOptions} setOption={setPotatoOption} horizontal />
    ) : null;

  return (
    <View>
      <FontText style={{ textAlign: "center", fontSize: 18, color: isError ? "red" : "black" }}>{name}</FontText>
      {isRadioButton ? (
        <RadioButtons
          options={optionsV1}
          setOption={setInnerSide}
          extraComponent={ExtraRadioButtons}
          extraInfoComponent={ExtraPriceComponent}
        />
      ) : null}
    </View>
  );
};

UmamiMenuSide.propTypes = {
  sides: array,
  isRadioButton: bool,
  name: string,
};

export default UmamiMenuSide;
