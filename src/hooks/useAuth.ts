import {useContext} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '@contexts/AuthContext';

// Modify useAuth to accept a function that can take any number of arguments
const useAuth = <T extends any[]>(action: (...args: T) => void) => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();

  // The returned function now accepts any number of arguments
  return (...args: T) => {
    if (isAuthenticated) {
      action(...args); // Spread the arguments when calling the action
    } else {
      navigation.navigate('Login');
    }
  };
};

export default useAuth;
