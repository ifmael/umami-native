import React from "react";
import { View, Text, FlatList } from "react-native";

const ProductDetail = ({ route }) => {
  const { name, description, price, ingredients } = route.params;

  return (
    <View>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{price}</Text>
      <FlatList
        data={ingredients}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProductDetail;
