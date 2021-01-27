import React, { useRef, useState } from "react";
import { bool, func } from "prop-types";
import { View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import Modal from "react-native-modal";
import Wizard from "react-native-wizard";
import ChoosePlace from "./ChoosePlace";
import DeliveryAtHome from "./DeliveryAtHome";
import PickUpInLocal from "./PickUpInLocal";
import useDeliveryOptions from "./useDeliveryOptions";
import { deliverySteps } from "/constant";

import styles, { titleContainerIcon } from "./styles";

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
      <Modal isVisible={showComponent} style={{ flex: 1 }}>
        <View style={styles.mainContainer} onLayout={handlers.onLayout}>
          <View style={styles.titleContainer}>
            <Text h4 style={styles.titleContainerText}>
              {`${deliverySteps[currentStep]?.titleStep}`}
            </Text>
            <Icon containerStyle={titleContainerIcon} type="font-awesome-5" name="times-circle" solid />
          </View>
          <Wizard
            currentStep={({ currentStep }) => {
              setCurrentStep(currentStep);
            }}
            ref={wizardRef}
            steps={stepList}
          />
          <View style={styles.buttonContainer}>
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
