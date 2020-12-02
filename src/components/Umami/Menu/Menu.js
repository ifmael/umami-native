import React from "react";
import { array } from "prop-types";
import { View } from "react-native";
import { UmamiMenuInfo, UmamiMenuSide, UmamiMenuBeverage } from "./index";
import { destructComponentOptions } from "../utils/functions";
import { sortAsc } from "/utils/functions";

const UmamiMenu = ({ options }) => {
  const allComponents = destructComponentOptions(options);
  const componentsJSX = allComponents.sort(sortAsc).map((componentProps) => {
    const { __typename: componentName } = componentProps;

    if (componentName === "ComponentMenuInfo") {
      return <UmamiMenuInfo {...componentProps} />;
    } else if (componentName === "ComponentMenuSide") {
      return <UmamiMenuSide {...componentProps} />;
    } else if (componentName === "ComponentMenuBeverage") {
      return <UmamiMenuBeverage {...componentProps} />;
    }
  });

  return (
    <View>
      {componentsJSX?.map((component, index) => (
        <View key={index}>{component}</View>
      ))}
    </View>
  );
};
UmamiMenu.propTypes = {
  options: array,
};

export default UmamiMenu;
