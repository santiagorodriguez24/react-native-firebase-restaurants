import React, { Component } from 'react'; // component para poder crear nuestro componente
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';  // para mostar un icono
import { Dimensions } from 'react-native'; // permite saber el ancho y el alto del dispositivo que esta usando la app

export default class AppButton extends Component {
    render() {
        const { action, iconName, iconColor, title, bgColor, setWidth } = this.props;
        // Dimensions.get('window') 100% de la pantalla donde se abre la app. El objeto window tiene la prop width
        const { width: windowWidth } = Dimensions.get('window');

        const baseStyles = {
            backgroundColor: bgColor,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            marginBottom: 8,

        };

        // si no se especifica el width el boton se ajusta al ancho disponible en su contenedor
        if (setWidth) {
            Object.assign(baseStyles, {
                marginLeft: 'auto',
                marginRight: 'auto',
                width: windowWidth * 0.95 // boton ocupa un 95% del ancho de la pantalla
            })
        }

        return (
            <Button
                onPress={action} // evento requerido que recibe la accion pasada por props
                buttonStyle={baseStyles}
                title={title}
                icon={
                    <Icon
                        name={iconName}
                        size={15}
                        color={iconColor}
                        style={{ marginLeft: 8, marginBottom: -3 }}
                    />
                }
                text={title} // texto que va a aparecer
                iconRight={true} // icono siempre se muestra a la derecha del boton. 
            >
            </Button>
        );
    }
}