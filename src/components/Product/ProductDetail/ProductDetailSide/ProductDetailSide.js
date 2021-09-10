import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import UmamiIngredients from "/components/Umami/Ingredients";
import ProductDetailContext from "/context/ProductDetailContext";
import useCheckErrors from "/hooks/useCheckErrors";
import { red, yellow } from "/styles/theme";
import styles, { stylesRNEComponents } from "./ProductDetailSide.styles";
import { string, number, bool, array } from "prop-types";

export default function ProductDetailSide({ description, ingredients, isRadioButton, price, initialSwitchValue }) {
  const { productDetailInfo } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  useCheckErrors("errorSide", productDetailInfo, setIsError);

  return (
    <>
      <View style={styles.descriptionView}>
        {isError ? <Icon type="font-awesome-5" name="exclamation-triangle" color={yellow} /> : null}
        <Text h4 style={[stylesRNEComponents.descriptionText, { color: isError ? red : "black" }]}>
          {description}
        </Text>
        {isError ? <Icon type="font-awesome-5" name="exclamation-triangle" color={yellow} /> : null}
      </View>

      <UmamiIngredients
        ingredients={ingredients}
        price={price}
        isRadioButton={isRadioButton}
        initialSwitchValue={initialSwitchValue}
      />
    </>
  );
}

ProductDetailSide.propTypes = {
  description: string,
  ingredients: array,
  isRadioButton: bool,
  price: number,
  initialSwitchValue: bool,
};
