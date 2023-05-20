// android pt google 809074699671-b1jc0n7mg24np6johdf9jslauoce2lm0.apps.googleusercontent.com
import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '809074699671-b1jc0n7mg24np6johdf9jslauoce2lm0.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

const SignInAsDoctorScreen = () => {
    const [doctorName, setUsername]= useState('');
    const [doctorPassword, setPassword]= useState('');
    const navigation = useNavigation();
    

    const onSignInPressed = async() => {
      try {
        const response = await axios.post('http://localhost:5000/logindoctor', {
          doctor_name: doctorName,
          doctor_passhash: doctorPassword
        });
        const token = response.data.token;
  
        // Store the token securely
        await AsyncStorage.setItem('token', token);
         navigation.navigate('QRCodeScannerScreen');
         console.warn("Login succesfull");
      } catch (error) {
        console.error(error);
        Alert.alert('Invalid username or password');
      }

    }

    const onForgotPasswordPressed = () => {
        console.warn("Forgot password");
    }

    const onSignInWithGoogle = async() => {
        try{
          // Start the Google sign-in flow
      await GoogleSignin.signIn();
      
      // Handle the sign-in success
      const { accessToken, idToken } = await GoogleSignin.getTokens();
      // Send the tokens to your Node.js server for verification
      const response = await axios.post('http://localhost:5000/signinwithgoogle', {
        token: idToken,
      });
      await AsyncStorage.setItem('token', accessToken);
         navigation.navigate('QRCodeScannerScreen');
         console.warn("Login succesfull");
        }
        catch (error) {
          console.error(error);
        }
    }

    const onSignUpPressed = () => {
      navigation.navigate('SignUpDoctorScreen');

    }

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
        <View>
            <Text style={styles.text_SignIN}>SIGN IN AS DOCTOR</Text>
            <CustomInput 
              placeholder="Username" 
              value={doctorName}
              setValue={setUsername}
            />
            <CustomInput 
              placeholder="Password" 
              value={doctorPassword} 
              setValue={setPassword} 
              secureTextEntry={true} 
            />

            <CustomButton 
              text="Forgot password?" 
              onPress={onForgotPasswordPressed} 
              type='TERTIARY'
            />

            <CustomButton 
              text="Login" 
              onPress={onSignInPressed}
            />

            <CustomButton 
              text="Sign In with Google" 
              onPress={onSignInWithGoogle}
              backgrColor="#FAE9EA"
              foregrColor="#DD4D44"  
              
            />

            <CustomButton 
              text="Don't have an account? Sign Up" 
              onPress={onSignUpPressed} 
              type='SECONDARY'
            />

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text_SignIN:{
        textAlign: 'center',
        marginHorizontal: 50,
        marginTop:50,
        width: '70%',
        maxWidth: 300,
        fontSize: 40,
        fontFamily: 'Gill Sans Extrabold',
        

    },
    root:{
        alignItems: 'center',
        padding: 20,

    }
})

export default SignInAsDoctorScreen



