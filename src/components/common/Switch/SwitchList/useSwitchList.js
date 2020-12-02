import { useState } from "react";

const useSwitchList = (data, defaultValue = true) => {
  const [items, setItems] = useState(
    data?.map(
      ({ id, name }) =>
        ({
          id,
          name,
          isSelected: defaultValue,
        } || [])
    )
  );

  const setItem = (id) => {
    setItems((currentItems) => {
      return currentItems.map((item) => (item.id !== id ? item : { ...item, isSelected: !item.isSelected }));
    });
  };
  // TODO change for array
  return { items, setItem };
};

export default useSwitchList;
