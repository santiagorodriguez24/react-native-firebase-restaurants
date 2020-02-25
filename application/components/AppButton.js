import React, { Component } from 'react'; // component para poder crear nuestro componente
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';  // para mostar un icono
import { Dimensions } from 'react-native'; // permite saber el ancho y el alto del dispositivo que esta usando la app

export default class AppButton extends Component {
    render() {
        const { action, iconName, iconColor, title, bgColor } = this.props;
        const { width } = Dimensions.get('window'); // 100% de la pantalla donde se abre la app
        return (
            <Button
                onPress={action} // evento requerido que recibe la accion pasada por props
                buttonStyle={{
                    backgroundColor: bgColor,
                    height: 45,
                    width: '95%',
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5,
                    marginBottom: 8,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    // width: width // boton ocupa todo el ancho
                }}
                title={title} 
                icon={
                    <Icon
                        name={iconName}
                        size={15}
                        color={iconColor}
                        style={{marginLeft: 8, marginBottom: -3}}
                    />
                }
                text={title} // texto que va a aparecer
                iconRight={true} // icono siempre se muestra a la derecha del boton. 
            >
            </Button>
        );
    }
}