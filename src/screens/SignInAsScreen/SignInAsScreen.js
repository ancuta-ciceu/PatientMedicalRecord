import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {QRCodeScannerScreen} from '../QRCodeScreens/ScanQRCode';
import {PatientFormForAssistantScreen} from '../PacientFormScreens/PatientFormForAssistent';
import {SignUpDoctorScreen} from '../SignUpScreen/SignUpDoctorScreen';

const SignInAsScreen = () => {
  const navigation = useNavigation();

  const onDoctorPressed = () => {
    console.warn('Sign in as Doctor');

    navigation.navigate('SignInAsDoctorScreen');
  };

  const onMedicalAssistantPressed = () => {
    console.warn('Sign in as Medical assistant');
    navigation.navigate('SignInAsMedicalAssistantScreen');
  };

  // const onScanQRPressed = () => {
  //   navigation.navigate('QRCodeScannerScreen');
  // };

  const onPatientFormDoctorPressed = () => {
    navigation.navigate('PacientFormForDoctorScreen');
  };

  const onPatientFormAssistantPressed = () => {
    navigation.navigate('PacientFormForAssistantScreen');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.text_SignInAs}>SIGN IN AS</Text>

        <CustomButton text="Doctor" onPress={onDoctorPressed} />
        <CustomButton
          text="Medical assistant"
          onPress={onMedicalAssistantPressed}
        />
        {/*<CustomButton text="Scan QR" onPress={onScanQRPressed} />*/}
        <CustomButton
          text="Patient Form For Doctor Screen"
          onPress={onPatientFormDoctorPressed}
        />
        <CustomButton
          text="Patient Form For Assistent Screen"
          onPress={onPatientFormAssistantPressed}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text_SignInAs: {
    textAlign: 'center',
    marginHorizontal: 50,
    width: '70%',
    maxWidth: 300,
    fontSize: 50,
    marginTop: 200,
    fontFamily: 'Gill Sans Extrabold',
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
});

export default SignInAsScreen;
