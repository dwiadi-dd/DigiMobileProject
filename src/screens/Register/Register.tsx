import {
  Alert,
  FlatList,
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
import StepperIndicator from './components/StepIndicator';
import investlyServices from '@services/investlyServices';
import {TopicMaster, TopicsState} from '@utils/props';
import {debounce, onDisplayNotification} from '@utils/helper';
import storageServices from '@services/storageServices';
import analytics from '@react-native-firebase/analytics';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const STEP_TITLE = ['Buat Akun', 'Tambahkan Nama & Username', 'Pilih 3 Topik'];

const Register: FC<{navigation: NavigationProp<any>}> = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: '',
    favorite_topic_ids: [],
  });

  const [inputState, setInputState] = useState({
    email: {isValid: false, errorMessage: '', states: 'default'},
    password: {isValid: false, errorMessage: '', states: 'default'},
    confirmPassword: {isValid: false, errorMessage: '', states: 'default'},
    name: {isValid: false, errorMessage: '', states: 'default'},
    username: {isValid: false, errorMessage: '', states: 'default'},
  });
  const [isValid, setIsValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [topics, setTopics] = useState<TopicsState>({
    data: [],
    loading: false,
  });
  const [selectedTopics, setSelectedTopics] = useState<
    {id: string; label: string}[]
  >([]);

  const updateFormData = (field: string, value: string) => {
    if (field === 'email') {
      value = value.trim().toLowerCase();
    }
    setFormData(prev => ({...prev, [field]: value}));
  };

  const updateInputState = (
    field: string,
    isValidInput: boolean,
    errorMessage: string,
    states: string,
  ) => {
    setInputState(prev => ({
      ...prev,
      [field]: {isValid: isValidInput, errorMessage, states},
    }));
  };

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input) {
      updateInputState('email', false, 'Email is required.', 'default');
    } else if (input.length > 254) {
      updateInputState(
        'email',
        false,
        'Email should not exceed 254 characters.',
        'negative',
      );
    } else if (!emailRegex.test(input)) {
      updateInputState(
        'email',
        false,
        'Please enter a valid email address.',
        'negative',
      );
    } else {
      checkEmailUniqueness(input);
      updateInputState('email', true, '', 'positive');
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
      updateInputState('password', false, 'Password is required.', 'default');
    } else if (input.length < minLength || input.length > maxLength) {
      updateInputState(
        'password',
        false,
        `Password must be between ${minLength} and ${maxLength} characters.`,
        'negative',
      );
    } else if (
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      updateInputState(
        'password',
        false,
        'Password must include uppercase, lowercase, number, and special character.',
        'negative',
      );
    } else {
      updateInputState('password', true, '', 'positive');
    }
  };

  const validateName = (input: string) => {
    if (!input) {
      updateInputState('name', false, 'Password is required.', 'default');
    } else if (input.length < 3) {
      updateInputState(
        'name',
        false,
        'nama harus lebih dari 3 huruf',
        'negative',
      );
    } else {
      updateInputState('name', true, '', 'positive');
    }
  };

  const validateUsername = (input: string) => {
    if (!input) {
      updateInputState('username', false, '', 'negative');
    } else if (input.length < 3) {
      updateInputState(
        'username',
        false,
        'username harus lebih dari 3 huruf',
        'negative',
      );
    } else {
      checkUsernameUniqueness(input);
    }
  };

  const validateConfirmPassword = (input: string) => {
    if (input !== formData?.password) {
      updateInputState(
        'confirmPassword',
        false,
        'Confirm password tidak sesuai',
        'negative',
      );
    } else {
      updateInputState('confirmPassword', true, '', 'positive');
    }
  };

  const handleInputChange = (field: string, text: string) => {
    updateFormData(field, text);
    switch (field) {
      case 'email':
        validateEmail(text);
        break;
      case 'password':
        validatePassword(text);
        break;
      case 'confirmPassword':
        validateConfirmPassword(text);
        break;
      case 'name':
        validateName(text);
        break;
      case 'username':
        validateUsername(text);
        break;
    }
  };
  const handleTopicSelection = (topic: TopicMaster) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) {
        analytics().logEvent('click_register_select_topic', {
          email: formData.email,
          name: formData.name,
          username: formData.username,
          topic_id: topic.id,
          topic_name: topic.label,
        });
        return prev.filter(t => t !== topic);
      } else if (prev.length < 3) {
        analytics().logEvent('click_register_unselect_topic', {
          email: formData.email,
          name: formData.name,
          username: formData.username,
          topic_id: topic.id,
          topic_name: topic.label,
        });
        return [...prev, topic];
      }
      return prev;
    });
  };

  const fetcMasterTopics = useCallback(async () => {
    setTopics({data: [], loading: true});
    const res = await investlyServices.fetchTopics();
    if (res?.status === 200) {
      setTopics({data: res?.data?.data ?? [], loading: false});
    } else {
      setTopics({data: [], loading: false});
      Alert.alert('Login failed', res?.data?.messages || 'An error occurred');
    }
  }, []);

  const checkEmailUniqueness = useCallback((email: string) => {
    const debouncedCheck = debounce(async (emailToCheck: string) => {
      try {
        const res = await investlyServices.checkEmail({email: emailToCheck});
        if (res?.status === 200) {
          updateInputState('email', true, '', 'positive');
        } else {
          await analytics().logEvent('failed_validate_register_email', {
            email: email,
          });
          updateInputState('email', false, 'email sudah digunakan', 'negative');
        }
      } catch (error) {
        await analytics().logEvent('failed_validate_register_email', {
          email,
        });
        updateInputState(
          'email',
          false,
          'gagak memvalidasi email!',
          'negative',
        );
      }
    }, 500);

    debouncedCheck(email);
  }, []);

  const checkUsernameUniqueness = useCallback((username: string) => {
    const debouncedCheck = debounce(async (usernameToCheck: string) => {
      try {
        const res = await investlyServices.checkUsername({
          username: usernameToCheck,
        });
        if (
          res?.status === 404 &&
          typeof res?.data?.messages === 'string' &&
          res?.data?.messages === 'user tidak ditemukan'
        ) {
          await analytics().logEvent('failed_validate_register_username', {
            username,
          });
          updateInputState('username', true, '', 'positive');
        } else {
          await analytics().logEvent('failed_validate_register_username', {
            username,
          });
          updateInputState(
            'username',
            false,
            'Username sudah digunakan',
            'negative',
          );
        }
      } catch (error) {
        updateInputState(
          'username',
          false,
          'gagal memvalidasi username!',
          'negative',
        );
      }
    }, 500);

    debouncedCheck(username);
  }, []);

  const handleNext = () => {
    if (currentStep === 1) {
      analytics().logEvent('click_register_button_step_1', {
        email: formData?.email,
      });
    }
    if (currentStep === 2) {
      analytics().logEvent('click_register_button_step_2', {
        email: formData?.email,
        name: formData?.name,
        username: formData?.username,
      });
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    navigation.goBack();
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (currentStep > 1) {
          setCurrentStep(prevStep => prevStep - 1);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [currentStep]),
  );
  const handleRegister = async () => {
    if (currentStep !== 3) {
      return;
    }
    analytics().logEvent('click_register_button_step_3', {
      email: formData?.email,
      name: formData?.name,
      username: formData?.username,
      topic_id: selectedTopics.map(topic => topic.id).join(','),
      topic_name: selectedTopics.map(topic => topic.label).join(','),
    });
    if (selectedTopics.length < 3) {
      Alert.alert('Error', 'Please select at least one topic');
      return;
    }

    try {
      setLoading(true);
      const registerData = {
        ...formData,
        favorite_topic_ids: selectedTopics.map(t => t.id),
      };

      const res = await investlyServices.register(registerData);
      if (res.status === 200) {
        analytics().logEvent('success_register_account', {
          email: formData?.email,
          name: formData?.name,
          username: formData?.username,
          topic_id: selectedTopics.map(topic => topic.id).join(','),
          topic_name: selectedTopics.map(topic => topic.label).join(','),
        });
        navigation.navigate('HomeTab');
        setLoading(false);
        storageServices.setLoginData(res?.data?.data as any);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'HomeTab'}],
          }),
        );
        onDisplayNotification({
          title: 'Horrrayy!, Daftar Berhasil!',
          body: 'Akun Berhasil Terdaftar!!',
          subtitle: 'success',
        });
      } else {
        setLoading(false);
        analytics().logEvent('failed_register_account', {
          email: formData?.email,
          name: formData?.name,
          username: formData?.username,
          topic_id: selectedTopics.map(topic => topic.id).join(','),
          topic_name: selectedTopics.map(topic => topic.label).join(','),
        });
        Alert.alert(
          'Registration failed',
          res?.data?.messages || 'An error occurred',
        );
      }
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
          inputState?.email?.isValid &&
            inputState?.password?.isValid &&
            inputState?.confirmPassword?.isValid,
        ),
      );
    } else if (currentStep === 2) {
      setIsValid(
        Boolean(inputState?.name?.isValid && inputState?.username?.isValid),
      );
    }
  }, [currentStep, inputState]);

  useEffect(() => {
    fetcMasterTopics();
  }, [fetcMasterTopics]);

  const renderTopicItem = ({item}: {item: TopicMaster}) => (
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
                inputState?.email?.states as 'default' | 'positive' | 'negative'
              }
              message={inputState?.email?.errorMessage}
              onChangeText={text => handleInputChange('email', text)}
              value={formData?.email}
            />
            <TextField
              type="password"
              label="Password"
              placeholder="Masukan Password Kamu"
              state={
                inputState?.password?.states as
                  | 'default'
                  | 'positive'
                  | 'negative'
              }
              message={inputState?.password?.errorMessage}
              onChangeText={text => handleInputChange('password', text)}
              value={formData?.password}
            />
            <TextField
              type="password"
              label="Konfirmasi Password"
              placeholder="Masukan Konfirmasi Password"
              state={
                inputState?.confirmPassword?.states as
                  | 'default'
                  | 'positive'
                  | 'negative'
              }
              message={inputState?.confirmPassword?.errorMessage}
              onChangeText={text => handleInputChange('confirmPassword', text)}
              value={formData?.confirmPassword}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              label="Nama"
              placeholder="Masukan Nama Kamu"
              state={
                inputState?.name?.states as 'default' | 'positive' | 'negative'
              }
              message={inputState?.name?.errorMessage}
              onChangeText={text => handleInputChange('name', text)}
              value={formData?.name}
            />
            <TextField
              label="Username"
              placeholder="Masukan Username Kamu"
              state={
                inputState?.username?.states as
                  | 'default'
                  | 'positive'
                  | 'negative'
              }
              message={inputState?.username?.errorMessage}
              onChangeText={text => handleInputChange('username', text)}
              value={formData?.username}
            />
          </>
        );
      case 3:
        return (
          <FlatList
            data={topics?.data || []}
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
          {currentStep === 1 && (
            <Button
              type="text-only"
              variant="link"
              size="medium"
              onPress={handleBack}>
              Masuk
            </Button>
          )}
        </View>
      </View>
      <View style={styles.container}>
        <Typography size="large" type="heading" style={styles.centerText}>
          {STEP_TITLE[currentStep - 1]}
        </Typography>
        <View style={styles.formContainer}>{renderStepContent()}</View>
        <View style={styles.stepContainer}>
          <StepperIndicator currentStep={currentStep} totalSteps={3} />
          <Button
            type="text-only"
            variant="primary"
            size="medium"
            disabled={!isValid || loading}
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
  stepContainer: {gap: 12, paddingBottom: 32},
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
