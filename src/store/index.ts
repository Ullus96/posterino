import { createStore } from 'vuex';
import moment from 'moment';
import { ISingleFilm, IDaySchedule } from '@/types/films';
import { IHotkey } from '@/types/hotkeys';
import { generateUUID } from '@/utilities/UUID';

type KeyPath<T, P extends string = ''> = {
	[K in keyof T]: T[K] extends object
		? `${P}${K & string}` | KeyPath<T[K], `${P}${K & string}.`>
		: `${P}${K & string}`;
}[keyof T];

export type SettingsPath = KeyPath<State['settings']>;

export type SettingsPayload = {
	field: SettingsPath;
	value: string | number | boolean;
};

export interface IModalState {
	isHotkeysModalOpen: boolean;
	isSettingsModalOpen: boolean;
}

export interface State {
	schedule: Array<IDaySchedule> | null;
	settings: {
		card: {
			defaultPrice: number;
			noSessionsText: string;
		};
		ui: {
			weekdayFontSize: number;
			filmFontSize: number;
			filmsGap: number;
		};
		socials: {
			tel: string;
			address: string;
			ok: string;
			vk: string;
			link: string;
			showPCard: boolean;
		};
	};
	isEditing: boolean;
	modal: IModalState;
	hotkeys: Array<IHotkey>;
}

export default createStore<State>({
	state: {
		schedule: null,
		settings: {
			card: {
				defaultPrice: 150,
				noSessionsText: 'В этот день сеансов нет',
			},
			ui: {
				weekdayFontSize: 28,
				filmFontSize: 18,
				filmsGap: 20,
			},
			socials: {
				tel: '2-17-43',
				address: 'с.Одесское, ул.Ленина, д.27',
				ok: 'odesskyrkd',
				vk: 'odess_kino',
				link: 'odesskoekdc.omsk.muzkult.ru',
				showPCard: true,
			},
		},
		isEditing: true,
		modal: {
			isHotkeysModalOpen: false,
			isSettingsModalOpen: false,
		},
		hotkeys: [
			{ title: '', age: null, pCard: null, uuid: generateUUID(), price: 150 },
		],
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
				forceClose?: boolean;
				closeAll?: boolean;
			}
		) {
			const { name, forceClose, closeAll } = payload;
			if (forceClose) {
				state.modal[name] = false;
				return;
			}

			if (closeAll) {
				for (const key in state.modal) {
					if (name !== key) {
						state.modal[key as keyof State['modal']] = false;
					}
				}
			}

			state.modal[name] = !state.modal[name];
		},

		createNewHotkey(state) {
			if (state.hotkeys.length < 9) {
				state.hotkeys.push({
					title: '',
					age: null,
					pCard: null,
					uuid: generateUUID(),
					price: state.settings.card.defaultPrice,
				});
			}
		},

		updateHotkey(state, payload: { hotkeyData: IHotkey; hotkeyIndex: number }) {
			const { hotkeyData, hotkeyIndex } = payload;
			if (hotkeyIndex >= 0 && hotkeyIndex < state.hotkeys.length) {
				state.hotkeys[hotkeyIndex] = hotkeyData;
			}
		},

		updateSettings(state: State, payload: SettingsPayload) {
			const { field, value } = payload;

			const keys = field.split('.') as (keyof State['settings'])[];
			let target = state.settings as any;

			for (let i = 0; i < keys.length - 1; i++) {
				target = target[keys[i]];
			}

			target[keys[keys.length - 1]] = value;
		},
	},
});
