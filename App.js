import React from "react";
import { AppRegistry } from "react-native";
import { ThemeProvider, Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import ContextProvider from "/context/GlobalContext";
import { Home, Menu, Product, ProductDetail, ShoppingCart } from "/screens";
import { SERVER, TOKEN } from "/constant";
import ShoppingCartTopMenu from "/components/Bar/ShoppingCartTopMenu";
import theme, { menuStackStyles, brown, defaultFont } from "/styles/theme";
import Constants from "expo-constants";

import * as Sentry from "sentry-expo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

Sentry.init({
  dsn: "https://0124ba100ecf46bfa7a7efc9994b04a7@o555172.ingest.sentry.io/5684692",
  enableInExpoDevelopment: true,
  release: `umami-native@${Constants.manifest.version}-${Constants.manifest.releaseId}`,
  environment: Constants.manifest?.releaseChannel || "local",
  debug: Constants.manifest?.releaseChannel ? false : true,
});

const authLink = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: TOKEN ? `Bearer ${TOKEN}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${SERVER}/graphql`,
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const screenOptionsStack = {
  headerShown: true,
  headerTitleStyle: menuStackStyles.headerTitleStyle,
  cardStyle: menuStackStyles.cardStyle,
  headerBackTitleVisible: false,
  headerRight: ShoppingCartTopMenu,
  headerTintColor: menuStackStyles.headerTintColor,
  headerTitleAlign: "center",
};

const screenOptionsTabBar = ({ route }) => ({
  tabBarIcon: ({ /* focused, */ color, size }) => {
    let component;

    if (route.name === "Home") {
      component = <Icon color={color} name="hamburger" size={size} type="font-awesome-5" />;
    } else if (route.name === "Menu") {
      component = <Icon color={color} name="align-justify" size={size} type="font-awesome-5" />;
    }

    return component;
  },
  tabBarStyle: [
    {
      display: "flex",
    },
    null,
  ],
  tabBarActiveTintColor: brown,
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: defaultFont,
  },
});

const productHeaderOption = ({ route }) => {
  const { name } = route.params;

  return { ...screenOptionsStack, title: name };
};

const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStack}>
      <Stack.Screen name="Menu Inside" component={Menu} options={{ title: "Nuestro menú" }} />
      <Stack.Screen name="Product" component={Product} options={productHeaderOption} />
    </Stack.Navigator>
  );
};

const MenuTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptionsTabBar} lazy="true">
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Menu" component={MenuStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="HomeTab" component={MenuTabs} />
              <Stack.Screen name="ProductDetail" component={ProductDetail} options={productHeaderOption} />
              <Stack.Screen
                name="ShoppingCart"
                component={ShoppingCart}
                options={{
                  title: "Mi pedido",
                  headerBackTitleVisible: false,
                  headerShown: true,
                  headerTintColor: menuStackStyles.headerTintColor,
                  headerTitleStyle: menuStackStyles.headerTitleStyle,
                  headerTitleAlign: "center",
                }}
              />
            </Stack.Navigator>
          </ThemeProvider>
        </NavigationContainer>
      </ContextProvider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent("MyApplication", () => App);

export default App;
