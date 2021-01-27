import React, { useMemo, useState } from "react";
import { Text } from "react-native-elements";
import { validateContactInfo } from "/utils/functions";
import { validPhone } from "/constant";

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
  return <Text>{data.description ? data.description : data.formatted_address}</Text>;
};

const useDeliveryAtHome = () => {
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

  const isPossibleAddContact = useMemo(() => {
    const { isLocalityValid, isPhoneValid, isStreetValid } = validateContactInfo({
      locality,
      phone,
      street,
    });

    return isLocalityValid && isPhoneValid && isStreetValid;
  }, [locality, phone, street]);

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
    try {
      const { isLocalityValid, isPhoneValid, isStreetValid } = validateContactInfo({
        locality,
        phone,
        street,
      });

      if (isPossibleAddContact) {
        return true;
      } else {
        // Show error
        if (!isLocalityValid) setLocalityError(true);
        if (!isPhoneValid) {
          setPhoneInputPristine(false);
          setPhoneError(true);
        }
        if (!isStreetValid) {
          setStreetInputPristine(false);
          setStreetError(true);
        }
        return false;
      }
    } catch (error) {
      console.log(error);
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
      isPossibleAddContact,
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

export default useDeliveryAtHome;
