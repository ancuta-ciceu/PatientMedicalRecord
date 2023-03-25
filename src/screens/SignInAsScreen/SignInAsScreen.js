import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const SignInAsScreen = () => {
    
    const navigation = useNavigation();

    const onDoctorPressed = () => {
        console.warn("Sign in as Doctor");

        navigation.navigate('SignInAsDoctorScreen');
    }

    const onMedicalAssistantPressed = () => {
        console.warn("Sign in as Medical assistant");
        navigation.navigate('SignInAsMedicalAssistantScreen');
    }

    
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
            <Text style={styles.text_SignInAs}>SIGN IN AS</Text>
            
            
            <CustomButton text="Doctor" onPress={onDoctorPressed}/>
            <CustomButton text="Medical assistant" onPress={onMedicalAssistantPressed}/>
            
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text_SignInAs:{
        textAlign: 'center',
        marginHorizontal: 50,
        width: '70%',
        maxWidth: 300,
        fontSize: 50,
        marginTop: 200,
        fontFamily: 'Gill Sans Extrabold',
        

    },
    root:{
        alignItems: 'center',
        padding: 20,

    }
})

export default SignInAsScreen;