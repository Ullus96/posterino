<template>
	<Transition name="fade" mode="out-in">
		<v-card
			width="auto"
			title="Формирование расписания из .csv таблицы"
			prepend-icon="mdi-table-arrow-up"
		>
			<template v-slot:text>
				<v-stepper
					alt-labels
					v-model="step"
					:items="['Загрузка', 'Выбор разделителя', 'ПК', 'Группировка']"
				>
					<template v-slot:item.1>
						<h4>Загрузите файл</h4>
						<v-file-input
							class="mt-2"
							label="Выберите .csv"
							accept=".csv"
							v-model="file"
							prepend-icon="mdi-upload"
						/>
					</template>

					<template v-slot:item.2>
						<v-card title="Step Two" flat>...</v-card>
					</template>

					<template v-slot:item.3>
						<v-card title="Step Three" flat>...</v-card>
					</template>

					<template v-slot:item.4>
						<v-card title="Step Четыре" flat>...</v-card>
					</template>

					<template v-slot:actions>
						<div class="d-flex justify-space-between ga-2 pa-2">
							<v-btn
								flat
								:disabled="step === 1"
								@click="step--"
								text="← Назад"
							/>
							<v-btn
								flat
								@click="step++"
								:text="step + 1 == 5 ? `Завершить` : `Шаг ${step + 1} →`"
								color="primary"
							/>
						</div>
					</template>
				</v-stepper>
			</template>

			<template v-slot:actions>
				<v-btn
					text="Отменить формирование"
					color="color-danger-200"
					@click="$emit('close')"
				></v-btn>
			</template>
		</v-card>
	</Transition>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
	components: {},
	props: {},
	emits: ['close'],
	setup() {
		const step: Ref<number> = ref(1);

		return { step };
	},
});
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
	transition: 0.2s ease-in-out opacity;
}
</style>
