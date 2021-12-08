import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Text } from "react-native-elements";
import { string, object } from "prop-types";
import { imageViewShadowWrapper } from "/styles/theme";
import { stylesRNElements } from "./MenuItem.styles";
import images from "/assets/images";

const MenuItem = ({ name, image, slug, imageAsset }) => {
  const navigation = useNavigation();
  const navigateToCategory = () => {
    navigation.navigate("Product", { slug, name });
  };

  const hasImage = (!!imageAsset && images.menu[imageAsset]) || image.url;
  const source = hasImage
    ? !!imageAsset && images.menu[imageAsset]
      ? images.menu[imageAsset]
      : { uri: image.url }
    : null;

  return (
    <Card containerStyle={stylesRNElements.containerStyle}>
      <TouchableOpacity onPress={navigateToCategory} activeOpacity={1}>
        {hasImage ? (
          <View style={imageViewShadowWrapper}>
            <Card.Image source={source} style={{ height: 150 }} />
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
  imageAsset: string,
};

export default MenuItem;
