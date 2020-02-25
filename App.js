import React from 'react';
import { StyleSheet } from 'react-native';
import {View} from 'react-native';
// config para utilizar firebase
import firebaseConfig from './application/utils/firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig); // este metodo inicializa la configuracion de firebase
import GuestNavigation from './application/navigations/guest';
import PreLoader from './application/components/Preloader';
import BackgroundImage from './application/components/BackgroundImage';
import AppButton from './application/components/AppButton';
import { Text } from 'react-native-elements';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLogged: false,
			loaded: false  // si el componente ya se ha cargado
		}
	}

	async componentDidMount() { //cuando el componente este cargado
		await firebase.auth().onAuthStateChanged((user) => { /* se define un observador que ejecuta la funcion que se le pasa como argumento
      cuando hay cambios en la autenticacion del usuario. La funcion recibe como parametro al objeto usuario. */
			if (user !== null) { // si el usuario esta identidicado
				console.log('usuario autenticado ', user);
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

	cerrarSesion (){
		firebase.auth().signOut(); // cerrar la sesion abierta con firebase. 
	}

	render() {
		const { isLogged, loaded } = this.state;

		console.log('render de app js con estado: ', this.state);

		if (!loaded) { // si no se ha cargado la validacion del usuario aun se retorna el preloader
			return (<PreLoader />);
		}

		if (isLogged) { // si el usuario esta identificado
			return (
				<BackgroundImage source={require('./assets/images/FondoFood-claro-2.png')}>
				<View style={{justifyContent: 'center', flex: 1}}> 
					<Text>Logueado</Text>
					<AppButton
						bgColor="rgba(67, 67, 146, 0.9)"
						title="Cerrar Sesión"
						action={this.cerrarSesion.bind(this)}
						iconName="sign-out"
						iconSize={30}
						iconColor="#fff"
					/>
				</View>
			</BackgroundImage>
			)
			// (<LoggedNavigation />);
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
});
