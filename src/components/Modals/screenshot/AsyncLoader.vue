<template>
	<v-list class="py-2" color="primary" elevation="12" rounded="lg">
		<v-list-item
			prepend-icon="mdi-movie-open"
			title="Происходит генерация расписания..."
		>
			<template v-slot:prepend>
				<div class="pe-4" :style="{ transform: 'translateY(-2px)' }">
					<v-icon color="color-text-100" size="32"></v-icon>
				</div>
			</template>

			<template v-slot:append>
				<v-progress-circular
					color="primary"
					indeterminate="disable-shrink"
					size="24"
					width="3"
					class="ml-4"
				></v-progress-circular>
			</template>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
