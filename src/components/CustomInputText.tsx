import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
type CustomInputTextProps = {
  title: string;
};
const CustomInputText = (props: CustomInputTextProps) => {
  return (
    <TextInput placeholder={props.title} style={styles.CustomInputStyle} />
  );
};
const styles = StyleSheet.create({
  CustomInputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default CustomInputText;
