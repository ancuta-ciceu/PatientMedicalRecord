import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, lightColors} from '@rneui/themed';
import {initialTreatment, Treatment} from './PatientFormForDoctor';
import {FieldValues, useForm} from 'react-hook-form';
import {postData} from './Axios/postData';
import {updateData} from './Axios/updateData';
import {FormModal} from './Components/TreatmentModal';

export const TreatmentsVisibleForDoctors = ({route}: {route: any}) => {
  const [treatments, setTreatments] = useState<Treatment[]>([initialTreatment]);
  const getTreatmentsById = async () => {
    const data = await fetch(
      `http://localhost:5000/treatments/${route.params?.id}`,
      {
        method: 'GET',
      },
    ).catch(err => console.log(err + 1));
    console.log(data);
    setTreatments(await data?.json());
  };

  const [response, setResponse] = useState();
  const onSubmitPressed = async (treatment: Treatment) => {
    try {
      await updateData(
        JSON.stringify({
          patientId: treatment.patientId,
          days: 17,
          timesPerDay: treatment.timesPerDay,
          medicine: treatment.medicine,
          administrationType: treatment.administrationType,
        }),
        `http://localhost:5000/treatments/${treatment.treatmentId}`,
      ).then(() => getTreatmentsById());
    } catch (e: any) {
      Alert.alert('Oops', e.message);
    }
  };

  useEffect(() => {
    route.params?.id && getTreatmentsById();
  }, [route.params?.id]);

  return (
    <View style={styles.containerTreatment}>
      {treatments?.map(treatment => (
        <React.Fragment key={treatment.treatmentId}>
          <View style={styles.sectionTreatment}>
            <View style={[styles.section, styles.iconSection]}>
              <View>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{treatment.medicine}</Text>
              </View>
              <TouchableOpacity onPress={() => onSubmitPressed(treatment)}>
                <Icon
                  raised
                  name="prescription-bottle"
                  type="font-awesome-5"
                  color="#A399A9"
                />
              </TouchableOpacity>
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
          {/*<FormModal*/}
          {/*  isVisible={isModalVisible}*/}
          {/*  setVisibility={setModalVisible}*/}
          {/*  control={control}*/}
          {/*  patientId={patient?.patientId}*/}
          {/*/>*/}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#A399A9',
  },
  value: {
    fontSize: 18,
    color: '#A399A9',
  },
  section: {
    backgroundColor: lightColors.grey5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 5,
  },
  iconSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
