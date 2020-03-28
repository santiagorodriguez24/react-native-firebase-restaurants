import React from 'react';
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";
import LogoutScreen from "../screens/Logout";
import DetailRestaurantScreen from "../screens/Restaurants/DetailRestaurant";
// import EditRestaurantScreen from "../screens/Restaurants/EditRestaurant";
// import ProfileScreen from "../screens/Profile";

import { DrawerNavigator, StackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const navigationOptions = {
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#F3390B',
		},
		headerTitleStyle: {
			textAlign: 'center',
			alignSelf: 'center',
			fontSize: 20,
			color: '#fff',
			fontWeight: 'bold'
		}
	}
};

/* Icono que permite abrir un side menu */
const leftIcon = (navigation, icon) => <Icon
	name={icon}
	style={{ marginLeft: 20 }}
	size={20}
	color="white"
	onPress={() => navigation.navigate('DrawerOpen')}
/>;

/* Icono que permite ir al listado de restaurantes */
const rightIcon = (navigation, icon) => <Icon
	name={icon}
	style={{ marginLeft: 20 }}
	size={30}
	color="white"
	onPress={() => navigation.navigate('ListRestaurants')}
/>;

/* 
Cuando definimos un stack navigator solo se renderiza en el side menu la primera opcion de la navegacion (ListRestaurants) 
El resto son navegaciones que existen anidadas dentro de listrestaurants pero que no se renderizan en el side menu. Se accede
a ellas mediante algun boton. 
*/
const restaurantsScreenStack = StackNavigator(
	{
		ListRestaurants: {
			screen: RestaurantsScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Restaurantes',
				// icono que se va a mostrar cuando se habra el sidemenu
				drawerIcon: ({ tintColor }) => (<Icon name="home" size={24} style={{ color: tintColor }} />),
				// icono a la izquierda que utilizara la navegacion pasada
				headerLeft: leftIcon(navigation, 'bars')
			})
		},
		AddRestaurant: {
			screen: AddRestaurantScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Añadir restaurante',
				headerRight: rightIcon(navigation, 'home'),
				headerLeft: leftIcon(navigation, 'bars'),
			})
		},
		DetailRestaurant: {
			screen: DetailRestaurantScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Detalle del restaurante',
				headerRight: rightIcon(navigation, 'home'),
				headerLeft: leftIcon(navigation, 'bars'),
			})
		},
		// 	EditRestaurant: {
		// 		screen: EditRestaurantScreen,
		// 		navigationOptions: ({ navigation }) => ({
		// 			title: 'Editar restaurante',  // Title to appear in status bar
		// 			headerRight: rightIcon(navigation, 'home'),
		// 		})
		// 	},
	},
	navigationOptions
);

// const profileScreenStack = StackNavigator(
// 	{
// 		ProfileScreen: {
// 			screen: ProfileScreen,
// 			navigationOptions: ({ navigation }) => ({
// 				title: 'Perfil',
// 				drawerIcon: ({ tintColor }) => (<Icon name="user" size={24} style={{ color: tintColor }} />),
// 				headerLeft: leftIcon(navigation, 'bars'),
// 				headerRight: rightIcon(navigation, 'home'),
// 			})
// 		}
// 	},
// 	navigationOptions
// );

// definimos un stack navigator para cerrar sesion desde el side menu
const logoutScreenStack = StackNavigator({
	LogoutScreen: {
		screen: LogoutScreen,
		navigationOptions: ({ navigation }) => ({
			// Las opciones como el title son pasadas aqui en lugar de ser definidas el componente como si se hizo en Start.js
			title: 'Cerrar sesión',
			drawerIcon: ({ tintColor }) => (<Icon name="sign-out" size={24} style={{ color: tintColor }} />)
		})
	}
});

// Definimos la navegacion del side menu
export default DrawerNavigator(
	{
		RestaurantsScreen: {
			screen: restaurantsScreenStack
		},
		// ProfileScreen: {
		// 	screen: profileScreenStack
		// },
		LogoutScreen: {
			screen: logoutScreenStack
		}
	},
	{
		drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
		contentOptions: {
			activeTintColor: 'white', // color para el elemento activo de la navegacion
			activeBackgroundColor: 'transparent',
			inactiveTintColor: 'white',
			itemsContainerStyle: {
				marginVertical: 0,
			}
		},
	}
)