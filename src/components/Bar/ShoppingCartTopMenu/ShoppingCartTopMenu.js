import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Badge, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import { getSchedule } from "/utils/time";

const ShoppingCartTopMenu = () => {
  const navigation = useNavigation();
  const { shoppingCart, configuration } = useContext(GlobalContext);
  const { close, moreOrders } = configuration;
  const isClosedFromSchedule = getSchedule(configuration?.schedule) ? false : true;

  const goToShoppingCart = () => {
    if (shoppingCart?.length > 0) navigation.push("ShoppingCart");
  };

  return (
    <TouchableOpacity
      disabled={close?.isClose || !moreOrders?.moreOrder || isClosedFromSchedule}
      onPress={goToShoppingCart}
      style={{
        marginRight: 15,
        paddingVertical: 6,
        paddingLeft: 10,
        paddingRight: 5,
      }}
    >
      <Icon type="font-awesome-5" name="shopping-cart" size={25} color="grey" />
      {shoppingCart?.length > 0 ? (
        <Badge
          containerStyle={{ position: "absolute", top: -5, right: -5 }}
          value={shoppingCart?.length}
          status="error"
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default ShoppingCartTopMenu;
