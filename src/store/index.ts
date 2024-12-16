import { createStore } from 'vuex';
import moment from 'moment';

export interface State {
	currentDate: moment.Moment;
}

export default createStore<State>({
	state: {
		currentDate: moment().locale('ru'),
	},
	mutations: {},
});
