import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInAsDoctorScreen from '../screens/SignInAsDoctorScreen';
import SignInAsMedicalAssistantScreen from '../screens/SignInAsMedicalAssistantScreen';
import SignInAsScreen from '../screens/SignInAsScreen';
import {QRCodeScannerScreen} from '../screens/QRCodeScreens/ScanQRCode';
import {PacientFormForDoctorScreen} from '../screens/PacientFormScreens/PacientFormForDoctor';
import {SignUpDoctorScreen} from '../screens/SignUpScreen/SignUpDoctorScreen';

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
        />
        <Stack.Screen
          name="PacientFormForDoctorScreen"
          component={PacientFormForDoctorScreen}
        />
        <Stack.Screen
          name="SignUpDoctorScreen"
          component={SignUpDoctorScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
