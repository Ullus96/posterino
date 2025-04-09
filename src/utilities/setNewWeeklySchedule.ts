import { IDaySchedule } from '@/types/films';
import moment from 'moment';
import { getMockFilm, getEmptyFilm } from './createFilm';
import { useStore } from '@/store/useStore';
import { Store } from 'vuex';
import { State } from '@/store';

export function setNewWeeklySchedule(
	store: Store<State>,
	type: 'mock' | 'empty'
) {
	if (type === 'mock') {
		const weekSchedule: IDaySchedule[] = getMockFilms();
		store.commit('setSchedule', weekSchedule);
		return;
	} else {
		const weekSchedule: IDaySchedule[] = getEmptyFilms(store);
		store.commit('setSchedule', weekSchedule);
		return;
	}
}

function getMockFilms() {
	return Array.from(
		{ length: 7 },
		(_, idx): IDaySchedule => ({
			date: moment()
				.add(idx + 1, 'days')
				.locale('ru'),
			isWorkingDay: true,
			isDayVisible: true,
			lineBreakIndex: 0,
			films: Array.from(
				{ length: Math.floor(Math.random() * 3) + 5 },
				getMockFilm
			),
		})
	);
}

function getEmptyFilms(store: Store<State>) {
	return Array.from(
		{ length: 7 },
		(_, idx): IDaySchedule => ({
			date: moment()
				.add(idx + 1, 'days')
				.locale('ru'),
			isWorkingDay: true,
			isDayVisible: true,
			lineBreakIndex: 0,
			films: [getEmptyFilm(store)],
		})
	);
}
