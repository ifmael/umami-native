import { useContext, useState } from "react";
import { GlobalContext } from "/context/GlobalContext";
import useDeliveryAtHome from "./DeliveryAtHome/useDeliveryAtHome";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";
import usePickUpInLocal from "./PickUpInLocal/usePickupInLocal";
import { deliveryOptions } from "/constant";

const useDeliveryOptions = (showModalHandler) => {
  const { setContactInfo, setDeliveryOption } = useContext(GlobalContext);
  const [parentWidth, setParentWidth] = useState(0);
  const { options, setOption, selected } = useRadioButtons(deliveryOptions);
  const [deliveryAtHomeSelectors, deliveryAthomeHandlers, deliveryAtHomeUI] = useDeliveryAtHome();
  const [pickUpInLocalSelectors, pickUpInLocalHandlers] = usePickUpInLocal();

  const disableNextButton = (currentStep) => {
    switch (currentStep) {
      case 0:
        return !selected;
      case 1: {
        return selected?.option === "home"
          ? !deliveryAtHomeSelectors.isPossibleAddContact
          : selected?.option === "restaurant"
          ? !pickUpInLocalSelectors.isValidPickUpInLocal
          : true;
      }
      default:
        break;
    }
  };

  const getPrevName = (currentStep) => {
    return currentStep === 0 ? "Cancelar" : currentStep === 1 ? "Atrás" : "";
  };

  const getNextName = (currentStep) => {
    return currentStep === 0 ? "Siguiente" : currentStep === 1 ? "Aceptar" : "";
  };

  const onLayout = (nativeElement) => {
    setParentWidth(nativeElement?.nativeEvent?.layout?.width ? nativeElement?.nativeEvent?.layout?.width : null);
  };

  const onPrev = (currentStep, wizardRef) => {
    if (currentStep === 0) {
      showModalHandler(false);
      //Navigate to back screen
    } else if (currentStep === 1) {
      wizardRef?.current?.prev();
    }
  };

  const onNext = (currentStep, wizardRef) => {
    if (currentStep === 0) {
      wizardRef?.current?.next();
    } else if (currentStep === 1) {
      if (deliveryAtHomeSelectors.isPossibleAddContact && selected?.option === "home") {
        setDeliveryOption(selected?.name, selected?.option);
        setContactInfo({
          block: deliveryAtHomeSelectors.block,
          flat: deliveryAtHomeSelectors.flat,
          number: deliveryAtHomeSelectors.number,
          locality: deliveryAtHomeSelectors.locality,
          phone: deliveryAtHomeSelectors.phone,
          street: deliveryAtHomeSelectors.street,
          time: deliveryAtHomeSelectors.time,
        });
      } else if (pickUpInLocalSelectors.isValidPickUpInLocal && selected?.option === "restaurant") {
        setContactInfo({
          name: pickUpInLocalSelectors.name,
          phone: pickUpInLocalSelectors.phone,
          time: pickUpInLocalSelectors.time,
        });
        setDeliveryOption(selected?.name, selected?.option);
      } else {
        console.log("it should be impossibe!!");
      }

      showModalHandler(false);
    }
  };

  return [
    { parentWidth },
    { disableNextButton, getNextName, getPrevName, onNext, onLayout, onPrev }, // wizard
    { options, setOption, deliveryOptionSelected: selected?.id === 0 || selected?.id === 1 ? selected?.option : -1 }, // Main  screen
    { selectors: deliveryAtHomeSelectors, handlers: deliveryAthomeHandlers, UI: deliveryAtHomeUI }, // Home
    { selectors: pickUpInLocalSelectors, handlers: pickUpInLocalHandlers }, // Local
  ];
};

export default useDeliveryOptions;
