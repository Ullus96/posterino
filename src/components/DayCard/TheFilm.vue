<template>
	<template v-if="!isEditable">
		<div class="canvas__item">
			<div class="canvas__time" v-if="String(filmData.hh) != ''">
				<span class="canvas__hours">{{
					String(filmData.hh).padStart(2, '0')
				}}</span>
				<span>:</span>
				<span class="canvas__minutes">{{
					String(filmData.mm).padStart(2, '0')
				}}</span>
			</div>
			<div class="canvas__time" v-else></div>

			<v-divider vertical></v-divider>

			<div class="canvas__name-wrapper">
				<p class="canvas__name">
					{{ filmData.title ? filmData.title : ' ' }}
				</p>
			</div>

			<div class="canvas__techincal-info">
				<AgeRestrictionLabel :age="filmData.age" />
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
			<div class="canvas__time editable">
				<input
					type="text"
					class="canvas__hours"
					placeholder="чч"
					ref="hh"
					v-model="filmData.hh"
					@keyup="timeInputSwitch('hh')"
				/>
				<input
					type="text"
					class="canvas__minutes"
					placeholder="мм"
					ref="mm"
					v-model="filmData.mm"
					@keyup="timeInputSwitch('mm')"
				/>
			</div>

			<v-divider vertical></v-divider>

			<div class="canvas__name-wrapper">
				<textarea
					class="canvas__name"
					type="text"
					rows="1"
					placeholder="Фильм"
					ref="title"
					v-model="filmData.title"
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
					v-model="filmData.age"
					@keyup.+="ageSwitch()"
				/>
				<input
					type="number"
					placeholder="пк?"
					ref="pCard"
					v-model="filmData.pCard"
					@keyup="pCardSwitch()"
				/>
			</div>

			<v-divider vertical></v-divider>

			<div class="canvas__price">
				<input
					type="number"
					placeholder="Цена"
					ref="price"
					v-model="filmData.price"
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
						icon="mdi-movie-off-outline"
						color="color-primary-500"
						density="compact"
					>
					</v-btn>
					<v-tooltip location="top" activator="parent"
						>Состояние "Нет сеансов"</v-tooltip
					>
				</div>

				<div class="canvas__item-btn-wrapper">
					<v-btn
						class="elevation-4"
						icon="mdi-table-row-remove"
						color="color-danger-200"
						density="compact"
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
} from 'vue';
import { Hotkeys } from '@/types/hotkeys';
import AgeRestrictionLabel from '@/components/ui/AgeRestrictionLabel.vue';
import PushkinCardLabel from '@/components/ui/PushkinCardLabel.vue';

export default defineComponent({
	components: { AgeRestrictionLabel, PushkinCardLabel },
	setup() {
		const isEditable = inject('isEditable');

		const mm: Ref<null | HTMLInputElement> = ref(null);
		const title: Ref<null | HTMLTextAreaElement> = ref(null);
		const age: Ref<null | HTMLInputElement> = ref(null);
		const pCard: Ref<null | HTMLInputElement> = ref(null);
		const price: Ref<null | HTMLInputElement> = ref(null);
		const filmPool: string[] = [
			'Маша и медведь. Парк чудес',
			'Операция “Преемник”',
			'Приключения Паддингтона 3',
			'Звезды в Сибири',
		];

		const filmData = reactive({
			hh: randomNumInRange(10, 22),
			mm: randomNumInRange(0, 60),
			title: getRandomFilm(filmPool),
			age: randomNumInRange(8, 11),
			pCard: randomTrueOrFalse(),
			price: randomNumInRange(75, 225),
		});

		function getRandomFilm(filmsArr: string[]) {
			return filmsArr[Math.floor(Math.random() * filmsArr.length)];
		}

		function randomNumInRange(min: number, max: number) {
			return Math.floor(Math.random() * (max - min) + min);
		}

		function randomTrueOrFalse() {
			return Math.random() > 0.33 ? 1 : 0;
		}

		function timeInputSwitch(field: string) {
			if (field === 'hh' && String(filmData.hh).length === 2 && mm.value) {
				mm.value.focus();
			} else if (
				field === 'mm' &&
				String(filmData.mm).length === 2 &&
				title.value
			) {
				title.value.focus();
			}
		}

		function ageSwitch() {
			if (pCard.value) {
				pCard.value.focus();
			}
		}

		function pCardSwitch() {
			if (filmData.pCard && price.value) {
				price.value.focus();
				price.value.select();
			}
		}

		// hotkeys
		const hotkeys: Hotkeys | undefined = inject('hotkeys');

		function useHotkey(i: number) {
			if (!hotkeys || !hotkeys[i]) return;

			filmData.title = hotkeys[i].title;
			// @ts-expect-error
			filmData.age = hotkeys[i].age || null;
			// @ts-expect-error
			filmData.pCard = hotkeys[i].pCard || null;
			if (filmData.title && price.value) {
				price.value.focus();
				price.value.select();
			}
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

		// @ts-expect-error
		watch(isEditable, async (newVal) => {
			if (newVal) {
				await nextTick();

				if (isHTMLTextAreaElement(title.value)) {
					title.value.style.height = 'auto';
					title.value.style.height = `${title.value.scrollHeight}px`;
				}
			}
		});

		onMounted(async () => {
			await nextTick();

			if (isHTMLTextAreaElement(title.value)) {
				title.value.style.height = 'auto';
				title.value.style.height = `${title.value.scrollHeight}px`;
			}
		});

		return {
			isEditable,
			filmData,
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
		};
	},
});
</script>

<style scoped></style>
