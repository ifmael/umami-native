import React, { useEffect, useContext } from "react";
import { array, bool } from "prop-types";
import SwitchList from "/components/common/Switch/SwitchList";
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import ProductDetailContext from "/context/ProductDetailContext";

const IngredientsSwitch = ({ ingredients, initialSwitchValue }) => {
  const {
    setSide,
    productDetailInfo: { errors },
    removeError,
  } = useContext(ProductDetailContext);
  const [items, setItem] = useSwitchList(ingredients, !!initialSwitchValue);

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
  initialSwitchValue: bool,
};
export default IngredientsSwitch;
