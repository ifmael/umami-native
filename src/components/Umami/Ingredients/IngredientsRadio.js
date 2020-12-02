import React from "react";
import { array } from "prop-types";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";

const IngredientsRadio = ({ ingredients }) => {
  const { options, setOption } = useRadioButtons(ingredients);
  return <RadioButtons options={options} setOption={setOption} />;
};

IngredientsRadio.propTypes = {
  ingredients: array,
};
export default IngredientsRadio;
