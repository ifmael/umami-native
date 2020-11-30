import React, { useContext } from "react";
import { string, number, bool } from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../../utils/context/GlobalContext";
import COLORS from "../../../styles/colors";

const ProductItem = ({ name, description, price, isCustomizable }) => {
  const navigation = useNavigation();
  const { setItemShoppingCart } = useContext(GlobalContext);
  const styles = StyleSheet.create({
    title: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    container: {
      marginHorizontal: 10,
      padding: 5,
      borderColor: "black",
      borderWidth: 1,
      marginTop: 20,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    info: {},
    action: {
      flexDirection: "row",
      alignItems: "center",
    },
    price: {
      marginRight: 5,
    },
    add: {
      backgroundColor: "cornflowerblue",
      borderWidth: 1,
      borderColor: "azure",
    },
  });

  const add = () => {
    //Logic to know if a customizable product
    if (isCustomizable) {
      navigation.navigate("ProductDetail", { name, description, price, isCustomizable });
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
            <Text>{name}</Text>
          </View>
        </ListItem.Title>
        <ListItem.Subtitle>{description}</ListItem.Subtitle>
      </ListItem.Content>
      <Text>{price} €</Text>
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
