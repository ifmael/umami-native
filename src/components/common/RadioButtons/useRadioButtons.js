import { useCallback, useState } from "react";

const useRadioButtons = (data, initialState) => {
  const [options, setOptions] = useState(
    data?.map((properties) => ({
      ...properties,
      isSelected: initialState,
    })) || []
  );
  const [selected, setSelected] = useState();

  const setOption = useCallback((id) => {
    setOptions((currentOptions) => {
      return currentOptions.map((item) => {
        const newItem = item.id !== id ? { ...item, isSelected: false } : { ...item, isSelected: !item.isEnabled };

        if (item.id === id) setSelected(newItem);

        return newItem;
      });
    });
  }, []);

  // return an array
  return { options, setOptions, setOption, selected, setSelected };
};

export default useRadioButtons;
