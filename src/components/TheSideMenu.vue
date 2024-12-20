<template>
	<ul class="sidemenu__items">
		<!-- edit -->
		<li class="sidemenu__item">
			<a href="" @click.prevent="editableSwitch">
				<p :class="{ toggle: $store.state.isEditing }" id="header-editable">
					E
				</p>
			</a>
		</li>
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
	props: ['isHeaderVisible', 'hotkeys'],
	emits: ['saveScreenshot', 'editableSwitch'],
	setup(props, context) {
		const hotkeysVisible = ref(false);

		function saveScreenshot() {
			context.emit('saveScreenshot');
		}
		function editableSwitch() {
			context.emit('editableSwitch');
		}
		function helpLog(e) {
			console.log(e);
		}

		return {
			hotkeysVisible,
			saveScreenshot,
			editableSwitch,
			helpLog,
		};
	},
	components: { TheHotkeys },
};
</script>

<style></style>
