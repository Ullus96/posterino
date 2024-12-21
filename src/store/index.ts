import { createStore } from 'vuex';
import moment from 'moment';
import { ISingleFilm, IDaySchedule } from '@/types/films';
import { Hotkeys } from '@/types/hotkeys';
import { generateUUID } from '@/utilities/UUID';

export interface IModalState {
	isHotkeysModalOpen: boolean;
}

export interface State {
	schedule: Array<IDaySchedule> | null;
	hotkeys: Hotkeys | null;
	settings: {
		defaultPrice: number;
	};
	isEditing: boolean;
	modal: IModalState;
}

export default createStore<State>({
	state: {
		schedule: null,
		hotkeys: null,
		settings: {
			defaultPrice: 150,
		},
		isEditing: true,
		modal: {
			isHotkeysModalOpen: false,
		},
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

		createFilm(state, payload: { film: ISingleFilm; dayIndex: number }) {
			const { film, dayIndex } = payload;
			if (state.schedule && dayIndex >= 0 && dayIndex < state.schedule.length) {
				state.schedule[dayIndex].films.push(film);
			}
		},

		removeFilm(state, payload: { dayIndex: number; filmIndex: number }) {
			const { dayIndex, filmIndex } = payload;
			if (
				state.schedule &&
				dayIndex >= 0 &&
				dayIndex < state.schedule.length &&
				filmIndex >= 0 &&
				filmIndex < state.schedule[dayIndex].films.length
			) {
				state.schedule[dayIndex].films.splice(filmIndex, 1);
			}
		},

		addNewTimeSlot(state, payload: { dayIndex: number; filmIndex: number }) {
			const { dayIndex, filmIndex } = payload;
			if (
				state.schedule &&
				dayIndex >= 0 &&
				dayIndex < state.schedule.length &&
				filmIndex >= 0 &&
				filmIndex < state.schedule[dayIndex].films.length
			) {
				state.schedule[dayIndex].films[filmIndex].timeSlots.push({
					uuid: generateUUID(),
				});
			}
		},

		removeTimeSlot(
			state,
			payload: { dayIndex: number; filmIndex: number; timeSlotIndex: number }
		) {
			const { dayIndex, filmIndex, timeSlotIndex } = payload;
			if (
				state.schedule &&
				dayIndex >= 0 &&
				dayIndex < state.schedule.length &&
				filmIndex >= 0 &&
				filmIndex < state.schedule[dayIndex].films.length &&
				timeSlotIndex >= 1 &&
				state.schedule[dayIndex].films[filmIndex].timeSlots.length > 1
			) {
				state.schedule[dayIndex].films[filmIndex].timeSlots.splice(
					timeSlotIndex,
					1
				);
			}
		},

		toggleModalVisibility(
			state,
			payload: {
				name: keyof State['modal'];
				forceClose: boolean | undefined;
			}
		) {
			const { name, forceClose } = payload;
			if (forceClose) {
				state.modal[name] = false;
				return;
			}

			state.modal[name] = !state.modal[name];
		},
	},
});
