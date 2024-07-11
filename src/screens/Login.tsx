import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, TextField} from '@components/molecules';
import {Icon, Typography} from '@components/atom';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required.');
    } else if (email.length > 254) {
      setEmailError('Email should not exceed 254 characters.');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = password => {
    const minLength = 8;
    const maxLength = 64;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!password) {
      setPasswordError('Password is required.');
    } else if (password.length < minLength || password.length > maxLength) {
      setPasswordError(
        `Password must be between ${minLength} and ${maxLength} characters.`,
      );
    } else if (
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setPasswordError(
        'Password must include uppercase, lowercase, number, and special character.',
      );
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    if (
      email.toLowerCase() === 'yourname@test.app' &&
      password === 'TestApp123!'
    ) {
      navigation.navigate('HomeTab');
    } else {
      setEmailError('Invalid email or password.');
      setPasswordError('Invalid email or password.');
    }
  };

  const handleLewati = () => {
    navigation.navigate('HomeTab');
  };

  const handleEmailChange = text => {
    const trimmedEmail = text.trim().toLowerCase();
    setEmail(trimmedEmail);
    validateEmail(trimmedEmail);
  };

  const handlePasswordChange = text => {
    setPassword(text);
    validatePassword(text);
  };

  React.useEffect(() => {
    setIsValid(!emailError && !passwordError && email && password);
  }, [emailError, passwordError, email, password]);

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerSide}>
          <TouchableOpacity>
            <Icon name="chevron-left" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMiddle}>
          <Image source={require('../../assets/img/ic_investly.png')} />
        </View>
        <View style={styles.headerSide}>
          <Button
            type="text-only"
            variant="link"
            size="medium"
            disabled={false}
            onPress={handleLewati}>
            Lewati
          </Button>
        </View>
      </View>
      <View style={styles.container}>
        <Typography size="large" type="heading" style={{textAlign: 'center'}}>
          Masuk Ke Investly
        </Typography>
        <TextField
          label="Email"
          placeholder="Email"
          state={emailError ? 'negative' : 'default'}
          message={emailError}
          onChangeText={handleEmailChange}
          value={email}
        />

        <TextField
          type="password"
          label="Password"
          placeholder="Password"
          state={passwordError ? 'negative' : 'default'}
          message={passwordError}
          onChangeText={handlePasswordChange}
          value={password}
        />
        <View style={styles.helperContainer}>
          <Button type="text-only" variant="link" size="small" disabled={false}>
            Lupa Password
          </Button>
        </View>
        <View style={styles.flex} />
        <Button type="primary" disabled={!isValid} onPress={handleLogin}>
          Login
        </Button>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 44,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the items
    alignItems: 'center',
    height: 70,
    paddingLeft: 20,
  },
  headerSide: {
    flex: 1, // Make left and right sides take up equal space
    justifyContent: 'center', // Center content horizontally for Android compatibility
    minWidth: 10, // Ensure minimum width to accommodate text
  },
  headerMiddle: {
    flex: 2.2, // Allow the middle part (image) to take more space
    justifyContent: 'center',
    alignItems: 'center', // Center the image vertically
  },
  helperContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  flex: {flex: 1},
});
