import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';

interface FormErrors {
  medical_assistant_name?: string;
  medical_assistant_email?: string;
  medical_assistant_password?: string;
}

export const SignUpMedicalAssistantScreen = () => {
  const [MedicalAssistantName, setMedicalAssistantName] = useState('');
  const [MedicalAssistantEmail, setMedicalAssistantEmail] = useState('');
  const [MedicalAssistantPassword, setMedicalAssistantPassword] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const errors: FormErrors = {};

    if (!MedicalAssistantName) {
      errors.medical_assistant_name = 'Medical assistant name is required';
    }

    if (!MedicalAssistantEmail) {
      errors.medical_assistant_email = 'Medical assistant email is required';
    } else if (!isValidEmail(MedicalAssistantEmail)) {
      errors.medical_assistant_email = 'Invalid email format';
    }

    if (!MedicalAssistantPassword) {
      errors.medical_assistant_password =
        'Medical assistant password is required';
    } else if (MedicalAssistantPassword.length < 6) {
      errors.medical_assistant_password =
        'Password must be at least 6 characters long';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            medical_assistant_name: MedicalAssistantName,
            medical_assistant_email: MedicalAssistantEmail,
            medical_assistant_passhash: MedicalAssistantPassword,
          }),
      };
      const response = await fetch(
        'http://localhost:5000/createmedicalassistant',
        requestOptions,
      );
      const data = await response.json();
      if(response.ok) {
      navigation.navigate('SignInAsMedicalAssistantScreen');
      console.log('Signup successful!');
      } else if (response.status === 400 && data.message === 'Email already exists') {
              errors.medical_assistant_email = 'There is already an account with this email';
              setFormErrors(errors);
        }else if (response.status === 402 && data.message === 'name already exists') {
          errors.medical_assistant_name = 'There is already an account with this name';
          setFormErrors(errors);
        } else {
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
      <Text style={styles.text_SignUp}>SIGN UP AS MEDICAL ASSISTANT</Text>
      <CustomInput
        placeholder="Medical assistant name"
        value={MedicalAssistantName}
        setValue={setMedicalAssistantName}
        secureTextEntry={false}
      />
      {formErrors.medical_assistant_name && (
        <Text style={styles.error}>{formErrors.medical_assistant_name}</Text>
      )}
      <CustomInput
        placeholder="Medical assistant email"
        value={MedicalAssistantEmail}
        setValue={setMedicalAssistantEmail}
        secureTextEntry={false}
      />
      {formErrors.medical_assistant_email && (
        <Text style={styles.error}>{formErrors.medical_assistant_email}</Text>
      )}
      <CustomInput
        placeholder="Medical assistant password"
        value={MedicalAssistantPassword}
        setValue={setMedicalAssistantPassword}
        secureTextEntry
      />
      {formErrors.medical_assistant_password && (
        <Text style={styles.error}>
          {formErrors.medical_assistant_password}
        </Text>
      )}

      <CustomButton text="SignUp" onPress={handleSubmit} type="PRIMARY" />
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
  text_SignUp: {
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 50,
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
