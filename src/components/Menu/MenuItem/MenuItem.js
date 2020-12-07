import React from "react";
import { string, object } from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Card, Button } from "react-native-elements";
import FontText from "/components/common/FontText";
import { SERVER } from "/constant";
import styles, { stylesRNElements } from "./MenuItem.styles";

const MenuItem = ({ /* id, */ name, /*  color, */ image, slug }) => {
  const navigation = useNavigation();
  const navigateToCategory = () => {
    navigation.navigate("Product", { slug, name });
  };

  return (
    <Card>
      <Card.Title style={styles.title}>
        <FontText h2>{name}</FontText>
      </Card.Title>
      <Card.Divider />
      {image?.url ? <Card.Image source={{ uri: `${SERVER}${image.url}` }} /> : null}

      <FontText style={{ fontSize: 16, textAlign: "justify", marginTop: 15 }}>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
        texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se
        dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro
        de textos especimen.
      </FontText>
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
  // id: string,
  name: string,
  // color: string,
  image: object,
  slug: string,
};

export default MenuItem;
