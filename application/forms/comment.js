import React from 'react';
import t from 'tcomb-form-native';
import sliderTemplate from './templates/slider';

const Form = t.form.Form;

export const Comment = t.struct({
    rating: t.Number,
    comment: t.maybe(t.String) // con maybe se dice que es opcional, no requerido
});

export const options = {
    fields: {
        rating: {
            label: 'Puntuación',
            help: '¿Qué puntuación le das del 1 al 5?',
            template: sliderTemplate,
            config: {
                step: 1,
                min: 1,
                max: 5,
            },
        },
        comment: {
            label: 'Comentario',
            placeholder: 'Comentario',
            multiline: true,
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.text,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 50
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 50
                    }
                }
            }
        }
    }
}