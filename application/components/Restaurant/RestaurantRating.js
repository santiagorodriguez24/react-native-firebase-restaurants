import React, { Component } from 'react';
import { Rating } from "react-native-elements";
import * as firebase from 'firebase';
import { View } from "react-native";

export default class RestaurantRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0 // Todos los restaurantes por defecto tienen 0
        };
        const { restaurantId } = props;

        // Accedemos a todos los documentos de la coleccion comments de firebase que tengan el restaurantId proporcionado
        this.commentsRef = firebase.database().ref(`comments/${restaurantId}`);
    }

    componentDidMount() {
        /*
        cuando cualquier persona publique un nuevo comentario y rating las estrellas del restaurant se actualizaran
        de manera automatica.
        */
        // snapshot = comentario que se acaba de insertar
        this.commentsRef.on("child_added", snapshot => {

            // Accedemos a todos los comentarios
            this.commentsRef.on("value", snap => {
                let comments = [];
                snap.forEach(row => {
                    // solo nos interesa el valor del rating para sacar una media
                    comments.push(parseInt(row.val().rating));
                });

                this.setState({
                    // calculamos la media
                    rating: comments.reduce((previous, current) => previous + current, 0) / comments.length
                });

                // Si no se utiliza el metodo setCurrentRating el componente rating no se actualiza
                this.refs.rating.setCurrentRating(
                    comments.reduce((previous, current) => previous + current, 0) / comments.length
                );
            })
        });
    }

    render() {
        const { rating } = this.state;

        return (
            <View>
                <Rating
                    ref="rating"
                    imageSize={20}
                    readonly // solo muestra informacion, no se puede interactuar con el
                    startingValue={rating}
                />
            </View>
        )
    }
}