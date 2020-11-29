import React from "react";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Button, Icon } from "react-native-elements";
import { SERVER } from "../../../constant";
import COLORS from "../../../styles/colors";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat-Regular",
    fontSize: 24,
  },
  description: {
    marginBottom: 10,
    fontFamily: "Montserrat-Regular",
  },
  action: {
    backgroundColor: COLORS.defaultButton,
  },
});

const MenuItem = ({ id, name, color, image, slug }) => {
  const navigation = useNavigation();

  const navigateToCategory = () => {
    navigation.navigate("Product", { slug });
  };
  debugger;
  return (
    <Card>
      <Card.Title style={styles.title}>{name}</Card.Title>
      <Card.Divider />
      {image?.url ? (
        <Card.Image source={{ uri: `${SERVER}${image.url}` }} />
      ) : null}

      <Text style={styles.description}>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y
        archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
        las industrias desde el año 1500, cuando un impresor (N. del T. persona
        que se dedica a la imprenta) desconocido usó una galería de textos y los
        mezcló de tal manera que logró hacer un libro de textos especimen.
      </Text>
      <Button
        raised
        title="Ver"
        onPress={navigateToCategory}
        buttonStyle={styles.action}
      />
    </Card>
  );
};

export default MenuItem;
