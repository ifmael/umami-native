import React from "react";
import { string, bool, array } from "prop-types";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { Divider, Image } from "react-native-elements";
import UmamiDishConfiguration from "/components/Umami/Dish/Configurations";
import UmamiDishIngredients from "/components/Umami/Dish/Ingredients";
import UmamiMenu from "/components/Umami/Menu";
import FontText from "/components/common/FontText";
import { getImages } from "../utils";
import { headerStyles } from "../ProductDetail.styles";

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
        <View
          style={{
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
            marginBottom: 10,
          }}
        >
          {imagesSource ? (
            <Image
              source={{ uri: `${imagesSource.url}` }}
              style={{
                borderRadius: 20,
                width: Dimensions.get("window").width - 32,
                height: 200,
                resizeMode: "cover",
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : null}
        </View>

        <FontText h4 style={headerStyles.text}>
          {description}
        </FontText>
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
      {isChildrenMenu || isMenuable ? (
        <UmamiMenu isChildrenMenu={isChildrenMenu} isYourTaste={isYourTaste} options={menu} />
      ) : null}
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
