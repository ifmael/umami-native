import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
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
      <Text style={{ textAlign: "center", fontSize: 18, color: isError ? "red" : "black" }}>{name}</Text>
      {isNewBeverages ? (
        <View style={{ marginVertical: 15 }}>
          <Picker
            inputProps={{
              containerStyle: { paddingHorizontal: 50 },
              errorMessage: isError ? "Elige una bebida" : "",
              placeholder: "Pulsame para elegir una",
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
