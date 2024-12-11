import { createStore } from 'vuex';

export interface State {
	test: boolean;
}

export default createStore<State>({
	state: {
		test: false,
	},
	mutations: {},
});
