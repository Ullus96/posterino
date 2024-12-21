<template>
	<div class="opt elevation-8">
		<v-btn
			variant="text"
			icon="mdi-close"
			color="color-text-400"
			density="compact"
			aria-label="Открыть настройки приложения"
			class="opt__close"
			@click="closeModal"
		>
		</v-btn>
		<h3 class="opt__header" v-if="slots.title">
			<slot name="title">Заголовок</slot>
		</h3>
		<div class="opt__body">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, useSlots } from 'vue';
import { useStore } from '@/store/useStore';
import { IModalState } from '@/store';

export default defineComponent({
	props: {
		modalName: {
			required: true,
			type: String as PropType<keyof IModalState>,
		},
	},
	setup(props, context) {
		const slots = useSlots();
		const store = useStore();

		function closeModal() {
			store.commit('toggleModalVisibility', {
				name: props.modalName,
				forceClose: true,
			});
		}

		return { slots, closeModal };
	},
});
</script>

<style scoped></style>
