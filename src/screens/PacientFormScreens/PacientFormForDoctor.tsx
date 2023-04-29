import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useForm} from 'react-hook-form';
interface Pacient {
  patientId: number;
  cnp: string;
  patientName: string;
  age: number;
  sex: string;
  admissionDate: string;
}

interface Treatment {
  patientId: number;
  days: number;
  timesPerDay: number;
  medicine: string;
  administrationType: string;
}

const initialPacient: Pacient = {
  patientId: 0,
  cnp: '',
  patientName: '',
  age: 0,
  sex: '',
  admissionDate: '',
};

const initialTreatment: Treatment = {
  patientId: 0,
  days: 0,
  timesPerDay: 0,
  medicine: '',
  administrationType: '',
};

export const PacientFormForDoctorScreen = () => {
  const [patient, setPatient] = useState<Pacient>(initialPacient);
  const [treatment, setTreatment] = useState<Treatment>(initialTreatment);
  const [data, setData] = useState('');
  const getPatientById = async (id: string) => {
    const data = await fetch(`http://localhost:5000/pacients/${id}`, {
      method: 'GET',
    }).catch(err => console.log(err + 1));
    setPatient(await data?.json());
    //etPatient(json);
  };

  useEffect(() => {
    getPatientById('1');
  }, []);

  useEffect(() => {
    console.log(patient);
  }, [patient]);

  const {register, handleSubmit} = useForm();

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  //
  // const handleSubmit = () => {
  //   console.log('Submitted!');
  //   // Add your form submission logic here
  // };
  //
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Sign Up</Text>
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Name"
  //         value={name}
  //         onChangeText={setName}
  //       />
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Email"
  //         value={email}
  //         onChangeText={setEmail}
  //         keyboardType="email-address"
  //         autoCapitalize="none"
  //       />
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Password"
  //         value={password}
  //         onChangeText={setPassword}
  //         secureTextEntry
  //         autoCapitalize="none"
  //       />
  //       <TouchableOpacity style={styles.button}>
  //         <Text style={styles.buttonText}>Submit</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    //<form onSubmit={handleSubmit(dataa => console.log(dataa))}>
    <View>
      <Text> Pacient Form </Text>
      <Text>{patient?.patientName}</Text>
      <View>
        <Text>Medicine name:</Text>
        <TextInput {...register('medicine')} />
        <Text>Type of administration:</Text>
        <TextInput
          {...register('administrationType')}
          // placeholder="Type of administration"
        />
        <Text>Number of days to administrate::</Text>
        <TextInput
          {...register('days')}
          // placeholder="Number of days to administrate:"
          //type={'number'}
        />
        <Text>Number of times/day to administrate::</Text>
        <TextInput
          {...register('timesPerDay')}
          // placeholder="Number of times/day to administrate:"
          //type={'number'}
        />
      </View>
    </View>
    //</form>
  );
};

// const styles = StyleSheet.create({
//   //Check project repo for styles
// });
