import React from "react";
import { array, bool } from "prop-types";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import ShoppingCartItem from "/components/ShoppingCart/ShoppingCartItem";
import { stylesRNEComponents } from "./ShoppingCartList.styles";

export default function ShoppingCartList({ shoppingCartByCategory, showDeleteIcon = true }) {
  return (
    <View>
      {shoppingCartByCategory?.map((shoppingCartCategory) => {
        const { category, data } = shoppingCartCategory;

        return (
          <Card key={category} containerStyle={stylesRNEComponents.card} wrapperStyle={{ borderWidth: 0 }}>
            <Card.Title style={{ textTransform: "capitalize" }}>
              <Text h3>{category}</Text>
            </Card.Title>
            <Card.Divider style={{ marginBottom: 0 }} />
            {data?.map((shoppingItem) => {
              return (
                <ShoppingCartItem
                  key={shoppingItem?.id?.toString()}
                  showDeleteIcon={showDeleteIcon}
                  {...shoppingItem}
                  {...category}
                />
              );
            })}
          </Card>
        );
      })}
    </View>
  );
}

ShoppingCartList.propTypes = {
  shoppingCartByCategory: array,
  showDeleteIcon: bool,
};
