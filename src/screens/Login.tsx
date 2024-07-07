import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextField from '../components/molecules/TextField';
import colors from '../constant/colors';
import Button from '../components/molecules/Button';

export default function Login({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 44,
        backgroundColor: colors.neutral100,
      }}>
      <TextField label="Email" placeholder="Email" />
      <TextField type="password" label="Password" placeholder="Password" />
      <View style={{flex: 1}} />
      <Button
        onPress={() => {
          navigation.navigate('Home');
        }}>
        Masuk
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
