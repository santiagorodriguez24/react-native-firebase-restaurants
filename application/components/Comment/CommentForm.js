import React, { Component } from 'react';
import AppButton from "../AppButton";
import { options, Comment } from '../../forms/comment';
import t from 'tcomb-form-native';
import { Card } from "react-native-elements";
import { View } from "react-native";
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';

const Form = t.form.Form;

export default class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            comment: {
                comment: '',
                rating: 1
            }
        };
    }

    addComment() {
        const validate = this.refs.form.getValue();

        // Se ha pasado la validacion:
        if (validate) {
            let data = {};
            let comment = Object.assign({}, validate);
            // referencia a la coleccion comments
            let ref = firebase.database().ref().child('comments');
            // generamos una key para poder guardar el comentario
            const key = ref.push().key;

            /* guardamos dentro de comments y un documento identificado con el id del restaurante y dentro de ese decumento
            cada comentario con su propia key, rating, etc */  
            data[`${this.props.restaurantId}/${key}`] = comment;

            // se guarda el comentario
            ref.update(data).then(() => {
                // se reinicia el formulario de comentarios
                this.setState((prevState, props) => {
                    return {
                        comment: {
                            comment: '',
                            rating: 1
                        }
                    }
                });
                Toast.showWithGravity('Comentario publicado!', Toast.LONG, Toast.TOP);
            })
        }
    }

    onChange(comment) {
        this.setState({ comment });
    }

    render() {
        const { comment } = this.state;

        return (
            <Card title="Dános tu opinión">
                <View>
                    <Form
                        ref="form"
                        type={Comment}
                        options={options}
                        value={comment}
                        onChange={(v) => this.onChange(v)}
                    />
                </View>

                <AppButton
                    bgColor="rgba(255, 38, 74, 0.9)"
                    title="Publicar opinión"
                    action={this.addComment.bind(this)}
                    iconName="comments"
                    iconSize={30}
                    iconColor="#fff"
                />
            </Card>
        )
    }
}