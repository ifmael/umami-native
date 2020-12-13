import React from "react";
import { string } from "prop-types";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "/styles/colors";

const AddButton = ({ title }) => {
  return (
    <Button
      icon={<Icon name="plus" size={18} color="white" style={{ marginLeft: 20 }} />}
      titleStyle={{ fontSize: 20, fontFamily: "Confortaa", fontWeight: "bold" }}
      title={title}
      iconRight
      buttonStyle={{ paddingVertical: 12, backgroundColor: COLORS.addButton }}
    />
  );
};

AddButton.propTypes = {
  title: string,
};

export default AddButton;
