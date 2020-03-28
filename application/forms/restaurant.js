import React from 'react';
import t from 'tcomb-form-native';
import sliderTemplate from './templates/slider';

const Form = t.form.Form;

export const Restaurant = t.struct({
    name: t.String,
    address: t.String,
    capacity: t.Number,
    description: t.String
});

export const options = {
    fields: {
        name: {
            label: 'Nombre (*)',
            placeholder: 'Nombre'
        },
        address: {
            label: 'Dirección (*)',
            placeholder: 'Dirección'
        },
        capacity: {
            label: 'Capacidad',
            help: 'Capacidad en personas',
            config: {
                step: 1,
                min: 1,
                max: 100
            },
            template: sliderTemplate // podemos añadir una template personalizada, por defecto los campos son de tipo texto
        },
        description: {
            label: 'Descripción (*)',
            placeholder: 'Descripción',
            multiline: true, // para que se comporte como un text area
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: { // estilos que se muestran si no hay error
                        ...Form.stylesheet.textbox.normal,
                        height: 150
                    },
                    error: { // estilos que se muestran si hay error
                        ...Form.stylesheet.textbox.error,
                        height: 150
                    }
                }
            }
        }
    }
};