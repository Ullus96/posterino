<template>
	<v-navigation-drawer
		width="64"
		location="right"
		class="bg-secondary"
		permanent
	>
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
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useStore } from '@/store/useStore';
import OptionsHotkeys from './Options/hotkeys/OptionsHotkeys.vue';
import OptionsSettings from './Options/settings/OptionsSettings.vue';
import { setNewWeeklySchedule } from '@/utilities/setNewWeeklySchedule';

export default defineComponent({
	components: { OptionsHotkeys, OptionsSettings },
	setup() {
		const store = useStore();

		const isEditing = store.state.isEditing;

		const showClearingDialog: Ref<boolean> = ref(false);

		function clearSchedule() {
			setNewWeeklySchedule(store, 'empty');
			showClearingDialog.value = false;
		}

		return { isEditing, showClearingDialog, clearSchedule };
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
