import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Button, TextField} from '@components/molecules';
import {Icon, Typography} from '@components/atom';
import {CommonActions, NavigationProp} from '@react-navigation/native';
import {AuthContext} from '@contexts/AuthContext';
import SPACING from '@constant/spacing';
import COLORS from '@constant/colors';
import investlyServices from '@services/investlyServices';

const Login: FC<{navigation: NavigationProp<any>}> = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input) {
      setEmailError('Email is required.');
      setEmailSuccess(false);
    } else if (input.length > 254) {
      setEmailError('Email should not exceed 254 characters.');
      setEmailSuccess(false);
    } else if (!emailRegex.test(input)) {
      setEmailError('Please enter a valid email address.');
      setEmailSuccess(false);
    } else {
      setEmailError('');
      setEmailSuccess(true);
    }
  };

  const validatePassword = (input: string) => {
    const minLength = 8;
    const maxLength = 64;
    const hasUppercase = /[A-Z]/.test(input);
    const hasLowercase = /[a-z]/.test(input);
    const hasNumber = /[0-9]/.test(input);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input);

    if (!input) {
      setPasswordError('Password is required.');
    } else if (input.length < minLength || input.length > maxLength) {
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
      email.toLowerCase() === 'adibangkit@test.app' &&
      password === 'TestApp123!'
    ) {
      navigation.navigate('HomeTab');
      login();
    } else {
      setEmailError('Invalid email or password.');
      setPasswordError('Invalid email or password.');
    }
  };
  const onLogin = useCallback(async () => {
    setLoading(true);
    const res = await investlyServices.login({email, password});
    console.log('KOCK');
    if (res?.status === 200) {
      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeTab'}],
        }),
      );
    } else {
      setLoading(false);
      Alert.alert('Login failed', res?.data?.messages || 'An error occurred');
    }
  }, [email, password, navigation]);

  const handleLewati = () => {
    navigation.navigate('HomeTab');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  useEffect(() => {
    setIsValid(Boolean(!emailError && !passwordError && email && password));
  }, [emailError, passwordError, email, password]);

  return (
    <SafeAreaView style={styles.viewContainer}>
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
            onPress={handleLewati}>
            Lewati
          </Button>
        </View>
      </View>
      <View style={styles.container}>
        <Typography size="large" type="heading" style={styles.centerText}>
          Masuk ke Investly
        </Typography>
        <View style={styles.formContainer}>
          <TextField
            label="Email"
            placeholder="Email"
            state={
              emailError ? 'negative' : emailSuccess ? 'positive' : 'default'
            }
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
            <Button type="text-only" variant="link" size="small">
              Lupa Password
            </Button>
          </View>
          <Button
            type="text-only"
            variant="primary"
            size="medium"
            disabled={!isValid || loading}
            onPress={onLogin}>
            Masuk {loading && <ActivityIndicator />}
          </Button>
        </View>

        <View style={styles.flex} />
        <Button
          type="text-only"
          variant="outline"
          size="medium"
          onPress={handleLogin}>
          Daftar
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  viewContainer: {backgroundColor: COLORS.neutral100, flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    justifyContent: 'flex-start',
    gap: SPACING.sm,
  },
  formContainer: {
    flex: 1,
    gap: SPACING.xl,
    marginTop: SPACING.xl,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    paddingLeft: SPACING.xl,
  },
  headerSide: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 10,
  },
  headerMiddle: {
    flex: 2.5,
    justifyContent: 'center',
    marginLeft: -20,
    alignItems: 'center',
  },
  helperContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: -8,
  },
  flex: {flex: 1},
  centerText: {textAlign: 'center'},
});
