import React, { Component } from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import PreLoader from "../../components/PreLoader";
import { View, StyleSheet, FlatList } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
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
            restaurant_logo: require('../../../assets/images/burguer.png'),
            loading: false,
            search: ''
        };
    }

    componentDidMount() {
        const { search } = this.state;

        if (!search) {
            // referencia a todos los restaurantes de la base de datos de firebase cuando no hay una busqueda
            this.refRestaurants = firebase.database().ref().child('restaurants');
        } else {
            this._filterRestaurants(search);
        }

        this._loadFirebaseRestaurants();
    }

    _loadFirebaseRestaurants() {
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
                loaded: true,
                loading: false
            });
        });
    }

    searchRestaurants(search) {
        this.setState({
            search: search,
            loading: search.length >= 3 ? true : false
        });

        // solo se busca cuando el texto ingresado tiene 3 o mas caracteres
        if (search.length >= 3) {
            // hace la busqueda y mete los resultados a la referencia
            this._filterRestaurants(search);
            // se actualiza el estado con los restaurantes devueltos
            setTimeout(() => {
                this._loadFirebaseRestaurants();
            }, 1000);
        } else if (search.length == 0) {
            this.resetSearch();
        }

    }

    resetSearch() {
        this.setState({
            search: ''
        });
        // la referencia de los restaurantes son todos los restaurantes
        this.refRestaurants = firebase.database().ref().child('restaurants');
        setTimeout(() => {
            this._loadFirebaseRestaurants();
        }, 1000);
    }

    _filterRestaurants(searchParam) {
        // se pone la primera letra del texto buscado en mayusculas
        let search = searchParam.charAt(0).toUpperCase() + searchParam.slice(1);

        this.refRestaurants = firebase.database().ref().child('restaurants')
            .orderByChild('name') // ordena por nombre
            .startAt(search) // El nombre del restaurante debe empezar con el testo pasado en search
            .endAt(`${search}\uf8ff`); // el nombre puede continuar con cualquier caracter luego del texto en search

        /*
        El carácter \uf8ff utilizado en la consulta es un punto de código muy alto en el rango Unicode 
        (es un código de Área de uso privada [PUA]). 
        Debido a que está después de la mayoría de los caracteres regulares en Unicode, la consulta coincide con 
        todos los valores que comienzan con la variable de la consulta.
        */
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
                title={restaurant.name}
                subtitle={`(Capacidad: ${restaurant.capacity})`}
                subtitleStyle={{ color: 'white' }}
                leftAvatar={{ rounded: true, source: this.state.restaurant_logo }}
                onPress={() => this.restaurantDetail(restaurant)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', iconStyle: styles.listIconStyle }}
            />
        )
    }

    FlatListItemSeparator = () => <View style={styles.line} />;

    render() {
        const { loaded, restaurants, loading, search } = this.state;

        if (!loaded) {
            return <PreLoader />
        }

        const searchBar = (
            <SearchBar
                platform="android" // necesario para que ande el onClear y le de el look and feel de la plataforma
                showLoading={loading}
                cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                placeholder="Buscar Restaurante"
                onChangeText={(text) => this.searchRestaurants(text)}
                onClear={this.resetSearch.bind(this)}
                containerStyle={styles.SearchContainer}
                inputContainerStyle={styles.inputContainer}
                value={search}
            />
        );

        if (!restaurants.length) {
            return (
                <BackgroundImage source={require('../../../assets/images/FondoFood-Claro.png')}>
                    {searchBar}
                    <RestaurantEmpty text="No hay restaurantes disponibles" />
                    <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)} />
                </BackgroundImage>
            );
        }

        return (
            <BackgroundImage source={require('../../../assets/images/FondoFood-Claro.png')}>
                {searchBar}
                <FlatList // permite renderizar una lista de componentes
                    // arreglo de datos
                    data={restaurants}
                    // se ejecuta en cada iteracion sobre los elementos de data
                    renderItem={(data) => this.renderRestaurant(data.item)}
                    // siempre que se use flatlist se debe añadir el keyExtractor para que le añada un key a cada uno de los items
                    keyExtractor={(data) => data.id}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                />

                <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)} />
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontWeight: 'bold'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(242,208,160, 0.6)'
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(71,11,11, 0.9)',
    },
    line: {
        height: 1,
        width: "100%",
        backgroundColor: "rgba(255,255,255, 1)"
    },
    SearchContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(71,11,11, 0.9)',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    inputContainer: {
        backgroundColor: 'rgba(255,255,255, 0.9)'
    }
});