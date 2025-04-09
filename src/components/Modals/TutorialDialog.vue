<template>
	<v-card max-width="auto" title="Функционал редактора">
		<template v-slot:text>
			<v-tabs v-model="tab" class="mt-1 mb-6" density="compact" center-active>
				<v-tab value="base">Режим редактирования</v-tab>
				<v-tab value="schedule">Сеансы</v-tab>
				<v-tab value="linebreak">Перенос строки</v-tab>
				<v-tab value="hotkeys">Горячие клавиши</v-tab>
				<v-tab value="settings">Настройки</v-tab>
				<v-tab value="auto-save">Сохранение</v-tab>
			</v-tabs>

			<v-tabs-window v-model="tab">
				<!-- base -->
				<v-tabs-window-item value="base" class="tutorial__tab">
					<h3>Режим редактирования</h3>
					<p>Все изменения делаются в режиме "Редактирования".</p>
					<div class="tutorial__flex mt-4 mb-4">
						<v-btn variant="flat" icon="mdi-pencil" color="color-secondary-200">
						</v-btn>
						<p>
							Найдите кнопку на панели инструментов, чтобы включить этот режим.
						</p>
					</div>
					<v-divider class="mb-4"></v-divider>
					<h3>Дата</h3>
					<div class="tutorial__flex mt-4">
						<v-btn
							variant="flat"
							icon="mdi-calendar"
							color="color-secondary-200"
						>
						</v-btn>
						<p>
							Дата автоматически выставляется на завтра, но вы можете поменять
							её на панели инструментов, нажав на кнопку.
						</p>
					</div>
				</v-tabs-window-item>
				<!-- End of base -->

				<!-- schedule -->
				<v-tabs-window-item value="schedule" class="tutorial__tab">
					<h3>Сеансы</h3>
					<p>
						Для добавления или удаления строк используйте кнопки "+" и "-",
						расположенные справа-сверху карточки дня.<br />
					</p>
					<div class="tutorial__flex mt-4 mb-4">
						<p>Внешний вид кнопок:</p>
						<v-btn
							icon="mdi-plus"
							color="color-secondary-400"
							density="compact"
						>
						</v-btn>
						<v-btn
							icon="mdi-minus"
							color="color-secondary-400"
							density="compact"
						>
						</v-btn>
					</div>
					<h4>Скрыть день</h4>
					<p>
						Справа-сверху есть иконка ⋮ , в которой содержатся 2 действия, их
						функционал следующий:<br />
					</p>
					<p>
						1. Заменить расписание на сообщение, которое задается в настройках
						(напр., "В этот день сеансов нет")<br />
					</p>
					<p>
						2. Полностью убрать день из отображения (для отмены скрытия,
						пролистайте страницу вниз)<br />
					</p>
					<p>
						Эти действия не деструктивные. Нажав на них, данные не потеряются.
						<br />
					</p>
					<div class="tutorial__flex mt-4 mb-4">
						<p>Внешний вид кнопок:</p>
						<v-btn
							icon="mdi-movie-off-outline"
							color="color-secondary-400"
							density="compact"
						>
						</v-btn>
						<v-btn
							icon="mdi-close-outline"
							color="color-secondary-400"
							density="compact"
						>
						</v-btn>
					</div>
					<v-divider class="mb-4"></v-divider>
					<h3>Больше сеансов в одной ячейке</h3>
					<p>
						Можно добавять более одного времени сеанса для конкретного фильма.
					</p>
					<p>
						Для этого, в графе минут нажмите <b>Enter</b>, чтобы создать новую
						ячейку времени.
					</p>
					<p>
						Для удаления ячейки - нажмите <b>Backspace</b> (удалить) в графе
						часов в дополнительно созданной ячейке.
					</p>
				</v-tabs-window-item>
				<!-- End of schedule -->

				<!-- linebreak -->
				<v-tabs-window-item value="linebreak" class="tutorial__tab">
					<h3>Перенос строки</h3>
					<p>
						Карточки дня (как и весь контент) автоматически распределяются по
						трём колонкам. Если день занимает больше высоты, чем осталось места
						в колонке, он переносится в следующую.
					</p>
					<p>
						Но для противодействию переносу, имеется возможность разбить
						карточку дня на 2 части.
					</p>
					<v-divider class="mt-4 mb-4"></v-divider>

					<h3>Ручной перенос</h3>
					<p>
						При нажатии на кнопку "Создать разрыв строки", карточка разделится
						на 2 части: от первого фильма до текущего, и от следующего до конца.
					</p>
					<p>Кнопка имеет следующий вид.</p>
					<div class="tutorial__flex mt-4 mb-4">
						<v-btn icon="mdi-format-page-break" color="color-primary-500">
						</v-btn>
						<ol>
							<li>Наведите на фильм, нажмите кнопку "Перенос строки".</li>
							<li>Список разделится на две части.</li>
						</ol>
					</div>
					<v-divider class="mb-4"></v-divider>

					<h3>Отмена переноса</h3>
					<div class="tutorial__flex mt-4 mb-4">
						<v-btn icon="mdi-undo" color="color-secondary-400"> </v-btn>
						<p>Нажмите "Соединить обратно" справа от дня недели.</p>
					</div>
				</v-tabs-window-item>
				<!-- End of linebreak -->

				<!-- hotkeys -->
				<v-tabs-window-item value="hotkeys" class="tutorial__tab">
					<h3>Горячие клавиши</h3>
					<div class="tutorial__flex mt-4 mb-2">
						<v-btn
							variant="flat"
							icon="mdi-keyboard"
							color="color-secondary-200"
						>
						</v-btn>

						<p>
							Кнопка "Горячие клавиши" в панели навигации позволяет быстро
							вводить следующие данные:
						</p>
					</div>
					<ul>
						<li>Название фильма</li>
						<li>Возрастное ограничение</li>
						<li>Оплата по Пушкинской карте</li>
						<li>Цена</li>
					</ul>
					<v-divider class="mt-4 mb-4"></v-divider>
					<h3>Применение:</h3>
					<p>
						Для применения, необходимо выделить текстовое поле, куда
						устанавливается название фильма, и нажать соответсвующую горячую
						клавишу (например, Alt+1)
					</p>
				</v-tabs-window-item>

				<!-- settings -->
				<v-tabs-window-item value="settings" class="tutorial__tab">
					<h3>Настройки</h3>
					<p>
						Вы можете изменить цену по умолчанию, текст "Нет сеансов", размеры
						шрифтов и контакты
					</p>
					<div class="tutorial__flex mt-4 mb-4">
						<v-btn variant="flat" icon="mdi-cog" color="color-secondary-200">
						</v-btn>
						<p>
							Для этого, найдите соответсвующую кнопку на панели инструментов.
						</p>
					</div>
				</v-tabs-window-item>

				<!-- auto-save -->
				<v-tabs-window-item value="auto-save" class="tutorial__tab">
					<h3>Сохранение</h3>
					<p>Сохранение происходит автоматически каждые 15 секунд.</p>
					<p>Все данные сохраняются, в том числе, горячие клавиши.</p>
				</v-tabs-window-item>
			</v-tabs-window>
		</template>
		<template v-slot:actions>
			<v-btn text="Назад" @click="$emit('close')"></v-btn>
		</template>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	emits: ['close'],
	setup() {
		const tab = ref();
		return { tab };
	},
});
</script>

<style scoped></style>
