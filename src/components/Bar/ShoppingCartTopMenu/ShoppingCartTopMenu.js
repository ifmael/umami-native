import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontText from "/components/common/FontText";
// import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { GlobalContext } from "/context/GlobalContext";

const ShoppingCartTopMenu = () => {
  // const navigation = useNavigation();
  const { shoppingCart } = useContext(GlobalContext);

  const styles = StyleSheet.create({
    button: {
      marginRight: 10,
    },
    IconBadge: {
      position: "absolute",
      top: -5,
      right: -5,
      minWidth: 15,
      height: 15,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FF0000",
    },
  });

  const goToShoppingCart = () => {
    //navivation.push("ShoppingCart");
    if (shoppingCart.length > 0) console.log("vamosnossssss");
  };

  return (
    <TouchableOpacity onPress={goToShoppingCart} style={styles.button}>
      <View>
        <FontAwesome name="shopping-cart" size={25} color={"grey"} />
        {shoppingCart.length > 0 && (
          <View style={[styles.IconBadge]}>
            <FontText style={{ color: "#FFFFFF" }}>{shoppingCart.length}</FontText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ShoppingCartTopMenu;
