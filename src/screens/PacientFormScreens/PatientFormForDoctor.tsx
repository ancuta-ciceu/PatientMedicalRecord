import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, lightColors} from '@rneui/themed';
import {useForm} from 'react-hook-form';
import {FormModal} from './Components/TreatmentModal';

interface Pacient {
  patientId: number;
  cnp: string;
  patientName: string;
  age: number;
  sex: string;
  admissionDate: string;
}

const initialPacient: Pacient = {
  patientId: 0,
  cnp: '',
  patientName: '',
  age: 0,
  sex: '',
  admissionDate: '',
};

export interface Treatment {
  treatmentId: number;
  patientId: number;
  days: number;
  timesPerDay: number;
  medicine: string;
  administrationType: string;
}

const initialTreatment: Treatment = {
  patientId: 0,
  treatmentId: 0,
  administrationType: '',
  medicine: '',
  days: 0,
  timesPerDay: 0,
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const PatientFormForDoctorScreen = () => {
  const {control, handleSubmit} = useForm();
  const [patient, setPatient] = useState<Pacient>(initialPacient);
  const [treatment, setTreatment] = useState<Treatment>(initialTreatment);
  const [isModalVisible, setModalVisible] = useState(false);

  const getPatientById = async (id: string) => {
    const data = await fetch(`http://localhost:5000/pacients/${id}`, {
      method: 'GET',
    }).catch(err => console.log(err + 1));
    setPatient(await data?.json());
  };

  useEffect(() => {
    getPatientById('1');
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.iconSection]}>
        <View style={{marginRight: 110}}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{patient.patientName}</Text>
        </View>
        <Icon raised name="person" type="ionicon" color="#f50" />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{patient.age}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>CNP:</Text>
        <Text style={styles.value}>{patient.cnp}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sex:</Text>
        <Text style={styles.value}>{patient.sex}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Admission date:</Text>
        <Text style={styles.value}>{formatDate(patient.admissionDate)}</Text>
      </View>
      <TouchableOpacity style={{marginTop: 20}}>
        <Button title="Show modal" onPress={() => setModalVisible(true)} />
      </TouchableOpacity>
      <FormModal
        isVisible={isModalVisible}
        setVisibility={setModalVisible}
        control={control}
        setTreatment={setTreatment}
        patientId={patient.patientId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  section: {
    backgroundColor: lightColors.grey5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
  },
  iconSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
