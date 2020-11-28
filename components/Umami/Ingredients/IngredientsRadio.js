import React from "react";
import RadioButtons from "../../common/RadioButtons";
import useRadioButtons from "../../common/RadioButtons/useRadioButtons";

const IngredientsRadio = ({ ingredients }) => {
  const { options, setOption } = useRadioButtons(ingredients);
  return <RadioButtons options={options} setOption={setOption} />;
};

export default IngredientsRadio;
