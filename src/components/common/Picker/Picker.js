import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import Modal from "react-native-modal";
import PickerDefaultItem from "./PickerDefaultItem";
import styles from "./Picker.styles";
import { array, func, object } from "prop-types";

const propTypes = {
  inputProps: object,
  onValueChange: func,
  options: array,
  renderItem: func,
};

const defaultInputProperties = {
  disabled: true,
  inputStyle: { textAlign: "center" },
  placeholder: "Pulsame",
  rightIcon: { type: "font-awesome-5", name: "caret-down" },
};

/**
 *  The default Option is a object with id, name and price
 */
export default function Picker({ inputProps, onValueChange, options, renderItem }) {
  const [isActive, setIsActive] = useState(false);
  const inputPropsInner = { ...defaultInputProperties, ...inputProps };
  const onPress = (nameInput) => {
    onValueChange(nameInput);
    setIsActive(false);
  };
  const optionsWithHandler = options?.map((option) => ({ ...option, onPress }));
  const onRenderItem = renderItem || PickerDefaultItem;
  const optionsToRender = renderItem ? options : optionsWithHandler;

  return (
    <>
      <TouchableOpacity onPress={() => setIsActive(true)}>
        <Input {...inputPropsInner} />
      </TouchableOpacity>
      <Modal
        isVisible={isActive}
        onBackButtonPress={() => setIsActive(false)}
        onBackdropPress={() => setIsActive(false)}
      >
        <View style={styles.mainView}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{optionsToRender?.map(onRenderItem)}</ScrollView>
        </View>
      </Modal>
    </>
  );
}

Picker.propTypes = propTypes;
