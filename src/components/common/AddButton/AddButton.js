import React from "react";
import { bool, string, func } from "prop-types";
import { Button } from "react-native-elements";
import { bigTitleButton } from "/styles/theme";

const AddButton = ({ disabled, loading, onPress, title }) => {
  return (
    <Button
      buttonStyle={{ paddingVertical: 12 }}
      disabled={disabled}
      loading={loading}
      onPress={onPress}
      title={title}
      titleStyle={bigTitleButton}
    />
  );
};

AddButton.propTypes = {
  disabled: bool,
  loading: bool,
  onPress: func,
  title: string,
};

export default AddButton;
