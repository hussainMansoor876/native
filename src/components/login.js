import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Card, CardSection } from './common';
import AppContainer from './Router';

class login extends Component {

	render() {
		return (
			<View>
				<AppContainer />
			<Card>
					<CardSection>
						<Button onPress={this.props.navigation.navigate('SignupForm')}>
							login
		</Button>
					</CardSection>
				</Card>
			</View>

		);
	}
}

export default login;
