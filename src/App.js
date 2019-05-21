import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, CardSection, Button, Spinner } from './components/common';
import SignupForm from './components/SignupForm';
import AppContainer  from './components/Router';

class App extends Component {
  state = { loggedIn: false };

  componentWillMount() {
    firebase.initializeApp({

      apiKey: 'AIzaSyAePr7g5A9VQmXzixFBGK8MJmaouIVdo3c',
      authDomain: 'authentication-6c788.firebaseapp.com',
      databaseURL: 'https://authentication-6c788.firebaseio.com',
      projectId: 'authentication-6c788',
      storageBucket: 'authentication-6c788.appspot.com',
      messagingSenderId: '1016695109110',
      appId: '1:1016695109110:web:49483c4c2e0d25d7'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {

      case true:

        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </CardSection>
        );

      case false:

        return (
          <SignupForm />

        );


      default:

        return <Spinner size="large" />;

    }
  }
  render() {
    return (


      <View>
        <Header headerText="authentication" />


        {this.renderContent()}

        <AppContainer />
      </View>

);
  }

}
export default App;
