<template>
	<div
		class="empty"
		:class="{ editable: $store.state.isEditing }"
		:style="{ height: height + '%' }"
	>
		<template v-if="$store.state.isEditing">
			<p class="empty__desc" :class="{ compact: height === 10 }">Высота</p>
			<div class="empty__btns-wrapper">
				<v-btn
					density="compact"
					:variant="height === 10 ? 'tonal' : 'text'"
					@click="setHeight(10)"
					>10%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 20 ? 'tonal' : 'text'"
					@click="setHeight(20)"
					>20%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 30 ? 'tonal' : 'text'"
					@click="setHeight(30)"
					>30%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 40 ? 'tonal' : 'text'"
					@click="setHeight(40)"
					>40%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 50 ? 'tonal' : 'text'"
					@click="setHeight(50)"
					>50%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 60 ? 'tonal' : 'text'"
					@click="setHeight(60)"
					>60%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 70 ? 'tonal' : 'text'"
					@click="setHeight(70)"
					>70%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 80 ? 'tonal' : 'text'"
					@click="setHeight(80)"
					>80%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 90 ? 'tonal' : 'text'"
					@click="setHeight(90)"
					>90%</v-btn
				>
				<v-btn
					density="compact"
					:variant="height === 100 ? 'tonal' : 'text'"
					@click="setHeight(100)"
					>100%</v-btn
				>
			</div>
			<v-btn
				class="empty__btn"
				:class="{ compact: height === 10 }"
				block
				variant="text"
				prepend-icon="mdi-trash-can"
				color="color-danger-200"
				@click="$emit('removeEmptyBlock', blockIndex)"
				>Удалить</v-btn
			>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
	props: {
		blockIndex: {
			required: true,
			type: Number,
		},
	},
	setup() {
		const height: Ref<number> = ref(20);

		function setHeight(newVal: number) {
			height.value = newVal;
		}

		return { height, setHeight };
	},
});
</script>

<style scoped></style>
