<template>
	<v-navigation-drawer width="64" location="right" class="bg-secondary">
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
					color="color-contrast"
					aria-label="Переключить видимость меню горячих клавиш"
					@click="
						$store.commit('toggleModalVisibility', {
							name: 'isHotkeysModalOpen',
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
					color="color-contrast"
					aria-label="Открыть настройки приложения"
				>
				</v-btn>
				<v-tooltip activator="parent">Настройки</v-tooltip>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>

	<OptionsHotkeys v-if="$store.state.modal.isHotkeysModalOpen" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/useStore';
import OptionsHotkeys from './Options/OptionsHotkeys.vue';

export default defineComponent({
	components: { OptionsHotkeys },
	setup() {
		const store = useStore();

		const isEditing = store.state.isEditing;

		return { isEditing };
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
</style>
