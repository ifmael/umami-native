import React, { useEffect, useContext } from "react";
import { bool, array } from "prop-types";
import { View, Switch } from "react-native";
// import UmamiMenuInfo from "./Info";
import UmamiMenuSide from "./Side";
import UmamiMenuBeverage from "./Beverage";
import FontText from "/components/common/FontText";
import ProductDetailContext from "/context/ProductDetailContext";
import { destructComponentOptions } from "../utils/functions";
import { sortAsc } from "/utils/functions";
import styles from "./Menu.styles";

const UmamiMenu = ({ isChildrenMenu, options }) => {
  const {
    productDetailInfo: { isMenu },
    setIsMenu,
    setBeverage,
    setSide,
  } = useContext(ProductDetailContext);
  const allComponents = destructComponentOptions(options);
  let price;
  const componentsJSX = allComponents.sort(sortAsc).map((componentProps) => {
    const { __typename: componentName } = componentProps;

    if (componentName === "ComponentMenuBeverage") {
      return <UmamiMenuBeverage {...componentProps} />;
    } else if (componentName === "ComponentMenuSide") {
      return <UmamiMenuSide {...componentProps} />;
    } else if (componentName === "ComponentMenuInfo") {
      price = componentProps.price;
      return null;
      // return <UmamiMenuInfo {...componentProps} />;
    }
  });

  const setShowMenu = (value) => {
    setIsMenu(value);
    if (!value) {
      setBeverage(null);
      setSide(null);
    }
  };

  useEffect(() => {
    if (isChildrenMenu) setIsMenu(true);
  }, [isChildrenMenu, setIsMenu]);

  return (
    <View>
      {!isChildrenMenu ? (
        <View style={styles.container}>
          <FontText style={{ fontSize: 18, fontWeight: "bold" }}>Hazlo menú por sólo {price}€</FontText>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isMenu ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setShowMenu(!isMenu)}
            value={isMenu}
          />
        </View>
      ) : null}

      {isMenu ? (
        <View>
          {componentsJSX?.map((component, index) => (
            <View key={index}>
              {component}
              {/* <Divider /> */}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};
UmamiMenu.propTypes = {
  isChildrenMenu: bool,
  options: array,
};

export default UmamiMenu;
