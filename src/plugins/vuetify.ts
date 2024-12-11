// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, type ThemeDefinition } from 'vuetify';
const posterinoLightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#32ccfe',
		'primary-darken-1': '#3700B3',
		secondary: '#21173c',
		'secondary-darken-1': '#018786',
		'color-text-700': '#ccc',
	},
};

export default createVuetify({
	theme: {
		defaultTheme: 'posterinoLightTheme',
		themes: {
			posterinoLightTheme,
		},
	},
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
