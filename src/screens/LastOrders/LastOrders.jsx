import React, { useState, useContext, useEffect } from "react";
import { array, string, bool, func, number } from "prop-types";
import { View, FlatList } from "react-native";
// react native elements
import { ListItem, Button, Icon, Text } from "react-native-elements";
import { GlobalContext } from "/context/GlobalContext";
import { useNavigation } from "@react-navigation/native";

// components
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";

// functions
import { groupByCategory } from "/screens/ShoppingCart/functions";

// Styles
import { white } from "/styles/theme";

import reduce from "lodash/reduce";

const OrderRow = ({ date, order, isExpanded, setRowSelected, row }) => {
  const navigation = useNavigation();
  const { setShoppingCart, categories } = useContext(GlobalContext);
  const onPressTitleHandler = () => {
    if (isExpanded) setRowSelected(-1);
    else setRowSelected(row);
  };
  const shoppingCart = groupByCategory(order, categories);

  const onPressLoadOrder = () => {
    setShoppingCart(order);
    navigation.push("ShoppingCart");
  };

  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ListItem.Title onPress={onPressTitleHandler} style={{ marginRight: 16, fontWeight: "bold" }}>
              Pedido realizado {date}
            </ListItem.Title>
            {isExpanded ? (
              <Icon name="visibility-off" onPress={onPressTitleHandler} color="rgba(0, 0, 0, 0.6)" />
            ) : (
              <Icon name="visibility" onPress={onPressTitleHandler} color="rgba(0, 0, 0, 0.6)" />
            )}
          </ListItem.Content>
        </>
      }
      isExpanded={isExpanded}
      bottomDivider
      noIcon
    >
      {isExpanded ? (
        <View
          style={{
            padding: 16,
            borderBottomColor: "rgba(0,0,0,0.8",
            borderBottomWidth: 1,
            borderTopColor: "rgba(0,0,0,0.8",
            borderTopWidth: 1,
          }}
        >
          <ShoppingCartList shoppingCartByCategory={shoppingCart} showDeleteIcon={false} />
          <Button title="Cargar pedido" onPress={onPressLoadOrder} />
        </View>
      ) : null}
    </ListItem.Accordion>
  );
};
OrderRow.propTypes = {
  date: string,
  order: array,
  isExpanded: bool,
  row: number,
  setRowSelected: func,
};

const LastOrders = () => {
  const [rowSelected, setRowSelected] = useState(-1);
  const navigation = useNavigation();
  const { lastOrdersStorage } = useContext(GlobalContext);

  useEffect(() => {
    if (!lastOrdersStorage) navigation.navigate("HomeTab", { screen: "Home" });
  }, [navigation, lastOrdersStorage]);

  const orders = reduce(lastOrdersStorage, (acc, order) => [order, ...acc], []);

  return (
    <View style={{ backgroundColor: white, flex: 1 }}>
      {!lastOrdersStorage ? (
        <Text> Redireccionando a la pantalla principal</Text>
      ) : (
        <FlatList
          data={orders.reverse()}
          renderItem={({ item, index }) => (
            <OrderRow {...item} isExpanded={rowSelected === index} row={index} setRowSelected={setRowSelected} />
          )}
          keyExtractor={(_, index) => index}
        />
      )}
    </View>
  );
};

export default LastOrders;
