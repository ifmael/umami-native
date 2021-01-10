import { validPhone } from "/constant";

export const sortDesc = (a, b) => b.order - a.order;
export const sortAsc = (a, b) => a.order - b.order;

export const guidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const validateContactInfo = (contactInfo) => {
  try {
    // Valide mandatory fields
    const { phone, street, locality } = contactInfo;
    const isLocalityValid = locality?.length > 0 ? true : false;
    const isPhoneValid = validPhone.test(phone) ? true : false;
    const isStreetValid = street?.length > 0 ? true : false;
    const isValidContactInfo = isLocalityValid && isPhoneValid && isStreetValid;

    return { isLocalityValid, isPhoneValid, isStreetValid, isValid: isValidContactInfo };
  } catch (error) {
    console.log(error);
  }
};
