import React, { Component } from 'react';
import PreLoader from "../PreLoader";
import { StyleSheet, FlatList, View } from 'react-native';
import { Card, Divider, Text } from "react-native-elements";
import BackgroundImage from "../BackgroundImage";
import * as firebase from 'firebase';
import CommentEmpty from "./CommentEmpty";
import Comment from "./Comment";

export default class CommentList extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            loaded: false
        };

        // podria utilizar una referencia al servicio de google para usarlo en varias partes
        // this.commentsRef = firebase.database().ref(`commets/${props.restaurant_id}`);
    }

    componentDidMount() {
        firebase.database().ref(`comments/${this.props.restaurantId}`).on('value', snapshot => {
            let comments = [];
            snapshot.forEach(row => {
                comments.push({
                    id: row.key,
                    rating: row.val().rating,
                    comment: row.val().comment
                });
            });
            this.setState({
                comments,
                loaded: true
            });
        })
    }

    renderComment(comment) {
        return (
            <Comment comment={comment} />
        );
    }

    render() {
        const { comments, loaded } = this.state;

        // si no ha cargado muestro el loader
        if (!loaded) {
            return (<PreLoader />);
        }

        // si aun no hay comentarios
        if (!comments.length) {
            return (<CommentEmpty />);
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Opiniones</Text>
                <Divider style={styles.divider} />
                <Card>
                    <FlatList
                        data={comments}
                        renderItem={(data) => this.renderComment(data.item)}
                        keyExtractor={(data) => data.id}
                    />
                </Card>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    },
    divider: {
        backgroundColor: 'red',
    }
});