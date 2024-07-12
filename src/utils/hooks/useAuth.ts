import {useContext} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '@contexts/AuthContext';

const useAuth = (action: () => void) => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();

  return () => {
    if (isAuthenticated) {
      action();
    } else {
      navigation.navigate('Login');
    }
  };
};

export default useAuth;
