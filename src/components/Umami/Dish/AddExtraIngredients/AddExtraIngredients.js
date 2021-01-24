import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import Modal from "react-native-modal";
import FontText from "/components/common/FontText";
import SwitchList from "/components/common/Switch/SwitchList";
import useAddExtraIngrendients from "./useAddExtraIngredients";
import { array } from "prop-types";
import styles, {
  dividerStyles,
  ingredientsInfoView,
  ingredientsInfoItem,
  modalStyle,
  modalTitleStyle,
  modalDividerStyle,
  modalButtonView,
} from "./AddExtraIngredients.styles";

const propTypes = {
  originalListIngredients: array,
};

const getTitle = (isIngregiends) =>
  isIngregiends ? "Añade o eliminar más ingredientes extra" : "Añadir ingredientes extra";

export default function ExtraIngredients({ originalListIngredients }) {
  const [
    { isVisible, listOfIngredients, selectedIngredients },
    { onCancel, setIngredient, setIsVisible },
  ] = useAddExtraIngrendients(originalListIngredients);

  return (
    <View style={styles.addExtraIngredientMainView}>
      {selectedIngredients?.length > 0 ? (
        <>
          <Divider style={dividerStyles} />
          <View style={ingredientsInfoView}>
            {selectedIngredients?.map(({ name, id }) => (
              <View key={id} style={ingredientsInfoItem}>
                <FontText>{name}</FontText>
                <FontText>+ 0.50€</FontText>
              </View>
            ))}
          </View>
        </>
      ) : null}
      <Button onPress={() => setIsVisible(true)} title={getTitle(selectedIngredients?.length > 0)} type="outline" />
      <Modal isVisible={isVisible}>
        <View style={modalStyle}>
          <FontText h4 style={modalTitleStyle}>
            Añadelos por 0,50€
          </FontText>
          <Divider style={modalDividerStyle} />
          <ScrollView>
            <SwitchList list={listOfIngredients} setItem={setIngredient} />
          </ScrollView>
          <View style={modalButtonView}>
            <Button title="Cancelar" onPress={onCancel} />
            <Button title="Aceptar" onPress={() => setIsVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

ExtraIngredients.propTypes = propTypes;