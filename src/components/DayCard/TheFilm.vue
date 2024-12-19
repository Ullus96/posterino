<template>
	<template v-if="!isEditable">
		<div class="canvas__item">
			<div class="canvas__time" v-if="filmData.hh != ''">
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
				<p class="canvas__age" v-if="filmData.age && filmData.age != 0">
					{{ filmData.age }}<span>+</span>
				</p>
				<p class="canvas__p-card" v-if="filmData.pCard && filmData.pCard != 0">
					<span>ПК</span>
				</p>
			</div>

			<v-divider vertical></v-divider>

			<div class="canvas__price" v-if="filmData.price != ''">
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
					@keydown.alt.1="useHotkey('0')"
					@keydown.alt.2="useHotkey('1')"
					@keydown.alt.3="useHotkey('2')"
					@keydown.alt.4="useHotkey('3')"
					@keydown.alt.5="useHotkey('4')"
					@input="resizeTextarea"
				/>
			</div>

			<div class="canvas__techincal-info">
				<input
					type="text"
					placeholder="xx+"
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
						icon="mdi-format-page-break"
						color="color-primary-500"
						density="compact"
					>
					</v-btn>
					<v-tooltip location="top" activator="parent"
						>Перенести строку</v-tooltip
					>
				</div>
			</div>
		</div>
	</template>
</template>

<script>
import { ref, inject, reactive, watch, nextTick, onMounted } from 'vue';
export default {
	setup() {
		const isEditable = inject('isEditable');

		const mm = ref(null);
		const title = ref(null);
		const age = ref(null);
		const pCard = ref(null);
		const price = ref(null);
		const filmPool = [
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

		function getRandomFilm(filmsArr) {
			return filmsArr[Math.floor(Math.random() * filmsArr.length)];
		}

		function randomNumInRange(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		}

		function randomTrueOrFalse() {
			return Math.random() > 0.33 ? 1 : 0;
		}

		function timeInputSwitch(field) {
			if (field === 'hh' && filmData.hh.length === 2) {
				mm.value.focus();
			} else if (field === 'mm' && filmData.mm.length === 2) {
				title.value.focus();
			}
		}

		function ageSwitch() {
			pCard.value.focus();
		}

		function pCardSwitch() {
			if (filmData.pCard) {
				price.value.focus();
				price.value.select();
			}
		}

		// hotkeys
		const hotkeys = inject('hotkeys');

		function useHotkey(i) {
			filmData.title = hotkeys[i].title;
			filmData.age = hotkeys[i].age;
			filmData.pCard = hotkeys[i].pCard;
			if (filmData.title) {
				price.value.focus();
				price.value.select();
			}
		}

		function resizeTextarea(event) {
			const textarea = event.target;

			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}

		watch(isEditable, async (newVal) => {
			if (newVal) {
				await nextTick();
				title.value.style.height = 'auto';
				title.value.style.height = `${title.value.scrollHeight}px`;
			}
		});

		onMounted(async () => {
			await nextTick();
			title.value.style.height = 'auto';
			title.value.style.height = `${title.value.scrollHeight}px`;
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
};
</script>

<style></style>
