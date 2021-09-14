import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import UmamiIngredients from "/components/Umami/Ingredients";
import ProductDetailContext from "/context/ProductDetailContext";
import useCheckErrors from "/hooks/useCheckErrors";
import { red, yellow } from "/styles/theme";
import styles, { stylesRNEComponents } from "./ProductDetailSide.styles";
import { string, number, bool, array } from "prop-types";
import { destructComponentOptions } from "../../../Umami/utils/functions";

export default function ProductDetailSide({
  description,
  ingredients,
  isRadioButton,
  price,
  initialSwitchValue,
  configuration,
}) {
  const { productDetailInfo } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  const [isErrorIngredients, setIsErrorIngredients] = useState(false);

  useCheckErrors(
    [
      {
        type: "errorSide",
        setter: setIsError,
      },
      {
        type: "errorSideIngredients",
        setter: setIsErrorIngredients,
      },
    ],
    productDetailInfo
  );

  const configurations = destructComponentOptions(configuration);

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
      {configurations && Array.isArray(configurations) && configurations.length > 0 ? (
        <>
          <View style={styles.descriptionView}>
            {isErrorIngredients ? <Icon type="font-awesome-5" name="exclamation-triangle" color={yellow} /> : null}
            <Text h4 style={{ marginTop: 15, color: isErrorIngredients ? red : "black" }}>
              Elige además tu salsa preferida
            </Text>
            {isErrorIngredients ? <Icon type="font-awesome-5" name="exclamation-triangle" color={yellow} /> : null}
          </View>
          <UmamiIngredients
            ingredients={configurations[0].ingredients}
            initialSwitchValue={false}
            isRadioButton={true}
            additionalIngredientSide={true}
          />
        </>
      ) : null}
    </>
  );
}

ProductDetailSide.propTypes = {
  description: string,
  ingredients: array,
  isRadioButton: bool,
  price: number,
  initialSwitchValue: bool,
  configuration: array,
};
