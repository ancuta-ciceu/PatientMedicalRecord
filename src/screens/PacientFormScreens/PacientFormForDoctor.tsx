import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput'
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
      <Text style={styles.text_PatientForm}> Patient Medical Form </Text>
      <Text>{patient.patientName}</Text>
      <View>
        <Text>Medicine name:</Text>
        <CustomInput 
              placeholder="medicine name" 
              {...register('medicine')}
            />
        <Text>Type of administration:</Text>
        <CustomInput 
              placeholder="Type of administration" 
              {...register('administrationType')}
            />
        <Text>Number of days to administrate::</Text>

        <CustomInput 
              placeholder="Number of days to administrate:"
              {...register('days')}
            />
        <Text>Number of times/day to administrate::</Text>
        <CustomInput 
              placeholder="Times per day" 
              {...register('timesPerDay')}
            />
      </View>
    </View>
    //</form>
  );
};

const styles = StyleSheet.create({
  text_PatientForm: {
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
