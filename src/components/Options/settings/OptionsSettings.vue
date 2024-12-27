<template>
	<OptionsBase
		:modalName="'isSettingsModalOpen'"
		:zIndex="31"
		:topPx="200"
		:width="480"
	>
		<template #title>Настройки</template>

		<template #default>
			<v-tabs v-model="tab" class="mt-1" density="compact">
				<v-tab value="cards">Карточки</v-tab>
				<v-tab value="appearance">Дизайн</v-tab>
				<v-tab value="links">Ссылки</v-tab>
			</v-tabs>

			<v-tabs-window v-model="tab">
				<v-tabs-window-item value="cards"> One </v-tabs-window-item>

				<v-tabs-window-item value="appearance"> Two </v-tabs-window-item>

				<v-tabs-window-item value="links"> Three </v-tabs-window-item>
			</v-tabs-window>
		</template>
	</OptionsBase>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import OptionsBase from '../OptionsBase.vue';

export default defineComponent({
	components: { OptionsBase },
	setup() {
		const tab = ref();

		return { tab };
	},
});
</script>

<style scoped></style>
