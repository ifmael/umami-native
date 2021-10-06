import { useEffect, useState } from "react";

const useCustomiseSideErrors = (
  selectedIngredientRadio,
  selectedConfigurationsOption,
  customiseSideIngredients,
  isRadioButtonConfigurations,
  isRadioButtonIngredients
) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!hasError) return;

    if (!isRadioButtonConfigurations && isRadioButtonIngredients && !customiseSideIngredients) {
      setHasError(!selectedIngredientRadio);
    } else if (isRadioButtonConfigurations && isRadioButtonIngredients && !customiseSideIngredients) {
      setHasError(!(selectedIngredientRadio && selectedConfigurationsOption));
    }
  }, [
    selectedIngredientRadio,
    selectedConfigurationsOption,
    customiseSideIngredients,
    isRadioButtonConfigurations,
    isRadioButtonIngredients,
    hasError,
  ]);

  return [hasError, setHasError];
};

export default useCustomiseSideErrors;
