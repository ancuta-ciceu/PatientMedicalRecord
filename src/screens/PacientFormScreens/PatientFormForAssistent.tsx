import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Controller, FieldValues, set, useForm} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {CustomInput} from './Components/CustomInput';
import axios from 'axios';
import {postData} from './Axios/postData';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Icon, lightColors} from '@rneui/themed';
import {FormModal} from './Components/TreatmentModal';
import {getDataById} from './Axios/getDataById';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
interface Pacient {
  patientId: number;
  cnp: string;
  patientName: string;
  age: number;
  sex: string;
  admissionDate: string;
}

interface Treatment {
  treatmentId: number;
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
  treatmentId: 0,
  patientId: 0,
  days: 0,
  timesPerDay: 0,
  medicine: '',
  administrationType: '',
};

export const PatientFormForAssistantScreen = () => {
  const [patient, setPatient] = useState<Pacient>(initialPacient);
  const [loading, setLoading] = useState(false);
  const [treatments, setTreatments] = useState<Treatment[]>([initialTreatment]);
  const [data, setData] = useState('');
  // const getPatientById = async (id: string) => {
  //   setLoading(true);
  //   const data = await fetch(`http://localhost:5000/pacients/${id}`, {
  //     method: 'GET',
  //   })
  //     .catch(err => console.log(err + 1))
  //     .finally(() => setLoading(false));
  //   setPatient(await data?.json());
  // };

  console.log(loading);
  useEffect(() => {
    getDataById('http://localhost:5000/pacients/2', setPatient, setLoading);
    getDataById(
      'http://localhost:5000/treatments/2',
      setTreatments,
      setLoading,
    );
  }, []);

  console.log(patient);
  useEffect(() => {
    console.log(treatments);
  }, [treatments]);

  interface submittedPatientData {
    admissionDate: Date;
    age: number;
    cnp: string;
    patientName: string;
    sex: string;
  }

  const [error, setError] = useState(false);
  const onSubmitPressed = async (data: FieldValues) => {
    if (loading) {
      return;
    }

    patient.patientName === '' && setError(true);
    setTimeout(() => setError(false), 2000);

    setLoading(true);
    try {
      const response = await postData(
        JSON.stringify({
          admissionDate: data.admissionDate,
          age: data.age,
          cnp: data.cnp,
          patientName: data.patientName,
          sex: data.sex,
        }),
        'http://localhost:5000/pacients',
      ).then(() => setLoading(false));
    } catch (e: any) {
      Alert.alert('Something went wrong', e.message);
    } finally {
      setLoading(false);
    }
  };

  const {control, handleSubmit} = useForm();

  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  return loading ? (
    <LoadingScreen />
  ) : patient.cnp === '' ? (
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
        <Text style={styles.buttonText1}>Admission date *</Text>
      </TouchableOpacity>
      {error && <Text>eroare</Text>}
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
        onPress={handleSubmit(data => {
          onSubmitPressed(data);
        })}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <ScrollView>
      {/*<Icon*/}
      {/*  name="heartbeat"*/}
      {/*  type="font-awesome"*/}
      {/*  color="#f50"*/}
      {/*  onPress={() => console.log('hello')}*/}
      {/*/>*/}

      <View style={styles.containerTreatment}>
        {treatments?.map(treatment => (
          <React.Fragment key={treatment.treatmentId}>
            <View style={styles.sectionTreatment}>
              <View style={[styles.section, styles.iconSection]}>
                <View>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{treatment.medicine}</Text>
                </View>
                <Icon
                  raised
                  name="prescription-bottle"
                  type="font-awesome-5"
                  color="#A399A9"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Administration Type:</Text>
                <Text style={styles.value}>{treatment.administrationType}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Number of days:</Text>
                <Text style={styles.value}>{treatment.days}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Number of times/day:</Text>
                <Text style={styles.value}>{treatment.timesPerDay}</Text>
              </View>
            </View>
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#EAEAFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#A399A9',
  },
  value: {
    fontSize: 16,
    color: '#A399A9',
  },
  section: {
    backgroundColor: lightColors.grey5,
    // borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 1,
  },
  button: {
    backgroundColor: '#A399A9',
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
  iconSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTreatment: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  sectionTreatment: {
    marginBottom: 10,
  },
});
