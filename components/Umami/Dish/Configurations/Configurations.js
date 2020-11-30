import React from "react";
import { array, string } from "prop-types";
import { View, Text, FlatList } from "react-native";
import UmamiDishConfiguration from "./Configuration";
import { sortAsc } from "../../../../utils/functions";
import { destructComponentOptions } from "../../utils/functions";

const UmamiDishConfigurations = ({ configurations, title }) => {
  const allComponents = destructComponentOptions(configurations);
  const sortedConfigurations = allComponents.sort(sortAsc);

  return (
    <View>
      <Text>{title}</Text>
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
  title: string,
};
export default UmamiDishConfigurations;
