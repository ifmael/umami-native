import React from "react";
import { string, number, bool, array } from "prop-types";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { Text, Divider, Image } from "react-native-elements";
import UmamiDishConfiguration from "/components/Umami/Dish/Configurations";
import UmamiIngredients from "/components/Umami/Ingredients";
import UmamiDishIngredients from "/components/Umami/Dish/Ingredients";
import UmamiMenu from "/components/Umami/Menu";
import ProductDetailContext from "/context/ProductDetailContext";
import { getImages } from "./utils";
import { SERVER } from "/constant";
import useProductDetail from "./useProductDetail";
import styles from "./ProductDetail.styles";

const ProductDetail = ({
  name,
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
  const { productDetailInfo, setCustom, setIngredients, setDishConfiguration, setIsMenu } = useProductDetail({
    product: name,
    category,
  });
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

  const imagesSource = getImages(images);

  console.log(productDetailInfo);
  return (
    <ProductDetailContext.Provider
      value={{ productDetailInfo, setCustom, setIngredients, setDishConfiguration, setIsMenu }}
    >
      <View style={styles.container}>
        {/* <Text>{name}</Text> */}
        <Image
          source={{ uri: `${SERVER}${imagesSource[0].url}` }}
          // remove size padding
          style={{ width: Dimensions.get("window").width - 32, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text h3>{description}</Text>
        <Divider />
        {/* <Text>{price}</Text> */}
        {isBurguerSandwich ? (
          <>
            <UmamiDishConfiguration configurations={configuration} />
            <Divider />
          </>
        ) : null}

        {isCustomizable ? IngredientsListComponent : null}

        {isChildrenMenu ? <UmamiMenu options={menu} /> : isMenuable ? <UmamiMenu options={menu} /> : null}
      </View>
    </ProductDetailContext.Provider>
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
