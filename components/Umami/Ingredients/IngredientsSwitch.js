import React from "react";
import { array } from "prop-types";
import SwitchList from "../../common/Switch/SwitchList";
import useSwitchList from "../../common/Switch/SwitchList/useSwitchList";

const IngredientsSwitch = ({ ingredients }) => {
  const { items, setItem } = useSwitchList(ingredients, false);

  return <SwitchList list={items} setItem={setItem} />;
};
IngredientsSwitch.propTypes = {
  ingredients: array,
};
export default IngredientsSwitch;
