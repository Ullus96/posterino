<template>
	<div
		class="canvas__info"
		:class="{ bottom: state === 'bot', right: state === 'right' }"
	>
		<div class="info__controls" v-if="isEditable">
			<div
				class="info__control-btn"
				:class="{ active: state === 'bot' }"
				@click="position('bot')"
			>
				↓
			</div>
			<div
				class="info__control-btn"
				:class="{ active: state === 'right' }"
				@click="position('right')"
			>
				→
			</div>
		</div>
		<h4 class="canvas__info-header">
			Актуальное расписание вы можете узнать в наших соцсетях:
		</h4>
		<div class="canvas__info-links">
			<div class="canvas__info-link">
				<i class="fa-brands fa-vk"></i>vk.com/odess_kino
			</div>
			<div class="canvas__info-link">
				<i class="fa-brands fa-square-odnoklassniki"></i>ok.ru/odesskyrkd
			</div>
			<div class="canvas__info-link">
				<i class="fa-solid fa-link"></i>odesskoekdc.omsk.muzkult.ru
			</div>
		</div>
		<div class="canvas__info-links">
			<div class="canvas__info-tel">
				<p class="canvas__info-tel--header">Телефон для справок</p>
				<p class="canvas__info-tel--content">2-17-43</p>
			</div>

			<div class="canvas__info-location">
				<p class="canvas__info-location--header">Адрес Одесского ДК</p>
				<p class="canvas__info-location--content">
					c.Одесское, ул.Ленина, д.27
				</p>
			</div>
		</div>
		<div class="info__legend">
			<p class="canvas__p-card">ПК</p>
			<p>&nbsp;- возможность оплаты по Пушкинской Карте</p>
		</div>
	</div>
</template>

<script>
import { ref, inject } from 'vue';
export default {
	setup() {
		const isEditable = inject('isEditable');
		const state = ref('bot');

		function position(pos) {
			state.value = pos;
		}

		return {
			isEditable,
			state,
			position,
		};
	},
};
</script>

<style></style>
