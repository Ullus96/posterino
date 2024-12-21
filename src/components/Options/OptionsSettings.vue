<template>
	<OptionsBase :modalName="'isSettingsModalOpen'">
		<template #title>Настройки</template>

		<template #default>
			<p class="opt__desc">Фильм | Возраст | Пушк. Карта</p>
			<h4 class="opt__keyname">Alt + 1</h4>
			<div class="opt__inputs">
				<input type="text" class="opt__input" placeholder="Фильм" />
				<input type="text" class="opt__input" placeholder="xx+" />
				<input type="text" class="opt__input" placeholder="0-1" />
			</div>
		</template>
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
