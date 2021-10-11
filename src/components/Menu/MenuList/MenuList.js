import React, { useContext } from "react";
import { View } from "react-native";
import { GlobalContext } from "/context/GlobalContext";
import MenuItem from "../MenuItem";

import { FlatGrid } from "react-native-super-grid";

const MenuList = () => {
  const { categories } = useContext(GlobalContext);

  return (
    <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
      <FlatGrid
        itemDimension={130}
        data={categories}
        renderItem={({ item }) => <MenuItem {...item} />}
        keyExFtractor={(item) => item?.id?.toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        spacing={10}
      />
    </View>
  );
};

export default MenuList;
