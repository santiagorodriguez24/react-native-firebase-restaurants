import React, { Component } from 'react';
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';

export default class Logout extends Component {

	componentDidMount() {
		firebase.auth().signOut()
			.then(() => {
				Toast.showWithGravity("Has cerrado sesión correctamente", Toast.LONG, Toast.BOTTOM);
			})
			.catch(error => {
				Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
			})
	}


	// Como este componente solo representara una funcionalidad y no va a renderizar contenido se retorna null 
	render() {
		return null;
	}
}