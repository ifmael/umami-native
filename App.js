import React from "react";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import ContextProvider from "./utils/context/GlobalContext";
import Home from "./screens/Home";
import Menu from "./screens/Menu";
import ShoppingCart from "./screens/ShoppingCart";
import Product from "./screens/Product";
import ProductDetail from "./screens/ProductDetail";

import TabBar from "./components/TabBar";
import logo from "./assets/umami.png";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let component;

      if (route.name === "Home") {
        component = (
          <FontAwesome
            //name={focused ? "hamburger" : "hamburger"}
            name="hamburger"
            size={size}
            color={color}
          />
        );
      } else if (route.name === "Menu") {
        component = (
          <FontAwesome name="align-justify" size={size} color={color} />
        );
      } else if (route.name === "ShoppingCart") {
        component = (
          <FontAwesome name="shopping-cart" size={size} color={color} />
        );
      }

      // You can return any component that you like here!
      return component;
    },
  });

  const MenuStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={screenOptions}
            lazy="true"
            // tabBar={TabBar}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{ title: "Umami" }}
            />
            <Tab.Screen name="Menu" component={MenuStack} />
            <Tab.Screen
              name="ShoppingCart"
              component={ShoppingCart}
              options={{ tabBarBadge: 3, title: "Pedido" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent("MyApplication", () => App);

export default App;
