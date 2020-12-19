import React, { useContext, useEffect } from "react";
import { array } from "prop-types";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import ProductDetailContext from "/context/ProductDetailContext";

const IngredientsRadio = ({ ingredients }) => {
  const {
    setSide,
    removeError,
    productDetailInfo: { errors },
  } = useContext(ProductDetailContext);
  const { options, setOption, selected } = useRadioButtons(ingredients);

  useEffect(() => {
    if (!selected) return;

    setSide(selected);

    if (errors) removeError("errorSide");
  }, [selected, setSide, removeError, errors]);

  return <RadioButtons options={options} setOption={setOption} />;
};

IngredientsRadio.propTypes = {
  ingredients: array,
};
export default IngredientsRadio;
