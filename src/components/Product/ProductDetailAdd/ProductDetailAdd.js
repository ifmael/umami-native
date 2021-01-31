import React from "react";
import { bool, number, object } from "prop-types";
import { View } from "react-native";
import { BottomSheet, Button, Text } from "react-native-elements";
import AddButton from "/components/common/AddButton";
import useProductDetailAdd from "./useProductDetailAdd";
import { red } from "/styles/theme";

const modalProps = {
  animationType: "fade",
};

const ProductDetailAdd = ({ goTo, isChildrenMenu, isYourTaste, price, priceMenu }) => {
  const [{ localErrors, priceProduct }, handlers] = useProductDetailAdd(
    goTo,
    isChildrenMenu,
    isYourTaste,
    price,
    priceMenu
  );

  return (
    <>
      <AddButton title={`Añadelo por ${priceProduct}€`} onPress={handlers.addProductToShoppingCart} />
      {localErrors ? (
        <BottomSheet isVisible={!!localErrors} modalProps={modalProps}>
          <View
            style={{
              backgroundColor: "white",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingVertical: 30,
              paddingHorizontal: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {localErrors?.map(({ id, text }) => (
              <Text key={id} style={{ color: red, paddingVertical: 5 }}>
                {text}
              </Text>
            ))}

            <Button
              title="Cerrar"
              titleStyle={{ fontSize: 20, width: "25%" }}
              buttonStyle={{ backgroundColor: red, marginTop: 20 }}
              onPress={handlers.closeModal}
            />
          </View>
        </BottomSheet>
      ) : null}
    </>
  );
};

ProductDetailAdd.propTypes = {
  goTo: object,
  isChildrenMenu: bool,
  isYourTaste: bool,
  price: number,
  priceMenu: number,
};

export default ProductDetailAdd;
