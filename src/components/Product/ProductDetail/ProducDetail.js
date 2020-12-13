import React from "react";
import { string, number, bool, array } from "prop-types";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { Divider, Image } from "react-native-elements";
import UmamiDishConfiguration from "/components/Umami/Dish/Configurations";
import UmamiIngredients from "/components/Umami/Ingredients";
import UmamiDishIngredients from "/components/Umami/Dish/Ingredients";
import UmamiMenu from "/components/Umami/Menu";
import FontText from "/components/common/FontText";
import { getImages } from "./utils";
import { SERVER } from "/constant";
import styles, { headerStyles } from "./ProductDetail.styles";

const ProductDetail = ({
  description,
  // price,
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
  // const [isMenu, setIsMenu] = useState(false);
  const isDish = category === "hamburguesas" || category === "bocadillos" || category === "ensaladas";
  const isBurguerSandwich = category === "hamburguesas" || category === "bocadillos";
  const IngredientsListComponent = isDish ? (
    // Personalizar ensaladas , bocadillos y hamburguesas
    <>
      <UmamiDishIngredients ingredients={ingredients} category={category} isYourTaste={isYourTaste} />
      <Divider />
    </>
  ) : (
    // Para las salsas y  patatas
    <UmamiIngredients
      ingredients={ingredients}
      title={"Selecciona las salsas que te de la gana"}
      isRadioButton={isRadioButton}
    />
  );

  const [imagesSource] = getImages(images);

  return (
    <View style={styles.container}>
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
              source={{ uri: `${SERVER}${imagesSource.url}` }}
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

      <Divider />

      {isBurguerSandwich ? (
        <>
          <UmamiDishConfiguration configurations={configuration} />
          <Divider />
        </>
      ) : null}

      {isCustomizable ? IngredientsListComponent : null}

      {isChildrenMenu ? <UmamiMenu options={menu} /> : isMenuable ? <UmamiMenu options={menu} /> : null}
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
