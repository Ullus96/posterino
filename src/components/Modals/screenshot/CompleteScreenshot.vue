<template>
	<v-card width="auto" title="Картинка готова" prepend-icon="mdi-movie-open">
		<template v-slot:text>
			<v-btn
				class="mt-3"
				block
				variant="elevated"
				size="x-large"
				prepend-icon="mdi-download"
				color="color-primary-700"
				:href="imageURL"
				target="_blank"
				:download="'schedule-' + new Date().toISOString().slice(0, 10) + '.png'"
				>Скачать изображение</v-btn
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
