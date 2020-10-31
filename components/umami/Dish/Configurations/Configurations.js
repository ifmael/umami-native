import React from "react";
import { View, Text, FlatList } from "react-native";
import UmamiDishConfiguration from "./Configuration";
import { sortAsc } from "../../../../utils/functions";

const UmamiDishConfigurations = ({ configurations, title }) => {
  const sortedConfigurations = configurations.slice().sort(sortAsc);

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

export default UmamiDishConfigurations;
