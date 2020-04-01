import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import PreLoader from "../PreLoader";
import * as firebase from "firebase";

export default class RestaurantDropdown extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      loaded: false
    };

    // referencia para acceder a los restaurantes de la aplicacion
    this.refRestaurants = firebase.database().ref().child('restaurants');
  }

  componentDidMount() {
    this.refRestaurants.on('value', snapshot => {
      let restaurants = [];
      snapshot.forEach(row => {
        restaurants.push({
          value: row.key,
          label: row.val().name,
        })
      });

      this.setState({
        restaurants,
        loaded: true
      });
    });
  }

  render() {
    const { loaded, restaurants } = this.state;
    const { onChangeRestaurant, restaurantId } = this.props;

    if (!loaded) {
      return <PreLoader />
    }

    return (
      <RNPickerSelect
        onValueChange={(rID) => onChangeRestaurant(rID)}
        items={restaurants}
        placeholder={{
          label: 'Selecciona un restaurante',
          value: null
        }}
        // useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        value={restaurantId}
      />
    );
  }
}

const pickerSelectStyles = {
  inputIOS: {
    color: 'black',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    backgroundColor: 'white',
  },
  inputAndroid: {
    color: 'black',
    //backgroundColor: 'white',
  },
  placeholder: {
    color: 'black',
    fontWeight: 'bold',
  },
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'white',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};