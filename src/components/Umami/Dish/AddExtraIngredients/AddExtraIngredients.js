import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, Text } from "react-native-elements";
import Modal from "react-native-modal";
import SwitchList from "/components/common/Switch/SwitchList";
import useAddExtraIngrendients from "./useAddExtraIngredients";
import { array, string } from "prop-types";
import styles, {
  dividerStyles,
  ingredientsInfoView,
  ingredientsInfoItem,
  modalStyle,
  modalTitleStyle,
  modalDividerStyle,
  modalButtonView,
} from "./AddExtraIngredients.styles";
import { outlineButtonStyles } from "/styles/theme";

const propTypes = {
  originalListIngredients: array,
  category: string,
};

const getTitle = (isIngregiends) =>
  isIngregiends ? "Añade o eliminar más ingredientes extra" : "Añadir ingredientes extra";

const AddExtraIngredients = ({ originalListIngredients, category }) => {
  const [
    { isVisible, listOfIngredients, selectedIngredients },
    { onCancel, setIngredient, setIsVisible },
  ] = useAddExtraIngrendients(originalListIngredients, category);

  return (
    <View style={styles.addExtraIngredientMainView}>
      {selectedIngredients?.length > 0 ? (
        <>
          <Divider style={dividerStyles} />
          <View style={ingredientsInfoView}>
            {selectedIngredients?.map(({ name, id }) => (
              <View key={id} style={ingredientsInfoItem}>
                <Text>{name}</Text>
                <Text>+ 0.50 €</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
      <Button
        onPress={() => setIsVisible(true)}
        buttonStyle={outlineButtonStyles.button}
        title={getTitle(selectedIngredients?.length > 0)}
        titleStyle={outlineButtonStyles.title}
        type="outline"
      />
      <Modal isVisible={isVisible}>
        <View style={modalStyle}>
          <Text h4 style={modalTitleStyle}>
            Añadelos por 0,50 €
          </Text>
          <Divider style={modalDividerStyle} />
          <ScrollView>
            <SwitchList list={listOfIngredients} setItem={setIngredient} />
          </ScrollView>
          <View style={modalButtonView}>
            <Button title="Cerrar" onPress={onCancel} />
            <Button title="Aceptar" onPress={() => setIsVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

AddExtraIngredients.propTypes = propTypes;

export default AddExtraIngredients;
