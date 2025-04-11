<template>
	<v-navigation-drawer
		width="64"
		location="right"
		class="nav bg-secondary"
		permanent
	>
		<div class="nav__upper-part">
			<v-list nav>
				<v-list-item>
					<v-btn
						variant="text"
						icon="mdi-pencil"
						:color="
							$store.state.isEditing ? 'color-primary-500' : 'color-contrast'
						"
						@click="$store.commit('toggleEditing')"
						aria-label="Переключить режим редактирования"
					>
					</v-btn>
					<v-tooltip activator="parent">Режим редактирования</v-tooltip>
				</v-list-item>
				<v-list-item>
					<v-btn
						variant="text"
						icon="mdi-keyboard"
						:color="
							$store.state.modal.isHotkeysModalOpen
								? 'color-primary-500'
								: 'color-contrast'
						"
						aria-label="Переключить видимость меню горячих клавиш"
						@click="
							$store.commit('toggleModalVisibility', {
								name: 'isHotkeysModalOpen',
								closeAll: true,
							})
						"
					>
					</v-btn>
					<v-tooltip activator="parent">Горячие клавиши</v-tooltip>
				</v-list-item>
				<v-list-item>
					<v-btn
						variant="text"
						icon="mdi-download"
						color="color-contrast"
						aria-label="Скачать результат"
						@click="handleScreenshotButtonClick()"
					>
					</v-btn>
					<v-tooltip activator="parent">Скачать результат</v-tooltip>
				</v-list-item>
			</v-list>

			<v-divider width="80%"></v-divider>

			<v-list nav>
				<v-list-item>
					<v-btn
						variant="text"
						icon="mdi-cog"
						:color="
							$store.state.modal.isSettingsModalOpen
								? 'color-primary-500'
								: 'color-contrast'
						"
						aria-label="Открыть настройки приложения"
						@click="
							$store.commit('toggleModalVisibility', {
								name: 'isSettingsModalOpen',
								closeAll: true,
							})
						"
					>
					</v-btn>
					<v-tooltip activator="parent">Настройки</v-tooltip>
				</v-list-item>
				<v-list-item>
					<v-btn
						variant="text"
						icon="mdi-eraser"
						color="color-contrast"
						aria-label="Очистить расписание"
						@click="showClearingDialog = true"
					>
					</v-btn>
					<v-tooltip activator="parent">Очистить расписание</v-tooltip>
				</v-list-item>
			</v-list>

			<v-divider width="80%"></v-divider>
			<v-list nav>
				<v-list-item>
					<v-btn
						variant="text"
						icon="mdi-table-arrow-up"
						:color="
							showScheduleUploaderDialog
								? 'color-primary-500'
								: 'color-contrast'
						"
						aria-label="Загрузить расписание из .csv файла"
						@click="showScheduleUploaderDialog = !showScheduleUploaderDialog"
					>
					</v-btn>
					<v-tooltip activator="parent"
						>Загрузить расписание из .csv файла</v-tooltip
					>
				</v-list-item>
			</v-list>
		</div>
		<div class="nav__bottom_part">
			<v-list nav>
				<v-list-item>
					<v-btn
						variant="text"
						icon="mdi-help-circle-outline"
						:color="showTutorialDialog ? 'color-primary-500' : 'color-contrast'"
						aria-label="Открыть настройки приложения"
						@click="showTutorialDialog = true"
					>
					</v-btn>
					<v-tooltip activator="parent">Обучение</v-tooltip>
				</v-list-item>
			</v-list>
		</div>
	</v-navigation-drawer>

	<transition name="scale-to-left">
		<KeepAlive>
			<OptionsHotkeys v-if="$store.state.modal.isHotkeysModalOpen" />
			<OptionsSettings v-else-if="$store.state.modal.isSettingsModalOpen" />
		</KeepAlive>
	</transition>

	<v-dialog v-model="showClearingDialog" width="auto">
		<v-card
			max-width="400"
			title="Очистить расписание?"
			text="Это действие удалит все введенные данные сеансов. Продолжить?"
			prepend-icon="mdi-eraser"
		>
			<template v-slot:actions>
				<v-btn text="Удалить" @click="clearSchedule"></v-btn>
				<v-btn text="Назад" @click="showClearingDialog = false"></v-btn>
			</template>
		</v-card>
	</v-dialog>

	<v-dialog v-model="showScreenshotDialog" max-width="450">
		<ScreenshotModal
			:imageURL="imageURL"
			@closeScreenshotModal="showScreenshotDialog = false"
		/>
	</v-dialog>

	<v-dialog v-model="showTutorialDialog" max-width="600">
		<TutorialDialog @close="showTutorialDialog = false" />
	</v-dialog>

	<v-dialog v-model="showScheduleUploaderDialog" max-width="600">
		<csv-schedule-uploader
			@close="showScheduleUploaderDialog = false"
		></csv-schedule-uploader>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import { useStore } from '@/store/useStore';
import OptionsHotkeys from './Options/hotkeys/OptionsHotkeys.vue';
import OptionsSettings from './Options/settings/OptionsSettings.vue';
import { setNewWeeklySchedule } from '@/utilities/setNewWeeklySchedule';
import html2canvas from 'html2canvas';
import ScreenshotModal from '@/components/Modals/screenshot/ScreenshotModal.vue';
import TutorialDialog from './Modals/TutorialDialog.vue';
import CsvScheduleUploader from './CsvScheduleUploader.vue';

export default defineComponent({
	components: {
		OptionsHotkeys,
		OptionsSettings,
		ScreenshotModal,
		TutorialDialog,
		CsvScheduleUploader,
	},
	setup() {
		const store = useStore();

		const isEditing = store.state.isEditing;

		const showClearingDialog: Ref<boolean> = ref(false);

		function clearSchedule() {
			setNewWeeklySchedule(store, 'empty');
			showClearingDialog.value = false;
		}

		// screenshot
		const showScreenshotDialog: Ref<boolean> = ref(false);
		let imageURL: Ref<string> = ref('');

		// https://adnan-tech.com/save-div-as-image-html2canvas/
		function saveScreenshot() {
			window.scrollTo(0, 0);

			html2canvas(document.getElementById('canvas') as HTMLCanvasElement, {
				scale: 1.1,
			}).then((canvas) => {
				canvas.toBlob((blob) => {
					if (blob) {
						const url = URL.createObjectURL(blob);
						imageURL.value = url;
					} else {
						console.error('Ошибка при создании Blob');
					}
				}, 'image/png');
			});
		}

		function handleScreenshotButtonClick() {
			showScreenshotDialog.value = true;

			// wait for the editing mode switch
			setTimeout(() => {
				saveScreenshot();
			}, 0);
		}

		watch(showScreenshotDialog, (newValue) => {
			const isEditing = store.state.isEditing;

			if (isEditing && newValue) {
				store.commit('toggleEditing');
			}

			if (!newValue && !isEditing) {
				store.commit('toggleEditing');
			}

			if (!newValue) {
				setTimeout(() => {
					URL.revokeObjectURL(imageURL.value);
					imageURL.value = '';
				}, 200);
			}
		});

		// Tutorial
		const showTutorialDialog: Ref<boolean> = ref(false);

		const showScheduleUploaderDialog: Ref<boolean> = ref(false);

		return {
			isEditing,
			showClearingDialog,
			clearSchedule,
			showScreenshotDialog,
			saveScreenshot,
			imageURL,
			handleScreenshotButtonClick,
			showTutorialDialog,
			showScheduleUploaderDialog,
		};
	},
});
</script>

<style scoped>
.v-list--nav {
	padding-inline: 0;
}

.v-divider {
	margin: 0 auto;
}

.scale-to-left-enter-active,
.scale-to-left-leave-active {
	transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
}

.scale-to-left-enter-from,
.scale-to-left-leave-to {
	transform: translateX(60px);
	opacity: 0;
}

.scale-to-left-enter-to,
.scale-to-left-leave-from {
	transform: translateX(0px);
	opacity: 1;
}
</style>
