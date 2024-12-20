import { ISingleFilm } from '@/types/films';
import {
	filmPool,
	getRandomFilm,
	randomNumInRange,
	randomTrueOrFalse,
} from '@/utilities/mockDataGenerators';
import { generateUUID } from '@/utilities/UUID';
import { Store } from 'vuex';
import { State } from '@/store/index';

export function getEmptyFilm(store: Store<State>): ISingleFilm {
	const emptyFilm: ISingleFilm = {
		showTimes: [[]],
		title: '',
		price: store.state.settings.defaultPrice,
		uuid: generateUUID(),
	};

	return emptyFilm;
}

export function getMockFilm(): ISingleFilm {
	const mockFilm: ISingleFilm = {
		showTimes: [[randomNumInRange(10, 22), randomNumInRange(0, 60)]],
		title: getRandomFilm(filmPool),
		meta: {
			age: randomNumInRange(8, 11),
			pCard: randomTrueOrFalse(),
		},
		price: randomNumInRange(75, 225),
		uuid: generateUUID(),
	};

	return mockFilm;
}
