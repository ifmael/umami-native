import React from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { BottomSheet, Button, Input, ListItem, SearchBar } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useContactInfo from "./useContactInfo";
import { PLACES_TOKEN } from "/constant";
import styles, { autocompleteStyle, searchStyles } from "./styles";

export default function ContactInfo() {
  const [values, handlers, { renderRow }] = useContactInfo();

  return (
    <View style={{ flex: 1 }}>
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
            }}
          />

          <View style={styles.contactInfoContainer}>
            <Input
              label="Calle"
              errorMessage={values.streetError ? "Tu dirección no puede estar vacía" : ""}
              onBlur={handlers.onBlurStreet}
              onChangeText={handlers.onChangeTextStreet}
              value={values.street}
            />
            <View style={styles.directionRow}>
              <Input
                containerStyle={styles.inputNumbers}
                label="Número"
                value={values.number}
                onChangeText={handlers.setNumber}
              />
              <Input
                containerStyle={styles.inputNumbers}
                label="Bloque"
                value={values.block}
                onChangeText={handlers.setBlock}
              />
              <Input
                containerStyle={styles.inputNumbers}
                label="Piso"
                value={values.flat}
                onChangeText={handlers.setFlat}
              />
            </View>

            <View style={styles.directionRow}>
              <TouchableOpacity onPress={() => handlers.setIsVisibleBottomSheet(true)}>
                <Input
                  errorMessage={values.localityError ? "Selecciona una localidad" : ""}
                  editable={false}
                  containerStyle={styles.inputLocation}
                  label="Localidad"
                  value={values.locality}
                />
              </TouchableOpacity>
              <Input
                errorMessage={values.phoneError ? "El telefono no es correcto" : ""}
                keyboardType="decimal-pad"
                label="Telefono"
                onBlur={handlers.onBlurPhone}
                onChangeText={handlers.onChangeTextPhone}
                value={values.phone}
              />
            </View>
          </View>
          <View style={styles.addContactInfoButtonContainer}>
            <Button
              buttonStyle={styles.buttonAdd}
              icon={{ name: "user", type: "font-awesome-5", solid: true, color: "white", size: 18 }}
              onPress={handlers.onPressAddContactInfo}
              titleStyle={styles.buttonAddTitle}
              title="Añadir datos de contacto"
            />
          </View>
        </View>
        <BottomSheet
          isVisible={values.isVisibleBottomSheet}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          {values.localityOptions.map(({ name, zip }) => (
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

/**
 *
 * TODO
 * - Show loader
 * - Fix error when GPS is disabled
 */
