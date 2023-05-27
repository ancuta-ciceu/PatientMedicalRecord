/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import SignInAsScreen from './src/screens/SignInAsScreen';
import SignInAsDoctorScreen from './src/screens/SignInAsDoctorScreen';
import SignInAsMedicalAssistentScreen from './src/screens/SignInAsMedicalAssistantScreen';
import PushNotification from 'react-native-push-notification';
import {Platform, PushNotificationIOS} from 'react-native';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Navigation from './src/navigation';
// const navigation = useNavigation();

const App = () => {
  const navigation = useNavigation();

  PushNotification.configure({
    requestPermissions: Platform.OS === 'ios',

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      navigation.navigate('PacientFormForAssistantScreen');
      //notification.navigate('PacientFormForAssistantScreen');
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  });

  PushNotification.createChannel(
    {
      channelId: 'DemoAppID', // (required)
      channelName: 'DemoApp', // (required)
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  function setRepeatingNotification(interval) {
    PushNotification.cancelAllLocalNotifications();
    if (interval == 'every 30 seconds') {
      PushNotification.localNotificationSchedule({
        title: 'My notification title',
        message: 'My notification message',
        date: new Date(Date.now() + 30 * 1000), // first trigger in 30 secs
        channelId: 'DemoAppID',
        repeatType: 'time',
        repeatTime: 30 * 1000, // repeats every 30 seconds (value has to be defined in miliseconds when the repeatType is 'time')
      });
      Alert.alert(
        'Successful!',
        'Your notification is coming in 30 seconds and will repeat itself every 30 seconds.',
      );
    } else if (interval == 'once in two days') {
      PushNotification.localNotificationSchedule({
        title: 'My notification title',
        message: 'My notification message',
        date: new Date(Date.now() + 10 * 1000), // first trigger in 10 secs
        channelId: 'DemoAppID',
        repeatType: 'day',
        repeatTime: 2, // repeats every 2 days
      });
      Alert.alert(
        'Successful!',
        'Your notification is coming in 10 seconds and will repeat itself once in two days.',
      );
    } else if (interval == 'once a week') {
      PushNotification.localNotificationSchedule({
        title: 'My notification title',
        message: 'My notification message',
        date: new Date(Date.now() + 10 * 1000), // first trigger in 10 secs
        channelId: 'DemoAppID',
        repeatType: 'week',
        repeatTime: 1, // repeats every week
      });
      Alert.alert(
        'Successful!',
        'Your notification is coming in 10 seconds and will repeat itself every week.',
      );
    }
  }
  useEffect(() => {
    setRepeatingNotification('every 30 seconds');
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
});
export default App;
