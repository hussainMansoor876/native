import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import login from './login';
import SignupForm from './SignupForm';

const loginscreen = createSwitchNavigator({
  login: {
    screen: login
    },

    SignupForm: {

  screen: SignupForm
    }
});

 export default AppContainer = createAppContainer(loginscreen);

