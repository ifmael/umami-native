import { useCallback, useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import ProductDetailContext from "/context/ProductDetailContext";
import { guidGenerator } from "/utils/functions";

const calculateIngredientsPrice = (listOfIngredients) => {
  try {
    return listOfIngredients?.reduce((total, { isSelected, price }) => {
      return isSelected ? total + price : total;
    }, 0);
  } catch (error) {
    console.log(error);
  }
};

export default function useProductDetailAdd(goTo, isChildrenMenu, isYourTaste, price, configurations) {
  const [localErrors, setLocalErrors] = useState(null);
  const [priceProduct, setPriceProduct] = useState(price);
  const { setItemShoppingCart, configuration } = useContext(GlobalContext);
  const { productDetailInfo, setErrors, setIsYourTaste } = useContext(ProductDetailContext);
  let navigation = useNavigation();
  const disableAddButton = !configuration?.moreOrders?.moreOrder;

  const addProductToShoppingCart = useCallback(() => {
    const { category, beverage, side, isMenu, typeOfMeat, meatPoint, typeOfBread, ingredients, name } =
      productDetailInfo;
    let isError = false;
    let messageErrors = [];
    let isTequeno = false;

    if (category === "hamburguesas") {
      if (!typeOfMeat) {
        isError = true;
        messageErrors.push({ text: "· Por favor elige la carne", id: "typeMeat", type: "ComponentBurgerMeats" });
      }
      if (!typeOfBread && !isChildrenMenu) {
        isError = true;
        messageErrors.push({ text: "· Por favor elige el pan", id: "typeOfBread", type: "ComponentSandwichBreads" });
      }
      if (!meatPoint && !isChildrenMenu) {
        isError = true;
        messageErrors.push({
          text: "· Por favor escoge el punto de la carne",
          id: "pointMeat",
          type: "ComponentBurgerPointCooking",
        });
      }
    } else if (category === "bocadillos") {
      if (!typeOfBread) {
        isError = true;
        messageErrors.push({ text: "· Por favor elige el pan", id: "typeOfBread", type: "ComponentSandwichBreads" });
      }
    } else if (category === "complementos") {
      const isPreselectedIngredientProduct =
        name.toLowerCase() === "patatas umami" || name.toLowerCase() === "nachos umami";
      isTequeno = name.toLowerCase().includes("tequeños");
      if (!side && !isPreselectedIngredientProduct) {
        isError = true;
        messageErrors.push({
          text: "· Seleccion al menos una opción",
          id: "side",
          type: "errorSide",
        });
      }
      if (configurations && Array.isArray(configurations) && configurations.length > 0) {
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
          isError = true;
          messageErrors.push({
            text: "· Por favor elige una salsa",
            id: "side-ingredients",
            type: "errorSideIngredients",
          });
        }
      }
    }

    if (isMenu && (!beverage || !side)) {
      if (!side && !isChildrenMenu) {
        isError = true;
        messageErrors.push({ text: "· Por favor elige un complemento", id: "side", type: "ComponentMenuSide" });
      }
      if (!beverage) {
        isError = true;
        messageErrors.push({ text: "· Por favor elige una bebida", id: "beverage", type: "ComponentMenuBeverage" });
      }
    }

    if (isError) {
      setLocalErrors(messageErrors);
      setErrors(messageErrors);
    } else {
      const shoppingCartItem = {
        ...(isTequeno
          ? {
              name,
              price: priceProduct,
              category: productDetailInfo.category,
              side: { option: { main: productDetailInfo.side, secondary: productDetailInfo.ingredients[0] } },
            }
          : productDetailInfo),
        id: guidGenerator(),
        isChildrenMenu,
        isMenu,
        price: priceProduct,
      };

      setItemShoppingCart(shoppingCartItem);
      navigation.goBack();
    }
  }, [isChildrenMenu, navigation, priceProduct, productDetailInfo, setErrors, setItemShoppingCart, configurations]);

  const closeModal = useCallback(() => {
    setLocalErrors(null);
    goTo.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [goTo]);

  // Calculate product price when is not a side
  useEffect(() => {
    try {
      const { beverage, side, ingredientsExtra, category, typeOfMeat } = productDetailInfo;
      if (category === "complementos") return;
      if (isChildrenMenu) {
        setPriceProduct(price);
        return;
      }

      let total = price;
      total += calculateIngredientsPrice(ingredientsExtra) || 0;
      const discountMenu = beverage?.price && side?.price ? true : false;

      total += side?.price ? side?.price : 0;
      total += beverage?.price ? beverage?.price : 0;
      total += typeOfMeat?.price ? typeOfMeat?.price : 0;
      total -= discountMenu ? 1 : 0;

      setPriceProduct(total);
    } catch (error) {
      console.log(error);
    }
  }, [isChildrenMenu, isYourTaste, productDetailInfo, price]);

  // Calculate product category === "complementos"
  useEffect(() => {
    const { category, side, customiseSideIngredients } = productDetailInfo;

    if (category === "complementos") {
      const calculatePrices = (total, { price }) => {
        return total + price;
      };
      if (customiseSideIngredients) {
        setPriceProduct(price);
      } else if (Array.isArray(side) && side.length > 0) {
        const totalSide = side.reduce((total, { price }) => {
          return total + price;
        }, 0);
        setPriceProduct(totalSide);
      } else if (side?.price) {
        setPriceProduct(side.price);
      } else if (typeof side === "object" && side !== null && Array.isArray(side.data) && side.data.length) {
        const totalSide = side.data.reduce(calculatePrices, 0);
        setPriceProduct(totalSide);
      } else {
        setPriceProduct(0);
      }
    }
  }, [productDetailInfo, price]);

  useEffect(() => {
    setIsYourTaste(isYourTaste);
  }, [isYourTaste, setIsYourTaste]);

  return [
    { disableAddButton, localErrors, priceProduct },
    { addProductToShoppingCart, closeModal },
  ];
}
