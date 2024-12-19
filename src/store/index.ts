import { createStore } from 'vuex';
import moment from 'moment';
import { ISingleFilm, Films } from '@/types/films';
import { Hotkeys } from '@/types/hotkeys';

export interface State {
	currentDate: moment.Moment;
	schedule: Array<Films> | null;
	hotkeys: Hotkeys | null;
}

export default createStore<State>({
	state: {
		currentDate: moment().locale('ru'),
		schedule: null,
		hotkeys: null,
	},
	mutations: {},
});
