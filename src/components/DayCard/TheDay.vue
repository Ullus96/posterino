<template>
	<!-- single day -->
	<div class="canvas__day">
		<div class="canvas__date">
			<template v-if="!isEditable">
				<h4 class="canvas__day-of-week">
					{{ dayAndWeekday.weekday }}
				</h4>
				<p class="canvas__numeric-date">
					{{ dayAndWeekday.day }}
				</p>
			</template>
			<template v-else>
				<h4 class="canvas__day-of-week input">
					<input type="text" v-model="dayAndWeekday.weekday" />
				</h4>
				<p class="canvas__numeric-date input">
					<input type="text" v-model="dayAndWeekday.day" />
				</p>
				<div class="canvas__icon">
					<span @click="count++">+</span>
					<span @click="count == 0 ? (count = 0) : count--">-</span>
				</div>
			</template>
		</div>
		<!-- single line -->
		<the-film v-for="film in count" :key="film"></the-film>
		<!-- end of single line -->
	</div>
	<!-- end of single day -->
</template>

<script>
import { ref, reactive, inject } from 'vue';
import TheFilm from './TheFilm.vue';
export default {
	setup() {
		const isEditable = inject('isEditable');
		const startDate = inject('startDate');
		let date = startDate.add(1, 'days');
		let dayAndWeekday = reactive({
			day: date.format('LL').slice(0, -8),
			weekday: date.format('llll').substring(0, 2),
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
	props: ['iter'],
	components: { TheFilm },
};
</script>

<style></style>
