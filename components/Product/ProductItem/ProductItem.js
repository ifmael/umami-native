import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../../utils/context/GlobalContext";

const ProductItem = (props) => {
  const navigation = useNavigation();
  const { setItemShoppingCart } = useContext(GlobalContext);
  const { name, description, price, isCustomizable } = props;
  const styles = StyleSheet.create({
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
      navigation.navigate("ProductDetail", props);
    } else {
      setItemShoppingCart({ title: "test" });
      navigation.setOptions({ title: "Updated!" });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </View>
      <View style={styles.action}>
        <Text style={styles.price}>{price}</Text>
        <TouchableOpacity onPress={add} style={styles.add}>
          <Text>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductItem;
