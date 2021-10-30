import React, { useEffect, useContext } from "react";
import { array, bool } from "prop-types";
import SwitchList from "/components/common/Switch/SwitchList";
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import ProductDetailContext from "/context/ProductDetailContext";

const IngredientsSwitch = ({ ingredients, initialSwitchValue, showWith }) => {
  const {
    setSide,
    productDetailInfo: { errors },
    removeError,
  } = useContext(ProductDetailContext);
  const [items, setItem] = useSwitchList(ingredients, !!initialSwitchValue);

  useEffect(() => {
    if (!items) return;

    const ingredientsSelected = items.filter(({ isSelected }) => (showWith ? isSelected : !isSelected));

    if (ingredientsSelected.length > 0) {
      setSide({ showWith, data: ingredientsSelected });
      if (errors) removeError("errorSide");
    } else setSide();
  }, [items, setSide, removeError, errors, showWith]);

  return <SwitchList list={items} setItem={setItem} />;
};
IngredientsSwitch.propTypes = {
  ingredients: array,
  initialSwitchValue: bool,
  showWith: bool,
};
export default IngredientsSwitch;
