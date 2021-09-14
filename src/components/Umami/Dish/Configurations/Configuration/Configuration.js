import React, { useContext, useEffect, useState } from "react";
import { array, string, bool } from "prop-types";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import RadioButtons from "/components/common/RadioButtons";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import ProductDetailContext from "/context/ProductDetailContext";
import useCheckErrors from "/hooks/useCheckErrors";
import styles, { stylesRNComponent } from "./Configuration.styles";
import { red, yellow } from "/styles/theme";

const UmamiDishConfiguration = ({ __typename, data, description, isRadioButton }) => {
  const { setDishConfiguration, productDetailInfo, removeError } = useContext(ProductDetailContext);
  const [isError, setIsError] = useState(false);
  const { options, setOption, selected } = useRadioButtons(data);
  useCheckErrors(
    [
      {
        type: __typename,
        setter: setIsError,
      },
    ],
    productDetailInfo
  );

  // const ExtraPriceComponent =
  //   selected && selected.price ? <Text style={{ marginLeft: 10 }}>Se añadirá {selected.price}€</Text> : null;

  useEffect(() => {
    if (!options || !__typename) return;

    if (selected) {
      const type =
        __typename === "ComponentBurgerMeats"
          ? "typeOfMeat"
          : __typename === "ComponentBurgerPointCooking"
          ? "meatPoint"
          : __typename === "ComponentSandwichBreads"
          ? "typeOfBread"
          : null;
      if (type) {
        if (isError) removeError(__typename);
        setDishConfiguration(selected, type);
      }
    }
  }, [selected, options, setDishConfiguration, __typename, removeError, isError]);

  return (
    <View style={styles.mainView}>
      <View style={styles.descriptionView}>
        {isError ? <Icon type="font-awesome-5" name="exclamation-triangle" color={yellow} /> : null}
        <Text h4 style={[stylesRNComponent.descriptionText, { color: isError ? red : "black" }]}>
          {description}
        </Text>
        {isError ? <Icon type="font-awesome-5" name="exclamation-triangle" color={yellow} /> : null}
      </View>

      {isRadioButton ? (
        <RadioButtons /*  extraInfoComponent={ExtraPriceComponent} */ options={options} setOption={setOption} />
      ) : null}
    </View>
  );
};
UmamiDishConfiguration.propTypes = {
  data: array,
  description: string,
  isRadioButton: bool,
  __typename: string,
};
export default UmamiDishConfiguration;
