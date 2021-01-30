import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Button, Text } from "react-native-elements";
import { string, object } from "prop-types";
import { imageViewShadowWrapper } from "/styles/theme";
import styles, { stylesRNElements } from "./MenuItem.styles";

const MenuItem = ({ name, image, slug }) => {
  const navigation = useNavigation();
  const navigateToCategory = () => {
    navigation.navigate("Product", { slug, name });
  };

  return (
    <Card containerStyle={stylesRNElements.containerStyle}>
      <Card.Title style={styles.title}>
        <Text h3>{name}</Text>
      </Card.Title>
      <Card.Divider />
      {image?.url ? (
        <View style={imageViewShadowWrapper}>
          <Card.Image source={{ uri: `${image.url}` }} style={{ height: 300 }} />
        </View>
      ) : null}

      <Text style={stylesRNElements.textDescription}>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
        texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se
        dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro
        de textos especimen.
      </Text>
      <Button title="Ver" onPress={navigateToCategory} buttonStyle={{ marginTop: 15 }} />
    </Card>
  );
};
MenuItem.propTypes = {
  name: string,
  image: object,
  slug: string,
};

export default MenuItem;
