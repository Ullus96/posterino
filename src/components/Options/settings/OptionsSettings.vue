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
				<v-tab value="ui">Дизайн</v-tab>
				<v-tab value="socials">Соцсети</v-tab>
			</v-tabs>

			<v-tabs-window v-model="tab">
				<!-- Cards -->
				<v-tabs-window-item value="cards" class="mt-6">
					<v-text-field
						class="pr-2"
						label="Цена по умолчанию"
						variant="outlined"
						density="compact"
						type="number"
						persistent-hint
						hint="Стандартная цена для всех новых строчек с фильмами"
						v-model="defaultPrice"
						:append-icon="'mdi-check-bold'"
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
						class="mt-6 pr-2"
						label="Текст для отсутствия сеансов"
						variant="outlined"
						density="compact"
						type="text"
						persistent-hint
						hint="Текст, который будет отображаться, если на день нет сеансов"
						v-model="noSessionsText"
						:append-icon="'mdi-check-bold'"
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
				</v-tabs-window-item>
				<!-- End of cards -->

				<!-- UI -->
				<v-tabs-window-item value="ui" class="mt-6">
					<v-text-field
						class="pr-2"
						label="Размер шрифта дня недели"
						variant="outlined"
						density="compact"
						type="number"
						persistent-hint
						hint="Размер шрифта дня недели в карточке (по ум. 28)"
						v-model="weekdayFontSize"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'ui.weekdayFontSize',
								value: weekdayFontSize,
							});
							updateCSSVariable('ui.weekdayFontSize');
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'ui.weekdayFontSize',
								value: weekdayFontSize,
							});
							updateCSSVariable('ui.weekdayFontSize');
						"
					></v-text-field>

					<v-text-field
						class="pr-2 mt-6"
						label="Размер шрифта фильма"
						variant="outlined"
						density="compact"
						type="number"
						persistent-hint
						hint="Размер шрифта фильма в карточке (по ум. 18)"
						v-model="filmFontSize"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'ui.filmFontSize',
								value: filmFontSize,
							});
							updateCSSVariable('ui.filmFontSize');
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'ui.filmFontSize',
								value: filmFontSize,
							});
							updateCSSVariable('ui.filmFontSize');
						"
					></v-text-field>

					<v-text-field
						class="pr-2 mt-6"
						label="Расстояние между карточками"
						variant="outlined"
						density="compact"
						type="number"
						persistent-hint
						hint="Расстояние между карточками (по ум. 20)"
						v-model="filmsGap"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'ui.filmsGap',
								value: filmsGap,
							});
							updateCSSVariable('ui.filmsGap');
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'ui.filmsGap',
								value: filmsGap,
							});
							updateCSSVariable('ui.filmsGap');
						"
					></v-text-field>
				</v-tabs-window-item>
				<!-- End of ui -->

				<!-- Socials -->
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

			<v-divider class="mt-6"></v-divider>
			<v-btn
				class="mt-4"
				block
				variant="text"
				prepend-icon="mdi-undo"
				color="color-danger-200"
				@click="resetDialog = true"
				>Сбросить настройки</v-btn
			>

			<v-dialog v-model="resetDialog" width="auto">
				<v-card
					max-width="400"
					text="Это действие сбросит все настройки (в том числе ссылки на социальные сети) на значения по умолчанию. Продолжить?"
					title="Вы уверены?"
				>
					<template v-slot:actions>
						<v-btn text="Да" @click="resetSettingsToDefault"></v-btn>
						<v-btn text="Отмена" @click="resetDialog = false"></v-btn>
					</template>
				</v-card>
			</v-dialog>
		</template>
	</OptionsBase>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import OptionsBase from '../OptionsBase.vue';
import { useStore } from '@/store/useStore';
import { State, SettingsPayload, SettingsPath } from '@/store';

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
		const weekdayFontSize: Ref<number> = ref(
			store.state.settings.ui.weekdayFontSize
		);
		const filmFontSize: Ref<number> = ref(store.state.settings.ui.filmFontSize);
		const filmsGap: Ref<number> = ref(store.state.settings.ui.filmsGap);

		const shouldBeNumber: Partial<SettingsPath>[] = [
			'card.defaultPrice',
			'ui.weekdayFontSize',
			'ui.filmFontSize',
			'ui.filmsGap',
		];

		function updateStoreSettings(payload: SettingsPayload) {
			const { field, value } = payload;

			// Check if end-field has type of number
			if (shouldBeNumber.includes(field)) {
				const numberValue = Number(value);
				store.commit('updateSettings', { field, value: numberValue });
			} else {
				store.commit('updateSettings', { field, value });
			}
		}

		// Update CSS variables
		function updateCSSVariable(field: SettingsPath) {
			switch (field) {
				case 'ui.weekdayFontSize':
					document.documentElement.style.setProperty(
						'--ui-weekday-font-size',
						`${weekdayFontSize.value}px`
					);
					break;
				case 'ui.filmFontSize':
					document.documentElement.style.setProperty(
						'--ui-film-font-size',
						`${filmFontSize.value}px`
					);
					break;
				case 'ui.filmsGap':
					document.documentElement.style.setProperty(
						'--ui-films-gap',
						`${filmsGap.value}px`
					);
					break;
			}
		}

		// Reset settings
		const resetDialog: Ref<boolean> = ref(false);

		const standartSettings: SettingsPayload[] = [
			{ field: 'card.defaultPrice', value: 150 },
			{ field: 'card.noSessionsText', value: 'В этот день сеансов нет' },

			{ field: 'ui.weekdayFontSize', value: 28 },
			{ field: 'ui.filmFontSize', value: 18 },
			{ field: 'ui.filmsGap', value: 20 },

			{ field: 'socials.tel', value: '2-17-43' },
			{ field: 'socials.address', value: 'с.Одесское, ул.Ленина, д.27' },
			{ field: 'socials.ok', value: 'ok.ru/odesskyrkd' },
			{ field: 'socials.vk', value: 'vk.com/odess_kino' },
			{ field: 'socials.link', value: 'odesskoekdc.omsk.muzkult.ru' },
		];

		function resetSettingsToDefault() {
			resetDialog.value = false;

			for (const setting of standartSettings) {
				updateStoreSettings(setting);

				if (setting.field.split('.')[0] === 'ui') {
					weekdayFontSize.value = store.state.settings.ui.weekdayFontSize;
					filmFontSize.value = store.state.settings.ui.filmFontSize;
					filmsGap.value = store.state.settings.ui.filmsGap;

					updateCSSVariable(setting.field as SettingsPath);
				}
			}

			// Reset refs
			defaultPrice.value = store.state.settings.card.defaultPrice;
			noSessionsText.value = store.state.settings.card.noSessionsText;

			console.log(`settings resetted`);
		}

		return {
			tab,
			store,
			updateStoreSettings,
			defaultPrice,
			noSessionsText,
			weekdayFontSize,
			filmFontSize,
			filmsGap,
			updateCSSVariable,
			resetDialog,
			resetSettingsToDefault,
		};
	},
});
</script>

<style scoped></style>
