import React, { useState } from "react";
import { Button } from "react-native";
import MenuList from "/components/Menu/MenuList";
import DeliveryOptions from "/components/DeliveryOptions";

const Menu = () => {
  const [showDeliveryOptions, setShowDEliveryOptions] = useState(false);
  const toggleModal = () => {
    setShowDEliveryOptions(!showDeliveryOptions);
  };

  return (
    <>
      <Button title="Show modal" onPress={toggleModal} />
      <MenuList />
      <DeliveryOptions showComponent={showDeliveryOptions} showModalHandler={setShowDEliveryOptions} />
    </>
  );
};

export default Menu;
