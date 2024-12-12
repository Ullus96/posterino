<template>
  <h3 class="opt__header">Хоткеи</h3>
  <p class="opt__desc">Фильм | Возраст | Пушк. Карта</p>
  <h4 class="opt__keyname">Alt + 1</h4>
  <div class="opt__inputs">
    <input
      type="text"
      class="opt__input"
      placeholder="Фильм"
      v-model="hotkeys[0].title"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="xx+"
      v-model="hotkeys[0].age"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="0-1"
      v-model="hotkeys[0].pCard"
    />
  </div>
  <h4 class="opt__keyname">Alt + 2</h4>
  <div class="opt__inputs">
    <input
      type="text"
      class="opt__input"
      placeholder="Фильм"
      v-model="hotkeys[1].title"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="xx+"
      v-model="hotkeys[1].age"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="0-1"
      v-model="hotkeys[1].pCard"
    />
  </div>
  <h4 class="opt__keyname">Alt + 3</h4>
  <div class="opt__inputs">
    <input
      type="text"
      class="opt__input"
      placeholder="Фильм"
      v-model="hotkeys[2].title"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="xx+"
      v-model="hotkeys[2].age"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="0-1"
      v-model="hotkeys[2].pCard"
    />
  </div>
  <h4 class="opt__keyname">Alt + 4</h4>
  <div class="opt__inputs">
    <input
      type="text"
      class="opt__input"
      placeholder="Фильм"
      v-model="hotkeys[3].title"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="xx+"
      v-model="hotkeys[3].age"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="0-1"
      v-model="hotkeys[3].pCard"
    />
  </div>
  <h4 class="opt__keyname">Alt + 5</h4>
  <div class="opt__inputs">
    <input
      type="text"
      class="opt__input"
      placeholder="Фильм"
      v-model="hotkeys[4].title"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="xx+"
      v-model="hotkeys[4].age"
    />
    <input
      type="text"
      class="opt__input"
      placeholder="0-1"
      v-model="hotkeys[4].pCard"
    />
  </div>
</template>

<script>
export default {
  props: ["hotkeys"],
};
</script>

<style></style>
