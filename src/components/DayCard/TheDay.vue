<template>
	<!-- single day -->
	<div class="canvas__day" :class="{ editable: $store.state.isEditing }">
		<div class="canvas__date" v-if="!$store.state.isEditing">
			<h2 class="canvas__day-of-week text-color-secondary-200">
				{{ dayAndWeekday.weekday }}
			</h2>
			<p class="canvas__numeric-date text-color-100">
				{{ dayAndWeekday.day }}
			</p>
		</div>
		<template v-else>
			<div
				class="canvas__day-header"
				:class="{ editable: $store.state.isEditing }"
			>
				<input
					type="text"
					class="canvas__day-of-week text-color-secondary-200"
					v-model="dayAndWeekday.weekday"
					disabled
				/>
				<input
					type="text"
					class="canvas__numeric-date text-color-100"
					placeholder="дд.мм"
					v-model="dayAndWeekday.day"
				/>
				<div class="canvas__icon">
					<div class="canvas__header-btn-wrapper">
						<v-btn
							icon="mdi-plus"
							color="color-secondary-400"
							density="compact"
							@click="handleFilmCreation"
						>
						</v-btn>
						<v-tooltip location="top" activator="parent"
							>Добавить строку</v-tooltip
						>
					</div>
					<div class="canvas__header-btn-wrapper">
						<v-btn
							icon="mdi-minus"
							color="color-secondary-400"
							density="compact"
							@click="handleFilmRemoving"
						>
						</v-btn>
						<v-tooltip location="top" activator="parent"
							>Удалить строку</v-tooltip
						>
					</div>
					<div class="canvas__header-btn-wrapper">
						<v-btn
							icon="mdi-movie-off-outline"
							color="color-secondary-400"
							density="compact"
							@click="switchWorkingDay"
						>
						</v-btn>
						<v-tooltip location="top" activator="parent"
							>Переключение "Нет сеансов"</v-tooltip
						>
					</div>
				</div>
			</div>
		</template>
		<v-divider></v-divider>
		<!-- single line -->
		<the-film
			v-for="(film, idx) in currentDayFilmsData"
			:key="film.uuid"
			:filmData="film"
			:filmIndex="idx"
			:dayIndex="dayIndex"
			v-if="isWorkingDay"
		></the-film>
		<no-films v-else></no-films>
		<!-- end of single line -->
		<div class="canvas__last-day-btns-wrapper" v-if="dayIndex === totalIndexes">
			<v-btn
				class="canvas__last-day-btn"
				prepend-icon="mdi-plus"
				color="color-primary-500"
				@click="$emit('addEmptyBlock')"
				>Добавить пустой блок</v-btn
			>
		</div>
	</div>
	<!-- end of single day -->
</template>

<script lang="ts">
import {
	defineComponent,
	ref,
	reactive,
	inject,
	PropType,
	watch,
	Ref,
	computed,
} from 'vue';
import TheFilm from './TheFilm.vue';
import NoFilms from './NoFilms.vue';
import { IDaySchedule } from '@/types/films';
import { useStore } from '@/store/useStore';
import moment from 'moment';
import { getEmptyFilm, getMockFilm } from '@/utilities/createFilm';
import { generateUUID } from '@/utilities/UUID';

export default defineComponent({
	props: {
		dayData: {
			type: Object as PropType<IDaySchedule>,
			required: true,
		},
		dayIndex: {
			type: Number,
			required: true,
		},
		totalIndexes: {
			type: Number,
			required: true,
		},
	},
	components: { TheFilm, NoFilms },
	setup(props, context) {
		const store = useStore();
		const { date } = props.dayData;
		const dayIndex = props.dayIndex;

		const currentDayFilmsData = computed(() => {
			if (
				store.state.schedule &&
				store.state.schedule[props.dayIndex].films.length
			) {
				return store.state.schedule[props.dayIndex].films;
			} else {
				return [];
			}
		});

		let dayAndWeekday = reactive({
			day: date.format('DD.MM'),
			weekday: date.format('dddd'),
		});

		const validDate = /^\d{1,2}\.\d{1,2}$/;

		function updateDate() {
			if (validDate.test(dayAndWeekday.day)) {
				const [day, month] = dayAndWeekday.day.split('.');
				let newDate = moment({
					day: +day,
					month: +month - 1,
					year: date.year(),
				}).locale('ru');

				if (!newDate.isValid()) {
					console.error('невалидная дата после парсинга, чекай данные');
					return;
				}

				if (newDate.isBefore(moment(), 'month')) {
					newDate = newDate.add(1, 'year');
				}

				store.commit('setDate', {
					index: props.dayIndex,
					newDate,
				});

				dayAndWeekday.weekday = newDate.format('dddd');
			} else {
				console.error('ошибка в формате даты, исправь на дд.мм');
			}
		}

		watch(
			() => dayAndWeekday.day,
			(newVal, oldVal) => {
				if (newVal !== oldVal) {
					updateDate();
				}
			}
		);

		const isWorkingDay = computed(() => {
			if (store.state.schedule && store.state.schedule[props.dayIndex]) {
				return store.state.schedule[props.dayIndex].isWorkingDay;
			} else {
				return true;
			}
		});

		function switchWorkingDay() {
			store.commit('switchWorkingDay', props.dayIndex);
		}

		function handleFilmCreation() {
			store.commit('createFilm', {
				dayIndex: props.dayIndex,
				film: getEmptyFilm(store),
			});
		}

		function handleFilmRemoving() {
			if (currentDayFilmsData.value.length) {
				store.commit('removeFilm', {
					dayIndex: props.dayIndex,
					filmIndex: currentDayFilmsData.value.length - 1,
				});
			}
		}

		return {
			dayAndWeekday,
			currentDayFilmsData,
			isWorkingDay,
			switchWorkingDay,
			dayIndex,
			handleFilmCreation,
			handleFilmRemoving,
		};
	},
});
</script>

<style scoped></style>
