import React, {useState} from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import CustomInput from '../../components/CustomInput'

const SignInScreen = () => {
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const {height} = useWindowDimensions();
    return(
        
        <View>
            <Text style={styles.text}>SIGN IN</Text>
           <CustomInput 
            placeholder="Username" 
            value={username}
            setValue={setUsername}
          />
           <CustomInput 
            placeholder="Password" 
            value={password} 
            setValue={setPassword} 
            secureTextEntry={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        textAlign: 'right',
        width: '70%',
        maxWidth: 300,
        height: 150,
        fontSize: 60,
        fontFamily: 'Gill Sans Extrabold',
        

    },
    root:{
        alignItems: 'center',
        padding: 20,

    }
})

export default SignInScreen