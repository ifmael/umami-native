import React from "react";
import { bool, number, object } from "prop-types";
import { View } from "react-native";
import { BottomSheet, Button } from "react-native-elements";
import AddButton from "/components/common/AddButton";
import FontText from "/components/common/FontText";
import useProductDetailAdd from "./useProductDetailAdd";

const modalProps = {
  // onDismiss: () => console.log("onDismiss"),
  // onShow: () => console.log("show"),
  animationType: "fade",
  // transparent: true,
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
      <AddButton
        title={isYourTaste ? `Añadelo por ${priceProduct}€` : "Añadir"}
        onPress={handlers.addProcutToShoppingCart}
      />
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
              <FontText key={id} style={{ color: "red", fontWeight: "bold", fontSize: 16, paddingVertical: 5 }}>
                {text}
              </FontText>
            ))}

            <Button
              title="Cerrar"
              titleStyle={{ fontSize: 20, fontFamily: "Confortaa", fontWeight: "bold", width: "25%" }}
              buttonStyle={{ backgroundColor: "red", marginTop: 20 }}
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
