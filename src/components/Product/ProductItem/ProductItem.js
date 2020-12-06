import React, { useContext } from "react";
import { string, number, bool } from "prop-types";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import COLORS from "/styles/colors";
import styles from "./ProductItem.styles";

const ProductItem = (props) => {
  const { name, description, price, isCustomizable } = props;
  const navigation = useNavigation();
  const { setItemShoppingCart } = useContext(GlobalContext);

  const add = () => {
    //Logic to know if a customizable product
    if (isCustomizable) {
      navigation.navigate("ProductDetail", props);
    } else {
      setItemShoppingCart({ title: "test" });
      navigation.setOptions({ title: "Updated!" });
    }
  };
  return (
    <ListItem bottomDivider onPress={add}>
      <ListItem.Content>
        <ListItem.Title>
          <View style={styles.title}>
            <Text h4>{name}</Text>
          </View>
        </ListItem.Title>
        <ListItem.Subtitle>{description}</ListItem.Subtitle>
      </ListItem.Content>
      <Text h4>{price} €</Text>
      <ListItem.Chevron
        type="font-awesome-5"
        name={isCustomizable ? "chevron-right" : "plus"}
        size={24}
        color={COLORS.defaultButton}
      />
    </ListItem>
  );
};

ProductItem.propTypes = {
  name: string,
  description: string,
  price: number,
  isCustomizable: bool,
};

export default ProductItem;
