import { useState } from "react";
import { validPhone } from "/constant";

const usePickUpInLocal = () => {
  // name
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameInputPristine, setNameInputPristine] = useState(true);

  // phone
  const [phone, setPhone] = useState(null);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneInputPristine, setPhoneInputPristine] = useState(true);

  // time
  const [time, setTime] = useState(null);

  // const isValidPickUpInLocal = useMemo(() => {
  //   return validPhone.test(phone) && name.length > 0;
  // }, [name, phone]);

  const isValidPickUpInLocal = validPhone.test(phone) && name.length > 0 && time;

  // name handlers
  const onChangeTextName = (name) => {
    setName(name);

    if (!nameInputPristine) setNameError(name.length === 0 ? true : false);
  };
  const onBlurName = () => {
    if (nameInputPristine) setNameInputPristine(true);

    setNameError(name.length === 0 ? true : false);
  };

  // phone handlers
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

  const onValuePickerChange = (option) => {
    setTime(option?.time);
  };

  return [
    { isValidPickUpInLocal, name, nameError, phone, phoneError, time },
    {
      onBlurName,
      onBlurPhone,
      onChangeTextName,
      onChangeTextPhone,
      onValuePickerChange,
      setName,
      setNameError,
      setPhone,
      setPhoneError,
      setTime,
    },
  ];
};

export default usePickUpInLocal;
