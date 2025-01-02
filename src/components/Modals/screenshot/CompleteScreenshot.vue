<template>
	<v-card width="auto" title="Картинка готова" prepend-icon="mdi-movie-open">
		<template v-slot:text>
			<ol class="screenshot__list">
				<li class="screenshot__list-item">
					Нажмите правой кнопкой мыши (ПКМ) на ссылке ниже. Может понадобиться
					немного подождать.
				</li>
				<li class="screenshot__list-item">
					Выберите «Открыть ссылку в новой вкладке».
				</li>
				<li class="screenshot__list-item">
					Перейдите на новую вкладку с изображением.
				</li>
				<li class="screenshot__list-item">Снова нажмите ПКМ на изображении.</li>
				<li class="screenshot__list-item">
					Выберите «Сохранить картинку как…» и сохраните файл на свой компьютер.
				</li>
			</ol>
			<div class="mt-6">
				<a class="screenshot__link" :href="imageURL" target="_blank"
					>Скачать изображение</a
				>
			</div>
		</template>
		<template v-slot:actions>
			<v-btn text="Назад" @click="$emit('closeScreenshotModal')"></v-btn>
		</template>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		imageURL: {
			type: String,
			required: true,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
