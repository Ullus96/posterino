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
		'color-text-100': 'rgb(18, 18, 18)',
		'color-text-400': 'rgb(57, 57, 57)',
		'color-text-700': 'rgb(116, 116, 116)',
		'color-text-900': 'rgb(165, 165, 165)',
		'color-contrast': 'rgb(245, 245, 245)',
		'color-bg-050': 'rgb(248, 244, 237)',
		'color-bg-100': 'rgb(242, 234, 222)',
		'color-bg-200': 'rgb(235, 225, 209)',
		'color-bg-300': 'rgb(227, 214, 194)',
		'color-bg-400': 'rgb(221, 206, 182)',
		'color-bg-500': 'rgb(213, 196, 170)',
		'color-bg-600': 'rgb(205, 187, 157)',
		'color-bg-700': 'rgb(196, 177, 146)',
		'color-bg-800': 'rgb(187, 167, 134)',
		'color-bg-900': 'rgb(178, 157, 123)',
		'color-primary-050': 'rgb(153, 230, 255)',
		'color-primary-100': 'rgb(133, 224, 255)',
		'color-primary-200': 'rgb(112, 219, 255)',
		'color-primary-300': 'rgb(92, 214, 255)',
		'color-primary-400': 'rgb(71, 209, 255)',
		'color-primary-500': 'rgb(52, 203, 254)',
		'color-primary-600': 'rgb(34, 197, 252)',
		'color-primary-700': 'rgb(16, 191, 249)',
		'color-primary-800': 'rgb(9, 179, 236)',
		'color-primary-900': 'rgb(10, 163, 214)',
		'color-secondary-050': 'rgb(68, 41, 142)',
		'color-secondary-100': 'rgb(61, 38, 125)',
		'color-secondary-200': 'rgb(54, 35, 108)',
		'color-secondary-300': 'rgb(47, 31, 91)',
		'color-secondary-400': 'rgb(40, 27, 75)',
		'color-secondary-500': 'rgb(32, 22, 59)',
		'color-secondary-600': 'rgb(24, 17, 44)',
		'color-secondary-700': 'rgb(16, 12, 29)',
		'color-secondary-800': 'rgb(8, 6, 14)',
		'color-secondary-900': 'rgb(0, 0, 0)',
		'color-danger-200': 'rgb(201, 45, 55)',
		'color-danger-100': 'rgb(255, 45, 55)',
		'color-warning-200': 'rgb(185, 157, 58)',
		'color-success-200': 'rgb(58, 185, 63)',
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
