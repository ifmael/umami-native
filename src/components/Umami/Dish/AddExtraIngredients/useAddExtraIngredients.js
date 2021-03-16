import { useContext, useEffect, useMemo, useState } from "react";
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import { GlobalContext } from "/context/GlobalContext";
import ProductDetailContext from "/context/ProductDetailContext";

const useAddExtraIngrendients = (originalListIngredients) => {
  const { ingredients } = useContext(GlobalContext);
  const { setIngredientsExtra } = useContext(ProductDetailContext);
  const [isVisible, setIsVisible] = useState(false);
  const listOfIngredientsInner = useMemo(() => {
    return ingredients?.filter(({ id }) => {
      const ingredientFound = originalListIngredients.find((originalIngredient) => originalIngredient.id === id);
      // We can filter more grain with showAddExtraIngredient property
      return ingredientFound ? false : true;
    });
  }, [ingredients, originalListIngredients]);
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
