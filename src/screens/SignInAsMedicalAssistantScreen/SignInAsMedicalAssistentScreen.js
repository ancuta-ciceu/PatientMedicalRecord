import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInAsMedicalAssistantScreen = () => {
    const [MedicalAssistantName, setUsername]= useState('');
    const [MedicalAssistantPassword, setPassword]= useState('');

    const navigation = useNavigation();
    
    const onSignInPressed = async() => {
        try{
          const response = await axios.post('http://localhost:5000/loginmedicalassistant', {
            medical_assistant_name: MedicalAssistantName,
            medical_assistant_passhash: MedicalAssistantPassword
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

    const onSignInWithGoogle = () => {
        console.warn("Sign in with Google");
    }

    const onSignUpPressed = () => {
      navigation.navigate('SignUpMedicalAssistantScreen');
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
            <Text style={styles.text_SignIN}>SIGN IN AS MEDICAL ASSISTANT</Text>
            <CustomInput 
              placeholder="Username" 
              value={MedicalAssistantName}
              setValue={setUsername}
            />
            <CustomInput 
              placeholder="Password" 
              value={MedicalAssistantPassword} 
              setValue={setPassword} 
              secureTextEntry={true} 
            />

            <CustomButton 
              text="Forgot password?" 
              onPress={onForgotPasswordPressed} 
              type='TERTIARY'
            />
            <CustomButton text="Login" onPress={onSignInPressed}/>
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

export default SignInAsMedicalAssistantScreen