<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref } from 'vue';
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

		const savedSettings = localStorage.getItem('settings');

		if (savedSettings) {
			store.commit('setSettingsFromLocalStorage');

			const parsedSettings = JSON.parse(savedSettings);
			const variables = parsedSettings.ui;

			for (const key in variables) {
				updateCSSVariable(`ui.${key}`, variables[key]);
			}
		}

		function updateCSSVariable(field: string, value: number) {
			switch (field) {
				case 'ui.weekdayFontSize':
					document.documentElement.style.setProperty(
						'--ui-weekday-font-size',
						`${value}px`
					);
					break;
				case 'ui.filmFontSize':
					document.documentElement.style.setProperty(
						'--ui-film-font-size',
						`${value}px`
					);
					break;
				case 'ui.filmsGap':
					document.documentElement.style.setProperty(
						'--ui-films-gap',
						`${value}px`
					);
					break;
			}
		}

		// Auto-save schedule
		const allowAutoSave: Ref<boolean> = ref(true);
		function autoSave() {
			const schedule = store.state.schedule;
			localStorage.setItem('schedule', JSON.stringify(schedule));
		}

		onMounted(() => {
			setInterval(() => {
				if (allowAutoSave.value) {
					autoSave();
				}
			}, 15000);
		});

		return {};
	},
});
</script>

<style scoped></style>
