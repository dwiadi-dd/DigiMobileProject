/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC} from 'react';
import {AuthProvider} from '@contexts/AuthContext';
import {PostsProvider} from '@contexts/PostContext';
import MainNavigation from '@navigations/index';

const App: FC = () => {
  return (
    <PostsProvider>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </PostsProvider>
  );
};
export default App;
