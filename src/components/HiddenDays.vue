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
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { useStore } from '@/store/useStore';
import { IDaySchedule } from '@/types/films';

export default defineComponent({
	setup() {
		const store = useStore();
		const days = computed(() => store.state.schedule);

		let isSomethingHidden = computed(() => {
			return days.value?.some((day) => !day.isDayVisible);
		});

		let hiddenDays = computed(() => {
			return days.value?.filter((day) => !day.isDayVisible);
		});

		function findDayIndex(day: IDaySchedule) {
			const index = days.value?.findIndex((_day) => _day.date === day.date);
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
