import React, { useState} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput'
import {useNavigation} from '@react-navigation/native';


    interface FormErrors {
      doctor_name?: string;
      doctor_email?: string;
      doctor_password?: string;
      doctor_specialization?: string;
    } 

    export const SignUpDoctorScreen = () => {
      const [doctorName, setDoctorName] = useState('');
      const [doctorEmail, setDoctorEmail] = useState('');
      const [doctor_password, setDoctorPassword] = useState('');
      const [doctorSpecialization, setDoctorSpecialization] = useState('');
      const [formErrors, setFormErrors] = useState<FormErrors>({});
      const navigation = useNavigation();
    
      const handleSubmit = async() => {
        const errors: FormErrors = {};
    
        if (!doctorName) {
          errors.doctor_name = 'Doctor name is required';
        }
    
        if (!doctorEmail) {
          errors.doctor_email = 'Doctor email is required';
        } else if (!isValidEmail(doctorEmail)) {
          errors.doctor_email = 'Invalid email format';
        }
    
        if (!doctor_password) {
          errors.doctor_password = 'Doctor password is required';
        } else if (doctor_password.length < 6) {
          errors.doctor_password = 'Password must be at least 6 characters long';
        }
    
        if (!doctorSpecialization) {
          errors.doctor_specialization = 'Doctor specialization is required';
        }
    
        if (Object.keys(errors).length === 0) {
          try {
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                doctor_name: doctorName,
                doctor_email: doctorEmail,
                doctor_passhash: doctor_password,
                doctor_specialization: doctorSpecialization,
              }),
            };
            const response = await fetch('http://localhost:5000/createdoctor', requestOptions);
            const data = await response.json();
      
            if (response.ok) {
              navigation.navigate('SignInAsDoctorScreen');
              console.log('Signup successful!');
            } else if (response.status === 400 && data.message === 'Email already exists') {
              errors.doctor_email = 'There is already an account with this email!';
              setFormErrors(errors);
            } else if (response.status === 402 && data.message === 'name already exists') {
              errors.doctor_name = 'There is already an account with this username!';
              setFormErrors(errors);
            }
             else {
              console.log('Signup failed:', data.message);
            }
          } catch (error) {
            console.log('Signup error:', error);
          }
        } else {
          setFormErrors(errors);
        }
  };
    
      return (
        <View style={styles.container}>
          <Text style={styles.text_SignUp}>SIGN UP AS DOCTOR</Text>
          <CustomInput
            placeholder="Doctor name"
            value={doctorName}
            setValue={setDoctorName}
            secureTextEntry={false}
          />
          {formErrors.doctor_name && <Text style={styles.error}>{formErrors.doctor_name}</Text>}
          <CustomInput
            placeholder="Doctor email"
            value={doctorEmail}
            setValue={setDoctorEmail}
            secureTextEntry={false}
          />
          {formErrors.doctor_email && <Text style={styles.error}>{formErrors.doctor_email}</Text>}
          <CustomInput
            placeholder="Doctor password"
            value={doctor_password}
            setValue={setDoctorPassword}
            secureTextEntry
          />
          {formErrors.doctor_password && <Text style={styles.error}>{formErrors.doctor_password}</Text>}
          <CustomInput
            placeholder="Doctor specialization"
            value={doctorSpecialization}
            setValue={setDoctorSpecialization}
            secureTextEntry={false}
          />
          {formErrors.doctor_specialization && (
            <Text style={styles.error}>{formErrors.doctor_specialization}</Text>
          )}
          <CustomButton text="SignUp" onPress={handleSubmit} type='PRIMARY' />
        </View>
      );
    };
    
    const isValidEmail = (email: string) => {
      // Basic email validation regex
      return /\S+@\S+\.\S+/.test(email);
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
      },
      text_SignUp:{
        textAlign: 'center',
        marginHorizontal: 50,
        marginTop:50,
        width: '70%',
        maxWidth: 300,
        fontSize: 40,
        fontFamily: 'Gill Sans Extrabold',
    },
      error: {
        color: 'red',
        marginBottom: 8,
      },
    });