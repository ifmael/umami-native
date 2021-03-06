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

export default function useProductDetailAdd(goTo, isChildrenMenu, isYourTaste, price) {
  const [localErrors, setLocalErrors] = useState(null);
  const [priceProduct, setPriceProduct] = useState(price);
  const { setItemShoppingCart, configuration } = useContext(GlobalContext);
  const { productDetailInfo, setErrors, setIsYourTaste } = useContext(ProductDetailContext);
  let navigation = useNavigation();
  const disableAddButton = !configuration?.moreOrders?.moreOrder;

  const addProductToShoppingCart = useCallback(() => {
    const { category, beverage, side, isMenu, typeOfMeat, meatPoint, typeOfBread } = productDetailInfo;
    let isError = false;
    let messageErrors = [];

    if (category === "hamburguesas") {
      if (!typeOfMeat) {
        isError = true;
        messageErrors.push({ text: "· Por favor elige la carne", id: "typeMeat", type: "ComponentBurgerMeats" });
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
      if (!side) {
        isError = true;
        messageErrors.push({
          text: "· Seleccion al menos una opción",
          id: "side",
          type: "errorSide",
        });
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
        ...productDetailInfo,
        id: guidGenerator(),
        isChildrenMenu,
        isMenu,
        price: priceProduct,
      };

      setItemShoppingCart(shoppingCartItem);
      navigation.goBack();
    }
  }, [isChildrenMenu, navigation, priceProduct, productDetailInfo, setErrors, setItemShoppingCart]);

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
      const discountMenu = beverage?.price && side.price ? true : false;

      total += side?.price ? side?.price : 0;
      total += beverage?.price ? beverage?.price : 0;
      total += typeOfMeat?.price ? typeOfMeat?.price : 0;
      total -= discountMenu ? 1 : 0;

      setPriceProduct(total);
    } catch (error) {
      console.log(error);
    }
  }, [isChildrenMenu, isYourTaste, productDetailInfo, price]);

  // Calculate product price === "complementos"
  useEffect(() => {
    const { category, side } = productDetailInfo;

    if (category === "complementos") {
      if (Array.isArray(side) && side.length > 0) {
        const totalSide = side.reduce((total, { price }) => {
          return total + price;
        }, 0);
        setPriceProduct(totalSide);
      } else if (side?.price) {
        setPriceProduct(side.price);
      } else {
        setPriceProduct(0);
      }
    }
  }, [productDetailInfo]);

  useEffect(() => {
    setIsYourTaste(isYourTaste);
  }, [isYourTaste, setIsYourTaste]);

  return [
    { disableAddButton, localErrors, priceProduct },
    { addProductToShoppingCart, closeModal },
  ];
}
