import React from "react";
import { View } from "react-native";
import UmamiMenuInfo from "./Info";
import UmamiMenuSide from "./Side";
import UmamiMenuBeverage from "./Beverage";
import { sortAsc } from "../../../utils/functions";

const UmamiMenu = ({ options }) => {
  let components = [];
  const ummamiMenuComponents = options
    .slice()
    .sort(sortAsc)
    .reduce((components, option) => {
      const { __typename: type, ...rest } = option;

      components[type] = components[type] || [];
      components[type].push({ ...rest });

      return components;
    }, {});
  for (const [componentName, componentProps] of Object.entries(
    ummamiMenuComponents
  )) {
    if (componentName === "ComponentMenuInfo") {
      componentProps.forEach((props) =>
        components.push(<UmamiMenuInfo {...props} />)
      );
    } else if (componentName === "ComponentMenuSide") {
      componentProps.forEach((props) =>
        components.push(<UmamiMenuSide {...props} />)
      );
    } else if (componentName === "ComponentMenuBeverage") {
      componentProps.forEach((props) =>
        components.push(<UmamiMenuBeverage {...props} />)
      );
    }
  }

  return (
    <View>
      {components?.map((component, index) => (
        <View key={index}>{component}</View>
      ))}
    </View>
  );
};

export default UmamiMenu;
