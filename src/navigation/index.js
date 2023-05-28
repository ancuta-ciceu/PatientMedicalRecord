import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInAsDoctorScreen from '../screens/SignInAsDoctorScreen';
import SignInAsMedicalAssistantScreen from '../screens/SignInAsMedicalAssistantScreen';
import SignInAsScreen from '../screens/SignInAsScreen';
import {QRCodeScannerScreen} from '../screens/QRCodeScreens/ScanQRCode';
import {PatientFormForAssistantScreen} from '../screens/PacientFormScreens/PatientFormForAssistent';
import {SignUpDoctorScreen} from '../screens/SignUpScreen/SignUpDoctorScreen';
import {SignUpMedicalAssistantScreen} from '../screens/SignUpScreen/SignUpMedicalAssistantScreen';
import {PatientFormForDoctorScreen} from '../screens/PacientFormScreens/PatientFormForDoctor';
import {AfterAddingPatientData} from '../screens/PacientFormScreens/AfterAddingPatientData';
import {TreatmentsVisibleForDoctors} from '../screens/PacientFormScreens/TreatmentsVisibleForDoctors';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignInAsScreen" component={SignInAsScreen} />
        <Stack.Screen
          name="SignInAsDoctorScreen"
          component={SignInAsDoctorScreen}
        />
        <Stack.Screen
          name="SignInAsMedicalAssistantScreen"
          component={SignInAsMedicalAssistantScreen}
        />
        <Stack.Screen
          name="QRCodeScannerScreen"
          component={QRCodeScannerScreen}
          initialParams={{asMedic: false}}
        />
        <Stack.Screen
          name="PacientFormForAssistantScreen"
          component={PatientFormForAssistantScreen}
        />
        <Stack.Screen
          name="PacientFormForDoctorScreen"
          component={PatientFormForDoctorScreen}
        />
        <Stack.Screen
          name="SignUpDoctorScreen"
          component={SignUpDoctorScreen}
        />
        <Stack.Screen
          name="SignUpMedicalAssistantScreen"
          component={SignUpMedicalAssistantScreen}
        />
        <Stack.Screen
          name="AfterAddingPatientDataScreen"
          component={AfterAddingPatientData}
        />
        <Stack.Screen
          name="TreatmentsVisibleForDoctorsScreen"
          component={TreatmentsVisibleForDoctors}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
