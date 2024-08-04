import {NavigationProp, useNavigation} from '@react-navigation/native';
import storageServices from '@services/storageServices';

const useAuth = <T extends any[]>(action: (...args: T) => void) => {
  const isLoggedIn = storageServices.getLoginData().isLoggedIn;
  const navigation = useNavigation<NavigationProp<any>>();

  return (...args: T) => {
    if (isLoggedIn) {
      action(...args);
    } else {
      navigation.navigate('Login');
    }
  };
};

export default useAuth;
