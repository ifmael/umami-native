import React, { useContext } from "react";
import { string, number, bool } from "prop-types";
import { View } from "react-native";
import { colors, ListItem, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import { guidGenerator, isOpenToday } from "/utils/functions";
import { yellow } from "/styles/theme";
import styles from "./ProductItem.styles";

const ProductItem = (props) => {
  const { category, description, isCustomizable, isMenuable, name, price } = props;
  const navigation = useNavigation();
  const { setItemShoppingCart, configuration } = useContext(GlobalContext);
  const editable = isCustomizable || isMenuable;
  const disableListItem =
    !configuration?.moreOrders?.moreOrder || !isOpenToday(configuration?.schedule) || configuration?.close.isClose;

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
    <ListItem bottomDivider disabled={disableListItem} onPress={add}>
      <ListItem.Content>
        <ListItem.Title>
          <View style={styles.title}>
            <Text h4>{name}</Text>
          </View>
        </ListItem.Title>
        {description ? <ListItem.Subtitle>{description}</ListItem.Subtitle> : null}
      </ListItem.Content>
      <Text h4>{price?.toFixed(2)} €</Text>
      <ListItem.Chevron
        type="font-awesome-5"
        name={editable ? "chevron-right" : "plus"}
        size={24}
        color={!disableListItem ? yellow : colors.disabled}
      />
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
