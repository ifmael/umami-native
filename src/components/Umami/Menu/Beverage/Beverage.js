import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import Picker from "/components/common/Picker";
import ProductDetailContext from "/context/ProductDetailContext";
import useCheckErrors from "/hooks/useCheckErrors";
import extractProducts from "/components/Umami/Menu/utils/extractProducts";
import { stylesRNEComponents } from "../Menu.styles";
import { red } from "/styles/theme";
import { array, bool, string } from "prop-types";

const UmamiMenuBeverage = ({ beverages, isChildrenMenu, name }) => {
  const { productDetailInfo, removeError, setBeverage } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  const newBeverages = extractProducts(beverages);
  const isNewBeverages = Array.isArray(beverages) && beverages.length > 0;
  const beveragesNewBeverages = newBeverages.map((beverage) => ({
    ...beverage,
    showPrice: isChildrenMenu ? false : true,
  }));

  useCheckErrors("ComponentMenuBeverage", productDetailInfo, setIsError);

  const onValueChange = (option) => {
    setBeverage(option);
    if (isError) removeError("ComponentMenuBeverage");
  };

  return (
    <View>
      <Text style={{ ...stylesRNEComponents.title, color: isError ? red : "black" }}>{name}</Text>
      {isNewBeverages ? (
        <View style={{ marginVertical: 15 }}>
          <Picker
            inputProps={{
              containerStyle: { paddingHorizontal: 50 },
              errorMessage: isError ? "Elige una bebida" : "",
              value: productDetailInfo?.beverage?.name ? productDetailInfo?.beverage?.name : "",
            }}
            onValueChange={onValueChange}
            options={beveragesNewBeverages}
          />
        </View>
      ) : null}
    </View>
  );
};

UmamiMenuBeverage.propTypes = {
  beverages: array,
  isChildrenMenu: bool,
  name: string,
};

export default UmamiMenuBeverage;
