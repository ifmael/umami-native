import React, { useContext, useEffect } from "react";
import { array, bool } from "prop-types";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import ProductDetailContext from "/context/ProductDetailContext";

const IngredientsRadio = ({ ingredients, additionalIngredientSide }) => {
  const {
    setSide,
    setIngredients,
    removeError,
    productDetailInfo: { errors },
  } = useContext(ProductDetailContext);
  const { options, setOption, selected } = useRadioButtons(ingredients);

  useEffect(() => {
    if (!selected) return;

    additionalIngredientSide ? setIngredients([selected]) : setSide(selected);

    if (errors) {
      const currentErrors = errors.map(({ type }) => type);
      if (additionalIngredientSide && currentErrors.includes("errorSideIngredients")) {
        removeError("errorSideIngredients");
      } else if (currentErrors.includes("errorSide")) {
        removeError("errorSide");
      }
    }
  }, [selected, setSide, removeError, errors, additionalIngredientSide, setIngredients]);

  return <RadioButtons options={options} setOption={setOption} />;
};

IngredientsRadio.propTypes = {
  ingredients: array,
  additionalIngredientSide: bool,
};
export default IngredientsRadio;
