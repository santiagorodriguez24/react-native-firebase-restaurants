import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import AppButton from "../components/AppButton";
import { NavigationActions } from 'react-navigation'; // permite definir la navegacion hacia otras paginas como la de login y la de registro
import Toast from 'react-native-simple-toast'; // permite mostrar una notificacion por ejemplo ante un inicio correcto o un error
import * as firebase from 'firebase'; // permite que hagamos la autenticacion utilizando el servicio de firebase
import facebook from '../utils/facebook';

export default class Start extends Component {
	// se define la propiedad title para mostrar en la cabecera de la navegacion
	static navigationOptions = {
		title: 'Nexo'
	};

	login() { // inicio de sesion mediante mail y password	
		const navigateAction = NavigationActions.navigate({
			routeName: 'Login'
		}); // el metodo navigate recibe el nombre de la ruta y los parametros 
		this.props.navigation.dispatch(navigateAction); /* como start esta dentro de las navegaciones se puede navegar hacia otra pantalla desde aqui. Similar al navegador web solo permite usar this.props.history si estas en un componente principal que tenga su propia ruta de acceso asociada. */
	}

	register() { // registro mediante mail y password
		const navigateAction = NavigationActions.navigate({
			routeName: 'Register'
		});
		this.props.navigation.dispatch(navigateAction);
	}

    /* 
    los operadores async/await permiten trabajar con las promesas como si fueran funciones síncronas que devuelven directamente 
    valores en vez de promesas. await bloquea la ejecución del codigo hasta que la promesa sean resuelta (terminada o rechazada), una
    vez resuelta, el hilo de ejecución regresa a la funcion async para continuar donde se quedo. 
    */
	async facebook() { // inicio de sesion mediante el perfil de facebook
		const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
			facebook.config.application_id,
			{ permissions: facebook.config.permissions }
		);
		// el type nos permite saber el resultado de la ejecucuion del metodo

		if (type === "success") { // Todo ha ido bien
			const credentials = firebase.auth.FacebookAuthProvider.credential(token); /* credenciales que facebook devuelve para iniciar
			sesion con credenciales en firebase */
			firebase.auth().signInWithCredential(credentials)
				.catch(error => {
					Toast.showWithGravity('Error accediendo con facebook', Toast.LONG, Toast.BOTTOM);
				})
		} else if (type === "cancel") { // usuario ha cancelado el inicio
			Toast.showWithGravity('Inicio de sesón cancelado', Toast.LONG, Toast.BOTTOM);
		} else { // cualquier otro error
			Toast.showWithGravity('Error desconocido', Toast.LONG, Toast.BOTTOM);
		}
	}

	render() {
		return (
			<BackgroundImage source={require('../../assets/images/FondoFood-claro-2.png')}>
				<View style={{ justifyContent: 'center', flex: 1 }}>
					<AppButton
						bgColor="rgba(111, 38, 74, 0.9)" // 3 primeros color de fondo, el 4to valor le agrega un poco de transparencia
						title="Entrar"
						action={this.login.bind(this)}
						iconName="sign-in"
						iconSize={30}
						iconColor="#fff"
					/>
					<AppButton
						bgColor="rgba(200, 200, 50, 0.9)"
						title="Registrarme"
						action={this.register.bind(this)}
						iconName="user-plus"
						iconSize={30}
						iconColor="#fff"
					/>
					<AppButton
						bgColor="rgba(67, 67, 146, 0.9)"
						title="Facebook"
						action={this.facebook.bind(this)}
						iconName="facebook"
						iconSize={30}
						iconColor="#fff"
					/>
				</View>
			</BackgroundImage>
		);
	}
}