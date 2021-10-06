import React, { useState } from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import Modal from "react-native-modal";
import PickerDefaultItem from "./PickerDefaultItem";
import CustomiseSide from "../../Umami/Menu/Side/CustomiseSide";
import styles from "./Picker.styles";
import { array, func, object } from "prop-types";

const propTypes = {
  inputProps: object,
  modalStyles: object,
  onValueChange: func,
  options: array,
  renderItem: func,
};

const defaultInputProperties = {
  disabled: true,
  inputStyle: { textAlign: "center", fontSize: 18 },
  placeholder: "Pulsame",
  rightIcon: { type: "font-awesome-5", napme: "caret-down" },
};

/**
 *  The default Option is a object with id, name and price
 */

const Picker = ({ inputProps, modalStyles, onValueChange, options, renderItem }) => {
  const [isActive, setIsActive] = useState(false);
  const inputPropsInner = { ...defaultInputProperties, ...inputProps };
  const [step, setStep] = useState(0);
  const [idSideSelected, setIdSideSelected] = useState(null);

  const onPress = (nameInput) => {
    onValueChange(nameInput);
    onClose();
  };

  const setCustomSide = (id) => {
    setIdSideSelected(id);
    setStep(1);
  };

  const onClose = () => {
    setStep(0);
    setIsActive(false);
  };

  const optionsWithHandler = options?.map(
    ({ isRadioButtonConfigurations, isRadioButtonIngredients, customiseSideIngredients, ...option }) => {
      const isCustom = isRadioButtonConfigurations || isRadioButtonIngredients || customiseSideIngredients;

      return {
        ...option,
        onPress,
        setStep: setCustomSide,
        isCustom,
      };
    }
  );
  const onRenderItem = renderItem || PickerDefaultItem;
  const customSide = options.find((option) => option.id === idSideSelected);

  return (
    <>
      <TouchableOpacity onPress={() => setIsActive(true)}>
        <Input {...inputPropsInner} />
      </TouchableOpacity>
      <Modal
        isVisible={isActive}
        onBackButtonPress={() => setIsActive(false)}
        onBackdropPress={() => setIsActive(false)}
        style={modalStyles ? modalStyles : null}
      >
        <View style={styles.mainView}>
          {step === 0 ? (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{optionsWithHandler?.map(onRenderItem)}</ScrollView>
          ) : step === 1 ? (
            <CustomiseSide
              id={customSide.id}
              name={customSide.name}
              price={customSide.price}
              setStep={() => setStep(0)}
              isRadioButtonIngredients={customSide.isRadioButtonIngredients}
              ingredients={customSide.ingredients.map(({ price, ...restProps }) => restProps)}
              customiseSideIngredients={customSide.customiseSideIngredients}
              configuration={customSide.configuration}
              isRadioButtonConfigurations={customSide.isRadioButtonConfigurations}
              onPress={onPress}
              onCancel={onClose}
            />
          ) : null}
        </View>
      </Modal>
    </>
  );
};

Picker.propTypes = propTypes;

export default Picker;
