import { useReducer, useCallback } from "react";

const init = (options) => {
  return { ...initValue, ...options };
};

const initValue = {
  product: null,
  category: null,
  typeOfMeat: null,
  meatPoint: null,
  typeOfBread: null,
  isCustom: false,
  ingredients: [],
  isMenu: false,
  beverage: null,
  side: null,
  errors: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "setCustom":
      return { ...state, isCustom: payload.isCustom };
    case "setListIngredients":
      return { ...state, ingredients: payload.ingredients };
    case "setDishConfiguration": {
      const [key] = Object.keys(payload);
      return { ...state, [key]: payload[key] };
    }
    case "setMenu":
      return { ...state, isMenu: payload.isMenu };
    case "setBeverage":
      return { ...state, beverage: payload.beverage };
    case "setSide":
      return { ...state, side: payload.side };
    case "setErrors":
      return { ...state, errors: payload.errors };
    case "removeError": {
      const { errors } = state;
      const newErrors = errors?.filter((errors) => errors.type !== payload.type);
      return { ...state, errors: newErrors.length > 0 ? newErrors : null };
    }
    default:
      break;
  }
};

const useProductDetail = (options) => {
  const [productDetailInfo, dispatch] = useReducer(reducer, options, init);

  const setCustom = useCallback((value) => {
    dispatch({ type: "setCustom", payload: { isCustom: value } });
  }, []);

  const setIngredients = useCallback((listOfIngredients) => {
    dispatch({ type: "setListIngredients", payload: { ingredients: listOfIngredients } });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const setDishConfiguration = useCallback(({ isSelected, ...rest }, type) => {
    dispatch({ type: "setDishConfiguration", payload: { [type]: rest } });
  }, []);

  const setIsMenu = useCallback((isMenu) => {
    dispatch({ type: "setMenu", payload: { isMenu } });
  }, []);

  const setBeverage = useCallback((beverage) => {
    dispatch({ type: "setBeverage", payload: { beverage } });
  }, []);

  const setSide = useCallback((side) => {
    dispatch({ type: "setSide", payload: { side } });
  }, []);

  const setErrors = useCallback((errors) => {
    dispatch({ type: "setErrors", payload: { errors } });
  }, []);

  const removeError = useCallback((type) => {
    dispatch({ type: "removeError", payload: { type } });
  }, []);

  return {
    productDetailInfo,
    setCustom,
    setIngredients,
    setDishConfiguration,
    setIsMenu,
    setBeverage,
    setSide,
    setErrors,
    removeError,
  };
};

export default useProductDetail;
