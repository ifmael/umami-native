import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import { GlobalContext } from "/context/GlobalContext";
import MenuItem from "../MenuItem";

const MenuList = () => {
  const { categories } = useContext(GlobalContext);

  return (
    <>
      <FlatList
        data={categories}
        renderItem={({ item }) => <MenuItem {...item} />}
        keyExFtractor={(item) => item?.id?.toString()}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 10 }}
      />
    </>
  );
};

export default MenuList;
