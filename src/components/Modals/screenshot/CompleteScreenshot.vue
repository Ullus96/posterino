<template>
	<v-card
		width="auto"
		title="Происходит генерация расписания"
		text="Это действие удалит все введенные данные сеансов. Продолжить?"
		prepend-icon="mdi-eraser"
	>
		<template v-slot:actions>
			<v-btn text="Назад" @click="$emit('closeScreenshotModal')"></v-btn>
		</template>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
