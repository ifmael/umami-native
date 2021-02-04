import React, { useState, useContext } from "react";
import { Text } from "react-native-elements";
import MenuList from "/components/Menu/MenuList";
import Modal from "react-native-modal";
import { GlobalContext } from "/context/GlobalContext";

const Menu = () => {
  const { configuration } = useContext(GlobalContext);
  const [showNoMoreOrder, setShowNoMoreOrder] = useState(!configuration?.MoreOrders?.moreOrder);
  const titleNoMoreOrders = configuration?.MoreOrders?.titleNoMoreOrders;

  return (
    <>
      <MenuList />
      <Modal
        isVisible={showNoMoreOrder}
        onBackButtonPress={() => setShowNoMoreOrder(false)}
        onBackdropPress={() => setShowNoMoreOrder(false)}
      >
        <Text
          h4
          style={{
            backgroundColor: "white",
            paddingVertical: 40,
            paddingHorizontal: 10,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          {titleNoMoreOrders}
        </Text>
      </Modal>
    </>
  );
};

export default Menu;
