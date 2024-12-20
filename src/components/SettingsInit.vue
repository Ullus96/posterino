<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from '@/store/useStore';
import { ISingleFilm, IDaySchedule } from '@/types/films';
import moment from 'moment';

import {
	filmPool,
	getRandomFilm,
	randomNumInRange,
	randomTrueOrFalse,
} from '@/utilities/mockDataGenerators';

export default defineComponent({
	setup() {
		const store = useStore();

		const emptyFilm: ISingleFilm = {
			time: [[]],
			title: '',
			price: store.state.settings.defaultPrice,
		};

		const mockFilm: ISingleFilm = {
			time: [[randomNumInRange(10, 22), randomNumInRange(0, 60)]],
			title: getRandomFilm(filmPool),
			meta: {
				age: randomNumInRange(8, 11),
				pCard: randomTrueOrFalse(),
			},
			price: randomNumInRange(75, 225),
		};

		const weekSchedule: IDaySchedule[] = Array.from(
			{ length: 7 },
			(_, idx): IDaySchedule => ({
				date: moment()
					.add(idx + 1, 'days')
					.locale('ru'),
				isWorkingDay: true,
				// Потом отсюда вернуть `emptyFilm`
				films: [mockFilm],
			})
		);

		store.commit('setSchedule', weekSchedule);

		return {};
	},
});
</script>

<style scoped></style>
