import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const LoginAlert = ({onLogin}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/img/kambing.png')}
        style={styles.avatar}
      />
      <Text style={styles.text}>
        Temukan inspirasi investasi,{' '}
        <TouchableOpacity style={styles.link} onPress={onLogin}>
          Masuk Yuk!
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LoginAlert;
