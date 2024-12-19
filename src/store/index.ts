import { createStore } from 'vuex';
import moment from 'moment';
import { ISingleFilm, IDaySchedule } from '@/types/films';
import { Hotkeys } from '@/types/hotkeys';

export interface State {
	currentDate: moment.Moment;
	schedule: Array<IDaySchedule> | null;
	hotkeys: Hotkeys | null;
	settings: {
		defaultPrice: number;
	};
}

export default createStore<State>({
	state: {
		currentDate: moment().locale('ru'),
		schedule: null,
		hotkeys: null,
		settings: {
			defaultPrice: 150,
		},
	},
	mutations: {
		setSchedule(state, payload: Array<IDaySchedule>) {
			state.schedule = payload;
		},
	},
});
