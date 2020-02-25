import React from 'react';
import {StackNavigator} from "react-navigation"; // permite navegar entre las paginas
import StartScreen from "../screens/Start";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";

export default StackNavigator(
	{ // se pasan las pantallas a traves de las cuales navegar
		Start: {
			screen: StartScreen
		},
		Login: {
			screen: LoginScreen
		},
		Register: {
			screen: RegisterScreen
		},
	},
	{
		initialRouteName: 'Start', // nombre de primera ruta
		navigationOptions: {
			headerStyle: {
                backgroundColor: '#F3390B'
			},
			headerTitleStyle: {
				textAlign: 'center',
                alignSelf: 'center',
                marginRight: 'auto',
                marginLeft: 'auto',
				fontSize: 20,
				color: '#fff',
				fontWeight: 'bold'
			}
		}
	}
)