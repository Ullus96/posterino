<template>
	<div class="content">
		<the-canvas></the-canvas>
	</div>
	<hidden-days></hidden-days>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheCanvas from '@/components/TheCanvas.vue';
import HiddenDays from '@/components/HiddenDays.vue';

export default defineComponent({
	components: {
		TheCanvas,
		HiddenDays,
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
