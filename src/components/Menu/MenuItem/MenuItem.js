import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Button, Text } from "react-native-elements";
import { string, object } from "prop-types";
import { imageViewShadowWrapper } from "/styles/theme";
import { bigTitleButton } from "/styles/theme";
import { stylesRNElements } from "./MenuItem.styles";

const MenuItem = ({ name, image, slug }) => {
  const navigation = useNavigation();
  const navigateToCategory = () => {
    navigation.navigate("Product", { slug, name });
  };

  return (
    <Card containerStyle={stylesRNElements.containerStyle}>
      <Card.Title>
        <Text h3 numberOfLines={1} adjustsFontSizeToFit>
          {name}
        </Text>
      </Card.Title>
      <Card.Divider />
      {image?.url ? (
        <View style={imageViewShadowWrapper}>
          <Card.Image source={{ uri: `${image.url}` }} style={{ height: 300 }} />
        </View>
      ) : null}

      <Button title="Ver" onPress={navigateToCategory} buttonStyle={{ marginTop: 15 }} titleStyle={bigTitleButton} />
    </Card>
  );
};
MenuItem.propTypes = {
  name: string,
  image: object,
  slug: string,
};

export default MenuItem;
