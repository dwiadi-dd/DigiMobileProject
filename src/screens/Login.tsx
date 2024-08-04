import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, TextField} from '@components/molecules';
import {Icon, Typography} from '@components/atom';
import {CommonActions, NavigationProp} from '@react-navigation/native';
import SPACING from '@constant/spacing';
import COLORS from '@constant/colors';
import investlyServices from '@services/investlyServices';
import storageServices from '@services/storageServices';
import * as Keychain from 'react-native-keychain';
import database from '@react-native-firebase/database';
const Login: FC<{navigation: NavigationProp<any>}> = ({navigation}) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isfingerPrint, setIsFingerPrint] = useState(false);
  const [isFingerprintFF, setIsFingerprintFF] = useState(false);

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

  const saveCredentialsToSecureStorage = useCallback(async () => {
    try {
      await Keychain.setGenericPassword(email, password, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      });
      setIsFingerPrint(true);
    } catch (error) {
      console.error('Error saving credentials to secure storage:', error);
    }
  }, [email, password]);

  const loginWithFingerPrint = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setEmail(credentials.username);
        setPassword(credentials.password);
      }
    } catch (error) {
      console.error('Error getting credentials from secure storage:', error);
    }
  }, []);

  const onLogin = useCallback(async () => {
    setLoading(true);
    const res = await investlyServices.login({email, password});
    if (res?.status === 200) {
      saveCredentialsToSecureStorage();
      setLoading(false);
      storageServices.setLoginData(res?.data?.data);
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
  }, [email, password, navigation, saveCredentialsToSecureStorage]);

  const handleLewati = () => {
    navigation.navigate('HomeTab');
  };
  const handleDaftar = () => {
    navigation.navigate('Register');
  };
  const handleEmailChange = (text: string) => {
    const trimmedEmail = text.trim().toLowerCase();
    setEmail(trimmedEmail);
    validateEmail(trimmedEmail);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  useEffect(() => {
    setIsValid(Boolean(!emailError && !passwordError && email && password));
  }, [emailError, passwordError, email, password]);

  useEffect(() => {
    const isLoggedIn = storageServices.getLoginData().isLoggedIn;
    if (isLoggedIn) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeTab', params: {isLogin: true}}],
        }),
      );
    }
  }, [navigation]);
  useEffect(() => {
    database()
      .ref('/is_enabled_fingerprint_feature')
      .once('value')
      .then(snapshot => {
        console.log('is enabled finger ', snapshot);
        setIsFingerprintFF(snapshot.val());
      });
  }, []);
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
            {isFingerprintFF && (
              <Button
                type="text-only"
                variant="link"
                size="small"
                onPress={loginWithFingerPrint}>
                Login with finger
              </Button>
            )}
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
          onPress={handleDaftar}>
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
