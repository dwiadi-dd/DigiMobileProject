import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Button, TextField} from '@components/molecules';
import {Icon, Typography} from '@components/atom';
import {NavigationProp} from '@react-navigation/native';
import {AuthContext} from '@contexts/AuthContext';
import SPACING from '@constant/spacing';
import COLORS from '@constant/colors';
import StepperIndicator from './components/StepIndicator';
import investlyServices from '@services/investlyServices';
import {TopicsMasterPropsRes} from '@utils/props';
import {debounce} from '@utils/helper';

const STEP_TITLE = ['Buat Akun', 'Tambahkan Nama & Username', 'Pilih 3 Topik'];

const Register: FC<{navigation: NavigationProp<any>}> = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [topics, setTopics] = useState<TopicsMasterPropsRes>([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

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
      checkEmailUniqueness(input);
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
  const validateName = (input: string) => {
    if (input.length < 3) {
      setNameError('Name should have at least three characters.');
    } else {
      setNameError('');
    }
  };

  const validateUsername = (input: string) => {
    if (!input) {
      setUsernameError('Username is required.');
    } else {
      checkUsernameUniqueness(input);
      setUsernameError('');
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

  const handleEmailChange = (text: string) => {
    const trimmedEmail = text.trim().toLowerCase();
    setEmail(trimmedEmail);
    validateEmail(trimmedEmail);
  };

  const handleNameChange = (text: string) => {
    setName(text);
    validateName(text);
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    validateUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    validateConfirmPassword(text);
  };

  const handleTopicSelection = topic => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) {
        return prev.filter(t => t !== topic);
      } else if (prev.length < 3) {
        return [...prev, topic];
      }
      return prev;
    });
  };
  const fetcMasterTopics = useCallback(async () => {
    setLoading(true);
    const res = await investlyServices.fetchTopics();
    if (res?.status === 200) {
      setLoading(false);
      setTopics(res?.data?.data);
    } else {
      setLoading(false);
      Alert.alert('Login failed', res?.data?.messages || 'An error occurred');
    }
  }, []);

  const checkEmailUniqueness = useCallback((email: string) => {
    const debouncedCheck = debounce(async (emailToCheck: string) => {
      try {
        const res = await investlyServices.checkEmail({email: emailToCheck});
        if (res?.status === 200) {
          console.log('email unique');
          setIsEmailUnique(true);
        } else {
          setIsEmailUnique(false);
          setEmailError('This email is already taken.');
        }
      } catch (error) {
        console.error('Email check error:', error);
        setEmailError('Unable to verify email uniqueness.');
      }
    }, 500);

    debouncedCheck(email);
  }, []);

  const checkUsernameUniqueness = useCallback((username: string) => {
    const debouncedCheck = debounce(async (usernameToCheck: string) => {
      try {
        console.log(usernameToCheck);
        const res = await investlyServices.checkUsername({
          username: usernameToCheck,
        });
        if (res?.status === 404) {
          setIsUsernameUnique(true);
        } else {
          setIsUsernameUnique(false);
          setUsernameError('This username is already taken.');
        }
      } catch (error) {
        console.error('Email check error:', error);
        setUsernameError('Unable to verify email uniqueness.');
      }
    }, 500);

    debouncedCheck(username);
  }, []);

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

  const handleRegister = async () => {
    if (currentStep !== 3) return;

    if (selectedTopics.length < 3) {
      Alert.alert('Error', 'Please select at least one topic');
      return;
    }

    try {
      setLoading(true);
      const userData = {
        email,
        password,
        name,
        username,
        favorite_topic_ids: selectedTopics.map(t => t.id),
      };
      console.log(userData);
      // const res = await investlyServices.register(userData);
      // if (res.status === 200) {
      //   navigation.navigate('HomeTab');
      //   login();
      // } else {
      //   Alert.alert(
      //     'Registration failed',
      //     res?.data?.messages || 'An error occurred',
      //   );
      // }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An unexpected error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currentStep === 1) {
      setIsValid(
        Boolean(
          !emailError &&
            !passwordError &&
            !confirmPasswordError &&
            email &&
            password &&
            confirmPassword &&
            isEmailUnique,
        ),
      );
    } else if (currentStep === 2) {
      setIsValid(
        Boolean(
          !nameError && !usernameError && name && username && isUsernameUnique,
        ),
      );
    }
  }, [
    currentStep,
    emailError,
    passwordError,
    confirmPasswordError,
    email,
    password,
    confirmPassword,
    isEmailUnique,
    nameError,
    usernameError,
    name,
    username,
    isUsernameUnique,
  ]);

  useEffect(() => {
    if (currentStep === 3) {
      fetcMasterTopics();
    }
  }, [currentStep, fetcMasterTopics]);

  const renderTopicItem = ({item}) => (
    <TouchableOpacity
      style={[styles.topicItem]}
      onPress={() => handleTopicSelection(item)}>
      <Image
        source={{uri: item?.file?.full_path}}
        style={[
          styles.topicImage,
          selectedTopics.includes(item) && styles.selectedTopicItem,
        ]}
      />
      <View style={styles.topicLabelContainer}>
        <Typography
          style={[
            styles.topicLabel,
            selectedTopics.includes(item) && styles.selectedTopicLabel,
          ]}
          numberOfLines={1}
          type="heading"
          size="small">
          {item?.label}
        </Typography>
      </View>
    </TouchableOpacity>
  );

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
            <TextField
              label="Nama"
              placeholder="Masukan Nama Kamu"
              state={nameError ? 'negative' : 'default'}
              message={nameError}
              onChangeText={handleNameChange}
              value={name}
            />
            <TextField
              label="Username"
              placeholder="Masukan Username Kamu"
              state={usernameError ? 'negative' : 'default'}
              message={usernameError}
              onChangeText={handleUsernameChange}
              value={username}
            />
          </>
        );
      case 3:
        return (
          <FlatList
            data={topics}
            renderItem={renderTopicItem}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            contentContainerStyle={styles.topicsContainer}
            columnWrapperStyle={styles.topicRow}
          />
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
          {STEP_TITLE[currentStep - 1]}
        </Typography>
        <View style={styles.formContainer}>{renderStepContent()}</View>
        <View style={{gap: 12, paddingBottom: 32}}>
          <StepperIndicator currentStep={currentStep} totalSteps={3} />
          <Button
            type="text-only"
            variant="primary"
            size="medium"
            disabled={!isValid}
            onPress={currentStep < 3 ? handleNext : handleRegister}>
            {currentStep === 3 ? 'Daftar' : 'Selanjutnya'}
          </Button>
        </View>
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
  topicsContainer: {
    justifyContent: 'center',
    gap: 10,
  },
  topicRow: {
    justifyContent: 'space-evenly',
    gap: 10,
  },
  topicItem: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 140,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  selectedTopicItem: {
    borderColor: COLORS.purple700,
    borderWidth: 4,
  },
  topicImage: {
    width: 97,
    height: 97,
    borderRadius: 8,
  },
  topicLabelContainer: {
    marginTop: 0,
  },
  topicLabel: {
    color: COLORS.neutral700,
    textAlign: 'center',
  },
  selectedTopicLabel: {
    color: COLORS.purple700,
  },
});
