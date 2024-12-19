<template>
	<template v-if="!isEditable">
		<div class="canvas__item">
			<div class="canvas__time" v-if="filmData.hh != ''">
				<p class="canvas__hours">{{ filmData.hh }}</p>
				<p class="canvas__minutes">{{ filmData.mm }}</p>
			</div>
			<div class="canvas__time" v-else></div>

			<p class="canvas__name">
				{{ filmData.title ? filmData.title : ' ' }}
			</p>

			<div class="canvas__techincal-info">
				<p class="canvas__age" v-if="filmData.age && filmData.age != 0">
					{{ filmData.age }}<span>+</span>
				</p>
				<p class="canvas__p-card" v-if="filmData.pCard && filmData.pCard != 0">
					<span>ПК</span>
				</p>
			</div>

			<div class="canvas__price" v-if="filmData.price != ''">
				{{ filmData.price }}
			</div>
		</div>
	</template>
	<template v-else>
		<div class="canvas__item">
			<div class="canvas__time">
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

			<div class="canvas__price">
				<input
					type="number"
					placeholder="Цена"
					ref="price"
					v-model="filmData.price"
				/>
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
			hh: '12',
			mm: '20',
			title: getRandomFilm(filmPool),
			age: '6',
			pCard: '1',
			price: '150',
		});

		function getRandomFilm(filmsArr) {
			return filmsArr[Math.floor(Math.random() * filmsArr.length)];
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
