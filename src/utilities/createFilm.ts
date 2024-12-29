import { ISingleFilm } from '@/types/films';
import {
	filmPool,
	getRandomFilm,
	randomNumInRange,
	randomTrueOrFalse,
} from '@/utilities/mockDataGenerators';
import { generateUUID } from '@/utilities/UUID';
import { Store, useStore } from 'vuex';
import { State } from '@/store/index';

export function getEmptyFilm(store: Store<State>): ISingleFilm {
	const emptyFilm: ISingleFilm = {
		timeSlots: [
			{
				uuid: generateUUID(),
			},
		],
		title: '',
		age: null,
		pCard: null,
		price: store.state.settings.card.defaultPrice,
		uuid: generateUUID(),
	};

	return emptyFilm;
}

export function getMockFilm(): ISingleFilm {
	const mockFilm: ISingleFilm = {
		timeSlots: [
			{
				uuid: generateUUID(),
				hours: randomNumInRange(10, 22),
				minutes: randomNumInRange(0, 60),
			},
		],
		title: getRandomFilm(filmPool),
		age: randomNumInRange(8, 11),
		pCard: randomTrueOrFalse(),
		price: randomNumInRange(75, 225),
		uuid: generateUUID(),
	};

	return mockFilm;
}
