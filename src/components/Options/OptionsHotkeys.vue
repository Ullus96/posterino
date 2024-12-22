<template>
	<OptionsBase :modalName="'isHotkeysModalOpen'">
		<template #title>Горячие клавиши</template>

		<template #default>
			<p class="opt__desc">Название фильма | Возраст | ПК</p>

			<div class="opt__inputs-block">
				<div class="opt__inputs-element" v-for="(item, idx) in 3" :key="item">
					<h4 class="opt__inputs-name">Alt + {{ idx + 1 }}</h4>
					<div class="opt__inputs-wrapper">
						<v-text-field
							label=""
							variant="underlined"
							density="compact"
							hide-details="auto"
							placeholder="Название фильма"
							v-model="data.name"
						></v-text-field>
						<v-text-field
							label=""
							variant="underlined"
							density="compact"
							hide-details="auto"
							placeholder="XX"
							type="number"
							v-model="data.age"
						></v-text-field>
						<input type="checkbox" name="" id="" v-model="data.pCard" />
					</div>
				</div>
			</div>
			<!-- {{ data.name }}, {{ data.age }}, {{ data.pCard }} -->

			<v-btn
				class="opt__btn"
				block
				prepend-icon="mdi-plus"
				color="color-secondary-300"
				>Добавить еще</v-btn
			>
		</template>
	</OptionsBase>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import OptionsBase from './OptionsBase.vue';
import { useStore } from '@/store/useStore';

export default defineComponent({
	components: { OptionsBase },
	setup() {
		const data = reactive({
			name: '',
			age: '',
			pCard: false,
		});

		return { data };
	},
});
</script>

<style scoped></style>
