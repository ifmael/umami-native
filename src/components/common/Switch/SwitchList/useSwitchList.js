import { useState } from "react";

const initialValue = (data, defaultValue) => {
  return data?.map(
    ({ id, name }) =>
      ({
        id,
        name,
        isSelected: defaultValue,
      } || [])
  );
};

const useSwitchList = (data, defaultValue = true) => {
  const [items, setItems] = useState(initialValue(data, defaultValue));

  const setItem = (id) => {
    setItems((currentItems) => {
      return currentItems.map((item) => (item.id !== id ? item : { ...item, isSelected: !item.isSelected }));
    });
  };

  const reset = () => {
    setItems(initialValue(data, defaultValue));
  };

  return [items, setItem, reset];
};

export default useSwitchList;
