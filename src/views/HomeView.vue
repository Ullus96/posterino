<template>
	<div class="content">
		<the-canvas></the-canvas>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheCanvas from '@/components/TheCanvas.vue';

export default defineComponent({
	components: {
		TheCanvas,
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
