import React, {useState} from 'react';
import {Control, FieldValues, useForm} from 'react-hook-form';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {CustomInput} from './CustomInput';
import {lightColors} from '@rneui/themed';
import {Treatment} from '../PatientFormForDoctor';
import {postData} from '../Axios/postData';

export interface FormModalProps {
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  control: Control<FieldValues, any>;
  setTreatment: React.Dispatch<React.SetStateAction<Treatment>>;
  patientId: number;
}

export const FormModal = ({
  isVisible,
  setVisibility,
  setTreatment,
  patientId,
}: FormModalProps) => {
  const {control, handleSubmit} = useForm();

  const [loading, setLoading] = useState(false);
  const onSubmitPressed = async (data: FieldValues) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await postData(
        JSON.stringify({
          patientId: patientId,
          days: data.days,
          timesPerDay: data.timesPerDay,
          medicine: data.medicine,
          administrationType: value,
        }),
        'http://localhost:5000/treatments',
      );
    } catch (e: any) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Oral', value: 'Oral'},
    {label: 'Injection', value: 'Injection'},
    {label: 'Topical', value: 'Topical'},
    {label: 'Subcutaneous', value: 'Subcutaneous'},
    {label: 'Intravenous', value: 'Intravenous'},
    {label: 'Intramuscular', value: 'Intramuscular'},
  ]);

  return (
    <View>
      <Modal
        isVisible={isVisible}
        animationIn={'slideInUp'}
        animationInTiming={700}
        animationOutTiming={700}
        swipeDirection={['down']}
        backdropOpacity={0.9}
        onBackdropPress={() => setVisibility(false)}
        animationOut={'slideOutUp'}>
        <View style={styles.container}>
          <Text style={styles.title}>Add Treatment</Text>
          <CustomInput
            control={control}
            name={'medicine'}
            placeholder={'Medicine name'}
          />
          {/*<CustomInput*/}
          {/*  control={control}*/}
          {/*  name={'administrationType'}*/}
          {/*  placeholder={'Administration type'}*/}
          {/*/>*/}
          <CustomInput
            control={control}
            name={'timesPerDay'}
            placeholder={'Number of times per day'}
            numerical={true}
          />
          <CustomInput
            control={control}
            name={'days'}
            placeholder={'Number of days'}
            numerical={true}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            // style={{
            //   backgroundColor: '#A399A9',
            // }}
            translation={{
              PLACEHOLDER: 'Administration type',
            }}
            placeholderStyle={{
              color: 'lightgray',
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(data => {
              setVisibility(false);
              onSubmitPressed(data);
            })}>
            <Text style={styles.buttonText}>Confirm treatment</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // backgroundColor: '#fff',
    // borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#A399A9',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    zIndex: -1,
  },
});
