<template>
	<div class="canvas__item">
		<div class="canvas__name-wrapper canvas__no-films">
			<p class="canvas__name">
				{{ $store.state.settings.card.noSessionsText }}
			</p>
		</div>
	</div>
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
