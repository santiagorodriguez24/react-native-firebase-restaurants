import t from 'tcomb-form-native';

export default formValidation = {
	email: t.refinement(t.String, (s) => {    // se le pasa el tipo de dato que llegara y el valor 
		return /@/.test(s);  // usando regex el texto pasado tiene que contener un arroba sino no sera valido. 
	}),
	password: t.refinement(t.String, (s) => {
		return s.length >= 6;    // la contraseña debe tener como minimo 6 caracteres. 
	})
};