import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import {useForm} from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput'

//import {QRCodeScannerScreen} from '../QRCodeScreens/ScanQRCode';
//import {useNavigation} from '@react-navigation/native';




interface Doctor {
    doctorId: number;
    doctor_name: string;
    doctor_email: string;
    doctor_passhash: string;
    doctor_specialization: string;
  };

  const initialDoctor: Doctor = {
    doctorId: 0,
    doctor_name: '',
    doctor_email: '',
    doctor_passhash: '',
    doctor_specialization: '',
  };

  export const SignUpDoctorScreen = () => {
    const [doctor, setDoctor] = useState<Doctor>(initialDoctor);
    const [data, setData] = useState('');
    const getDoctorById = async (id: string) => {
      const data = await fetch(`http://localhost:5000/createdoctor/${id}`, {
        method: 'POST',
      });
      return await data.json();
    };

    useEffect(() => {
        getDoctorById('1')
          .then(jsonData => {
            console.warn(jsonData.results);
            setDoctor(jsonData.results);
          })
          .catch(err => console.log(err));
      }, []);
    
      const {register, handleSubmit} = useForm();

      

      const onSignUpDoctorPressed = () => {
        
          console.warn('Sign up as Doctor');
      
        };

      return (
        //<form onSubmit={handleSubmit(dataa => console.log(dataa))}>
        <View>
          <Text style={styles.text_SignUp}> SignUpDoctor </Text>
          <View>
            
            <CustomInput 
              placeholder="Complete Name" 
              {...register('doctor_name')}
            />
             <CustomInput 
              placeholder="Email"
              {...register('doctor_email')}
            />
            
            
            <CustomInput
              placeholder={'Password'}
              {...register('doctor_password')}
              secureTextEntry={true}
            />
            
            <CustomInput
             placeholder={'Specialization'}
              {...register('doctor_specialization')}
              
            />
        <CustomButton 
              text="Sign Up" 
              onPress={onSignUpDoctorPressed}
              backgrColor="#C4BBFF"
              foregrColor="#000000"  
            />
            
          </View>
        </View>
        //</form>
      );
    };

    const styles = StyleSheet.create({
      text_SignUp: {
        textAlign: 'center',
        marginHorizontal: 50,
        width: '70%',
        maxWidth: 300,
        fontSize: 40,
        marginTop: 50,
        marginBottom: 25,
        fontFamily: 'Gill Sans Extrabold',
      },
      root: {
        alignItems: 'center',
        padding: 20,
      },
    });