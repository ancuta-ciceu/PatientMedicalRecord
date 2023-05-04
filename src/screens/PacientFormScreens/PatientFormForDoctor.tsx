import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {Icon, lightColors} from '@rneui/themed';

interface FormModalProps {
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormModal = ({isVisible, setVisibility}: FormModalProps) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        animationIn={'slideInUp'}
        animationInTiming={700}
        animationOutTiming={700}
        swipeDirection={['down']}
        backdropOpacity={0.9}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={() => setVisibility(false)} />
        </View>
      </Modal>
    </View>
  );
};

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const PatientFormForDoctorScreen = () => {
  const [patient, setPatient] = useState<Pacient>(initialPacient);
  const [isModalVisible, setModalVisible] = useState(false);

  const getPatientById = async (id: string) => {
    const data = await fetch(`http://localhost:5000/pacients/${id}`, {
      method: 'GET',
    }).catch(err => console.log(err + 1));
    setPatient(await data?.json());
  };

  useEffect(() => {
    getPatientById('7');
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

      <FormModal isVisible={isModalVisible} setVisibility={setModalVisible} />
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
