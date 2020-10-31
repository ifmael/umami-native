import React from "react";
import { View, Text, FlatList } from "react-native";
import UmamiDishConfiguration from "./Configuration";

const UmamiDishConfigurations = ({ configuration, title }) => {
  return (
    <View>
      <Text>{title}</Text>
      <FlatList
        data={configuration}
        renderItem={({ item }) => <UmamiDishConfiguration {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UmamiDishConfigurations;
