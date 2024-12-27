<template>
	<div class="info__wrapper">
		<div
			class="info__phone-address-wrapper"
			:class="{
				'justify-center':
					!$store.state.settings.socials.tel ||
					!$store.state.settings.socials.address,
			}"
		>
			<p class="info__phone" v-if="$store.state.settings.socials.tel">
				Тел. {{ $store.state.settings.socials.tel }}
			</p>
			<p class="info__address" v-if="$store.state.settings.socials.address">
				{{ $store.state.settings.socials.address }}
			</p>
		</div>

		<div class="info__socials">
			<div class="info__social-item" v-if="$store.state.settings.socials.vk">
				<IconBase :width="18" :height="18">
					<IconVk />
				</IconBase>
				<p class="info__social-text">
					vk.com/{{ $store.state.settings.socials.vk }}
				</p>
			</div>
			<div class="info__social-item" v-if="$store.state.settings.socials.ok">
				<IconBase :width="18" :height="18">
					<IconOk />
				</IconBase>
				<p class="info__social-text">
					ok.ru/{{ $store.state.settings.socials.ok }}
				</p>
			</div>
			<div class="info__social-item" v-if="$store.state.settings.socials.link">
				<IconBase :width="18" :height="18">
					<IconLink />
				</IconBase>
				<p class="info__social-text">
					{{ $store.state.settings.socials.link }}
				</p>
			</div>
		</div>

		<div
			class="info__pCard-wrapper"
			v-if="$store.state.settings.socials.showPCard"
		>
			<PushkinCardLabel :p-card="true" />
			<span>-</span>
			<span class="info__pCard-desc"
				>возможность оплаты по Пушкинской Карте</span
			>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconOk from '@/components/ui/icon/icons/IconOk.vue';
import IconVk from '@/components/ui/icon/icons/IconVk.vue';
import IconLink from '@/components/ui/icon/icons/IconLink.vue';
import PushkinCardLabel from '@/components/ui/PushkinCardLabel.vue';
import { useStore } from '@/store/useStore';

export default defineComponent({
	components: { IconBase, IconOk, IconVk, IconLink, PushkinCardLabel },
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
