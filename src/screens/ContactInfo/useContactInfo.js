import React, { useState } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import FontText from "/components/common/FontText";
// import { PLACES_TYPE } from "/constant";

// const allowedPostalCodes = ["18320", "18329", "18101"];
const localityOptions = [
  { name: "Santa Fe", zip: "18320" },
  { name: "Belicena", zip: "18101" },
  { name: "El Jau", zip: "18329" },
];
const findLocalityFromZip = (zipCode) => {
  const locationFound = localityOptions.find(({ zip }) => zip === zipCode);

  return locationFound.name ? locationFound.name : "";
};

const renderRow = (data) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <Icon name="map-marker-alt" type="font-awesome-5" style={{ marginRight: 8 }} />
      <FontText>{data.description ? data.description : data.formatted_address}</FontText>
    </View>
  );
};

const validPhone = /^[6-9]\d{8}/;

const useContactInfo = () => {
  const [block, setBlock] = useState("");
  const [flat, setFlat] = useState("");
  const [number, setNumber] = useState("");

  // locality
  const [locality, setLocality] = useState("");
  const [localityError, setLocalityError] = useState(false);

  // phone
  const [phone, setPhone] = useState();
  const [phoneError, setPhoneError] = useState(false);
  const [phoneInputPristine, setPhoneInputPristine] = useState(true);

  // street
  const [street, setStreet] = useState("");
  const [streetError, setStreetError] = useState(false);
  const [streetInputPristine, setStreetInputPristine] = useState(true);

  // BottomSbeet
  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);

  const resetAddress = () => {
    setBlock();
    setLocality();
    setFlat();
    setNumber();
    // setPostalCode();
    setStreet();
  };

  const onPressAddContactInfo = () => {
    // Check fields
    const isPhoneValid = validPhone.test(phone);
    const isStreetValid = street?.length > 0 ? true : false;
    const isLocalityValid = locality?.length > 0 ? true : false;
    const isPossibleAddContact = isPhoneValid && isStreetValid && isLocalityValid;

    if (isPossibleAddContact) {
      // Add to the context
    } else {
      // Show error
      if (!isLocalityValid) setLocalityError(true);
      if (!isPhoneValid) setPhoneError(true);
      if (!isStreetValid) setStreetError(true);
    }
  };

  const onPressAddress = (googlePlaceData, GooglePlaceDetail = null) => {
    try {
      resetAddress();
      const { address_components } = GooglePlaceDetail;
      const places = ["street_number", "route", "postal_code"];

      address_components?.forEach(({ long_name, types }) => {
        const placeFound = types?.find((place) => places.includes(place));

        switch (placeFound) {
          case "street_number":
            setNumber(long_name);
            break;
          case "route":
            setStreet(long_name);
            setStreetError(false);
            break;
          case "postal_code":
            setLocality(findLocalityFromZip(long_name));
            setLocalityError(false);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectLocality = (locality) => {
    setIsVisibleBottomSheet(false);
    setLocalityError(false);
    setLocality(locality);
  };

  const onChangeTextPhone = (phoneInput) => {
    setPhone(phoneInput);
    const valid = validPhone.test(phoneInput);

    if (!phoneInputPristine) setPhoneError(!valid);
  };

  const onBlurPhone = () => {
    if (phoneInputPristine) setPhoneInputPristine(false);
    const valid = validPhone.test(phone);

    setPhoneError(!valid);
  };

  const onChangeTextStreet = (street) => {
    setStreet(street);

    if (!streetInputPristine) setStreetError(street.length === 0 ? true : false);
  };

  const onBlurStreet = () => {
    if (streetInputPristine) setStreetInputPristine(false);

    setStreetError(street.length === 0 ? true : false);
  };

  return [
    {
      block,
      localityError,
      locality,
      flat,
      isVisibleBottomSheet,
      localityOptions,
      number,
      phone,
      phoneError,
      street,
      streetError,
    },
    {
      onBlurPhone,
      onBlurStreet,
      onChangeTextPhone,
      onChangeTextStreet,
      onPressAddContactInfo,
      onPressAddress,
      onSelectLocality,
      setBlock,
      setFlat,
      setIsVisibleBottomSheet,
      setNumber,
    },
    { renderRow },
  ];
};

export default useContactInfo;
