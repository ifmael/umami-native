import React from "react";
import { bool, number, object } from "prop-types";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { BottomSheet, Button, Input, ListItem, SearchBar } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PLACES_TOKEN } from "/constant";
import styles, { buttonStyles, getStyles, searchStyles } from "./styles";

const propTypes = {
  handlers: object,
  parentWidth: number,
  selectors: object,
  showButton: bool,
  UI: object,
};

export default function DeliveryAtHome({ handlers, parentWidth, selectors, showButton = false, UI }) {
  const { renderRow } = UI;
  const { autocompleteStyle, inputStyles } = getStyles(parentWidth);

  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <GooglePlacesAutocomplete
            currentLocation
            currentLocationLabel="Usar mi localización."
            debounce={750}
            enablePoweredByContainer={false}
            fetchDetails
            keyboardShouldPersistTaps="handled"
            // listUnderlayColor="#ff0000" // color cuando se presiona un elemento de la lista
            minLength={2}
            nearbyPlacesAPI="GoogleReverseGeocoding"
            onPress={handlers.onPressAddress}
            placeholder="Busca tu calle."
            renderRow={renderRow}
            query={{
              components: "country:es",
              key: PLACES_TOKEN,
              language: "es",
            }}
            styles={autocompleteStyle}
            textInputProps={{
              InputComp: SearchBar,
              searchIcon: { name: "search", type: "font-awesome-5" },
              clearIcon: Platform.OS === "ios" ? null : { name: "times-circle", type: "font-awesome-5", solid: true },
              containerStyle: searchStyles.containerStyle,
              inputContainerStyle: searchStyles.inputContainerStyle,
              inputStyle: searchStyles.inputStyle,
              leftIconContainerStyle: { marginLeft: 0 },
              rightIconContainerStyle: { marginRight: 0 },
            }}
          />

          <View style={[styles.contactInfoContainer]}>
            <Input
              containerStyle={{ paddingHorizontal: 0 }}
              label="Calle *"
              errorMessage={selectors?.streetError ? "Tu dirección no puede estar vacía" : ""}
              onBlur={handlers.onBlurStreet}
              onChangeText={handlers.onChangeTextStreet}
              value={selectors?.street}
            />
            <View style={styles.directionRow}>
              <Input
                containerStyle={[inputStyles.numbers, { paddingHorizontal: 0, paddingRight: 10 }]}
                label="Número"
                value={selectors?.number}
                onChangeText={handlers.setNumber}
              />
              <Input
                containerStyle={inputStyles.numbers}
                label="Bloque"
                value={selectors?.block}
                onChangeText={handlers.setBlock}
              />
              <Input
                containerStyle={[inputStyles.numbers, { paddingHorizontal: 0, paddingLeft: 10 }]}
                label="Piso"
                value={selectors?.flat}
                onChangeText={handlers.setFlat}
              />
            </View>

            <View style={styles.directionRow}>
              <TouchableOpacity onPress={() => handlers.setIsVisibleBottomSheet(true)}>
                <Input
                  containerStyle={[inputStyles.locality, { paddingHorizontal: 0, paddingRight: 10 }]}
                  errorMessage={selectors?.localityError ? "Selecciona una localidad" : ""}
                  editable={false}
                  label="Localidad *"
                  value={selectors?.locality}
                />
              </TouchableOpacity>
              <Input
                containerStyle={inputStyles.locality}
                errorMessage={selectors?.phoneError ? "El telefono no es correcto" : ""}
                keyboardType="numeric"
                label="Telefono *"
                onBlur={handlers.onBlurPhone}
                onChangeText={handlers.onChangeTextPhone}
                value={selectors?.phone}
              />
            </View>
          </View>
          {showButton ? (
            <View style={styles.addContactInfoButtonContainer}>
              <Button
                buttonStyle={buttonStyles.buttonAddStyles}
                icon={{ name: "user", type: "font-awesome-5", solid: true, color: "white", size: 18 }}
                onPress={handlers.onPressAddContactInfo}
                titleStyle={buttonStyles.buttonAddTitle}
                title="Añadir datos de contacto"
              />
            </View>
          ) : null}
        </View>
        <BottomSheet
          isVisible={selectors?.isVisibleBottomSheet}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          {selectors?.localityOptions.map(({ name, zip }) => (
            <ListItem key={zip} onPress={() => handlers.onSelectLocality(name)}>
              <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </ScrollView>
    </View>
  );
}

DeliveryAtHome.propTypes = propTypes;

/**
 *
 * TODO
 * - Show loader
 * - Fix error when GPS is disabled
 */