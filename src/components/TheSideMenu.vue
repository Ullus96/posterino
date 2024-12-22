<template>
	<ul class="sidemenu__items">
		<!-- screenshot -->
		<li class="sidemenu__item">
			<a href="" @click.prevent="saveScreenshot"><p>S</p></a>
		</li>
	</ul>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
	emits: ['saveScreenshot'],
	setup(props, context) {
		const hotkeysVisible = ref(false);

		function saveScreenshot() {
			context.emit('saveScreenshot');
		}
		function helpLog(e) {
			console.log(e);
		}

		return {
			hotkeysVisible,
			saveScreenshot,
			helpLog,
		};
	},
};
</script>

<style></style>
