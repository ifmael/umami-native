import React, { useContext } from "react";
import { string, number, bool } from "prop-types";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import FontText from "/components/common/FontText";
import COLORS from "/styles/colors";
import styles from "./ProductItem.styles";

const ProductItem = (props) => {
  const { name, description, price, isCustomizable, isMenuable } = props;
  const navigation = useNavigation();
  const { setItemShoppingCart } = useContext(GlobalContext);
  const editable = isCustomizable || isMenuable;

  const add = () => {
    //Logic to know if a customizable product or menuable
    if (editable) {
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
            <FontText h4>{name}</FontText>
          </View>
        </ListItem.Title>
        {description ? <ListItem.Subtitle>{description}</ListItem.Subtitle> : null}
      </ListItem.Content>
      <FontText h4>{price} €</FontText>
      <ListItem.Chevron
        type="font-awesome-5"
        name={editable ? "chevron-right" : "plus"}
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
  isMenuable: bool,
};

export default ProductItem;
