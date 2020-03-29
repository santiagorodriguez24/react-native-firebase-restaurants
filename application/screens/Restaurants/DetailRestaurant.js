import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView } from "react-native";
import BackgroundImage from "../../components/BackgroundImage";
import Restaurant from "../../components/Restaurant/Restaurant";
import CommentForm from "../../components/Comment/CommentForm";
import CommentList from "../../components/Comment/CommentList";

// clase para mostrar el detalle de un restaurante
export default class DetailRestaurant extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state; // parametro recibido desde la lista de Restaurants
        this.state = {
            restaurant: params.restaurant
        };
    }

    editRestaurant() {
        // mostramos el formulario para editar el restaurante
        const navigateAction = NavigationActions.navigate({
            routeName: 'EditRestaurant',
            params: { restaurant: this.state.restaurant }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    goHome() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ListRestaurants',
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const { restaurant } = this.state;
        return (
            <BackgroundImage source={require('../../../assets/images/FondoFood-Claro.png')}>
                {/* ScrollView es un componente que permite hacer Scroll en la pantalla para que no se pierdan componentes 
                    de la vista
                */}
                <ScrollView>

                    {/* Detalle del restaurante: titulo, imagen, rating y botones */}
                    <Restaurant
                        goHome={this.goHome.bind(this)}
                        editRestaurant={this.editRestaurant.bind(this)}
                        restaurant={restaurant}
                    />

                    {/* Detalle del restaurante: formulario de comentarios */}
                    <CommentForm restaurantId={restaurant.id} />


                    {/* Detalle del restaurante: listado de comentarios */}
                    <CommentList restaurantId={restaurant.id} /> 
                </ScrollView>
            </BackgroundImage>
        )
    }
}