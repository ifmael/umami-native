import React, { useState } from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Divider, Icon, Button } from "react-native-elements";
import Modal from "react-native-modal";
import PickerDefaultItem from "./PickerDefaultItem";
import CustomiseSide from "../../Umami/Menu/Side/CustomiseSide";
import styles from "./Picker.styles";
import { red } from "/styles/theme";
import { array, func, object } from "prop-types";

const propTypes = {
  textProps: object,
  modalStyles: object,
  onValueChange: func,
  options: array,
  renderItem: func,
};

/**
 *  The default Option is a object with id, name and price
 */

const Picker = ({ textProps, modalStyles, onValueChange, options, renderItem }) => {
  const [isActive, setIsActive] = useState(false);
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
  const customSide = options?.find((option) => option.id === idSideSelected);

  return (
    <>
      <TouchableOpacity onPress={() => setIsActive(true)}>
        <View
          style={{
            ...textProps.containerStyle,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text numberOfLines={1}>{textProps.value ? textProps.value : "Pulsame"}</Text>
          <Icon color={"grey"} name="caret-down" type="font-awesome-5" />
        </View>
        <Divider style={{ marginHorizontal: 10 }} />
        {textProps.errorMessage && !textProps.value ? (
          <Text style={{ fontSize: 12, color: red }}>{textProps.errorMessage}</Text>
        ) : null}
      </TouchableOpacity>

      <Modal
        isVisible={isActive}
        onBackButtonPress={() => setIsActive(false)}
        onBackdropPress={() => setIsActive(false)}
        style={modalStyles ? modalStyles : null}
      >
        <View style={styles.mainView}>
          {step === 0 ? (
            <>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{optionsWithHandler?.map(onRenderItem)}</ScrollView>
              <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                <Button title="Cancelar" onPress={() => setIsActive(false)} />
              </View>
            </>
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
