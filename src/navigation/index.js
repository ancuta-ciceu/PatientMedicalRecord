import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInAsDoctorScreen from '../screens/SignInAsDoctorScreen';
import SignInAsMedicalAssistantScreen from '../screens/SignInAsMedicalAssistantScreen';
import SignInAsScreen from '../screens/SignInAsScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignInAsScreen" component={SignInAsScreen} />
                <Stack.Screen name="SignInAsDoctorScreen" component={SignInAsDoctorScreen} />
                <Stack.Screen name="SignInAsMedicalAssistantScreen" component={SignInAsMedicalAssistantScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;