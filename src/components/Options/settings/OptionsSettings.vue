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
						label="Отступ заголовка фильма"
						variant="outlined"
						density="compact"
						type="number"
						persistent-hint
						hint="Вертикальный отступ у заголовка фильма (по ум. 2)"
						v-model="filmTitlePadding"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'ui.filmTitlePadding',
								value: filmTitlePadding,
							});
							updateCSSVariable('ui.filmTitlePadding');
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'ui.filmTitlePadding',
								value: filmTitlePadding,
							});
							updateCSSVariable('ui.filmTitlePadding');
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
				<v-tabs-window-item value="socials" class="mt-6">
					<p class="opt__secondary-text pr-2">
						Если какое-то из полей нужно скрыть, задай ему пустое значение и
						примени.
					</p>
					<v-divider class="mt-4"></v-divider>

					<v-text-field
						class="pr-2 mt-6"
						label="Телефон"
						prefix="Тел. "
						variant="outlined"
						density="compact"
						type="text"
						persistent-hint
						hint="Телефон (сделай пустым, чтобы скрыть)"
						v-model="tel"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'socials.tel',
								value: tel,
							})
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'socials.tel',
								value: tel,
							})
						"
					></v-text-field>

					<v-text-field
						class="pr-2 mt-6"
						label="Адрес"
						variant="outlined"
						density="compact"
						type="text"
						persistent-hint
						hint="Адрес (сделай пустым, чтобы скрыть)"
						v-model="address"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'socials.address',
								value: address,
							})
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'socials.address',
								value: address,
							})
						"
					></v-text-field>

					<v-text-field
						class="pr-2 mt-6"
						label="ВКонтакте"
						prefix="vk.com/"
						variant="outlined"
						density="compact"
						type="text"
						persistent-hint
						hint="Ссылка на группу ВК (сделай пустым, чтобы скрыть)"
						v-model="vk"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'socials.vk',
								value: vk,
							})
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'socials.vk',
								value: vk,
							})
						"
					></v-text-field>

					<v-text-field
						class="pr-2 mt-6"
						label="Одноклассники"
						prefix="ok.ru/"
						variant="outlined"
						density="compact"
						type="text"
						persistent-hint
						hint="Ссылка на группу ОК (сделай пустым, чтобы скрыть)"
						v-model="ok"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'socials.ok',
								value: ok,
							})
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'socials.ok',
								value: ok,
							})
						"
					></v-text-field>

					<v-text-field
						class="pr-2 mt-6"
						label="Сайт"
						variant="outlined"
						density="compact"
						type="text"
						persistent-hint
						hint="Ссылка на сайт, целиком (сделай пустым, чтобы скрыть)"
						v-model="link"
						:append-icon="'mdi-check-bold'"
						@click:append="
							updateStoreSettings({
								field: 'socials.link',
								value: link,
							})
						"
						@keyup.enter="
							updateStoreSettings({
								field: 'socials.link',
								value: link,
							})
						"
					></v-text-field>

					<v-row>
						<v-col cols="10" class="d-flex align-center">
							<p class="opt__switch-label">
								Отображать строку-описание про Пушкинскую Карту:
							</p>
						</v-col>
						<v-col cols="2">
							<v-switch
								v-model="showPCard"
								color="color-secondary-100"
								hide-details
							></v-switch>
						</v-col>
					</v-row>
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
import { computed, defineComponent, Ref, ref, watch } from 'vue';
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
		const filmTitlePadding: Ref<number> = ref(
			store.state.settings.ui.filmTitlePadding
		);
		const filmsGap: Ref<number> = ref(store.state.settings.ui.filmsGap);

		const tel: Ref<string> = ref(store.state.settings.socials.tel);
		const address: Ref<string> = ref(store.state.settings.socials.address);
		const ok: Ref<string> = ref(store.state.settings.socials.ok);
		const vk: Ref<string> = ref(store.state.settings.socials.vk);
		const link: Ref<string> = ref(store.state.settings.socials.link);
		const showPCard: Ref<boolean> = ref(store.state.settings.socials.showPCard);
		watch(showPCard, (newVal) => {
			updateStoreSettings({
				field: 'socials.showPCard',
				value: newVal,
			});
		});

		const shouldBeNumber: Partial<SettingsPath>[] = [
			'card.defaultPrice',
			'ui.weekdayFontSize',
			'ui.filmFontSize',
			'ui.filmTitlePadding',
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

			localStorage.setItem('settings', JSON.stringify(store.state.settings));
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
				case 'ui.filmTitlePadding':
					document.documentElement.style.setProperty(
						'--ui-film-title-padding',
						`${filmTitlePadding.value}px`
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
			{ field: 'ui.filmTitlePadding', value: 2 },
			{ field: 'ui.filmsGap', value: 20 },

			{ field: 'socials.tel', value: '2-17-43' },
			{ field: 'socials.address', value: 'с.Одесское, ул.Ленина, д.27' },
			{ field: 'socials.ok', value: 'odesskyrkd' },
			{ field: 'socials.vk', value: 'odess_kino' },
			{ field: 'socials.link', value: 'odesskoekdc.omsk.muzkult.ru' },
			{ field: 'socials.showPCard', value: true },
		];

		function resetSettingsToDefault() {
			resetDialog.value = false;

			for (const setting of standartSettings) {
				updateStoreSettings(setting);

				if (setting.field.split('.')[0] === 'ui') {
					weekdayFontSize.value = store.state.settings.ui.weekdayFontSize;
					filmFontSize.value = store.state.settings.ui.filmFontSize;
					filmTitlePadding.value = store.state.settings.ui.filmTitlePadding;
					filmsGap.value = store.state.settings.ui.filmsGap;

					updateCSSVariable(setting.field as SettingsPath);
				}
			}

			// Reset refs
			defaultPrice.value = store.state.settings.card.defaultPrice;
			noSessionsText.value = store.state.settings.card.noSessionsText;

			tel.value = store.state.settings.socials.tel;
			address.value = store.state.settings.socials.address;
			ok.value = store.state.settings.socials.ok;
			vk.value = store.state.settings.socials.vk;
			link.value = store.state.settings.socials.link;
			showPCard.value = store.state.settings.socials.showPCard;

			localStorage.removeItem('settings');
		}

		return {
			tab,
			store,
			updateStoreSettings,
			defaultPrice,
			noSessionsText,
			weekdayFontSize,
			filmFontSize,
			filmTitlePadding,
			filmsGap,
			tel,
			address,
			ok,
			vk,
			link,
			showPCard,
			updateCSSVariable,
			resetDialog,
			resetSettingsToDefault,
		};
	},
});
</script>

<style scoped></style>
