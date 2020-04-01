import React from 'react';
import { StyleSheet } from 'react-native';
import firebaseConfig from './application/utils/firebase';
import * as firebase from 'firebase';
import GuestNavigation from './application/navigations/guest';
import LoggedNavigation from './application/navigations/logged';
import PreLoader from './application/components/PreLoader';

// se inicializa la configuracion de firebase
firebase.initializeApp(firebaseConfig);

// evita que aparescan warnings en la pantalla del telefono
console.disableYellowBox = true;

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLogged: false,
			loaded: false
		}
	}

	async componentDidMount() {
		/*
		Se define un observador que ejecuta la funcion que se le pasa como argumento cuando hay
		cambios en la autenticacion del usuario. La funcion recibe como parametro al objeto usuario.
		*/
		await firebase.auth().onAuthStateChanged((user) => {
			if (user !== null) { // si el usuario esta identidicado
				this.setState({
					isLogged: true,
					loaded: true
				});
			} else {
				this.setState({
					isLogged: false,
					loaded: true
				});
			}
		})
	}


	render() {
		const { isLogged, loaded } = this.state;

		// si no se ha cargado la validacion del usuario aun se retorna el preloader
		if (!loaded) {
			return (<PreLoader />);
		}

		// si el usuario esta identificado
		if (isLogged) {
			return (
				<LoggedNavigation />
			)
		} else {
			return (<GuestNavigation />);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	texto: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		flexDirection: 'row',
	}
});
