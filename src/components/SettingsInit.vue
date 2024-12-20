<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from '@/store/useStore';
import { ISingleFilm, IDaySchedule } from '@/types/films';
import moment from 'moment';

export default defineComponent({
	setup() {
		const store = useStore();

		const emptyFilm: ISingleFilm = {
			time: [[]],
			title: '',
			price: store.state.settings.defaultPrice,
		};

		const weekSchedule: IDaySchedule[] = Array.from(
			{ length: 7 },
			(_, idx): IDaySchedule => ({
				date: moment()
					.add(idx + 1, 'days')
					.locale('ru'),
				isWorkingDay: true,
				films: [emptyFilm],
			})
		);

		store.commit('setSchedule', weekSchedule);

		return {};
	},
});
</script>

<style scoped></style>
