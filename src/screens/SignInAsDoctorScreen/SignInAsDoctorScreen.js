import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, FormErrorMessage } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import {QRCodeScannerScreen} from '../QRCodeScreens/ScanQRCode';
import {PacientFormForDoctorScreen} from '../PacientFormScreens/PacientFormForDoctor';
import {useNavigation} from '@react-navigation/native';
//import router from '../../routers/authRouter' 
import api from '../api';



const SignInAsDoctorScreen = () => {
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const navigation = useNavigation();
    const useAuth = () => {
      const user = {loggedIn: false};
      return user && user.loggedIn;
    };



    const onSignInPressed = async() => {
      //console.warn("Sign in");
      try {
        const response = await api.post('/doctor', { doctor_name, doctor_passhash });
        const { token } = response.data;
        // Save token to storage or global state
        navigation.navigate('QRCodeScannerScreen');
      } catch (error) {
        console.error(error);
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
      
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.text_SignIN}>SIGN IN AS DOCTOR</Text>
            <CustomInput 
              placeholder="Username" 
              value={username}
              setValue={setUsername}
              
            />
            
            <CustomInput 
              placeholder="Password" 
              value={password} 
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