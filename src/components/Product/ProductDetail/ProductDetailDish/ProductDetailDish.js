import React from "react";
import { string, bool, array } from "prop-types";
import { View, ActivityIndicator } from "react-native";
import { Divider, Image, Text } from "react-native-elements";
import UmamiDishConfiguration from "/components/Umami/Dish/Configurations";
import UmamiDishIngredients from "/components/Umami/Dish/Ingredients";
import UmamiMenu from "/components/Umami/Menu";
import { getImages } from "../utils";
import { imageViewShadowWrapper } from "/styles/theme";
import { headerStyles, imageWidth } from "../ProductDetail.styles";

export default function ProductDetailDish({
  category,
  configuration,
  description,
  images,
  ingredients,
  isChildrenMenu,
  isCustomizable,
  isMenuable,
  isYourTaste,
  menu,
}) {
  const isBurguerSandwich = category === "hamburguesas" || category === "bocadillos";
  const [imagesSource] = getImages(images);

  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <View style={imageViewShadowWrapper}>
          {imagesSource ? (
            <Image
              source={{ uri: `${imagesSource.url}` }}
              style={{
                width: imageWidth,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : null}
        </View>

        <Text style={headerStyles.text}>{description}</Text>
      </View>
      {isBurguerSandwich ? (
        <>
          <Divider />
          <UmamiDishConfiguration configurations={configuration} />
          <Divider />
        </>
      ) : null}
      {isCustomizable ? (
        <>
          <UmamiDishIngredients ingredients={ingredients} category={category} isYourTaste={isYourTaste} />
          <Divider />
        </>
      ) : null}
      {isChildrenMenu || isMenuable ? <UmamiMenu isChildrenMenu={isChildrenMenu} options={menu} /> : null}
    </>
  );
}

ProductDetailDish.propTypes = {
  category: string,
  configuration: array,
  description: string,
  images: array,
  ingredients: array,
  isChildrenMenu: bool,
  isCustomizable: bool,
  isMenuable: bool,
  isYourTaste: bool,
  menu: array,
};
