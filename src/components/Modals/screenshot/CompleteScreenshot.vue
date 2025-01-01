<template>
	<v-card width="auto" title="Картинка готова" prepend-icon="mdi-movie-open">
		<template v-slot:text>
			Ссылка на изображение готова. Для того, чтобы увидеть результат, выполните
			с нижестоящей ссылкой следующие действия:<br />
			&mdash; Правая Клавиша Мыши (ПКМ) (может зависнуть на пару секунд)<br />&rarr;
			Открыть ссылку в новой вкладке<br />&rarr; Откройте вкладку браузера с
			изображением<br />&rarr; ПКМ<br />&rarr; Сохранить картинку как...
			<a class="screenshot__link" :href="imageURL" target="_blank"
				>Скачать изображение</a
			>
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
