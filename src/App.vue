<template>
	<v-app>
		<v-navigation-drawer width="auto" location="right" class="bg-secondary">
			<v-list>
				<v-list-item>
					<v-btn variant="text" icon="mdi-wifi" color="primary"> </v-btn>
				</v-list-item>
				<v-list-item>
					<v-btn variant="text" icon="mdi-wifi" color="primary"> </v-btn>
				</v-list-item>
				<v-list-item>
					<v-btn variant="text" icon="mdi-wifi" color="primary"> </v-btn>
				</v-list-item>

				<v-divider thickness="2" length="80%"></v-divider>

				<v-list-item>
					<v-btn variant="text" icon="mdi-wifi" color="color-text-700"> </v-btn>
				</v-list-item>
				<v-list-item>
					<v-btn variant="text" icon="mdi-wifi" color="primary"> </v-btn>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<router-view />
			<v-btn>Текст</v-btn>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',

	data() {
		return {
			//
		};
	},
});
</script>
