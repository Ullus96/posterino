<template>
	<v-navigation-drawer width="64" location="right" class="bg-secondary">
		<v-list nav>
			<v-list-item>
				<v-btn
					variant="text"
					icon="mdi-pencil"
					color="color-contrast"
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
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
