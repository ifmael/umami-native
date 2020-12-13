import React from "react";
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ContextProvider from "/context/GlobalContext";
import { Home, Menu, Product, ProductDetail, ShoppingCart } from "/screens";
import { SERVER } from "/constant";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import ShoppingCartTopMenu from "/components/Bar/ShoppingCartTopMenu";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `${SERVER}/graphql`,
  cache: new InMemoryCache(),
});

const headerOptions = {
  headerShown: true,
  headerTitleStyle: {
    textAlign: "center",
  },
  headerRight: ShoppingCartTopMenu,
};

const App = () => {
  const screenOptionsTabBar = ({ route }) => ({
    tabBarIcon: ({ /* focused, */ color, size }) => {
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
        component = <FontAwesome name="align-justify" size={size} color={color} />;
      } else if (route.name === "ShoppingCart") {
        component = <FontAwesome name="shopping-cart" size={size} color={color} />;
      }

      // You can return any component that you like here!
      return component;
    },
  });

  const productHeaderOption = ({ route }) => {
    const { name } = route.params;

    return { ...headerOptions, title: name };
  };

  const MenuStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} options={{ ...headerOptions, title: "Nuestro menú" }} />
        <Stack.Screen name="Product" component={Product} options={productHeaderOption} />
      </Stack.Navigator>
    );
  };

  const MenuTabs = () => {
    return (
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptionsTabBar} lazy="true">
        <Tab.Screen name="Home" component={Home} options={{ title: "Umami" }} />
        <Tab.Screen name="Menu" component={MenuStack} />
        <Tab.Screen name="ShoppingCart" component={ShoppingCart} options={{ tabBarBadge: 3, title: "Pedido" }} />
      </Tab.Navigator>
    );
  };

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="homeTab" component={MenuTabs} />

            <Stack.Screen name="ProductDetail" component={ProductDetail} options={productHeaderOption} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent("MyApplication", () => App);

export default App;
