import React, { useContext, useState, useCallback } from "react";
import { object } from "prop-types";
import { View } from "react-native";
import { BottomSheet, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AddButton from "/components/common/AddButton";
import { GlobalContext } from "/context/GlobalContext";
import ProductDetailContext from "/context/ProductDetailContext";
import FontText from "/components/common/FontText";

const ProductDetailAdd = ({ goTo }) => {
  const [localErrors, setLocalErrors] = useState(null);
  const { setItemShoppingCart } = useContext(GlobalContext);
  const { productDetailInfo, setErrors } = useContext(ProductDetailContext);
  const navigation = useNavigation();
  const modalProps = {
    onDismiss: () => console.log("onDismiss"),
    onShow: () => console.log("show"),
    animationType: "slide",
    // transparent: true,
  };

  const showModalFn = () => {
    const { category, beverage, side, isMenu, typeOfMeat, meatPoint } = productDetailInfo;
    let isError = false;
    let messageErrors = [];

    if (category === "hamburguesas") {
      if (!typeOfMeat) {
        isError = true;
        messageErrors.push({ text: "· Por favor elige la carne", id: "typeMeat", type: "ComponentBurgerMeats" });
      }
      if (!meatPoint) {
        isError = true;
        messageErrors.push({
          text: "· Por favor escoge el punto de la carne",
          id: "pointMeat",
          type: "ComponentBurgerPointCooking",
        });
      }
      if (isMenu && (!beverage || !side)) {
        isError = true;
        !side &&
          messageErrors.push({ text: "· Por favor elige un complemento", id: "side", type: "ComponentMenuSide" });
        !beverage &&
          messageErrors.push({ text: "· Por favor elige una bebida", id: "beverage", type: "ComponentMenuBeverage" });
      }
    }

    if (isError) {
      setLocalErrors(messageErrors);
      setErrors(messageErrors);
    } else {
      setItemShoppingCart(productDetailInfo);
      navigation.goBack();
      console.log("Añadir al carrito");
    }
  };

  const closeModal = useCallback(() => {
    setLocalErrors(null);
    goTo.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [goTo]);

  return (
    <>
      <AddButton title="Añadir" onPress={showModalFn} />
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
              onPress={closeModal}
            />
          </View>
        </BottomSheet>
      ) : null}
    </>
  );
};

ProductDetailAdd.propTypes = {
  goTo: object,
};

export default ProductDetailAdd;
