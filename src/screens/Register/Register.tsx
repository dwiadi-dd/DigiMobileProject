import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Button, TextField} from '@components/molecules';
import {Icon, Typography} from '@components/atom';
import {NavigationProp} from '@react-navigation/native';
import {AuthContext} from '@contexts/AuthContext';
import SPACING from '@constant/spacing';
import COLORS from '@constant/colors';
import StepperIndicator from './components/StepIndicator';

const Register: FC<{navigation: NavigationProp<any>}> = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);

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

  const validateConfirmPassword = (input: string) => {
    if (input !== password) {
      setConfirmPasswordError(
        'Password and Confirm Password must be the same.',
      );
    } else {
      setConfirmPasswordError('');
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

  const handleLewati = () => {
    navigation.navigate('RegisterTwo');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    validateConfirmPassword(text);
  };

  useEffect(() => {
    setIsValid(Boolean(!emailError && !passwordError && email && password));
  }, [emailError, passwordError, email, password]);
  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <TextField
              label="Email"
              placeholder="Masukan Email Kamu"
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
              placeholder="Masukan Password Kamu"
              state={passwordError ? 'negative' : 'default'}
              message={passwordError}
              onChangeText={handlePasswordChange}
              value={password}
            />
            <TextField
              type="password"
              label="Konfirmasi Password"
              placeholder="Masukan Konfirmasi Password"
              state={confirmPasswordError ? 'negative' : 'default'}
              message={confirmPasswordError}
              onChangeText={handleConfirmPasswordChange}
              value={confirmPassword}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField label="Nama" placeholder="Masukan Nama Kamu" />
            <TextField label="Username" placeholder="Masukan Username Kamu" />
          </>
        );
      case 3:
        return (
          <Typography type="paragraph" size="medium">
            Final step content here
          </Typography>
        );
    }
  };

  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSide}>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="chevron-left" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMiddle}>
          <Image source={require('../../../assets/img/ic_investly.png')} />
        </View>
        <View style={styles.headerSide}>
          <Button
            type="text-only"
            variant="link"
            size="medium"
            onPress={handleNext}>
            Masuk
          </Button>
        </View>
      </View>
      <View style={styles.container}>
        <Typography size="large" type="heading" style={styles.centerText}>
          Buat Akun
        </Typography>
        <View style={styles.formContainer}>{renderStepContent()}</View>
        <View style={styles.flex} />
        <StepperIndicator currentStep={currentStep} totalSteps={3} />
        <Button
          type="text-only"
          variant="primary"
          size="medium"
          disabled={!isValid}
          onPress={handleLogin}>
          Daftar
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
