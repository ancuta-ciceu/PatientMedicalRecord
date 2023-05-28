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
import {initialTreatment, Treatment} from '../PatientFormForDoctor';
import {postData} from '../Axios/postData';
import {CustomInputWithDefaultValues} from './CustomInputWIthDefaultValues';
import {updateData} from '../Axios/updateData';

export interface FormModalProps {
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  control: Control<FieldValues, any>;
  defaultTreatment: Treatment;
  getTreatmentsById: () => Promise<void>;
}
export const UpdateTreatmentModal = ({
  isVisible,
  setVisibility,
  defaultTreatment,
  getTreatmentsById,
}: FormModalProps) => {
  const {control, handleSubmit} = useForm();
  const onSubmitPressed = async (data: FieldValues) => {
    console.log('aici');
    try {
      await updateData(
        JSON.stringify({
          treatmentId: defaultTreatment.treatmentId,
          patientId: defaultTreatment.patientId,
          days: data.days,
          timesPerDay: data.timesPerDay,
          medicine: data.medicine,
          administrationType: value,
        }),
        `http://localhost:5000/treatments/${defaultTreatment.treatmentId}`,
      );
      //.then(() => getTreatmentsById())
      //.finally(() => setVisibility(false));
    } catch (e: any) {
      Alert.alert('Oops', e.message);
    }
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
        <View>
          <Text style={styles.title}>Update Treatment</Text>
          <CustomInputWithDefaultValues
            control={control}
            name={'medicine'}
            placeholder={'Medicine name'}
            defaultValue={defaultTreatment.medicine}
          />
          <CustomInputWithDefaultValues
            control={control}
            name={'timesPerDay'}
            placeholder={'Number of times per day'}
            numerical={true}
            defaultValue={defaultTreatment.timesPerDay + ''}
          />
          <CustomInputWithDefaultValues
            control={control}
            name={'days'}
            placeholder={'Number of days'}
            numerical={true}
            defaultValue={defaultTreatment.days + ''}
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
              console.log('!!!!!');
              onSubmitPressed(data);
            })}
            //onPress={() => console.log('aici')}
          >
            <Text style={styles.buttonText}>Update treatment</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
