<template>
	<OptionsBase :modalName="'isHotkeysModalOpen'">
		<template #title>Горячие клавиши</template>

		Тело
	</OptionsBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OptionsBase from './OptionsBase.vue';

export default defineComponent({
	components: { OptionsBase },
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
