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
				<AgeRestrictionLabel :age="filmData.meta?.age" />
				<PushkinCardLabel :pCard="Boolean(filmData.meta?.pCard)" />
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
					@keydown.alt.1="useHotkey(0)"
					@keydown.alt.2="useHotkey(1)"
					@keydown.alt.3="useHotkey(2)"
					@keydown.alt.4="useHotkey(3)"
					@keydown.alt.5="useHotkey(4)"
					@input="resizeTextarea"
				/>
			</div>

			<div class="canvas__techincal-info">
				<input
					type="number"
					placeholder="лет"
					ref="age"
					v-model="newData.meta.age"
					@keyup.+="ageSwitch()"
				/>
				<input
					type="checkbox"
					placeholder="пк?"
					ref="pCard"
					v-model="newData.meta.pCard"
					@keyup="pCardSwitch()"
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
import { Hotkeys } from '@/types/hotkeys';
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
	setup(props, context) {
		const store = useStore();

		const mm: Ref<null | HTMLInputElement> = ref(null);
		const title: Ref<null | HTMLTextAreaElement> = ref(null);
		const age: Ref<null | HTMLInputElement> = ref(null);
		const pCard: Ref<null | HTMLInputElement> = ref(null);
		const price: Ref<null | HTMLInputElement> = ref(null);

		const newData = reactive<ISingleFilm>({
			timeSlots: props.filmData.timeSlots,
			title: props.filmData.title,
			meta: {
				age: props.filmData.meta?.age || null,
				pCard: props.filmData.meta?.pCard || null,
			},
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

		/*
    filmData: ISingleFilm = {
        time: [[12, 55]],
        title: "Фильм",
        meta: {
          age: 9,
          pCard: true,
        },
        price: 150,
      };
    */

		function timeInputSwitch(field: string) {
			// if (field === 'hh' && String(filmData.hh).length === 2 && mm.value) {
			// 	mm.value.focus();
			// } else if (
			// 	field === 'mm' &&
			// 	// @ts-expect-error
			// 	String(filmData.mm).length === 2 &&
			// 	title.value
			// ) {
			// 	title.value.focus();
			// }
		}

		function ageSwitch() {
			// if (pCard.value) {
			// 	pCard.value.focus();
			// }
		}

		function pCardSwitch() {
			// if (filmData.pCard && price.value) {
			// 	price.value.focus();
			// 	price.value.select();
			// }
		}

		// hotkeys
		const hotkeys: Hotkeys | undefined = inject('hotkeys');

		function useHotkey(i: number) {
			// if (!hotkeys || !hotkeys[i]) return;
			// filmData.title = hotkeys[i].title;
			// // @ts-expect-error
			// filmData.age = hotkeys[i].age || null;
			// // @ts-expect-error
			// filmData.pCard = hotkeys[i].pCard || null;
			// if (filmData.title && price.value) {
			// 	price.value.focus();
			// 	price.value.select();
			// }
		}

		function isHTMLTextAreaElement(
			el: EventTarget | null
		): el is HTMLTextAreaElement {
			return el instanceof HTMLTextAreaElement;
		}

		function resizeTextarea(event: Event) {
			const textarea = event.target;

			if (isHTMLTextAreaElement(textarea)) {
				textarea.style.height = 'auto';
				textarea.style.height = `${textarea.scrollHeight}px`;
			}
		}

		watch(
			() => store.state.isEditing,
			async (newVal) => {
				if (newVal) {
					await nextTick();

					if (isHTMLTextAreaElement(title.value)) {
						title.value.style.height = 'auto';
						title.value.style.height = `${title.value.scrollHeight}px`;
					}
				}
			}
		);

		onMounted(async () => {
			await nextTick();

			if (isHTMLTextAreaElement(title.value)) {
				title.value.style.height = 'auto';
				title.value.style.height = `${title.value.scrollHeight}px`;
			}
		});

		function handleFilmRemoving() {
			store.commit('removeFilm', {
				dayIndex: props.dayIndex,
				filmIndex: props.filmIndex,
			});
		}

		return {
			newData,
			timeInputSwitch,
			ageSwitch,
			pCardSwitch,
			mm,
			title,
			age,
			pCard,
			price,
			hotkeys,
			useHotkey,
			resizeTextarea,
			handleFilmRemoving,
		};
	},
});
</script>

<style scoped></style>
