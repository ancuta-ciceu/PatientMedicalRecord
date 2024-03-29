import {Controller} from 'react-hook-form';
import {Alert, StyleSheet, TextInput} from 'react-native';
import React from 'react';

interface CustomInputProps {
  control: any;
  name: string;
  placeholder: string;
  numerical?: boolean;
  defaultValue?: string;
}

export const CustomInputWithDefaultValues = ({
  control,
  name,
  placeholder,
  numerical = false,
  defaultValue = '',
}: CustomInputProps) => {
  Alert.prompt('error');
  return (
    <Controller
      control={control}
      name={name}
      rules={{required: true}}
      render={({field: {value, onChange, onBlur}}) => (
        <TextInput
          keyboardType={numerical ? 'numeric' : 'default'}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={`${placeholder} *`}
          style={styles.input}
          placeholderTextColor={'lightgray'}
          defaultValue={defaultValue}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    color: 'gray',
  },
});
