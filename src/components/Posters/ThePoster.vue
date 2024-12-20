<template>
	<div
		class="poster"
		ref="poster"
		:style="{
			left: '30%',
			top: '15%',
			zIndex: +'5' + item,
		}"
	>
		<!-- single poster controls -->
		<template v-if="$store.state.isEditing">
			<i class="fa-solid fa-xmark close poster__close"></i>

			<div class="poster__controls">
				<input type="text" class="poster__control" placeholder="link" />
				<input type="text" class="poster__control" placeholder="x" />
				<input type="text" class="poster__control" placeholder="y" />
				<input type="text" class="poster__control" placeholder="z[5-25]" />
				<input type="text" class="poster__control" placeholder="scale" />
			</div>
		</template>
		<img :src="posters[item].url" alt="" class="poster__img" />
	</div>
</template>

<script>
import { inject, ref, onMounted } from 'vue';
import interact from 'interactjs';
export default {
	props: ['posters', 'item', 'selector'],
	setup(props) {
		const poster = ref(null);

		onMounted(() => {
			poster.value.classList.add(props.selector);
			let x = 0;
			let y = 0;
			const element = document.getElementsByClassName(props.selector);
			// console.log(element[0]);
			// console.log(element[0].parentElement);
			// console.log(props);

			interact(element[0])
				.draggable({
					modifiers: [
						interact.modifiers.snap({
							targets: [interact.snappers.grid({ x: 5, y: 5 })],
							range: Infinity,
							relativePoints: [{ x: 0, y: 0 }],
						}),
						interact.modifiers.restrict({
							restriction: element.parentNode,
							elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
							endOnly: true,
						}),
					],
					inertia: true,
				})
				.on('dragmove', function (event) {
					x += event.dx;
					y += event.dy;

					event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
				});
		});

		return {
			poster,
		};
	},
};
</script>

<style></style>
