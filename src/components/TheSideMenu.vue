<template>
	<ul class="sidemenu__items">
		<!-- hotkeys -->
		<li class="sidemenu__item">
			<a href="" @click.prevent="hotkeysVisible = !hotkeysVisible">
				<p :class="{ toggle: hotkeysVisible }">H</p>
			</a>
		</li>
		<!-- screenshot -->
		<li class="sidemenu__item">
			<a href="" @click.prevent="saveScreenshot"><p>S</p></a>
		</li>
	</ul>
	<!-- windows -->
	<div class="opt" v-if="hotkeysVisible">
		<i class="fa-solid fa-xmark close" @click="hotkeysVisible = false"></i>
		<the-hotkeys v-if="hotkeysVisible" :hotkeys="hotkeys"></the-hotkeys>
	</div>
</template>

<script>
import { ref, reactive } from 'vue';
import TheHotkeys from './Options/TheHotkeys.vue';
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
	components: { TheHotkeys },
};
</script>

<style></style>
