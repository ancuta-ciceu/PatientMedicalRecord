'use strict';

import React, {useEffect, useState} from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

export const QRCodeScannerScreen = ({route}: {route: any}) => {
  const [data, setData] = useState<String>('');
  const [scanning, setScanning] = useState<boolean>(true);
  const navigation = useNavigation();

  const asMedic = route.params?.asMedic;
  console.log(`asMedic: ${asMedic}`);
  const screen = asMedic
    ? 'PacientFormForDoctorScreen'
    : 'PacientFormForAssistantScreen';
  useEffect(() => {
    if (!scanning && data !== '') {
      // @ts-ignore
      navigation.navigate(screen, {id: data});
    }
  }, [scanning, data, navigation]);

  const handleQRRead = ({data}: {data: string}) => {
    // Check if the scanned QR code is valid

    setScanning(false); // Stop scanning
    setData(data);
    console.log(data);
  };

  // const isValidQRCode = (data: string) => {
  //   return data.includes('your-validation-keyword');
  // };

  return (
    <QRCodeScanner
      onRead={handleQRRead}
      reactivate={scanning}
      cameraTimeout={5000}
      showMarker={true}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>Please scan QR</Text>
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>
            Don't want to scan? Enter it manually.
          </Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
