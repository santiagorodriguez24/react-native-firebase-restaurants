import React, { Component } from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import AppButton from "../../components/AppButton";
import { View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { options, Restaurant } from '../../forms/restaurant';
import t from 'tcomb-form-native';
import { Card } from "react-native-elements";
const Form = t.form.Form;
import { NavigationActions } from 'react-navigation';

export default class EditRestaurant extends Component {
	constructor(props) {
		super(props);
		const { params } = props.navigation.state; // parametros que llegan desde el componente DetailRestaurant
		this.state = {
			restaurant: params.restaurant
		};
	}

	update() {
		const validate = this.refs.form.getValue();
		if (validate) {
			// toma el objeto struct devuelto por tcomb y lo convierte en un objeto comun de JS
			let data = Object.assign({}, validate);
			const ref = firebase.database().ref().child(`restaurants/${this.state.restaurant.id}`);
			ref.update(data).then(() => {
				// al resolverse la promesa se navega al detail restaurant
				const navigateAction = NavigationActions.navigate({
					routeName: 'DetailRestaurant',
					params: { restaurant: this.state.restaurant }
				});
				this.props.navigation.dispatch(navigateAction);
			})
		}
	}

	onChange(restaurant) {
		// cada vez que se actualiza el formulario se guarda en el estado los nuevos valores
		this.setState({ restaurant });
	}

	render() {
		const { restaurant } = this.state;
		return (
			<BackgroundImage source={require('../../../assets/images/FondoFood-Claro.png')}>
				<View style={styles.container}>
					<Card title="Editar restaurante">
						<View>
							<Form
								ref="form"
								type={Restaurant}
								options={options}
								value={restaurant}
								onChange={(v) => this.onChange(v)}
							/>
						</View>
						<AppButton
							bgColor="rgba(255, 38, 74, 0.9)"
							title="Actualizar"
							action={this.update.bind(this)}
							iconName="pencil"
							iconSize={30}
							iconColor="#fff"
						/>
					</Card>
				</View>
			</BackgroundImage>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(231, 228, 224, 0.8)',
		padding: 10
	}
});