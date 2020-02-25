import React, { Component } from 'react';
import {
    ActivityIndicator, // sirve para mostrar el preloeader
    View, // container para nuestro template
    StyleSheet, // para crear estilos dinamicos
    Dimensions
} from 'react-native';

const { height } = Dimensions.get('window'); // se puede definir afuera de la clase y usarlo en su interior

export default class PreLoader extends Component {
    render() {
        return (
            <View style={[styles.preloader]}>
                <ActivityIndicator style={{ height: 80 }} size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({ // create recibe un objeto y dentro de el podemos definir otros objetos para darle estilo a nuestros componentes
    preloader: {
        flex: 1, // queremos que ocupe tanto espacio como pueda
        flexDirection: 'column', // tanto espacio como pueda en vertical. 'row' ocupa tanto espacio como pueda en horizontal
        justifyContent: 'center', // centrar todos los elementos
        alignItems: 'center', // centrado vertical
        height: height, // alto de la pantalla
        backgroundColor: 'transparent'
    }
});