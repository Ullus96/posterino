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
			>
				<input
					type="text"
					class="canvas__hours"
					placeholder="чч"
					ref="hh"
					v-model="editTimes[index].hours"
					@keydown.backspace="removeTimeSlot($event, index)"
				/>
				<input
					type="text"
					class="canvas__minutes"
					placeholder="мм"
					ref="mm"
					v-model="editTimes[index].minutes"
					@keydown.enter="addNewTimeSlot"
				/>
			</div>
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

		const editTimes = computed(() => {
			return props.filmData.timeSlots.map((time) => {
				return time;
			});
		});

		function addNewTimeSlot(event: KeyboardEvent) {
			const input = event.target as HTMLInputElement;

			store.commit('addNewTimeSlot', {
				dayIndex: props.dayIndex,
				filmIndex: props.filmIndex,
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

		return { formatDateString, editTimes, addNewTimeSlot, removeTimeSlot };
	},
});
</script>

<style scoped></style>
