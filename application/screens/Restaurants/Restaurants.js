import React, { Component } from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import PreLoader from "../../components/PreLoader";
import { StyleSheet, FlatList, Image } from 'react-native';
import { ListItem } from "react-native-elements";
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import RestaurantEmpty from "../../components/Restaurant/RestaurantEmpty";
import RestaurantAddButton from "../../components/Restaurant/RestaurantAddButton";

export default class Restaurants extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            loaded: false,
            restaurant_logo: require('../../../assets/images/burguer.png')
        };

        // referencia a la base de datos de firebase
        this.refRestaurants = firebase.database().ref().child('restaurants');
    }

    componentDidMount() {
        this.refRestaurants.on('value', snapshot => {
            let restaurants = [];
            // en snapshot tenemos una copia de la lista de restaurantes guardada
            snapshot.forEach(row => {
                restaurants.push({
                    id: row.key,
                    name: row.val().name,
                    address: row.val().address,
                    capacity: row.val().capacity,
                    description: row.val().description
                })
            });

            this.setState({
                restaurants,
                loaded: true // ya ha cargado la aplicacion.
            });
        })
    }

    addRestaurant() {
        // Navegamos al formulario para dar de alta un restaurante
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddRestaurant'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    restaurantDetail(restaurant) {
        // ver el detalle de cada uno de los restaurantes
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailRestaurant',
            params: { restaurant }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderRestaurant(restaurant) {
        // Muestra cada uno de los restaurantes pasados en la propiedad data de FlatList
        return (
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                title={`${restaurant.name} (Capacidad: ${restaurant.capacity})`}
                leftAvatar={{ rounded: true, source: this.state.restaurant_logo }}
                onPress={() => this.restaurantDetail(restaurant)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', iconStyle: styles.listIconStyle }}
                bottomDivider // solo se muestra en el primero nose porque
            // chevron={{ color: 'white' }} // flechita a la derecha
            />
        )
    }

    render() {
        const { loaded, restaurants } = this.state;

        if (!loaded) {
            return <PreLoader />
        }

        if (!restaurants.length) {
            return (
                <BackgroundImage source={require('../../../assets/images/FondoFood-Claro.png')}>
                    <RestaurantEmpty text="No hay restaurantes disponibles" />
                    <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)} />
                </BackgroundImage>
            );
        }

        return (
            <BackgroundImage source={require('../../../assets/images/FondoFood-Claro.png')}>

                <FlatList // permite renderizar una lista de componentes
                    // arreglo de datos
                    data={restaurants}
                    // se ejecuta en cada iteracion sobre los elementos de data
                    renderItem={(data) => this.renderRestaurant(data.item)}
                    // siempre que se use flatlist se debe añadir el keyExtractor para que le añada un key a cada uno de los items
                    keyExtractor={(data) => data.id}
                />

                <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)} />
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(242,208,160, 0.6)'
    },
    item: {
        padding: 8,
        backgroundColor: 'rgba(71,11,11, 0.9)',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    }
});