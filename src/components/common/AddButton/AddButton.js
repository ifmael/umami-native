import React from "react";
import { string, func } from "prop-types";
import { Button } from "react-native-elements";
import { bigTitleButton } from "/styles/theme";

const AddButton = ({ title, onPress }) => {
  return <Button buttonStyle={{ paddingVertical: 12 }} onPress={onPress} title={title} titleStyle={bigTitleButton} />;
};

AddButton.propTypes = {
  title: string,
  onPress: func,
};

export default AddButton;
