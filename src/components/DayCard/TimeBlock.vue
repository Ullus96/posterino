<template>
	<template v-if="!$store.state.isEditing">
		<div class="canvas__time-wrapper">
			<div
				class="canvas__time"
				v-for="(time, index) in filmData.timeSlots"
				:key="time.uuid"
			>
				<span class="canvas__hours">{{ formatDateString(time.hours) }}</span>
				<span v-if="time.hours && time.minutes">:</span>
				<span class="canvas__minutes">{{
					formatDateString(time.minutes)
				}}</span>
			</div>
		</div>
	</template>
	<template v-else>
		<div class="canvas__time-wrapper">
			<div
				class="canvas__time editable"
				v-for="(time, index) in filmData.timeSlots"
				:key="time.uuid"
				ref="timeSlotRefs"
			>
				<input
					type="number"
					class="canvas__hours"
					placeholder="чч"
					ref="hh"
					v-model="editableTimeSlots[index].hours"
					@keydown.backspace="removeTimeSlot($event, index)"
					@input="timeInputSwitch"
				/>
				<input
					type="number"
					class="canvas__minutes"
					placeholder="мм"
					ref="mm"
					v-model="editableTimeSlots[index].minutes"
					@keydown.enter="addNewTimeSlot"
				/>
			</div>
		</div>
	</template>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	nextTick,
	PropType,
	reactive,
	Ref,
	ref,
} from 'vue';
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
		const timeSlotRefs: Ref<Array<HTMLDivElement | null>> = ref([]);

		function formatDateString(data: number | undefined): string {
			if (data) {
				return String(data).padStart(2, '0');
			} else {
				return '';
			}
		}

		const editableTimeSlots = computed(() => {
			return props.filmData.timeSlots.map((time) => {
				return time;
			});
		});

		async function addNewTimeSlot(event: KeyboardEvent) {
			store.commit('addNewTimeSlot', {
				dayIndex: props.dayIndex,
				filmIndex: props.filmIndex,
			});

			await nextTick(() => {
				console.log(`inside of nextTick`);
				const lastTimeSlot = timeSlotRefs.value[timeSlotRefs.value.length - 1];
				console.log(`${timeSlotRefs.value}`);
				const hoursInput = lastTimeSlot?.querySelector(
					'.canvas__hours'
				) as HTMLInputElement;

				if (hoursInput) {
					hoursInput.focus();
				}
			});
		}

		function removeTimeSlot(event: KeyboardEvent, timeSlotIndex: number) {
			const input = event.target as HTMLInputElement;

			if (input.value.trim() === '') {
				store.commit('removeTimeSlot', {
					dayIndex: props.dayIndex,
					filmIndex: props.filmIndex,
					timeSlotIndex,
				});
			}
		}

		// Input switch
		function timeInputSwitch(event: Event) {
			const inputElement = event.target as HTMLInputElement;
			const data = inputElement.value;

			console.log(data.length);
			if (data && data.length === 2) {
				const mmInputElement =
					inputElement.nextElementSibling as HTMLInputElement;
				mmInputElement.focus();
			}
		}

		return {
			formatDateString,
			editableTimeSlots,
			addNewTimeSlot,
			removeTimeSlot,
			timeInputSwitch,
			timeSlotRefs,
		};
	},
});
</script>

<style scoped></style>
