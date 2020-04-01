import React from 'react';
import { StyleSheet } from 'react-native';
// config para utilizar firebase
import firebaseConfig from './application/utils/firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig); // este metodo inicializa la configuracion de firebase
import GuestNavigation from './application/navigations/guest';
import LoggedNavigation from './application/navigations/logged';
import PreLoader from './application/components/PreLoader';

// evita que aparescan warnings en la pantalla del telefono
console.disableYellowBox = true;

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLogged: false,
			loaded: false  // si el componente ya se ha cargado
		}
	}

	async componentDidMount() { //cuando el componente este cargado
		/* se define un observador que ejecuta la funcion que se le pasa como argumento cuando hay cambios en la autenticacion del usuario. La funcion recibe como parametro al objeto usuario. */
		await firebase.auth().onAuthStateChanged((user) => {
			if (user !== null) { // si el usuario esta identidicado
				this.setState({
					isLogged: true,
					loaded: true // componente ha cargado
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

		if (!loaded) { // si no se ha cargado la validacion del usuario aun se retorna el preloader
			return (<PreLoader />);
		}

		if (isLogged) { // si el usuario esta identificado
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
		flexDirection: 'row', // tanto espacio como pueda en horizontal
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
