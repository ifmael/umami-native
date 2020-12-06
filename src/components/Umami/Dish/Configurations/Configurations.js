import React from "react";
import { array } from "prop-types";
import { View } from "react-native";
import UmamiDishConfiguration from "./Configuration";
import { sortAsc } from "/utils/functions";
import { destructComponentOptions } from "../../utils/functions";

const UmamiDishConfigurations = ({ configurations }) => {
  const allComponents = destructComponentOptions(configurations);
  const sortedConfigurations = allComponents.sort(sortAsc);

  return (
    <View>
      {sortedConfigurations?.map((item) => {
        return <UmamiDishConfiguration key={item.id} {...item} />;
      })}
    </View>
  );
};

UmamiDishConfigurations.propTypes = {
  configurations: array,
};
export default UmamiDishConfigurations;
