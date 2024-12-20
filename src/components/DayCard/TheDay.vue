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
							@click="count++"
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
							@click="count == 0 ? (count = 0) : count--"
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
		<the-film v-for="film in count" :key="film" v-if="isWorkingDay"></the-film>
		<no-films v-else></no-films>
		<!-- end of single line -->
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
	},
	components: { TheFilm, NoFilms },
	setup(props, context) {
		const store = useStore();
		const { date } = props.dayData;

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

		const count = ref(1);

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

		return {
			dayAndWeekday,
			count,
			isWorkingDay,
			switchWorkingDay,
		};
	},
});
</script>

<style scoped></style>
