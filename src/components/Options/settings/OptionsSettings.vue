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
				<v-tab value="socials">Соцсети</v-tab>
			</v-tabs>

			<v-tabs-window v-model="tab">
				<v-tabs-window-item value="cards" class="mt-4">
					<v-text-field
						label="Цена по умолчанию"
						variant="outlined"
						density="compact"
						type="number"
						persistent-hint
						hint="Цена для всех новосозданных фильмов (по ум: 150)"
						v-model="defaultPrice"
						:append-icon="'mdi-send'"
						@click:append="
							updateStoreSettings({
								field: 'card.defaultPrice',
								value: defaultPrice,
							})
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'card.defaultPrice',
								value: defaultPrice,
							})
						"
					></v-text-field>

					<v-text-field
						class="mt-5"
						label="Текст для отсутствия сеансов"
						variant="outlined"
						density="compact"
						type="text"
						persistent-hint
						hint="Текст, который будет отображаться, если на день нет сеансов"
						v-model="noSessionsText"
						:append-icon="'mdi-send'"
						@click:append="
							updateStoreSettings({
								field: 'card.noSessionsText',
								value: noSessionsText,
							})
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'card.noSessionsText',
								value: noSessionsText,
							})
						"
					></v-text-field>

					<ul>
						<li>"В этот день сеансов нет"</li>
					</ul>
				</v-tabs-window-item>

				<v-tabs-window-item value="appearance">
					<ul>
						<li>Размер шрифта заголовка</li>
						<li>Размер шрифта текста фильма</li>
						<li>Размер между фильмами</li>
					</ul>
				</v-tabs-window-item>

				<v-tabs-window-item value="socials">
					<ul>
						<li>Телефон</li>
						<li>Адрес</li>
						<li>ВК</li>
						<li>ОК</li>
						<li>Ссылка</li>
						<li>Отображать ПК?</li>
					</ul>
				</v-tabs-window-item>
			</v-tabs-window>
		</template>
	</OptionsBase>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import OptionsBase from '../OptionsBase.vue';
import { useStore } from '@/store/useStore';
import { State, SettingsPayload } from '@/store';

export default defineComponent({
	components: { OptionsBase },
	setup() {
		const tab = ref();
		const store = useStore();

		// Refs
		const defaultPrice: Ref<number> = ref(
			store.state.settings.card.defaultPrice
		);

		const noSessionsText: Ref<string> = ref(
			store.state.settings.card.noSessionsText
		);

		function updateStoreSettings(payload: SettingsPayload) {
			const { field, value } = payload;

			// Check if end-field has type of number
			if (field === 'card.defaultPrice') {
				const numberValue = Number(value);
				store.commit('updateSettings', { field, value: numberValue });
			} else {
				store.commit('updateSettings', { field, value });
			}
		}

		return { tab, store, updateStoreSettings, defaultPrice, noSessionsText };
	},
});
</script>

<style scoped></style>
