import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import ProductDetailContext from "/context/ProductDetailContext";
import { GlobalContext } from "/context/GlobalContext";
import { extractProducts, extractProductsSides } from "/components/Umami/Menu/utils/extractProducts";
import Picker from "/components/common/Picker";
import useCheckErrors from "/hooks/useCheckErrors";
import { stylesRNEComponents } from "../Menu.styles";
import { red } from "/styles/theme";
import { array, bool, string } from "prop-types";

const UmamiMenuSide = ({ sides, name }) => {
  const { setSide, productDetailInfo, removeError } = useContext(ProductDetailContext);
  const { productsByCategory } = useContext(GlobalContext);
  const [isError, setIsError] = useState(false);
  const newSides = extractProducts(sides);
  const productSideExtra = extractProductsSides(sides, productsByCategory["complementos"]);
  const isNewSides = Array.isArray(newSides) && newSides.length > 0;

  useCheckErrors(
    [
      {
        type: "ComponentMenuSide",
        setter: setIsError,
      },
    ],
    productDetailInfo
  );

  const onValueChange = (option) => {
    setSide(option);
    if (isError) removeError("ComponentMenuSide");
  };

  return (
    <View>
      <Text style={{ ...stylesRNEComponents.title, color: isError ? red : "black" }}>{name}</Text>

      {isNewSides ? (
        <View style={{ marginVertical: 15 }}>
          <Picker
            textProps={{
              containerStyle: { paddingHorizontal: 20 },
              errorMessage: isError ? "Elige un complemento" : "",
              value: productDetailInfo?.side?.name ? productDetailInfo?.side?.name : "",
            }}
            onValueChange={onValueChange}
            options={productSideExtra}
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
