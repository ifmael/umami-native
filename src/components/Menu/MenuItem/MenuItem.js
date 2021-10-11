import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Text } from "react-native-elements";
import { string, object } from "prop-types";
import { imageViewShadowWrapper } from "/styles/theme";
import { stylesRNElements } from "./MenuItem.styles";

const MenuItem = ({ name, image, slug }) => {
  const navigation = useNavigation();
  const navigateToCategory = () => {
    navigation.navigate("Product", { slug, name });
  };

  return (
    <Card containerStyle={stylesRNElements.containerStyle}>
      <TouchableOpacity onPress={navigateToCategory} activeOpacity={1}>
        {image?.url ? (
          <View style={imageViewShadowWrapper}>
            <Card.Image source={{ uri: `${image.url}` }} style={{ height: 150 }} />
          </View>
        ) : null}
        <Card.Title>
          <Text numberOfLines={1} adjustsFontSizeToFit>
            {name}
          </Text>
        </Card.Title>
      </TouchableOpacity>
    </Card>
  );
};
MenuItem.propTypes = {
  name: string,
  image: object,
  slug: string,
};

export default MenuItem;
