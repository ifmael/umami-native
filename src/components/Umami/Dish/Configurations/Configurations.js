import React from "react";
import { array } from "prop-types";
import { View, FlatList } from "react-native";
import UmamiDishConfiguration from "./Configuration";
import { sortAsc } from "/utils/functions";
import { destructComponentOptions } from "../../utils/functions";

const UmamiDishConfigurations = ({ configurations }) => {
  const allComponents = destructComponentOptions(configurations);
  const sortedConfigurations = allComponents.sort(sortAsc);

  return (
    <View>
      <FlatList
        data={sortedConfigurations}
        renderItem={({ item }) => <UmamiDishConfiguration {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

UmamiDishConfigurations.propTypes = {
  configurations: array,
};
export default UmamiDishConfigurations;
