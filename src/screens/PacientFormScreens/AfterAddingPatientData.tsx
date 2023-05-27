import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export const AfterAddingPatientData = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.text}>
        PLEASE ASK A MEDICAL ASSISTANT TO REGISTER THIS PATIENT
      </Text>
      <View style={{marginHorizontal: 30}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            // @ts-ignore
            navigation.navigate('QRCodeScannerScreen', {asMedic: false})
          }>
          <Text style={styles.buttonText}>Go back to QR Scanner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 70,
    fontSize: 40,
    color: 'lightgray',
    fontFamily: 'Gill Sans Extrabold',
  },
  button: {
    backgroundColor: '#A399A9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
