import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

// React native elements component
import { Icon, Button } from "react-native-elements";

// Components
import SwitchList from "/components/common/Switch/SwitchList";
import RadioButtons from "/components/common/RadioButtons";

// Hooks
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import useCustomiseSideErrors from "./useCustomiseSideErrors";

// Types
import { string, number, array, func, bool, undefined } from "prop-types";

const propTypes = {
  id: string,
  name: string,
  price: number,
  setStep: func,
  ingredients: array,
  configuration: array | undefined,
  isRadioButtonConfigurations: bool,
  isRadioButtonIngredients: bool,
  customiseSideIngredients: bool,
  onPress: func,
  onCancel: func,
};

/**
 *  Patatas Fritas
 * isRadioButtonConfigurations: null
 * isRadioButtonIngredients: true
 * customiseSideIngredients: false
 * */
/**
 *  Patatas Umami
 * isRadioButtonConfigurations: null
 * isRadioButtonIngredients: false
 * customiseSideIngredients: true
 * */
/**
 *  Nachos Umami
 * isRadioButtonConfigurations: null
 * isRadioButtonIngredients: false
 * customiseSideIngredients: true
 * */

/**
 *  Tequeños
 * isRadioButtonConfigurations: true
 * isRadioButtonIngredients: true
 * customiseSideIngredients: false
 * */

const CustomiseSide = ({
  id,
  name,
  price,
  setStep,
  ingredients,
  configuration,
  isRadioButtonConfigurations,
  isRadioButtonIngredients,
  customiseSideIngredients,
  onPress,
  onCancel,
}) => {
  const {
    options: ingredientsRadio,
    setOption: setIngredientsRadio,
    selected: selectedIngredientRadio,
  } = useRadioButtons(ingredients);
  const {
    options: configurationsRadio,
    setOption: setConfigurationsOption,
    selected: selectedConfigurationsOption,
  } = useRadioButtons(configuration);
  const [ingredientsSwitch, setIngredientsSwitch] = useSwitchList(ingredients, true);
  const [hasError, setHasError] = useCustomiseSideErrors(
    selectedIngredientRadio,
    selectedConfigurationsOption,
    customiseSideIngredients,
    isRadioButtonConfigurations,
    isRadioButtonIngredients
  );

  const validateOptions = () => {
    let isValid = false;
    let optionSide = { id, name, price };

    if (!isRadioButtonConfigurations && isRadioButtonIngredients && !customiseSideIngredients) {
      isValid = selectedIngredientRadio ? true : false;
      if (isValid) optionSide.option = selectedIngredientRadio.name;
    } else if (!isRadioButtonConfigurations && !isRadioButtonIngredients && customiseSideIngredients) {
      isValid = true;
      optionSide.option = ingredientsSwitch;
    } else if (isRadioButtonConfigurations && isRadioButtonIngredients && !customiseSideIngredients) {
      isValid = selectedIngredientRadio && selectedConfigurationsOption ? true : false;
      optionSide.option = { main: selectedIngredientRadio, secondary: selectedConfigurationsOption };
    }

    if (!isValid) {
      setHasError(true);
      return;
    }

    onPress(optionSide);
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => setStep(0)}>
          <Icon type="font-awesome-5" name="arrow-left" size={16} color="black" />
        </TouchableOpacity>
        <Text h4>{name}</Text>
      </View>

      {customiseSideIngredients ? (
        <SwitchList list={ingredientsSwitch} setItem={setIngredientsSwitch} />
      ) : isRadioButtonIngredients ? (
        <RadioButtons options={ingredientsRadio} setOption={setIngredientsRadio} />
      ) : null}

      {isRadioButtonConfigurations ? (
        <View style={{ marginTop: 16 }}>
          <Text>Elige una salsa</Text>
          <RadioButtons options={configurationsRadio} setOption={setConfigurationsOption} />
        </View>
      ) : null}

      {hasError ? <Text style={{ fontSize: 16, color: "red" }}>Por favor elija alguna opción</Text> : null}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 30 }}>
        <Button title="Cancelar" onPress={() => onCancel()} />
        <Button disabled={false} title="Aceptar" onPress={() => validateOptions()} />
      </View>
    </View>
  );
};

CustomiseSide.propTypes = propTypes;

export default CustomiseSide;
