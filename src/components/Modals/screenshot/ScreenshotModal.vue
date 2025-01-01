<template>
	<AsyncLoader />
	<CompleteScreenshot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AsyncLoader from './AsyncLoader.vue';
import CompleteScreenshot from './CompleteScreenshot.vue';

export default defineComponent({
	components: { AsyncLoader, CompleteScreenshot },
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
