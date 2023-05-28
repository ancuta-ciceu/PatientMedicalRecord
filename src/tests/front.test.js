import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import SignInAsDoctorScreen from '../screens/SignInAsDoctorScreen/SignInAsDoctorScreen.js';
import SignUpDoctorScreen  from '../screens/SignUpScreen/SignUpDoctorScreen.tsx';


// Mock axios, AsyncStorage, and NavigationContainer
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));


it('should console.warn("Login succesfull") on successful login', async () => {
  // Mock the axios post request and AsyncStorage setItem
  const response = { data: { token: 'some-token' } };
  axios.post.mockResolvedValueOnce(response);
  AsyncStorage.setItem.mockResolvedValueOnce();

  // Create a mock navigation object
  const navigateMock = jest.fn();
  const navigation = { navigate: navigateMock };

  // Create a spy on the console.error method
  const consoleErrorSpy = jest.spyOn(console, 'error');

  const { getByTestId } = render(
    <SignInAsDoctorScreen navigation={navigation} />
  );

  // Simulate user input
  fireEvent.changeText(getByTestId('Username'), 'username');
  fireEvent.changeText(getByTestId('Password'), 'password');

  // Simulate button press
  fireEvent.press(getByTestId('Login'));

  // Wait for async operations to complete
  await waitFor(() => {
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'some-token');
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

it('should display "User not found" alert on login error (401)', async () => {
  const error = { response: { status: 401 } };
  axios.post.mockRejectedValueOnce(error);
  
  const alertMock = jest.spyOn(Alert, 'alert');
  const { getByTestId } = render(
    <NavigationContainer>
      <SignInAsDoctorScreen />
    </NavigationContainer>
  );
  
  fireEvent.press(getByTestId('Login'));

  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith('User not found');
  });
});

it('should display "No response from server" alert on no response', async () => {
  const error = { request: {} };
  axios.post.mockRejectedValueOnce(error);
  
  const alertMock = jest.spyOn(Alert, 'alert');
  const { getByTestId } = render(
    <NavigationContainer>
      <SignInAsDoctorScreen />
    </NavigationContainer>
  );
  
  fireEvent.press(getByTestId('Login'));

  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith('No response from server');
  });
});


it('should display "Error occurred" alert on generic error', async () => {
  const error = {};
  axios.post.mockRejectedValueOnce(error);
  
  const alertMock = jest.spyOn(Alert, 'alert');
  const { getByTestId } = render(
    <NavigationContainer>
      <SignInAsDoctorScreen />
    </NavigationContainer>
  );
  
  fireEvent.press(getByTestId('Login'));

  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith('Error occurred');
  });
});


it('should navigate to SignUpDoctorScreen on SignUp button press', () => {
  const navigateMock = jest.fn();
  useNavigation.mockReturnValue({ navigate: navigateMock });
  const { getByTestId } = render(
    <NavigationContainer>
      <SignInAsDoctorScreen />
    </NavigationContainer>
  );

  fireEvent.press(getByTestId('SignUpButton'));

  expect(navigateMock).toHaveBeenCalledWith('SignUpDoctorScreen');
});

/*
describe('SignUpDoctorScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display error messages for invalid form fields', () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({ navigate: navigateMock })
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <SignUpDoctorScreen />
      </NavigationContainer>
    );

    const signUpButton = getByTestId('SignUpButton');

    fireEvent.press(signUpButton);

    expect(getByText('Doctor name is required')).toBeTruthy();
    expect(getByText('Doctor email is required')).toBeTruthy();
    expect(getByText('Doctor password is required')).toBeTruthy();
    expect(getByText('Doctor specialization is required')).toBeTruthy();
  });

  it('should display an error message for an invalid email format', () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({ navigate: navigateMock })
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <SignUpDoctorScreen />
      </NavigationContainer>
    );

    const doctorEmailInput = getByTestId('DoctorEmailInput');
    const signUpButton = getByTestId('SignUpButton');

    fireEvent.changeText(doctorEmailInput, 'invalid-email');
    fireEvent.press(signUpButton);

    expect(getByText('Invalid email format')).toBeTruthy();
  });
});*/