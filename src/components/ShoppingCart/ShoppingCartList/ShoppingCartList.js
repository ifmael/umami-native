import React from "react";
import { array } from "prop-types";
import { View } from "react-native";
import { Card } from "react-native-elements";
import FontText from "/components/common/FontText";

import ShoppingCartItem from "/components/ShoppingCart/ShoppingCartItem";

export default function ShoppingCartList({ shoppingCartByCategory }) {
  return (
    <View>
      {shoppingCartByCategory?.map((shoppingCartCategory) => {
        const { category, data } = shoppingCartCategory;
        return (
          <Card
            key={category}
            containerStyle={{
              padding: 0,
              borderWidth: 0,
              boxShadow: "none",
              margin: 0,
              marginTop: 16,
              elevation: 0,
              shadowOpacity: 0,
            }}
            wrapperStyle={{ borderWidth: 0 }}
          >
            <Card.Title style={{ textTransform: "capitalize" }}>
              <FontText h3>{category}</FontText>
            </Card.Title>
            <Card.Divider style={{ marginBottom: 0 }} />
            {data?.map((shoppingItem) => {
              return <ShoppingCartItem key={shoppingItem?.id?.toString()} {...shoppingItem} {...category} />;
            })}
          </Card>
        );
      })}
    </View>
  );
}

ShoppingCartList.propTypes = {
  shoppingCartByCategory: array,
};
