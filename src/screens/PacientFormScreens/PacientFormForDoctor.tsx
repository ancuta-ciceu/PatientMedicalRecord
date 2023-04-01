import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import {useForm} from 'react-hook-form';
interface Pacient {
  pacientId: number;
  CNP: string;
  patientName: string;
  age: number;
  sex: string;
  admission_date: string;
}

interface Treatment {
  patientId: number;
  days: number;
  timesPerDay: number;
  medicine: string;
  administrationType: string;
}

const initialPacient: Pacient = {
  pacientId: 0,
  CNP: '',
  patientName: '',
  age: 0,
  sex: '',
  admission_date: '',
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
    });
    return await data.json();
  };

  useEffect(() => {
    getPatientById('1')
      .then(jsonData => {
        console.warn(jsonData.results);
        setPatient(jsonData.results);
      })
      .catch(err => console.log(err));
  }, []);

  const {register, handleSubmit} = useForm();

  return (
    //<form onSubmit={handleSubmit(dataa => console.log(dataa))}>
    <View>
      <Text> Pacient Form </Text>
      <Text>{patient.patientName}</Text>
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
