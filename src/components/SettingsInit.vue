<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from '@/store/useStore';
import moment from 'moment';
import { ISingleFilm, IDaySchedule } from '@/types/films';

import { getEmptyFilm, getMockFilm } from '@/utilities/createFilm';

export default defineComponent({
	setup() {
		const store = useStore();

		const weekSchedule: IDaySchedule[] = Array.from(
			{ length: 7 },
			(_, idx): IDaySchedule => ({
				date: moment()
					.add(idx + 1, 'days')
					.locale('ru'),
				isWorkingDay: true,
				// Потом отсюда вернуть `emptyFilm`
				films: [getMockFilm()],
			})
		);

		store.commit('setSchedule', weekSchedule);

		// Settings by default

		return {};
	},
});
</script>

<style scoped></style>
