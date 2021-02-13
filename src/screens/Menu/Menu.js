import React, { useState, useContext } from "react";
import { Text } from "react-native-elements";
import MenuList from "/components/Menu/MenuList";
import Modal from "react-native-modal";
import { isOpenToday } from "/utils/functions";
import { GlobalContext } from "/context/GlobalContext";
import { stylesRNEComponents } from "./Menu.styles";

const Menu = () => {
  const { configuration } = useContext(GlobalContext);
  const [showNoMoreOrder, setShowNoMoreOrder] = useState(!configuration?.moreOrders?.moreOrder);
  // Close
  const isClose = configuration?.close?.isClose;
  const isCloseFromSchedule = !isOpenToday(configuration?.schedule);
  const [showCloseToday, setShowCloseToday] = useState(isCloseFromSchedule || isClose);
  // Title
  const titleNoMoreOrders = configuration?.moreOrders?.titleNoMoreOrders;
  const titleCloseToday = configuration?.close?.title;

  console.log(`isClose: ${isClose}, isCloseFromSchedule: ${isCloseFromSchedule},showNoMoreOrder: ${showNoMoreOrder} `);
  return (
    <>
      <MenuList />
      <Modal
        isVisible={showNoMoreOrder && !isCloseFromSchedule && !isClose}
        onBackButtonPress={() => setShowNoMoreOrder(false)}
        onBackdropPress={() => setShowNoMoreOrder(false)}
      >
        <Text h4 style={stylesRNEComponents.textModal}>
          {titleNoMoreOrders}
        </Text>
      </Modal>
      <Modal
        isVisible={showCloseToday}
        onBackButtonPress={() => setShowCloseToday(false)}
        onBackdropPress={() => setShowCloseToday(false)}
      >
        <Text h4 style={stylesRNEComponents.textModal}>
          {titleCloseToday}
        </Text>
      </Modal>
    </>
  );
};

export default Menu;
