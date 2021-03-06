import React, { useEffect, useContext } from "react";
import { array } from "prop-types";
import SwitchList from "/components/common/Switch/SwitchList";
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import ProductDetailContext from "/context/ProductDetailContext";

const IngredientsSwitch = ({ ingredients }) => {
  const {
    setSide,
    productDetailInfo: { errors },
    removeError,
  } = useContext(ProductDetailContext);
  const [items, setItem] = useSwitchList(ingredients, false);

  useEffect(() => {
    if (!items) return;

    const ingredientsSelected = items.filter(({ isSelected }) => isSelected);

    if (ingredientsSelected.length > 0) {
      setSide(ingredientsSelected);
      if (errors) removeError("errorSide");
    } else setSide();
  }, [items, setSide, removeError, errors]);

  return <SwitchList list={items} setItem={setItem} />;
};
IngredientsSwitch.propTypes = {
  ingredients: array,
};
export default IngredientsSwitch;
