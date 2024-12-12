<template>
	<modal
		v-if="isModalVisible"
		@closeModal="closeModal"
		:imageURL="imageURL"
	></modal>
	<the-side-menu
		@saveScreenshot="saveScreenshot"
		:isEditable="isEditable"
		@editableSwitch="isEditable = !isEditable"
		:hotkeys="hotkeys"
	></the-side-menu>

	<div class="content">
		<the-canvas></the-canvas>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, provide } from 'vue';
import TheCanvas from '@/components/TheCanvas.vue';
import TheSideMenu from '@/components/TheSideMenu.vue';
import Modal from '@/components/Modals/Modal.vue';
import html2canvas from 'html2canvas';
import moment from 'moment';

export default defineComponent({
	components: {
		TheCanvas,
		TheSideMenu,
		Modal,
	},
	setup() {
		let imageURL = ref('');

		// amount of cards
		const days = ref(7);
		provide('days', days);

		// dates
		// const currentDate = moment("29-12-2022", "DD-MM-YYYY").locale("ru");
		// const startDate = currentDate.subtract(1, "days");
		const currentDate = moment().locale('ru');
		provide('startDate', currentDate);
		const dateTest = ref(null);

		function showDateTest() {
			console.log(dateTest.value);
		}

		// editable
		const isEditable = ref('false');
		provide('isEditable', isEditable);

		// screenshot
		// const isScreenshotModalVisible = false;

		// https://adnan-tech.com/save-div-as-image-html2canvas/
		function saveScreenshot() {
			window.scrollTo(0, 0);
			isModalVisible.value = true;

			html2canvas(document.getElementById('canvas') as any).then((canvas) => {
				const url = canvas.toDataURL('image/png', 1);
				imageURL.value = `<a href="${url}">Ссылка на изображение</a>`;
			});
		}

		// modal
		let isModalVisible = ref(false);
		function closeModal() {
			isModalVisible.value = false;
			imageURL.value = '';
		}

		// hotkeys
		let hotkeys = reactive([
			{
				title: '',
				age: null,
				pCard: null,
			},
			{
				title: '',
				age: null,
				pCard: null,
			},
			{
				title: '',
				age: null,
				pCard: null,
			},
			{
				title: '',
				age: null,
				pCard: null,
			},
			{
				title: '',
				age: null,
				pCard: null,
			},
		]);
		provide('hotkeys', hotkeys);
		function showHotkeys() {
			console.log(hotkeys);
		}

		return {
			saveScreenshot,
			imageURL,
			days,
			isEditable,
			// isScreenshotModalVisible,
			isModalVisible,
			closeModal,
			hotkeys,
			showHotkeys,
			dateTest,
			showDateTest,
		};
	},
});
</script>

<style scoped></style>
