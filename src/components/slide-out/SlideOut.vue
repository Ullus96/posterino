<template>
	<div class="slide-out">
		<slot />

		<SlideOutActions :delay="$props.delay">
			<slot name="actions" />
		</SlideOutActions>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SlideOutActions from './SlideOutActions.vue';

export default defineComponent({
	components: { SlideOutActions },
	props: {
		delay: {
			type: Number,
			required: false,
			default: 0.05,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
