import React from "react";
import { string, number, bool, array } from "prop-types";
import { View } from "react-native";
import styles from "./ProductDetail.styles";
import ProductDetailDish from "./ProductDetailDish";
import ProductDetailSide from "./ProductDetailSide";

const ProductDetail = ({
  description,
  price,
  isCustomizable,
  ingredients,
  category,
  isMenuable,
  isRadioButton,
  configuration,
  images,
  isYourTaste,
  isChildrenMenu,
  menu,
}) => {
  const isDish = category === "hamburguesas" || category === "bocadillos" || category === "ensaladas";

  return (
    <View style={styles.container}>
      {isDish ? (
        <ProductDetailDish
          category={category}
          configuration={configuration}
          description={description}
          images={images}
          ingredients={ingredients}
          isChildrenMenu={isChildrenMenu}
          isCustomizable={isCustomizable}
          isMenuable={isMenuable}
          isYourTaste={isYourTaste}
          menu={menu}
        />
      ) : (
        <ProductDetailSide
          description={description}
          ingredients={ingredients}
          isRadioButton={isRadioButton}
          price={price}
        />
      )}
    </View>
  );
};

ProductDetail.propTypes = {
  name: string,
  description: string,
  price: number,
  isCustomizable: bool,
  ingredients: array,
  category: string,
  isMenuable: bool,
  isRadioButton: bool,
  configuration: array,
  isYourTaste: bool,
  images: array,
  isChildrenMenu: bool,
  menu: array,
};

export default ProductDetail;
