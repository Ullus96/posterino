<template>
	<template v-if="!$store.state.isEditing">
		<div class="canvas__item">
			<TimeBlock
				:filmData="filmData"
				:dayIndex="dayIndex"
				:filmIndex="filmIndex"
			/>
			<v-divider vertical></v-divider>

			<div class="canvas__name-wrapper">
				<p class="canvas__name">
					{{ filmData.title ? filmData.title : ' ' }}
				</p>
			</div>

			<div class="canvas__techincal-info">
				<AgeRestrictionLabel :age="filmData.age ? filmData.age : 0" />
				<PushkinCardLabel :pCard="Boolean(filmData.pCard)" />
			</div>

			<v-divider vertical></v-divider>

			<div class="canvas__price" v-if="String(filmData.price) != ''">
				{{ filmData.price }}
			</div>
		</div>
	</template>
	<template v-else>
		<div class="canvas__item editable">
			<TimeBlock
				:filmData="filmData"
				:dayIndex="dayIndex"
				:filmIndex="filmIndex"
			/>

			<v-divider vertical></v-divider>

			<div class="canvas__name-wrapper">
				<textarea
					class="canvas__name"
					type="text"
					rows="1"
					placeholder="Фильм"
					ref="title"
					v-model="newData.title"
					@keydown="handleHotkey"
					@input="resizeTextarea"
				/>
			</div>

			<div class="canvas__techincal-info">
				<input
					type="number"
					placeholder="лет"
					ref="age"
					v-model="newData.age"
				/>
				<input
					type="checkbox"
					placeholder="пк?"
					ref="pCard"
					v-model="newData.pCard"
				/>
			</div>

			<v-divider vertical></v-divider>

			<div class="canvas__price">
				<input
					type="number"
					placeholder="Цена"
					ref="price"
					v-model="newData.price"
				/>
			</div>

			<div class="canvas__actions-wrapper">
				<div class="canvas__item-btn-wrapper">
					<v-btn
						class="elevation-4"
						icon="mdi-format-page-break"
						color="color-primary-500"
						density="compact"
					>
					</v-btn>
					<v-tooltip location="top" activator="parent"
						>Создать разрыв строки</v-tooltip
					>
				</div>

				<div class="canvas__item-btn-wrapper">
					<v-btn
						class="elevation-4"
						icon="mdi-table-row-remove"
						color="color-danger-200"
						density="compact"
						@click="handleFilmRemoving"
					>
					</v-btn>
					<v-tooltip location="top" activator="parent"
						>Удалить строку</v-tooltip
					>
				</div>
			</div>
		</div>
	</template>
</template>

<script lang="ts">
import {
	defineComponent,
	ref,
	Ref,
	inject,
	reactive,
	watch,
	nextTick,
	onMounted,
	PropType,
} from 'vue';
import { useStore } from '@/store/useStore';
import AgeRestrictionLabel from '@/components/ui/AgeRestrictionLabel.vue';
import PushkinCardLabel from '@/components/ui/PushkinCardLabel.vue';
import TimeBlock from '@/components/DayCard/TimeBlock.vue';
import { ISingleFilm } from '@/types/films';

export default defineComponent({
	components: { AgeRestrictionLabel, PushkinCardLabel, TimeBlock },
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
	setup(props) {
		const store = useStore();

		const title: Ref<null | HTMLTextAreaElement> = ref(null);
		const age: Ref<null | HTMLInputElement> = ref(null);
		const pCard: Ref<null | HTMLInputElement> = ref(null);
		const price: Ref<null | HTMLInputElement> = ref(null);

		const newData = reactive<ISingleFilm>({
			timeSlots: props.filmData.timeSlots,
			title: props.filmData.title,
			age: props.filmData.age,
			pCard: props.filmData.pCard,
			price: props.filmData.price,
			uuid: props.filmData.uuid,
		});

		watch(
			newData,
			(newVal) => {
				store.commit('updateFilm', {
					film: newVal,
					filmIndex: props.filmIndex,
					dayIndex: props.dayIndex,
				});
			},
			{ deep: true }
		);

		// hotkeys
		function handleHotkey(event: KeyboardEvent) {
			if (event.altKey) {
				const key = Number(event.key);
				if (key >= 1 && key <= 9) {
					useHotkey(key - 1);
				}
			}
		}

		async function useHotkey(i: number) {
			const hotkeyData = store.state.hotkeys[i];

			if (!hotkeyData) return;
			const { title: filmTitle, age, pCard, price } = hotkeyData;

			newData.title = filmTitle;
			newData.age = age ?? null;
			newData.pCard = pCard ?? null;
			newData.price = price;

			await nextTick();
			setHeight(title.value);
		}

		function isHTMLTextAreaElement(
			el: EventTarget | null
		): el is HTMLTextAreaElement {
			return el instanceof HTMLTextAreaElement;
		}

		function setHeight(el: HTMLTextAreaElement | EventTarget | null) {
			if (isHTMLTextAreaElement(el)) {
				el.style.height = 'auto';
				el.style.height = `${el.scrollHeight}px`;
			}
		}

		function resizeTextarea(event: Event) {
			const textarea = event.target;

			setHeight(textarea);
		}

		watch(
			() => store.state.isEditing,
			async (newVal) => {
				if (newVal) {
					await nextTick();

					setHeight(title.value);
				}
			}
		);

		onMounted(async () => {
			await nextTick();

			setHeight(title.value);
		});

		function handleFilmRemoving() {
			store.commit('removeFilm', {
				dayIndex: props.dayIndex,
				filmIndex: props.filmIndex,
			});
		}

		return {
			newData,
			title,
			age,
			pCard,
			price,
			handleHotkey,
			useHotkey,
			resizeTextarea,
			handleFilmRemoving,
		};
	},
});
</script>

<style scoped></style>
