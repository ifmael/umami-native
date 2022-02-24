import React from "react";
import { array, func, bool } from "prop-types";
import { View } from "react-native";
import SwitchItem from "../SwitchItem";

const SwitchList = ({ list, setItem, showPrice }) => {
  return (
    <View>
      {list
        ? list.map((item) => <SwitchItem key={item.id} {...item} setState={setItem} showPrice={showPrice} />)
        : null}
    </View>
  );
};

SwitchList.propTypes = {
  list: array,
  setItem: func,
  showPrice: bool,
};

export default SwitchList;
