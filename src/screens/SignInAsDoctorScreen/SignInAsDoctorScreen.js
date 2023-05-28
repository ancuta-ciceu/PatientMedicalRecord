// android pt google 809074699671-b1jc0n7mg24np6johdf9jslauoce2lm0.apps.googleusercontent.com
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
//import {GoogleSignin} from '@react-native-google-signin/google-signin';
/*
GoogleSignin.configure({
  webClientId:
    '809074699671-b1jc0n7mg24np6johdf9jslauoce2lm0.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});
*/
const SignInAsDoctorScreen = () => {
  const [doctorName, setUsername] = useState('');
  const [doctorPassword, setPassword] = useState('');
  const navigation = useNavigation();

  const onSignInPressed = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logindoctor', {
        doctor_name: doctorName,
        doctor_passhash: doctorPassword,
      });
      const token = response.data.token;

      // Store the token securely
      await AsyncStorage.setItem('token', token);
      navigation.navigate('QRCodeScannerScreen', {asMedic: true});
      console.warn('Login succesfull');
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          // User not found in the database
          Alert.alert('User not found');
        } else {
          // Other server error
          Alert.alert('Server error');
        }
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert('No response from server');
      } else {
        // Other error
        Alert.alert('Error occurred');
      }
    }
  };

  const onSignInWithGoogle = async () => {
   /* try {
      // Start the Google sign-in flow
      await GoogleSignin.signIn();

      // Handle the sign-in success
      const {accessToken, idToken} = await GoogleSignin.getTokens();
      // Send the tokens to your Node.js server for verification
      const response = await axios.post(
        'http://localhost:5000/signinwithgoogle',
        {
          token: idToken,
        },
      );
      await AsyncStorage.setItem('token', accessToken);
      navigation.setParams({
        asMedic: true,
      });
      navigation.navigate('QRCodeScannerScreen', {asMedic: true});
      console.warn('Login succesfull');
    } catch (error) {
      console.error(error);
    }*/
    console.log('Google sign in');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUpDoctorScreen');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View>
        <Text style={styles.text_SignIN}>SIGN IN AS DOCTOR</Text>
        <CustomInput
          placeholder="Username"
          value={doctorName}
          setValue={setUsername}
          testID="Username"
        />
        <CustomInput
          placeholder="Password"
          value={doctorPassword}
          setValue={setPassword}
          secureTextEntry={true}
          testID="Password"
        />

        <CustomButton 
          text="Login" 
          onPress={onSignInPressed} 
          testID="Login"
          />

        <CustomButton
          text="Sign In with Google"
          onPress={onSignInWithGoogle}
          backgrColor="#d5ced9"
          foregrColor="#433d47"
        />

        <CustomButton
          text="Don't have an account? Sign Up"
          onPress={onSignUpPressed}
          testID="SignUpButton"
          type="SECONDARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text_SignIN: {
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 50,
    width: '70%',
    maxWidth: 300,
    fontSize: 40,
    fontFamily: 'Gill Sans Extrabold',
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
});

export default SignInAsDoctorScreen;
