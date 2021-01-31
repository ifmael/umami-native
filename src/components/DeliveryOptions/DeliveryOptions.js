import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import Modal from "react-native-modal";
import Wizard from "react-native-wizard";
import ChoosePlace from "./ChoosePlace";
import DeliveryAtHome from "./DeliveryAtHome";
import PickUpInLocal from "./PickUpInLocal";
import useDeliveryOptions from "./useDeliveryOptions";
import { deliverySteps } from "/constant";
import styles from "./DeliveryOptions.styles";
import { bool, func } from "prop-types";

const propTypes = {
  showComponent: bool,
  showModalHandler: func,
};

export default function DeliveryOptions({ showComponent = false, showModalHandler }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [{ parentWidth }, handlers, useChoosePlace, useDeliveryAtHome, usePickUpInLocal] = useDeliveryOptions(
    showModalHandler
  );
  const wizardRef = useRef(null);
  const stepList = [
    { content: <ChoosePlace options={useChoosePlace.options} setOption={useChoosePlace.setOption} /> },
    {
      content:
        useChoosePlace?.deliveryOptionSelected === "home" ? (
          <DeliveryAtHome
            parentWidth={parentWidth ? parentWidth : null}
            selectors={useDeliveryAtHome.selectors}
            handlers={useDeliveryAtHome.handlers}
            UI={useDeliveryAtHome.UI}
          />
        ) : useChoosePlace?.deliveryOptionSelected === "restaurant" ? (
          <PickUpInLocal selectors={usePickUpInLocal.selectors} handlers={usePickUpInLocal.handlers} />
        ) : null,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={showComponent}
        onBackButtonPress={() => showModalHandler(false)}
        onBackdropPress={() => showModalHandler(false)}
        style={{ flex: 1 }}
      >
        <View style={styles.mainView} onLayout={handlers.onLayout}>
          <View style={styles.titleView}>
            <Text h4 style={styles.titleViewText}>
              {`${deliverySteps[currentStep]?.titleStep}`}
            </Text>
          </View>
          <Wizard
            currentStep={({ currentStep }) => {
              setCurrentStep(currentStep);
            }}
            ref={wizardRef}
            steps={stepList}
          />
          <View style={styles.buttonView}>
            <Button title={handlers.getPrevName(currentStep)} onPress={() => handlers.onPrev(currentStep, wizardRef)} />
            <Button
              disabled={handlers.disableNextButton(currentStep)}
              title={handlers.getNextName(currentStep)}
              onPress={() => handlers.onNext(currentStep, wizardRef)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

DeliveryOptions.propTypes = propTypes;
