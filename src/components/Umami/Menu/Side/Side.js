import React, { useContext, useEffect } from "react";
import { array, bool, string } from "prop-types";
import { View, Text } from "react-native";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import ProductDetailContext from "/context/ProductDetailContext";
import extractProducts from "../utils/extractProducts";

const UmamiMenuSide = ({ sides, isRadioButton, name }) => {
  const { setSide } = useContext(ProductDetailContext);
  const newSides = extractProducts(sides);
  const { options: optionsV1, setOption: setOptionV1, selected: selectedV1 } = useRadioButtons(newSides);

  const {
    options: potatoesOptions,
    setOption: setPotatoOption,
    selected: potatoSelected,
    setOptions,
    setSelected,
  } = useRadioButtons(selectedV1?.options);

  const setInnerSide = (idSelected) => {
    const { options } = optionsV1.find(({ id }) => idSelected === id);
    setOptionV1(idSelected);
    if (options.length > 0) setOptions(options);
    else setSelected(null);
  };

  useEffect(() => {
    if (!selectedV1) return;

    if (potatoSelected) {
      const { name } = potatoSelected;
      setSide({ ...potatoSelected, name: `Patatas: ${name}` });
    } else {
      const { options, ...rest } = selectedV1;
      options.length === 0 ? setSide(rest) : setSide(null);
    }
  }, [selectedV1, potatoSelected, setSide]);

  const ExtraPriceComponent =
    selectedV1 && selectedV1.extraPrice ? (
      <View>
        <Text>Precio extra del menú: {selectedV1.extraPrice}</Text>
      </View>
    ) : null;

  const ExtraRadioButtons =
    selectedV1 && selectedV1?.isRadioButton ? (
      <RadioButtons options={potatoesOptions} setOption={setPotatoOption} horizontal />
    ) : null;

  return (
    <View>
      <Text>{name}</Text>
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
