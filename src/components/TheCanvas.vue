<template>
	<div class="canvas elevation-4" id="canvas">
		<div class="canvas__header-wrapper">
			<h1 class="canvas__header"><span>Кино-</span><br /><span>афиша</span></h1>
			<p class="canvas__date-period">28 апреля - 05 мая</p>
		</div>
		<the-day v-for="item in days" :key="item" :iter="item"></the-day>

		<div class="canvas__empty-col"></div>

		<!-- Posters block:
    <div class="poster__add-btn" v-if="isEditable">
      <i class="fa-regular fa-image"></i>
      <i class="fa-solid fa-plus"></i>
    </div>

    <div class="poster__area">
      <the-poster
        :posters="posters"
        v-for="(item, idx) in posters"
        :key="idx"
        :item="idx"
        :selector="'poster-' + idx"
      ></the-poster>
    </div> -->

		<CanvasSocials />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from 'vue';
import TheDay from './DayCard/TheDay.vue';
import CanvasSocials from './CanvasSocials.vue';
// import ThePoster from "./Posters/ThePoster.vue";

export default defineComponent({
	components: {
		TheDay,
		CanvasSocials,
		// ThePoster
	},
	setup() {
		const days = inject('days');
		const isEditable = inject('isEditable');
		// let posters = reactive([
		//   {
		//     url: "https://upload.wikimedia.org/wikipedia/ru/thumb/2/2a/%D0%95%D0%BB%D0%BA%D0%B89_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg/250px-%D0%95%D0%BB%D0%BA%D0%B89_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg",
		//     x: "0%",
		//     y: "0%",
		//   },
		//   {
		//     url: "https://www.kino-teatr.ru/movie/poster/162677/147439.jpg",
		//     x: "52%",
		//     y: "0%",
		//   },
		// ]);

		return {
			days,
			isEditable,
			// posters,
		};
	},
});
</script>

<style scoped></style>
