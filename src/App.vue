<template>
	<SettingsInit />
	<v-app id="app-body">
		<AsideMenu />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AsideMenu from './components/AsideMenu.vue';
import SettingsInit from './components/SettingsInit.vue';

export default defineComponent({
	components: { AsideMenu, SettingsInit },
	data() {
		return {
			//
		};
	},
});
</script>
