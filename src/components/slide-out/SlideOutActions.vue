<template>
	<div class="slide-out__actions-wrapper" ref="wrapper">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted } from 'vue';

export default defineComponent({
	props: {
		delay: {
			type: Number,
			required: true,
			default: 0.05,
		},
	},
	setup(props, context) {
		const wrapper = ref<HTMLElement | null>(null);
		const actionItems = ref<HTMLElement[]>([]);

		onMounted(() => {
			nextTick(() => {
				if (wrapper.value) {
					actionItems.value = Array.from(
						wrapper.value.querySelectorAll('.slide-out__action-item')
					);

					actionItems.value.forEach((el, index) => {
						el.style.transitionDelay = `${index * props.delay}s`;
					});
				}
			});
		});

		return { wrapper };
	},
});
</script>

<style scoped></style>
