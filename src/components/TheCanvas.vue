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
			@addEmptyBlock="addEmptyBlock"
		></the-day>

		<transition-group name="empty-blocks">
			<EmptyBlock
				v-for="(item, index) in emptyBlocks"
				:key="item"
				:blockIndex="index"
				@removeEmptyBlock="removeEmptyBlock(index)"
			/>
		</transition-group>

		<div class="div">
			{{ $store.state.settings }}
		</div>

		<CanvasSocials />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, Ref, ref, computed } from 'vue';
import TheDay from './DayCard/TheDay.vue';
import CanvasSocials from './CanvasSocials.vue';
import { useStore } from '@/store/useStore';
import { IDaySchedule } from '@/types/films';
import EmptyBlock from '@/components/DayCard/EmptyBlock.vue';
import { generateUUID } from '@/utilities/UUID';

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

		// Empty blocks
		const emptyBlocks = reactive<string[]>([]);

		function addEmptyBlock() {
			const uuid = generateUUID();
			emptyBlocks.push(uuid);
		}

		function removeEmptyBlock(blockIndex: number) {
			emptyBlocks.splice(blockIndex, 1);
		}

		return {
			store,
			scheduleData,
			dateTextFormat,
			emptyBlocks,
			addEmptyBlock,
			removeEmptyBlock,
		};
	},
});
</script>

<style scoped>
.empty-blocks-enter-active,
.empty-blocks-leave-active {
	transition: 0.15s ease-in-out opacity, 0.15s ease-in-out transform;
}

.empty-blocks-enter-from,
.empty-blocks-leave-to {
	opacity: 0;
	transform: translateX(-20px);
}

.empty-blocks-enter-to,
.empty-blocks-leave-from {
	opacity: 1;
	transform: translate(0);
}
</style>
