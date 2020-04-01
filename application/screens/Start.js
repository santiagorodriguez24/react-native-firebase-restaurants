import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import AppButton from "../components/AppButton";
import { NavigationActions } from 'react-navigation'; // permite definir la navegacion hacia otras paginas como la de login y la de registro
import Toast from 'react-native-simple-toast'; // permite mostrar una notificacion por ejemplo ante un inicio correcto o un error
import * as firebase from 'firebase'; // permite que hagamos la autenticacion utilizando el servicio de firebase
import facebookConfig from '../utils/facebook';
import * as Facebook from 'expo-facebook';

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
		let facebookResponse = {};
		try {
			await Facebook.initializeAsync(facebookConfig.config.application_id);
			facebookResponse = await Facebook.logInWithReadPermissionsAsync(
				{ permissions: facebookConfig.config.permissions }
			);
		} catch (error) {
			console.log('Error al hacer login con facebook: ', error);
		}

		// el type nos permite saber el resultado de la ejecucion del metodo
		const { type, token } = facebookResponse;

		if (type === "success") { // Todo ha ido bien
			// credenciales que facebook devuelve para iniciar sesion con credenciales en firebase
			const credentials = firebase.auth.FacebookAuthProvider.credential(token);
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
			<BackgroundImage source={require('../../assets/images/FondoFood-Claro.png')}>
				<View style={{ justifyContent: 'center', flex: 1 }}>
					<AppButton
						bgColor="rgba(111, 38, 74, 0.9)" // 3 primeros color de fondo, el 4to valor le agrega un poco de transparencia
						title="Entrar"
						action={this.login.bind(this)}
						iconName="sign-in"
						iconSize={30}
						iconColor="#fff"
						setWidth={true}
					/>
					<AppButton
						bgColor="rgba(200, 200, 50, 0.9)"
						title="Registrarme"
						action={this.register.bind(this)}
						iconName="user-plus"
						iconSize={30}
						iconColor="#fff"
						setWidth={true}
					/>
					<AppButton
						bgColor="rgba(67, 67, 146, 0.9)"
						title="Facebook"
						action={this.facebook.bind(this)}
						iconName="facebook"
						iconSize={30}
						iconColor="#fff"
						setWidth={true}
					/>
				</View>
			</BackgroundImage>
		);
	}
}