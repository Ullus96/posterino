<template>
	<div class="canvas elevation-4" id="canvas">
		<div class="canvas__header-wrapper">
			<h1 class="canvas__header"><span>Кино-</span><br /><span>афиша</span></h1>
			<p class="canvas__date-period" v-if="dateTextFormat">
				{{ dateTextFormat }}
			</p>
		</div>
		<the-day
			v-for="(item, idx) in scheduleData"
			:key="`${item.date}-${idx}`"
			:dayData="item"
			:dayIndex="idx"
			:totalIndexes="scheduleData.length - 1"
		></the-day>

		<EmptyBlock v-for="i in 2" :key="i" />

		<!-- <div class="canvas__empty-col">

		</div> -->

		<CanvasSocials />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, Ref, ref, computed } from 'vue';
import TheDay from './DayCard/TheDay.vue';
import CanvasSocials from './CanvasSocials.vue';
import moment from 'moment';
import { useStore } from '@/store/useStore';
import { IDaySchedule } from '@/types/films';
import EmptyBlock from '@/components/DayCard/EmptyBlock.vue';

export default defineComponent({
	components: {
		TheDay,
		CanvasSocials,
		EmptyBlock,
	},
	setup() {
		const store = useStore();

		const scheduleData: Array<IDaySchedule> | [] = store.state.schedule || [];

		const dateTextFormat = computed(() => {
			let result = '';

			if (scheduleData?.length) {
				const nextDay = scheduleData[0].date.locale('ru');
				const endOfWeekDay =
					scheduleData[scheduleData.length - 1].date.locale('ru');

				if (nextDay.format('MM') === endOfWeekDay.format('MM')) {
					result = `${nextDay.format('DD')} - ${endOfWeekDay.format(
						'DD MMMM'
					)}`;
				} else {
					result = `${nextDay.format('DD MMM')} - ${endOfWeekDay.format(
						'DD MMM'
					)}`;
				}
			} else {
				result = '';
			}

			return result;
		});

		return {
			store,
			scheduleData,
			dateTextFormat,
		};
	},
});
</script>

<style scoped></style>
