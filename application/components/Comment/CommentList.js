import React, { Component } from 'react';
import PreLoader from "../PreLoader";
import { StyleSheet, FlatList, View } from 'react-native';
import { Card } from "react-native-elements";
import * as firebase from 'firebase';
import CommentEmpty from "./CommentEmpty";
import Comment from "./Comment";

export default class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            loaded: false
        };

    }

    componentDidMount() {
        this._loadComments();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.restaurantId !== nextProps.restaurantId) {
            this._loadComments(nextProps.restaurantId);
        }
    }

    _loadComments(restaurantId = null) {
        firebase.database().ref(`comments/${restaurantId ? restaurantId : this.props.restaurantId}`).on('value', snapshot => {
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
                <Card title="Opiniones" titleStyle={styles.title}>
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
        textAlign: 'center'
    }
});