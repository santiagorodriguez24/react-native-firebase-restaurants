import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

export default class BackgroundImage extends Component {
	render () {
        const {source, children} = this.props; 
		return (
			<ImageBackground
				source={source} // fuente de la imagen a renderizar
				style={{flex: 1, width: null, height: null}} // que ocupe todo el espacio de la pantalla
			>
				{children}
			</ImageBackground>
		)
	}
}