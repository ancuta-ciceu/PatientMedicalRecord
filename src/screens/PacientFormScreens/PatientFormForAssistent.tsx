import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {CustomInput} from './Components/CustomInput';
import axios from 'axios';
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

export const PatientFormForAssistantScreen = () => {
  const [patient, setPatient] = useState<Pacient>(initialPacient);
  const [treatment, setTreatment] = useState<Treatment>(initialTreatment);
  const [data, setData] = useState('');
  const getPatientById = async (id: string) => {
    const data = await fetch(`http://localhost:5000/pacients/${id}`, {
      method: 'GET',
    }).catch(err => console.log(err + 1));
    setPatient(await data?.json());
  };

  useEffect(() => {
    getPatientById('7');
  }, []);

  useEffect(() => {
    console.log(patient);
  }, [patient]);

  interface submittedPatientData {
    admissionDate: Date;
    age: number;
    cnp: string;
    patientName: string;
    sex: string;
  }

  const postPatient = async (data: FieldValues) => {
    const response = await axios
      .post('http://localhost:5000/pacients', {
        data: {
          admissionDate: data.admissionDate,
          age: data.age,
          cnp: data.cnp,
          patientName: data.patientName,
          sex: data.sex,
        },
      })
      .then(response => console.log(response))
      // .then(response => response.json())
      .catch(err => console.log(err));
  };

  const [loading, setLoading] = useState(false);
  const onSubmitPressed = async (data: FieldValues) => {
    if (loading) {
      return;
    }

    console.log(JSON.stringify(data));

    setLoading(true);
    try {
      const response = await postPatient(data);
      console.log(response);
    } catch (e: any) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  const {control, handleSubmit} = useForm();

  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Form</Text>
      <CustomInput
        control={control}
        name={'patientName'}
        placeholder={'Name'}
      />
      <CustomInput control={control} name={'cnp'} placeholder={'CNP'} />
      <CustomInput
        control={control}
        name={'age'}
        placeholder={'Age'}
        numerical={true}
      />
      <CustomInput control={control} name={'sex'} placeholder={'Sex'} />
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          setOpen(true);
        }}>
        <Text style={styles.buttonText1}>Admission date</Text>
      </TouchableOpacity>
      <Controller
        control={control}
        name={'admissionDate'}
        render={({field: {onChange}}) => (
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            locale="ro"
            onConfirm={date => {
              setOpen(false);
              onChange(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(data => onSubmitPressed(data))}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  button: {
    backgroundColor: '#2C3E50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button1: {
    backgroundColor: '#ABB2B9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
