import { useContext, useEffect, useMemo, useState } from "react";
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import { GlobalContext } from "/context/GlobalContext";
import ProductDetailContext from "/context/ProductDetailContext";

const useAddExtraIngrendients = (originalListIngredients, category) => {
  const { ingredients } = useContext(GlobalContext);
  const { setIngredientsExtra } = useContext(ProductDetailContext);
  const [isVisible, setIsVisible] = useState(false);
  const listOfIngredientsInner = useMemo(() => {
    return ingredients
      ?.filter(({ showAddExtraIngredientBurguer, showAddExtraIngredientSalad, showAddExtraIngredientSandwich }) => {
        return showAddExtraIngredientBurguer && category === "hamburguesas"
          ? true
          : showAddExtraIngredientSalad && category === "ensaladas"
          ? true
          : showAddExtraIngredientSandwich && category === "bocadillos"
          ? true
          : false;
      })
      ?.filter(({ id }) => {
        const ingredientFound = originalListIngredients.find((originalIngredient) => originalIngredient.id === id);

        return ingredientFound ? false : true;
      });
  }, [ingredients, originalListIngredients, category]);
  const [listOfIngredients, setIngredient] = useSwitchList(listOfIngredientsInner, false);
  const selectedIngredients = useMemo(() => {
    return listOfIngredients.filter(({ isSelected }) => isSelected);
  }, [listOfIngredients]);

  useEffect(() => {
    setIngredientsExtra(selectedIngredients);
  }, [selectedIngredients, setIngredientsExtra]);

  const onCancel = () => {
    setIsVisible(false);
  };

  return [
    { isVisible, listOfIngredients, selectedIngredients },
    { onCancel, setIngredient, setIsVisible },
  ];
};

export default useAddExtraIngrendients;
