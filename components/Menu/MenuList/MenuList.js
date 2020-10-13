import React, { useContext } from "react";
import { FlatList } from "react-native";
import { GlobalContext } from "../../../utils/context/GlobalContext";
import MenuItem from "../MenuItem";

const MenuList = () => {
  const { categories } = useContext(GlobalContext);

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <MenuItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MenuList;
