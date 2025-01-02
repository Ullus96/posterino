<template>
	<Transition name="fade" mode="out-in">
		<AsyncLoader v-if="!imageURL" />
		<CompleteScreenshot v-else :imageURL="imageURL" />
	</Transition>
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

<style scoped>
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
	transition: 0.2s ease-in-out opacity;
}
</style>
