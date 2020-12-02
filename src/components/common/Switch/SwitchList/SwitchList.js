import React from "react";
import { array, func } from "prop-types";
import { View } from "react-native";
import SwitchItem from "../SwitchItem";

const SwitchList = ({ list, setItem }) => {
  return <View>{list ? list.map((item) => <SwitchItem key={item.id} {...item} setState={setItem} />) : null}</View>;
};

SwitchList.propTypes = {
  list: array,
  setItem: func,
};

export default SwitchList;
