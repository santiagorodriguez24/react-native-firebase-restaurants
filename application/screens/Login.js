import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import AppButton from "../components/AppButton";
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';
import t from 'tcomb-form-native';
import { Card } from "react-native-elements";

const Form = t.form.Form; // tag html utilizado para montar el formulario

export default class Login extends Component {

	constructor() {
		super();

		this.user = t.struct({	// se define la estructura que debe tener un objeto valido para este formulario
			email: t.refinement(t.String, (s) => {	// se le pasa el tipo de dato que llegara y el valor 
				return /@/.test(s);	// usando regex el texto pasado tiene que contener un arroba sino no sera valido. 
			}),
			password: t.refinement(t.String, (s) => {
				return s.length >= 6;	// la contraseña debe tener como minimo 6 caracteres. 
			})
		});

		this.options = {	// se definen los campos del formulario
			fields: {
				email: {
					help: 'Introduce tu email',	// mensaje de ayuda al usuario, placeholder
					error: 'Email incorrecto',	// se muestra si el usuario hace submit y los datos enviados no pasan la validacion
					autoCapitalize: 'none',	// email no debe empezar con mayusculas o si se hace un espacio no aparece mayusculas
				},
				password: {
					help: 'Introduce tu password',
					error: 'Password incorrecto',
					password: true, // hace que aparezcan los asteriscos que ocultan la contraseña real
					secureTextEntry: true,
				}
			}
		};
	}

	login() {
		/* accedemos al formulario a partir de la referencia que le hemos agregado y al llamar a getValue se ejecuta la validacion 
		de todos los campos definidos en la estructura pasada como type. Si la validacion falla se devuelve null y se resaltan los
		errores, de lo contrario se optiene una instancia del formulario. */
		const validate = this.refs.form.getValue();

		if (validate) {
			// permite iniciar secion con email y password. devuelve una promesa
			firebase.auth().signInWithEmailAndPassword(validate.email, validate.password)
				.then(() => {
					// si la promesa se resuelve con exito se muestra un toast
					Toast.showWithGravity("Bienvenido", Toast.LONG, Toast.BOTTOM);
				})
				.catch((error) => {
					const errorCode = error.code; // puede contener uno de los muchos tipos de errores
					const errorMessage = error.message;
					if (errorCode === 'auth/wrong-password') {
						// si el password es incorrecto mostramos un toast con un mensaje personalizado  
						Toast.showWithGravity('Password incorrecto', Toast.LONG, Toast.BOTTOM);
					} else {
						// para cualquier otro error se muestra el mensaje devuelto por el servicio de login
						Toast.showWithGravity(errorMessage, Toast.LONG, Toast.BOTTOM);
					}
				});
		}
	}

	render() {
		return (
			<BackgroundImage source={require('../../assets/images/FondoFood-Claro.png')}>
				<View>
					<Card wrapperStyle={{ paddingLeft: 10 }} title="Iniciar sesión">
						<Form
							ref="form"
							type={this.user}
							options={this.options}
						/>
						<AppButton
							bgColor="#F3390B"
							title="Login"
							action={this.login.bind(this)}
							iconName="sign-in"
							iconSize={30}
							iconColor="#fff"
						/>
					</Card>
				</View>
			</BackgroundImage>
		)
	}
}