import React from "react";
import { object } from "prop-types";
import { ScrollView } from "react-native";
import ProductInfo from "/components/Product/ProductDetail";
import AddButton from "/components/common/AddButton";
import ProductDetailContext from "/context/ProductDetailContext";
import useProductDetail from "./useProductDetail";

const ProductDetail = ({ route }) => {
  const { ...rest } = route.params;
  const {
    productDetailInfo,
    setCustom,
    setIngredients,
    setDishConfiguration,
    setIsMenu,
    setBeverage,
    setSide,
  } = useProductDetail({
    product: rest.name,
    category: rest.category,
  });

  console.log(productDetailInfo);
  return (
    <ProductDetailContext.Provider
      value={{ productDetailInfo, setCustom, setIngredients, setDishConfiguration, setIsMenu, setBeverage, setSide }}
    >
      <ScrollView style={{ backgroundColor: "white" }}>
        <ProductInfo {...rest} />
      </ScrollView>
      <AddButton title="Añadir" />
    </ProductDetailContext.Provider>
  );
};

ProductDetail.propTypes = {
  route: object,
};
export default ProductDetail;
