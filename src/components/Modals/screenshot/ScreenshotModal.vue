<template>
	<AsyncLoader v-if="!imageURL" />
	<CompleteScreenshot v-else :imageURL="imageURL" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AsyncLoader from './AsyncLoader.vue';
import CompleteScreenshot from './CompleteScreenshot.vue';

export default defineComponent({
	components: { AsyncLoader, CompleteScreenshot },
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
