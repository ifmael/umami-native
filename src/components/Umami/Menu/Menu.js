import React, { useContext } from "react";
import { array } from "prop-types";
import { View, Text, Switch } from "react-native";
import { UmamiMenuInfo, UmamiMenuSide, UmamiMenuBeverage } from "./index";
import ProductDetailContext from "/context/ProductDetailContext";
import { destructComponentOptions } from "../utils/functions";
import { sortAsc } from "/utils/functions";

const UmamiMenu = ({ options }) => {
  const {
    productDetailInfo: { isMenu },
    setIsMenu,
  } = useContext(ProductDetailContext);
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
      <Text>¿Quíeres convertirlo en Menú?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isMenu ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsMenu(!isMenu)}
        value={isMenu}
      />
      {isMenu ? (
        <View>
          {componentsJSX?.map((component, index) => (
            <View key={index}>{component}</View>
          ))}
        </View>
      ) : null}
    </View>
  );
};
UmamiMenu.propTypes = {
  options: array,
};

export default UmamiMenu;
