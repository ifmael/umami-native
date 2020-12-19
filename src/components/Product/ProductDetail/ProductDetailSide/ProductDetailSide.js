import React, { useContext, useState } from "react";
import { string, number, bool, array } from "prop-types";
import UmamiIngredients from "/components/Umami/Ingredients";
import FontText from "/components/common/FontText";
import ProductDetailContext from "/context/ProductDetailContext";
import useCheckErrors from "/hooks/useCheckErrors";
import headerStyles from "../ProductDetail.styles";

export default function ProductDetailSide({ description, ingredients, isRadioButton, price }) {
  const { productDetailInfo } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  useCheckErrors("errorSide", productDetailInfo, setIsError);

  return (
    <>
      <FontText h4 style={{ ...headerStyles.text, color: isError ? "red" : "black" }}>
        {isError ? "⚠" : null} {description} {isError ? "⚠" : null}
      </FontText>
      <UmamiIngredients ingredients={ingredients} price={price} isRadioButton={isRadioButton} />
    </>
  );
}

ProductDetailSide.propTypes = {
  description: string,
  ingredients: array,
  isRadioButton: bool,
  price: number,
};
