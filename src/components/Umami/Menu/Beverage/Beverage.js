import React, { useState, useContext } from "react";
import { View } from "react-native";
import FontText from "/components/common/FontText";
import Picker from "/components/common/Picker";
import ProductDetailContext from "/context/ProductDetailContext";
import useCheckErrors from "/hooks/useCheckErrors";
import extractProducts from "/components/Umami/Menu/utils/extractProducts";
import { array, string } from "prop-types";

const UmamiMenuBeverage = ({ beverages, name }) => {
  const { productDetailInfo, removeError, setBeverage } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  const newBeverages = extractProducts(beverages);
  const isNewBeverages = Array.isArray(beverages) && beverages.length > 0;

  useCheckErrors("ComponentMenuBeverage", productDetailInfo, setIsError);

  const onValueChange = (option) => {
    setBeverage(option);
    if (isError) removeError("ComponentMenuBeverage");
  };

  return (
    <View>
      <FontText style={{ textAlign: "center", fontSize: 18, color: isError ? "red" : "black" }}>{name}</FontText>
      {isNewBeverages ? (
        <View style={{ marginVertical: 15 }}>
          <Picker
            inputProps={{
              placeholder: "Pulsame para elegir una",
              errorMessage: isError ? "Elige una bebida" : "",
              containerStyle: { paddingHorizontal: 80 },
              value: productDetailInfo?.beverage?.name ? productDetailInfo?.beverage?.name : "",
            }}
            onValueChange={onValueChange}
            options={newBeverages}
          />
        </View>
      ) : null}
    </View>
  );
};

UmamiMenuBeverage.propTypes = {
  beverages: array,
  name: string,
};

export default UmamiMenuBeverage;
