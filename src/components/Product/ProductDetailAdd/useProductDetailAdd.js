import { useCallback, useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import ProductDetailContext from "/context/ProductDetailContext";
import { guidGenerator } from "/utils/functions";

export default function useProductDetailAdd(goTo, isChildrenMenu, isYourTaste, price, priceMenu) {
  const [localErrors, setLocalErrors] = useState(null);
  const [priceProduct, setPriceProduct] = useState(price);
  const { setItemShoppingCart } = useContext(GlobalContext);
  const { productDetailInfo, setErrors } = useContext(ProductDetailContext);
  let navigation = useNavigation();

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
      // console.log(productDetailInfo);
      // console.log(priceProduct);
      const shoppingCartItem = { ...productDetailInfo, id: guidGenerator(), isMenu, price: priceProduct };
      console.log(shoppingCartItem);
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
    const { isMenu, beverage, side, ingredients, category } = productDetailInfo;
    if (category === "complementos") return;

    let total = price;
    if (isYourTaste) {
      const ingredientsPrice = ingredients?.reduce((total, { isSelected, price }) => {
        return isSelected ? total + price : total;
      }, 0);

      total += ingredientsPrice || 0;
      total += isMenu ? priceMenu : 0;
    } else if (isMenu) {
      total = isChildrenMenu ? price : priceMenu;
    }

    total += side?.extraPrice ? side.extraPrice : 0;
    total += beverage?.extraPrice ? beverage.extraPrice : 0;

    setPriceProduct(total);
  }, [isChildrenMenu, isYourTaste, productDetailInfo, price, priceMenu]);

  // Calculate product price === "complementos"
  useEffect(() => {
    const { category, side } = productDetailInfo;
    if (category === "complementos" && Array.isArray(side) && side.length > 0) {
      const totalSide = side.reduce((total, { price }) => {
        return total + price;
      }, 0);
      setPriceProduct(totalSide);
    }
  }, [productDetailInfo]);

  return [
    { localErrors, priceProduct },
    { addProductToShoppingCart, closeModal },
  ];
}
