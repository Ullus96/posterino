<template>
	<p class="canvas__age" v-if="age && age != 0">{{ age }}<span>+</span></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		age: {
			required: false,
			type: Number || null,
			default: null,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
