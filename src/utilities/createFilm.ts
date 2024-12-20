import { ISingleFilm } from '@/types/films';
import {
	filmPool,
	getRandomFilm,
	randomNumInRange,
	randomTrueOrFalse,
} from '@/utilities/mockDataGenerators';
import { Store } from 'vuex';
import { State } from '@/store/index';

export function getEmptyFilm(store: Store<State>): ISingleFilm {
	const emptyFilm: ISingleFilm = {
		time: [[]],
		title: '',
		price: store.state.settings.defaultPrice,
	};

	return emptyFilm;
}

export function getMockFilm(): ISingleFilm {
	const mockFilm: ISingleFilm = {
		time: [[randomNumInRange(10, 22), randomNumInRange(0, 60)]],
		title: getRandomFilm(filmPool),
		meta: {
			age: randomNumInRange(8, 11),
			pCard: randomTrueOrFalse(),
		},
		price: randomNumInRange(75, 225),
	};

	return mockFilm;
}
