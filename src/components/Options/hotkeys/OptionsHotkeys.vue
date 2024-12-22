<template>
	<OptionsBase :modalName="'isHotkeysModalOpen'">
		<template #title>Горячие клавиши</template>

		<template #default>
			<p class="opt__desc">Фильм | Возраст | ПК | Цена</p>

			<div class="opt__inputs-block">
				<HotkeysInputBlock
					v-for="(item, index) in store.state.hotkeys"
					:key="item.uuid"
					:hotkeyIndex="index"
				/>
			</div>
			<!-- {{ data.name }}, {{ data.age }}, {{ data.pCard }} -->

			<v-btn
				class="opt__btn"
				block
				prepend-icon="mdi-plus"
				color="color-secondary-300"
				@click="store.commit('createNewHotkey')"
				>Добавить еще</v-btn
			>
		</template>
	</OptionsBase>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import OptionsBase from '../OptionsBase.vue';
import { useStore } from '@/store/useStore';
import HotkeysInputBlock from '@/components/Options/hotkeys/HotkeysInputBlock.vue';

export default defineComponent({
	components: { OptionsBase, HotkeysInputBlock },
	setup() {
		const store = useStore();

		const data = reactive({
			name: '',
			age: '',
			pCard: false,
			price: null,
		});

		return { data, store };
	},
});
</script>

<style scoped></style>
