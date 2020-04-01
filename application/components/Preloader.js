import React, { Component } from 'react';
import {
    ActivityIndicator, // sirve para mostrar el preloeader
    View,
    StyleSheet, // para crear estilos dinamicos
    Dimensions
} from 'react-native';

export default class PreLoader extends Component {
    render() {
        return (
            <View style={[styles.preloader]}>
                <ActivityIndicator style={{ height: 80 }} size="large" />
            </View>
        )
    }
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({ // create recibe un objeto y dentro de el podemos definir otros objetos para darle estilo a nuestros componentes
    preloader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: 'transparent'
    }
});