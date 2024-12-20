<template>
	<template v-if="!$store.state.isEditing">
		<div
			class="canvas__time"
			v-for="time in filmData.timeSlots"
			:key="`${time[0]}-${time[1]}`"
		>
			<span class="canvas__hours">{{ formatDateString(time[0]) }}</span>
			<span v-if="time[0] && time[1]">:</span>
			<span class="canvas__minutes">{{ formatDateString(time[1]) }}</span>
		</div>
	</template>
	<template v-else>
		<div
			class="canvas__time editable"
			v-for="(time, index) in filmData.timeSlots"
			:key="`${time[0]}-${time[1]}`"
		>
			<input
				type="text"
				class="canvas__hours"
				placeholder="чч"
				ref="hh"
				v-model="editTimes[index][0]"
			/>
			<input
				type="text"
				class="canvas__minutes"
				placeholder="мм"
				ref="mm"
				v-model="editTimes[index][1]"
				@keydown.enter="addNewShowTime($el)"
			/>
		</div>
	</template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, Ref, ref } from 'vue';
import { ISingleFilm } from '@/types/films';
import { useStore } from '@/store/useStore';

export default defineComponent({
	props: {
		filmData: {
			required: true,
			type: Object as PropType<ISingleFilm>,
		},
		filmIndex: {
			required: true,
			type: Number,
		},
		dayIndex: {
			required: true,
			type: Number,
		},
	},
	setup(props, context) {
		const store = useStore();

		function formatDateString(data: number | undefined): string {
			if (data) {
				return String(data).padStart(2, '0');
			} else {
				return '';
			}
		}

		// const editTimes: Ref<Array<[number, number]>> = ref([
		// 	[10, 20],
		// 	[15, 15],
		// 	[21, 0],
		// ]);

		const editTimes = computed(() => {
			return props.filmData.timeSlots.map((time) => {
				return time;
			});
		});

		console.log(editTimes);

		function addNewShowTime(el: EventTarget) {
			store.commit('addNewTimeSlot', {
				dayIndex: props.dayIndex,
				filmIndex: props.filmIndex,
			});
			console.log(el);
		}

		return { formatDateString, editTimes, addNewShowTime };
	},
});
</script>

<style scoped></style>
