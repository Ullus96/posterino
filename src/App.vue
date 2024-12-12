<template>
	<v-app>
		<AsideMenu />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AsideMenu from './components/AsideMenu.vue';

export default defineComponent({
	components: { AsideMenu },
	data() {
		return {
			//
		};
	},
});
</script>
