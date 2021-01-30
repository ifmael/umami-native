import React from "react";
import { string, func } from "prop-types";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "/styles/colors";

const AddButton = ({ title, onPress }) => {
  return (
    <Button
      buttonStyle={{ paddingVertical: 12, backgroundColor: COLORS.addButton }}
      icon={<Icon name="plus" size={18} color="white" style={{ marginLeft: 20 }} />}
      iconRight
      onPress={onPress}
      title={title}
      titleStyle={{ fontSize: 20 }}
    />
  );
};

AddButton.propTypes = {
  title: string,
  onPress: func,
};

export default AddButton;
