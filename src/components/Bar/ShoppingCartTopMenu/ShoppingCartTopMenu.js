import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Badge, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";

const ShoppingCartTopMenu = () => {
  const navigation = useNavigation();
  const { shoppingCart } = useContext(GlobalContext);

  const goToShoppingCart = () => {
    if (shoppingCart?.length > 0) navigation.push("ShoppingCart");
  };

  return (
    <TouchableOpacity onPress={goToShoppingCart} style={{ marginRight: 15 }}>
      <Icon type="font-awesome-5" name="shopping-cart" size={25} color="grey" />
      {shoppingCart?.length > 0 ? (
        <Badge
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
          value={shoppingCart?.length}
          status="error"
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default ShoppingCartTopMenu;
