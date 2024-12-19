<template>
	<p class="canvas__p-card" v-if="pCard && Boolean(pCard) != false">
		<span>ПК</span>
	</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		pCard: {
			required: false,
			type: Boolean || null,
			default: null,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
