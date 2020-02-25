import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import AppButton from "../components/AppButton";
import {Card} from "react-native-elements";
import Toast from 'react-native-simple-toast';

import t from 'tcomb-form-native';
const Form = t.form.Form;
import FormValidation from '../utils/validation';

import * as firebase from 'firebase';

export default class Register extends Component {
	constructor () {
		super();

		this.state = {
			user: {}
		};

		this.samePassword = t.refinement(t.String, (s) => {
			return s === this.state.user.password
		});

		this.user = t.struct({
			email: FormValidation.email, // se le pasa la funcion de validacion definida en el archivo validation.js
			contraseña: FormValidation.password, 
			confirmacion_de_contraseña: this.samePassword // se le pasa la funcion de validacion definida arriba
		});

		this.options = {
			fields: {
				email: {
					placeholder: 'Introduce un email',
					error: 'Email incorrecto',
					autoCapitalize: 'none',
				},
				contraseña: {
					placeholder: 'Introduce una contraseña',
					error: 'Password incorrecto',
					password: true,
					secureTextEntry: true,
				},
				confirmacion_de_contraseña: {
					placeholder: 'Repite la contraseña',
					error: 'Los passwords no coinciden',
					password: true,
					secureTextEntry: true,
				}
			}
		};

		this.validate = null;
	}

	register () {
        this.validate = this.refs.form.getValue();
        if(this.validate) {
			// firebase.auth().createUserWithEmailAndPassword(
			// 	this.validate.email, this.validate.password
			// )
			// 	.then(() => {
			// 		Toast.showWithGravity('Registro correcto, bienvenido', Toast.LONG, Toast.BOTTOM);
			// 	})
			// 	.catch (err => {
			// 		Toast.showWithGravity(err.message, Toast.LONG, Toast.BOTTOM);
            // 	})
            console.log("Registro valido");
		}
	}

	onChange (user) {
        console.log('se ejecuta el metodo onchange')
		this.setState({user});
		// this.validate = this.refs.form.getValue();  // se ejecuta la validacion cada vez que se pulsa una tecla
	}

	render () {
		return (
			<BackgroundImage source={require('../../assets/images/FondoFood-claro-2.png')}>
				<View>
					<Card wrapperStyle={{paddingLeft: 10}} title="Regístrate">
						<Form
							ref="form"
							type={this.user}
							options={this.options}
                            onChange={(v) => this.onChange(v)} /* a medida que cambia el formulario 
                            vamos mandando al metodo onChange los valores que sus campos van tomando*/
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