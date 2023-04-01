'use strict';

import React, {useState} from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {View, Text} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

export const QRCodeScannerScreen = () => {
  const [data, setData] = useState<String>('Set data');
  const navigation = useNavigation();
  const onSignInPressed = () => {
    // @ts-ignore
    navigation.navigate('SignInAsScreen');
  };

  return (
    <QRCodeScanner
      onRead={({data}) => {
        setData(data);
        console.warn(data);
      }}
      reactivate={true}
      //cameraTimeout={5000}
      topContent={
        <View>
          <Text>{data}</Text>
        </View>
      }
      showMarker={true}
      bottomContent={
        <>
          <View>
            <Text>QR Code Scanner</Text>
          </View>
          <CustomButton
            text="Sign In"
            onPress={onSignInPressed}
            backgrColor={undefined}
            foregrColor={undefined}
          />
        </>
      }

      // topContent={
      //   <Text style={styles.centerText}>
      //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
      //     on your computer and scan the QR code.
      //   </Text>
      // }
      // bottomContent={
      //   <TouchableOpacity style={styles.buttonTouchable}>
      //     <Text style={styles.buttonText}>OK. Got it!</Text>
      //   </TouchableOpacity>
      // }
    />
  );
};

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777',
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000',
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)',
//   },
//   buttonTouchable: {
//     padding: 16,
//   },
// });
