import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import axios from 'axios'



const SignInAsDoctorScreen = () => {
    const [doctor_name, setUsername]= useState('');
    const [doctor_password, setPassword]= useState('');

    const onSignInPressed = async() => {
        try {
          const response = await axios.post('http://localhost:5000/SignInAsDoctor',{ doctor_name, doctor_password });
          const { token } = response.data;
          await AsyncStorage.setItem('token', token);
          console.warn('Login successful');
          navigation.navigate('SignInAsScreen');
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
          }
          console.warn('Login failed');
        }
    }

    const onForgotPasswordPressed = () => {
        console.warn("Forgot password");
    }

    const onSignInWithGoogle = () => {
        console.warn("Sign in with Google");
    }

    const onSignUpPressed = () => {
        console.warn("Sign up");
    }

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
        <View>
            <Text style={styles.text_SignIN}>SIGN IN AS DOCTOR</Text>
            <CustomInput 
              placeholder="Username" 
              value={doctor_name}
              setValue={setUsername}
            />
            <CustomInput 
              placeholder="Password" 
              value={doctor_password} 
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

export default SignInAsDoctorScreen