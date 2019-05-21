import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import AppContainer  from './Router';

class SignupForm extends React.Component {
	state = {
		email: '',
		password: '',
		error: '',
		loading: false,
		username: '',
		confirmpassword: '',
		number: '',
		userrole: ''
	};

	onButtonPress() {
		const { email, password, confirmpassword, username, number } = this.state;
		this.setState({ error: '', loading: true });

		if (email === '' || password === '' || confirmpassword === '' || username === '' || number === '') {
			this.setState({ error: 'empty inputs', loading: false });
		} else if (username.length < 2) {
			this.setState({ error: 'use appropiate username', loading: false });
		} else if (number.length < 11) {
			this.setState({ error: 'number less than 11 digits', loading: false });
		} else if (password !== confirmpassword) {
			this.setState({ error: 'password not equal', loading: false });
		} else {
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(this.updateuser.bind(this))
				.then(this.onLoginSuccess.bind(this))
				.catch(this.onLoginFail.bind(this));
		}
	}

	onLoginFail() {
		this.setState({ error: 'Authentication Failed', loading: false });
	}

	onLoginSuccess() {
		this.setState({

			email: '',

			password: '',

			loading: false,

			error: '',
			confirmpassword: '',
			username: '',
			number: ''

		});
	}

	updateuser() {
		const { email, password, username, number } = this.state;
		this.setState({ userrole: 'user' });
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const skey = firebase.database().ref().child('userstable').push();
				const send = {
					username,
					password,
					email,
					number,
					userrole: 'user',
					uid: skey.key
				};
				skey.update(send);
			} else {
				this.setState({ error: 'updation Failed', loading: false });
			}
		});
	}

	numbercheck(number) {
		this.setState({ number });
		//const USERS_LOCATION = 'https://authentication-6c788.firebaseio.com';

		//const numexists = new firebase(USERS_LOCATION);
		firebase.database.child('userstable').orderByChild('number').equalTo(number).once('value',
			snapshot => {
				if (snapshot.exists()) {
					const userData = snapshot.val();
					this.setState({ error: 'number already exists', loading: false, userData });
				}
			});
	}


	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />;
		}
		return (

			<Button onPress={this.onButtonPress.bind(this)}>

				Sign in

      </Button>

		);
	}

	render() {
		return (
			<View>
				<AppContainer />
				<Card>
					<CardSection>
						<Input
							placeholder="user@gmail.com"
							label="Email"
							value={this.state.email}
							onChangeText={email => this.setState({ email })}

						/>

					</CardSection>

					<CardSection>
						<Input
							placeholder="username"
							label="Username"
							value={this.state.username}
							onChangeText={username => this.setState({ username })}

						/>

					</CardSection>


					<CardSection>
						<Input
							secureTextEntry
							placeholder="password"
							label="password"
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
						/>
					</CardSection>

					<CardSection>
						<Input
							secureTextEntry
							placeholder="confirm password"
							label="password"
							value={this.state.confirmpassword}
							onChangeText={confirmpassword => this.setState({ confirmpassword })}
						/>
					</CardSection>
					<CardSection>
						<Input
							secureTextEntry
							placeholder="03xxxxxxxxx"
							label="number"
							value={this.state.number}
							onChangeText={number => this.setState({ number })}
						/>
					</CardSection>

					<Text style={styles.errorTextStyle}>
						{this.state.error}
					</Text>

					<CardSection>
						{this.renderButton()}
					</CardSection>

					<CardSection>
						<Button onPress={this.props.navigation.navigate('login')} title="login" />
					</CardSection>
				</Card>
			</View>

		);
	}

}

const styles = {

	errorTextStyle: {

		fontSize: 20,

		alignSelf: 'center',

		color: 'red'

	},

	LinkTextStyle: {

		fontSize: 20,

		color: '#007aff',

		fontWeight: '600',

		paddingTop: 10,

		paddingBottom: 10

	}
};

export default SignupForm;
