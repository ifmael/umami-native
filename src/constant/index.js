import Constants from "expo-constants";
import * as Updates from "expo-updates";

// Helper  functions
const getObjectEnvironment = (server, token, mapsToken, placesToken) => ({ server, token, mapsToken, placesToken });

const getEnvironment = () => {
  let releaseChannel = Constants.manifest.extra.releaseChannel ?? Updates.releaseChannel;

  if (releaseChannel === "default")
    // since releaseChannels are undefined in dev, return your default.
    return getObjectEnvironment(
      Constants.manifest.extra.server.local,
      Constants.manifest.extra.secret.development,
      Constants.manifest.extra.mapsToken,
      Constants.manifest.extra.placesToken,
    );
  if (releaseChannel.indexOf("development") !== -1)
    // this would pick up development-v1, development-v2 ...
    return getObjectEnvironment(
      Constants.manifest.extra.server.development,
      Constants.manifest.extra.secret.development,
      Constants.manifest.extra.mapsToken,
      Constants.manifest.extra.placesToken,
    );
  if (releaseChannel.indexOf("production") !== -1)
    // this would pick up production-v1, production-v2 ...
    return getObjectEnvironment(
      Constants.manifest.extra.server.production,
      Constants.manifest.extra.secret.production,
      Constants.manifest.extra.mapsToken,
      Constants.manifest.extra.placesToken,
    );
};

// Constant
export const { server: SERVER, token: TOKEN, mapsToken: MAPS_TOKEN, placesToken: PLACES_TOKEN } = getEnvironment();

export const MAPS_URI_API = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${MAPS_TOKEN}&input=`;

export const PLACES_TYPE = [
  "administrative_area_level_1",
  "administrative_area_level_2",
  "administrative_area_level_3",
  "administrative_area_level_4",
  "administrative_area_level_5",
  "archipelago",
  "colloquial_area",
  "continent",
  "country",
  "establishment",
  "finance",
  "floor",
  "food",
  "general_contractor",
  "geocode",
  "health",
  "intersection",
  "locality",
  "natural_feature",
  "neighborhood",
  "place_of_worship",
  "plus_code",
  "point_of_interest",
  "political",
  "post_box",
  "postal_code",
  "postal_code_prefix",
  "postal_code_suffix",
  "postal_town",
  "premise",
  "room",
  "route",
  "street_address",
  "street_number",
  "sublocality",
  "sublocality_level_1",
  "sublocality_level_2",
  "sublocality_level_3",
  "sublocality_level_4",
  "sublocality_level_5",
  "subpremise",
  "town_square",
];

export const validPhone = /^[6-9]\d{8}$/;

export const shoppingCartBEComponent = {
  atHome: { __component: "contact.contact", __typename: "ComponentContactContact" },
  beverage: { __component: "shopping-cart.beverage", __typename: "ComponentShoppingCartBeverage" },
  burger: { __component: "shopping-cart.burger", __typename: "ComponentShoppingCartBurger" },
  dessert: { __component: "shopping-cart.dessert", __typename: "ComponentShoppingCartDessert" },
  inLocal: { __component: "contact.in-local", __typename: "ComponentContactInLocal" },
  menu: { __component: "shopping-cart.menu", __typename: "ComponentShoppingCartMenu" },
  salad: { __component: "shopping-cart.salad", __typename: "ComponentShoppingCartSalad" },
  side: { __component: "shopping-cart.side", __typename: "ComponentShoppingCartSide" },
  sandwich: { __component: "shopping-cart.sandwich", __typename: "ComponentShoppingCartSandwich" },
};

export const deliveryOptions = [
  { option: "home", id: 0, name: "A domicilio." },
  { option: "restaurant", id: 1, name: "En nuestro local." },
];

export const deliverySteps = [
  { options: deliveryOptions, step: 0, titleStep: "Opciones de envio" },
  { options: [], step: 1, titleStep: "Contacto" },
];

export const timeFormatFromBackend = "HH:mm:ss.SSS";
