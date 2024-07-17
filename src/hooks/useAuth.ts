import {useContext} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '@contexts/AuthContext';

const useAuth = <T extends any[]>(action: (...args: T) => void) => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();

  return (...args: T) => {
    if (isAuthenticated) {
      action(...args);
    } else {
      navigation.navigate('Login');
    }
  };
};

export default useAuth;
