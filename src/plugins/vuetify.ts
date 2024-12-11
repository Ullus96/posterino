// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, type ThemeDefinition } from 'vuetify';
const posterinoLightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#32ccfe',
		'primary-darken-1': '#09b3ec',
		secondary: '#21173c',
		'secondary-darken-1': '#100c1d',
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
