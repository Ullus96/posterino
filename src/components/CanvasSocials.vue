<template>
	<div class="info__wrapper">
		<div class="info__phone-address-wrapper">
			<p class="info__phone">Тел. 2-17-43</p>
			<p class="info__address">с.Одесское, ул.Ленина, д.27</p>
		</div>

		<div class="info__socials"></div>

		<p>&nbsp;- возможность оплаты по Пушкинской Карте</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconOk from '@/components/ui/icon/icons/IconOk.vue';
import IconVk from '@/components/ui/icon/icons/IconVk.vue';
import IconLink from '@/components/ui/icon/icons/IconLink.vue';

export default defineComponent({
	components: { IconBase, IconOk, IconVk, IconLink },
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
