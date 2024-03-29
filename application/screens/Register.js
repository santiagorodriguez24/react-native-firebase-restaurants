import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import AppButton from "../components/AppButton";
import { Card } from "react-native-elements";
import Toast from 'react-native-simple-toast';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';

const Form = t.form.Form;
export default class Register extends Component {
	constructor() {
		super();

		this.state = {
			user: {}
		};

		// se define la estructura que deberia tener un objeto valido para este formulario
		this.user = t.struct({
			email: t.refinement(t.String, (s) => {    // se le pasa el tipo de dato que llegara y el valor 
				return /@/.test(s);  // usando regex el texto pasado tiene que contener un arroba sino no sera valido. 
			}),
			password: t.refinement(t.String, (s) => {
				return s.length >= 6;    // la contraseña debe tener como minimo 6 caracteres. 
			}),
			password_confirmation: t.refinement(t.String, (s) => {
				return s === this.state.user.password
			})
		});

		this.options = {
			fields: {
				email: {
					help: 'Introduce un email',
					error: 'Email incorrecto',
					autoCapitalize: 'none',
				},
				password: {
					help: 'Introduce una contraseña',
					error: 'Password incorrecto',
					password: true,
					secureTextEntry: true,
				},
				password_confirmation: {
					help: 'Repite la contraseña',
					error: 'Los passwords no coinciden',
					password: true,
					secureTextEntry: true,
				}
			}
		};

		this.validate = null;
	}

	register() {
		this.validate = this.refs.form.getValue();
		if (this.validate) {
			firebase.auth().createUserWithEmailAndPassword(
				this.validate.email, this.validate.password
			)
				.then(() => {
					Toast.showWithGravity('Registro correcto, bienvenido', Toast.LONG, Toast.BOTTOM);
				})
				.catch(err => {
					Toast.showWithGravity(err.message, Toast.LONG, Toast.BOTTOM);
				});
		}
	}

	onChange(user) {
		this.setState({ user });
		// this.validate = this.refs.form.getValue();  // se ejecuta la validacion cada vez que se pulsa una tecla
	}

	render() {
		return (
			<BackgroundImage source={require('../../assets/images/FondoFood-Claro.png')}>
				<View>
					<Card wrapperStyle={{ paddingLeft: 10 }} title="Regístrate">
						<Form
							ref="form"
							type={this.user}
							options={this.options}
							/* El metodo on change se ejecuta siempre que algun campo del formulario cambie y recibe como parametro
							los valores que dichos campos van tomando*/
							onChange={(v) => this.onChange(v)}
							value={this.state.user}
						/>
						<AppButton
							bgColor="#F3390B"
							title="Registrarme"
							action={this.register.bind(this)}
							iconName="user-plus"
							iconSize={30}
							iconColor="#fff"
						/>
					</Card>
				</View>
			</BackgroundImage>
		)
	}
}