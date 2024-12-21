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
		<h3 class="opt__header">Настройки</h3>
		<p class="opt__desc">Фильм | Возраст | Пушк. Карта</p>
		<h4 class="opt__keyname">Alt + 1</h4>
		<div class="opt__inputs">
			<input type="text" class="opt__input" placeholder="Фильм" />
			<input type="text" class="opt__input" placeholder="xx+" />
			<input type="text" class="opt__input" placeholder="0-1" />
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
