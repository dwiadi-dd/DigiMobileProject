import {StyleSheet, View} from 'react-native';
import React from 'react';
import Typhography from '@components/atom/Typhography';
import {Button, TextField} from '@components/molecules';
import COLORS from '@constant/colors';

export default function Login({navigation, route}) {
  const {name} = route.params;
  return (
    <View style={styles.container}>
      <Typhography type="heading" size="large">
        {name}
      </Typhography>
      <TextField label="Email" placeholder="Email" />
      <TextField type="password" label="Password" placeholder="Password" />
      <View style={styles.flex} />
      <Button
        onPress={() => {
          navigation.navigate('HomeTab', {
            email: 'adibangkai@gmail.com',
          });
        }}>
        Masuk
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 44,
    backgroundColor: COLORS.neutral100,
  },
  flex: {flex: 1},
});
