<template>
	<!-- single day -->
	<div class="canvas__day" :class="{ editable: isEditable }">
		<div class="canvas__date" v-if="!isEditable">
			<h2 class="canvas__day-of-week text-color-secondary-200">
				{{ dayAndWeekday.weekday }}
			</h2>
			<p class="canvas__numeric-date text-color-100">
				{{ dayAndWeekday.day }}
			</p>
		</div>
		<template v-else>
			<div class="canvas__day-header" :class="{ editable: isEditable }">
				<input
					type="text"
					class="canvas__day-of-week text-color-secondary-200"
					v-model="dayAndWeekday.weekday"
				/>
				<input
					type="text"
					class="canvas__numeric-date text-color-100"
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
				</div>
			</div>
		</template>
		<v-divider></v-divider>
		<!-- single line -->
		<the-film v-for="film in count" :key="film"></the-film>
		<no-films></no-films>
		<!-- end of single line -->
	</div>
	<!-- end of single day -->
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject } from 'vue';
import TheFilm from './TheFilm.vue';
import NoFilms from './NoFilms.vue';

export default defineComponent({
	props: ['iter'],
	components: { TheFilm, NoFilms },
	setup() {
		const isEditable = inject('isEditable');
		const startDate = inject('startDate');
		// @ts-expect-error
		let date = startDate.add(1, 'days');
		let dayAndWeekday = reactive({
			day: date.format('DD.MM'),
			weekday: date.format('dddd'),
		});

		const count = ref(1);

		// const getDay = () => {
		//   return {
		//     day: date.format("LL").slice(0, -8),
		//     weekday: date.format("llll").substring(0, 2),
		//   };
		// };

		// function getWeekday(num) {}

		return {
			startDate,
			// getDay,
			// day,
			// weekday,
			dayAndWeekday,
			isEditable,
			count,
		};
	},
});
</script>

<style scoped></style>
