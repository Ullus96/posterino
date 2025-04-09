<template>
	<div class="container mt-4 mb-12" v-if="isSomethingHidden">
		<h2>Скрытые дни</h2>
		<ul class="hidden-days__list mt-2">
			<li
				v-for="(day, idx) in hiddenDays"
				:key="String(day.date)"
				class="hidden-days__item"
			>
				<span class="hidden-days__weekday">
					• {{ day.date.format('dddd') }} ({{ day.date.format('DD.MM') }})
				</span>
				<span class="canvas__header-btn-wrapper">
					<v-btn
						icon="mdi-undo"
						color="color-secondary-400"
						density="compact"
						@click="switchDayVisibility(day)"
					>
					</v-btn>
					<v-tooltip location="top" activator="parent"
						>Вернуть в расписание</v-tooltip
					>
				</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store/useStore';
import { IDaySchedule } from '@/types/films';

export default defineComponent({
	setup() {
		const store = useStore();
		const days = store.state.schedule;

		const isSomethingHidden = computed(() => {
			return days?.some((day) => !day.isDayVisible);
		});

		const hiddenDays = computed(() => {
			return days?.filter((el) => !el.isDayVisible);
		});

		function findDayIndex(day: IDaySchedule) {
			const index = days?.findIndex((_day) => _day.date === day.date);
			console.log(index);
			return index;
		}

		function switchDayVisibility(day: IDaySchedule) {
			const dayIndex = findDayIndex(day);
			store.commit('switchDayVisibility', dayIndex);
		}

		return {
			isSomethingHidden,
			hiddenDays,
			switchDayVisibility,
		};
	},
});
</script>

<style scoped></style>
