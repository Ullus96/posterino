<template>
	<div class="opt__inputs-element">
		<h4 class="opt__inputs-name">Alt + {{ hotkeyIndex + 1 }}</h4>
		<div class="opt__inputs-wrapper">
			<v-text-field
				label=""
				variant="underlined"
				density="compact"
				hide-details="auto"
				placeholder="Название фильма"
				v-model="hotkeyData.title"
				@input="updateHotkeyData"
			></v-text-field>
			<v-text-field
				label=""
				variant="underlined"
				density="compact"
				hide-details="auto"
				placeholder="XX"
				type="number"
				v-model="hotkeyData.age"
				@input="updateHotkeyData"
			></v-text-field>
			<input
				type="checkbox"
				name=""
				id=""
				v-model="hotkeyData.pCard"
				@change="updateHotkeyData"
			/>
			<v-text-field
				label=""
				variant="underlined"
				density="compact"
				hide-details="auto"
				:placeholder="String($store.state.settings.defaultPrice)"
				type="number"
				v-model="hotkeyData.price"
				@input="updateHotkeyData"
			></v-text-field>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { IHotkey } from '@/types/hotkeys';
import { useStore } from '@/store/useStore';

export default defineComponent({
	props: {
		hotkeyIndex: {
			type: Number,
			required: true,
		},
	},
	setup(props) {
		const store = useStore();

		const hotkeyData = reactive<IHotkey>({
			title: '',
			age: null,
			pCard: null,
			price: store.state.settings.defaultPrice,
			uuid: store.state.hotkeys[props.hotkeyIndex].uuid,
		});

		function updateHotkeyData() {
			store.commit('updateHotkey', {
				hotkeyData: {
					...hotkeyData,
					age: hotkeyData.age ? Number(hotkeyData.age) : null,
					price: hotkeyData.price ? Number(hotkeyData.price) : null,
				},
				hotkeyIndex: props.hotkeyIndex,
			});
		}

		return { hotkeyData, updateHotkeyData };
	},
});
</script>

<style scoped></style>
