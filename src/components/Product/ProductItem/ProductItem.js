import React, { useContext } from "react";
import { string, number, bool } from "prop-types";
import { colors, ListItem, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import { guidGenerator } from "/utils/functions";
import { getSchedule } from "/utils/time";
import { yellow } from "/styles/theme";

const ProductItem = (props) => {
  const { category, description, isCustomizable, isMenuable, name, price } = props;
  const navigation = useNavigation();
  const { setItemShoppingCart, configuration } = useContext(GlobalContext);
  const editable = isCustomizable || isMenuable;
  const isClosedFromSchedule = getSchedule(configuration?.schedule) ? false : true;
  const disableListItem = !configuration?.moreOrders?.moreOrder || configuration?.close.isClose || isClosedFromSchedule;

  const add = () => {
    //Logic to know if a customizable product or menuable
    if (editable) {
      navigation.navigate("ProductDetail", props);
    } else {
      const shoppingCartItem = {
        id: guidGenerator(),
        name,
        price,
        category,
      };
      setItemShoppingCart(shoppingCartItem);
    }
  };
  return (
    <ListItem bottomDivider disabled={disableListItem} onPress={add} containerStyle={{ flexWrap: "wrap" }}>
      <ListItem.Content>
        <ListItem.Title>
          <Text h4 adjustsFontSizeToFit>
            {name}
          </Text>
        </ListItem.Title>
        {description ? <ListItem.Subtitle>{description}</ListItem.Subtitle> : null}
      </ListItem.Content>
      <ListItem.Content right style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Text h4 style={{ marginRight: 5 }}>
          {price?.toFixed(2)} €
        </Text>
        <ListItem.Chevron
          type="font-awesome-5"
          name={editable ? "chevron-right" : "plus"}
          size={24}
          color={!disableListItem ? yellow : colors.disabled}
        />
      </ListItem.Content>
    </ListItem>
  );
};

ProductItem.propTypes = {
  category: string,
  description: string,
  isCustomizable: bool,
  isMenuable: bool,
  name: string,
  price: number,
};

export default ProductItem;
