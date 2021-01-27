import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import ProductDetailContext from "/context/ProductDetailContext";
import extractProducts from "/components/Umami/Menu/utils/extractProducts";
import Picker from "/components/common/Picker";
import useCheckErrors from "/hooks/useCheckErrors";
import { array, bool, string } from "prop-types";

const UmamiMenuSide = ({ sides, name }) => {
  const { setSide, productDetailInfo, removeError } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  const newSides = extractProducts(sides);
  const isNewSides = Array.isArray(newSides) && newSides.length > 0;
  useCheckErrors("ComponentMenuSide", productDetailInfo, setIsError);

  const onValueChange = (option) => {
    setSide(option);
    if (isError) removeError("ComponentMenuSide");
  };

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 18, color: isError ? "red" : "black" }}>{name}</Text>

      {isNewSides ? (
        <View style={{ marginVertical: 15 }}>
          <Picker
            inputProps={{
              containerStyle: { paddingHorizontal: 50 },
              errorMessage: isError ? "Elige un complemento" : "",
              placeholder: "Pulsame para elegir uno",
              value: productDetailInfo?.side?.name ? productDetailInfo?.side?.name : "",
            }}
            onValueChange={onValueChange}
            options={newSides}
          />
        </View>
      ) : null}
    </View>
  );
};

UmamiMenuSide.propTypes = {
  sides: array,
  isRadioButton: bool,
  name: string,
};

export default UmamiMenuSide;
