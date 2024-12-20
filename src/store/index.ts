import { createStore } from 'vuex';
import moment from 'moment';
import { ISingleFilm, IDaySchedule } from '@/types/films';
import { Hotkeys } from '@/types/hotkeys';

export interface State {
	schedule: Array<IDaySchedule> | null;
	hotkeys: Hotkeys | null;
	settings: {
		defaultPrice: number;
	};
	isEditing: boolean;
}

export default createStore<State>({
	state: {
		schedule: null,
		hotkeys: null,
		settings: {
			defaultPrice: 150,
		},
		isEditing: true,
	},
	mutations: {
		setSchedule(state, payload: Array<IDaySchedule>) {
			state.schedule = payload;
		},

		setDate(
			state,
			payload: {
				index: number;
				newDate: moment.Moment;
			}
		) {
			const { index, newDate } = payload;
			if (state.schedule && index >= 0 && index < state.schedule.length) {
				state.schedule[index].date = newDate;
			}
		},

		switchWorkingDay(state, index: number) {
			if (state.schedule && index >= 0 && index < state.schedule.length) {
				state.schedule[index].isWorkingDay =
					!state.schedule[index].isWorkingDay;
			}
		},

		toggleEditing(state) {
			state.isEditing = !state.isEditing;
		},

		updateFilm(
			state,
			payload: { film: ISingleFilm; filmIndex: number; dayIndex: number }
		) {
			const { film, filmIndex, dayIndex } = payload;
			if (
				state.schedule &&
				dayIndex >= 0 &&
				dayIndex < state.schedule.length &&
				filmIndex >= 0 &&
				filmIndex < state.schedule[dayIndex].films.length
			) {
				state.schedule[dayIndex].films[filmIndex] = film;
			}
		},
	},
});
