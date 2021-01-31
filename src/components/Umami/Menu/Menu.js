import React, { useEffect, useContext } from "react";
import { bool, array } from "prop-types";
import { View, Switch } from "react-native";
import { Text } from "react-native-elements";
// import UmamiMenuInfo from "./Info";
import UmamiMenuSide from "./Side";
import UmamiMenuBeverage from "./Beverage";
import ProductDetailContext from "/context/ProductDetailContext";
import { destructComponentOptions } from "../utils/functions";
import { sortAsc } from "/utils/functions";
import { productDetailCustomActionStyles, switchStyles } from "/styles/theme";
import styles from "./Menu.styles";

const UmamiMenu = ({ isChildrenMenu, options }) => {
  const {
    productDetailInfo: { isMenu },
    setIsMenu,
    setBeverage,
    setSide,
  } = useContext(ProductDetailContext);
  const allComponents = destructComponentOptions(options);
  // let price;
  const componentsJSX = allComponents.sort(sortAsc).map((componentProps) => {
    const { __typename: componentName } = componentProps;

    if (componentName === "ComponentMenuBeverage") {
      return <UmamiMenuBeverage {...componentProps} />;
    } else if (componentName === "ComponentMenuSide") {
      return <UmamiMenuSide {...componentProps} />;
    } else if (componentName === "ComponentMenuInfo") {
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
          <Text style={productDetailCustomActionStyles}>{`Hazlo menú y ahorrate 1€`}</Text>
          <Switch
            trackColor={{ false: switchStyles.trackColor.false, true: switchStyles.trackColor.true }}
            thumbColor={isMenu ? switchStyles.thumbColor.false : switchStyles.thumbColor.true}
            ios_backgroundColor={switchStyles.ios_backgroundColor}
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
  isYourTaste: bool,
  options: array,
};

export default UmamiMenu;
