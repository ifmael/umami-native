import React from "react";
import { View, Text } from "react-native";
import RadioButtons from "../../../common/RadioButtons";
import useRadioButtons from "../../../common/RadioButtons/useRadioButtons";
import extractProducts from "../utils/extractProducts";

const UmamiMenuSide = ({ sides, isRadioButton, name }) => {
  const newSides = extractProducts(sides);
  const {
    options: optionsV1,
    setOption: setOptionV1,
    selected: selectedV1,
  } = useRadioButtons(newSides);

  const {
    options: potatoesOptions,
    setOption: setPotatoOption,
    selected: potatoSelected,
    setOptions,
  } = useRadioButtons(selectedV1?.options);

  const setSide = (idSelected) => {
    const { options } = optionsV1.find(({ id }) => idSelected === id);
    setOptionV1(idSelected);
    options && setOptions(options);
  };

  const ExtraPriceComponent =
    selectedV1 && selectedV1.extraPrice ? (
      <View>
        <Text>Precio extra del menú: {selectedV1.extraPrice}</Text>
      </View>
    ) : null;

  const ExtraRadioButtons =
    selectedV1 && selectedV1?.isRadioButton ? (
      <RadioButtons options={potatoesOptions} setOption={setPotatoOption} />
    ) : null;

  return (
    <View>
      <Text>{name}</Text>
      {isRadioButton ? (
        <RadioButtons
          options={optionsV1}
          setOption={setSide}
          extraComponent={ExtraRadioButtons}
          extraInfoComponent={ExtraPriceComponent}
        />
      ) : null}
    </View>
  );
};

export default UmamiMenuSide;
