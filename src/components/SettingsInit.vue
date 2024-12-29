<template>
	<v-dialog v-model="showLoadingDialog" width="auto">
		<v-card
			max-width="400"
			:title="`Cохранение: ${saveDateString}`"
			prepend-icon="mdi-content-save-outline"
		>
			<template v-slot:text>
				Найдено расписание за
				<b>{{ saveDateString.split(' ').join(' ') }}</b
				>. Загрузить?
			</template>
			<template v-slot:actions>
				<v-btn
					variant="flat"
					color="color-secondary-100"
					text="Загрузить"
					@click="loadSavedSchedule"
				></v-btn>
				<v-divider vertical></v-divider>
				<v-btn text="Начать сначала" @click="showLoadingDialog = false"></v-btn>
			</template>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref } from 'vue';
import { useStore } from '@/store/useStore';
import moment from 'moment';
import { ISingleFilm, IDaySchedule } from '@/types/films';
import { getEmptyFilm, getMockFilm } from '@/utilities/createFilm';
import { useDateTextFormat } from '@/utilities/dateTextFormat';

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

		// Settings
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
				case 'ui.filmTitlePadding':
					document.documentElement.style.setProperty(
						'--ui-film-title-padding',
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
		const allowAutoSave: Ref<boolean> = ref(false);
		function autoSave() {
			const schedule = store.state.schedule;
			localStorage.setItem('schedule', JSON.stringify(schedule));
			console.log(`Auto-save`);
		}

		onMounted(() => {
			setInterval(() => {
				if (allowAutoSave.value) {
					autoSave();
				}
			}, 15000);
		});

		// Load auto-save from localStorage
		const savedSchedule = localStorage.getItem('schedule');
		const showLoadingDialog: Ref<boolean> = ref(true);
		const saveDateString: Ref<string> = ref('');

		if (savedSchedule) {
			const parsedSchedule = JSON.parse(savedSchedule) as IDaySchedule[];
			saveDateString.value = useDateTextFormat(parsedSchedule).value;
		}

		function loadSavedSchedule() {
			if (savedSchedule) {
				const parsedSchedule = JSON.parse(savedSchedule) as IDaySchedule[];
				store.commit('setSchedule', parsedSchedule);
			}

			showLoadingDialog.value = false;
			allowAutoSave.value = true;
		}

		return {
			showLoadingDialog,
			saveDateString,
			loadSavedSchedule,
		};
	},
});
</script>

<style scoped></style>
