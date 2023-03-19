/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import SignInScreen from './src/screens/SignInScreen';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';





const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <SignInScreen/>
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
