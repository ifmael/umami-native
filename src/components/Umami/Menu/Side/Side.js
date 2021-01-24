import React, { useContext, useState } from "react";
import { View } from "react-native";
import ProductDetailContext from "/context/ProductDetailContext";
import FontText from "/components/common/FontText";
import extractProducts from "/components/Umami/Menu//utils/extractProducts";
import Picker from "/components/common/Picker";
import useCheckErrors from "/hooks/useCheckErrors";
import { array, bool, string } from "prop-types";

const UmamiMenuSide = ({ sides, name }) => {
  console.log("render menuside");
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
      <FontText style={{ textAlign: "center", fontSize: 18, color: isError ? "red" : "black" }}>{name}</FontText>

      {isNewSides ? (
        <View style={{ marginVertical: 15 }}>
          <Picker
            inputProps={{
              placeholder: "Pulsame para elegir uno",
              errorMessage: isError ? "Elige un complemento" : "",
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
