import React from "react";
import { bool, number, object } from "prop-types";
import { View } from "react-native";
import { BottomSheet, Button, Text } from "react-native-elements";
import AddButton from "/components/common/AddButton";
import useProductDetailAdd from "./useProductDetailAdd";
import { bigTitleButton, red } from "/styles/theme";
import styles from "./ProductDetailAdd.styles";

const modalProps = {
  animationType: "fade",
};

const ProductDetailAdd = ({ goTo, isChildrenMenu, isYourTaste, price, priceMenu }) => {
  const [{ disableAddButton, localErrors, priceProduct }, handlers] = useProductDetailAdd(
    goTo,
    isChildrenMenu,
    isYourTaste,
    price,
    priceMenu
  );

  return (
    <>
      <AddButton
        disabled={disableAddButton}
        onPress={handlers.addProductToShoppingCart}
        title={priceProduct === 0 ? `Añadelo al carrito` : `Añadelo por ${priceProduct?.toFixed(2)} €`}
      />
      {localErrors ? (
        <BottomSheet isVisible={!!localErrors} modalProps={modalProps}>
          <View style={styles.buttonErrorView}>
            {localErrors?.map(({ id, text }) => (
              <Text key={id} style={{ color: red, paddingVertical: 5 }}>
                {text}
              </Text>
            ))}

            <Button
              title="Cerrar"
              titleStyle={bigTitleButton}
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
