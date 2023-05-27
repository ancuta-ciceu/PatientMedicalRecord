import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({
  onPress,
  text,
  type = 'PRIMARY',
  backgrColor,
  foregrColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        backgrColor ? {backgroundColor: backgrColor} : {},
        styles.buttonGoolge,
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          foregrColor ? {color: foregrColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 50,
  },
  container_PRIMARY: {
    backgroundColor: '#A399A9',
  },
  container_SECONDARY: {
    marginVertical: 170,
  },
  container_TERTIARY: {
    backgroundColor: 'transparent',
    marginVertical: 5,
    marginLeft: 150,
  },
  text: {
    fontWeight: 'bold',
  },
  text_PRIMARY: {
    color: '#000',
  },
  text_SECONDARY: {
    color: '#1f072e',
  },

  text_TERTIARY: {
    color: '#3d85c6',
  },
});
export default CustomButton;
