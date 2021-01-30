import React from "react";
import { string, object } from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Card, Button, Text } from "react-native-elements";
import styles, { stylesRNElements } from "./MenuItem.styles";

const MenuItem = ({ /* id, */ name, /*  color, */ image, slug }) => {
  const navigation = useNavigation();
  const navigateToCategory = () => {
    navigation.navigate("Product", { slug, name });
  };

  //Comfortaa_700Bold
  //Comfortaa_500Medium
  //Comfortaa_400Regular
  //Comfortaa_300Light

  return (
    <Card>
      <Card.Title style={styles.title}>
        <Text h3>{name}</Text>
      </Card.Title>
      <Card.Divider />
      {image?.url ? <Card.Image source={{ uri: `${image.url}` }} /> : null}
      <Text style={stylesRNElements.textDescription}>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
        texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se
        dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro
        de textos especimen.
      </Text>
      <Button
        raised
        title="Ver"
        onPress={navigateToCategory}
        buttonStyle={{ ...stylesRNElements.action, marginTop: 15 }}
      />
    </Card>
  );
};
MenuItem.propTypes = {
  name: string,
  image: object,
  slug: string,
};

export default MenuItem;
