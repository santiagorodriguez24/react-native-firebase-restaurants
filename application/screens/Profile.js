import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import { Card, Input } from "react-native-elements";
import AppButton from "../components/AppButton";
import Toast from 'react-native-simple-toast';

export default class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				name: '',
				age: ''
			}
		}
	}

	componentDidMount() {
		this.fetch().then(() => {
			Toast.showWithGravity('Usuario obtenido.', Toast.LONG, Toast.BOTTOM);
		})
	}

	async save() {
		try {
			const user = {
				name: this.state.user.name,
				age: this.state.user.age
			};
			// el objeto se debe convertir a string para guardarlo en asyncStorage
			// setItem se usa tanto para guargar como para actualizar. 
			await AsyncStorage.setItem('user', JSON.stringify(user));
			Toast.showWithGravity('Usuario guardado correctamente.', Toast.LONG, Toast.BOTTOM);
		} catch (error) {
			Toast.showWithGravity('Error: Usuario no guardando.', Toast.LONG, Toast.BOTTOM);
		}
	}

	async fetch() {
		try {
			// se buscan los valores de la clave pasada como parametro a getItem
			let user = await AsyncStorage.getItem('user');
			// Si el usuario existe
			if (user) {
				// convertimos el usuario de string a objeto
				let parsed = JSON.parse(user);
				// lo dejamos disponible en el estado de la aplicacion
				this.setState({ user: parsed });
			}
		} catch (error) {
			Toast.showWithGravity('Error al obtener el usuario.', Toast.LONG, Toast.BOTTOM);
		}
	}

	updateUser(key, val) {
		let state = this.state.user;
		this.setState({
			user: Object.assign({}, state, {
				[key]: val
			})
		});
	}

	render() {
		const { user } = this.state;

		return (
			<BackgroundImage source={require('../../assets/images/FondoFood-Claro.png')}>
				<Card>
					<Input
						placeholder="Nombre del usuario"
						shake={true} // se sacude cuando hay un error en el feedback
						value={user.name}
						onChangeText={(val) => this.updateUser("name", val)}
					/>
					<Input
						placeholder="Edad del usuario"
						shake={true}
						value={user.age}
						onChangeText={(val) => this.updateUser("age", val)}
					/>
					<View style={{ marginTop: 12 }}>
						<AppButton
							bgColor="rgba(203, 78, 72, 0.9)"
							title="Guardar en local"
							action={this.save.bind(this)}
							iconName="save"
							iconSize={30}
							iconColor="#fff"
						/>
					</View>
				</Card>
			</BackgroundImage>
		);
	}

}