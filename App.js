/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import SignInAsScreen from './src/screens/SignInAsScreen';
import SignInAsDoctorScreen from './src/screens/SignInAsDoctorScreen';
import SignInAsMedicalAssistentScreen from './src/screens/SignInAsMedicalAssistantScreen';
import Navigation from './src/navigation';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
     
      <Navigation/>
    </SafeAreaView>
  );
  };

const styles = StyleSheet.create({
  root : {
    flex: 1,
    backgroundColor: '#e7e7e7'
  },
});
export default App;
