import React, { useContext } from "react";
import { array } from "prop-types";
import { View, Text, Switch } from "react-native";
import { UmamiMenuInfo, UmamiMenuSide, UmamiMenuBeverage } from "./index";
import ProductDetailContext from "/context/ProductDetailContext";
import { destructComponentOptions } from "../utils/functions";
import { sortAsc } from "/utils/functions";
import styles from "./Menu.styles";

const UmamiMenu = ({ options }) => {
  const {
    productDetailInfo: { isMenu },
    setIsMenu,
    setBeverage,
    setSide,
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

  const setShowMenu = (value) => {
    setIsMenu(value);
    if (!value) {
      setBeverage(null);
      setSide(null);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text>¿Quíeres convertirlo en Menú?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isMenu ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setShowMenu(!isMenu)}
          value={isMenu}
        />
      </View>
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
