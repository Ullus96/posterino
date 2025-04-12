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
					:items="['Загрузка', 'Проверка корректности', 'ПК', 'Группировка']"
				>
					<template v-slot:item.1>
						<h4>Загрузите файл</h4>
						<v-file-input
							class="mt-2"
							label="Выберите .csv"
							accept=".csv"
							type="file"
							ref="fileInput"
							@change="handleUpload"
							prepend-icon="mdi-upload"
						/>

						<v-radio-group
							v-model="separator"
							inline
							label="Выберите разделитель"
						>
							<v-radio label="Запятая — ," value="comma"></v-radio>
							<v-radio label="Точка с запятой — ;" value="semicolon"></v-radio>
						</v-radio-group>

						<v-divider width="100%" class="mt-2 mb-6"></v-divider>

						<v-expansion-panels :variant="'accordion'">
							<v-expansion-panel
								title="Что такое разделитель?"
								collapse-icon="mdi-minus"
								expand-icon="mdi-plus"
							>
								<template v-slot:text>
									Объяснить, что на следующей странице структура должна иметь
									определенный вид
								</template>
							</v-expansion-panel>
							<v-expansion-panel
								title="Как сохранить Excel таблицу в .csv формате"
								collapse-icon="mdi-minus"
								expand-icon="mdi-plus"
							>
								<template v-slot:text>
									Сюда вставить скриншоты как это делать
								</template>
							</v-expansion-panel>
							<v-expansion-panel
								title="Требуемая структура файла"
								collapse-icon="mdi-minus"
								expand-icon="mdi-plus"
							>
								<template v-slot:text> Сюда вставить скриншот </template>
							</v-expansion-panel>
						</v-expansion-panels>
					</template>

					<template v-slot:item.2>
						<h4>Проверьте корректность отображения</h4>
						<p class="schedule__text-desc mt-2">
							Если структура ниже - это не [ "текст", "", "" ], или что-то
							похожее (важно именно наличие множественных кавычек), поменяйте на
							прошлом шаге разделитель и загрузите файл заново.
						</p>
						<p class="schedule__test-text mt-2 px-4 py-2">
							{{ rawData[0] }}
						</p>
					</template>

					<template v-slot:item.3>
						<h4 class="mb-4">
							Выберите фильмы, по которым возможна оплата Пушкинской Картой
						</h4>
						<v-checkbox
							v-for="film in uniqueFilms"
							:key="film"
							:label="film"
							v-model="pCardMap[film]"
							hide-details
							:density="'compact'"
						></v-checkbox>

						<button @click="confirm" class="px-4 py-2 mt-4">
							подтвердить загрузку
						</button>
					</template>

					<template v-slot:item.4>
						<v-card title="Step Четыре" flat>...</v-card>
					</template>

					<template v-slot:actions>
						<div class="d-flex justify-space-between ga-2 pa-2">
							<v-btn
								:variant="'plain'"
								:disabled="step === 1"
								@click="step--"
								text="← Назад"
							/>
							<v-btn
								:variant="'flat'"
								:disabled="!isStepValid"
								@click="step++"
								:text="step + 1 == 5 ? `Завершить` : `Шаг ${step + 1} →`"
								color="color-secondary-400"
							/>
						</div>
					</template>
				</v-stepper>
			</template>

			<template v-slot:actions>
				<v-btn
					text="Закрыть это окно"
					color="color-danger-200"
					@click="$emit('close')"
				></v-btn>
			</template>
		</v-card>
	</Transition>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import Papa from 'papaparse';
import moment from 'moment';
import { generateUUID } from '@/utilities/UUID';
import { useStore } from '@/store/useStore';
import { IDaySchedule, ISingleFilm, ITimeSlot } from '@/types/films';
import { computed } from 'vue';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

export default defineComponent({
	components: {},
	props: {},
	emits: ['close'],
	setup() {
		const step: Ref<number> = ref(1);

		const store = useStore();
		const separator = ref<'comma' | 'semicolon'>('semicolon');
		const rawData = ref<string[][]>([]);
		const schedule = ref<IDaySchedule[]>([]);
		const uniqueFilms: Ref<Set<string>> = ref(new Set());
		const pCardMap = ref<Record<string, boolean>>({});

		const fileInput = ref<HTMLInputElement | null>(null);
		const fileUploaded: Ref<boolean> = ref(false);

		function handleUpload(e: Event) {
			const file = (e.target as HTMLInputElement).files?.[0];
			fileUploaded.value = false;

			if (!file) return;
			fileUploaded.value = true;

			Papa.parse(file, {
				delimiter: separator.value === 'comma' ? ',' : ';',
				complete: (results) => {
					rawData.value = results.data as string[][];
					parseRows(rawData.value);
				},
				encoding: 'UTF-8',
				skipEmptyLines: true,
			});
		}

		function parseRows(rows: string[][]) {
			schedule.value = [];
			let currentDate: moment.Moment | null = null;
			let currentFilms: ISingleFilm[] = [];
			let rangeDates: moment.Moment[] = [];

			rows.forEach((row) => {
				const [first] = row;

				const dateMatch = first?.match(
					/^(\d{2}\.\d{2}\.\d{4})\s*(?:[-—]\s*(\d{2}\.\d{2}\.\d{4}))?$/
				);

				// Если нашли дату
				if (dateMatch) {
					// Если была одиночная дата до этого — пушим с фильмами
					if (currentDate) {
						schedule.value.push({
							date: currentDate,
							isWorkingDay: true,
							isDayVisible: true,
							lineBreakIndex: 0,
							films: [...currentFilms],
						});
					}

					currentFilms = [];

					const startDate = moment(dateMatch[1], 'DD.MM.YYYY').locale('ru');

					if (dateMatch[2]) {
						const endDate = moment(dateMatch[2], 'DD.MM.YYYY').locale('ru');
						rangeDates = [];

						let date = startDate.clone();
						while (date.isSameOrBefore(endDate)) {
							rangeDates.push(date.clone());
							schedule.value.push({
								date: date.clone(),
								isWorkingDay: true,
								isDayVisible: true,
								lineBreakIndex: 0,
								films: [], // Изначально пустой массив фильмов
							});
							date.add(1, 'day');
						}

						currentDate = null; // Диапазон обработан, сбрасываем currentDate
						currentFilms = [];
					} else {
						currentDate = startDate;
						rangeDates = [];
						currentFilms = [];
					}

					return;
				}

				// Обработка строки с фильмом
				if (first?.match(/^\d{2}:\d{2}$/)) {
					const [start, , , title, , ageStr, , priceStr] = row;

					const [hours, minutes] = start.split(':').map(Number);
					const age = ageStr ? parseInt(ageStr) : null;
					const price = priceStr ? parseInt(priceStr) : 0;

					const uuid = generateUUID();

					const film: ISingleFilm = {
						title: title.trim(),
						uuid,
						age,
						price,
						pCard: null,
						timeSlots: [
							{
								uuid: generateUUID(),
								hours,
								minutes,
							},
						],
					};

					uniqueFilms.value.add(film.title);
					pCardMap.value[film.title] = false;

					if (currentDate) {
						currentFilms.push(film);
					} else if (rangeDates.length > 0) {
						// Добавляем фильм только к последнему дню диапазона
						const lastDate = rangeDates[0];
						const day = schedule.value.find((s) =>
							s.date.isSame(lastDate, 'day')
						);
						if (day) {
							day.films.push({ ...film });
						}
					}
				}
			});

			// Пушим последний одиночный день, если был
			if (currentDate) {
				schedule.value.push({
					date: currentDate,
					isWorkingDay: true,
					isDayVisible: true,
					lineBreakIndex: 0,
					films: [...currentFilms],
				});
			}

			// Обеспечиваем 7 дней в расписании
			ensureSevenDays();
		}

		// Функция для генерации 7 дней
		function ensureSevenDays() {
			if (schedule.value.length === 0) {
				// Если расписание пустое, создаем 7 дней, начиная с сегодняшнего
				const startDate = moment().locale('ru');
				for (let i = 0; i < 7; i++) {
					schedule.value.push({
						date: startDate.clone().add(i, 'days'),
						isWorkingDay: false,
						isDayVisible: true,
						lineBreakIndex: 0,
						films: [],
					});
				}
				return;
			}

			// Сортируем расписание по датам
			schedule.value.sort((a, b) => a.date.diff(b.date));

			const firstDate = schedule.value[0].date.clone();
			const lastDate = schedule.value[schedule.value.length - 1].date.clone();
			const requiredDays = 7;

			// Добавляем недостающие дни до или после
			while (schedule.value.length < requiredDays) {
				if (schedule.value.length === 0) break;

				// Проверяем, нужно ли добавить дни до первой даты
				const earliestDate = schedule.value[0].date.clone();
				if (
					earliestDate.diff(firstDate, 'days') >
					-(requiredDays - schedule.value.length)
				) {
					const newDate = earliestDate.subtract(1, 'day');
					schedule.value.unshift({
						date: newDate.clone(),
						isWorkingDay: false,
						isDayVisible: true,
						lineBreakIndex: 0,
						films: [],
					});
				} else {
					// Добавляем день после последней даты
					const latestDate =
						schedule.value[schedule.value.length - 1].date.clone();
					const newDate = latestDate.add(1, 'day');
					schedule.value.push({
						date: newDate.clone(),
						isWorkingDay: false,
						isDayVisible: true,
						lineBreakIndex: 0,
						films: [],
					});
				}
			}

			// Убедимся, что расписание отсортировано
			schedule.value.sort((a, b) => a.date.diff(b.date));
		}

		const confirm = () => {
			const withPCard = schedule.value.map((day) => ({
				...day,
				films: day.films.map((film) => ({
					...film,
					pCard: pCardMap.value[film.title] ?? false,
				})),
			}));

			console.log(withPCard);

			store.commit('setSchedule', withPCard);
		};

		const isStepValid = computed(() => {
			if (step.value === 1) return fileUploaded.value;
			// if (step.value === 2) return true;
			// if (step.value === 3) return false;
			// if (step.value === 4) return false;

			return true;
		});

		return {
			step,
			separator,
			rawData,
			schedule,
			uniqueFilms,
			pCardMap,
			fileInput,
			handleUpload,
			parseRows,
			confirm,
			isStepValid,
		};
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
