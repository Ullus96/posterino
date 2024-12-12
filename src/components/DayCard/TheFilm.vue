<template>
  <template v-if="!isEditable">
    <div class="canvas__item">
      <div class="canvas__time" v-if="filmData.hh != ''">
        <p class="canvas__hours">{{ filmData.hh }}</p>
        <p class="canvas__minutes">{{ filmData.mm }}</p>
      </div>
      <div class="canvas__time" v-else></div>
      <div class="canvas__name">
        <h2 class="canvas__title">
          {{ filmData.title ? filmData.title : " " }}
        </h2>
        <p class="canvas__age" v-if="filmData.age && filmData.age != 0">
          {{ filmData.age }}
        </p>
        <p class="canvas__p-card" v-if="filmData.pCard && filmData.pCard != 0">
          ПК
        </p>
      </div>
      <div class="canvas__price" v-if="filmData.price != ''">
        {{ filmData.price }}
      </div>
    </div>
  </template>
  <template v-else>
    <div class="canvas__item">
      <div class="canvas__time">
        <input
          type="text"
          class="canvas__hours"
          placeholder="ЧЧ"
          ref="hh"
          v-model="filmData.hh"
          @keyup="timeInputSwitch('hh')"
        />
        <input
          type="text"
          class="canvas__minutes"
          placeholder="ММ"
          ref="mm"
          v-model="filmData.mm"
          @keyup="timeInputSwitch('mm')"
        />
      </div>
      <div class="canvas__name">
        <h2 class="canvas__title">
          <input
            type="text"
            placeholder="Фильм"
            ref="title"
            v-model="filmData.title"
            @keydown.alt.1="useHotkey('0')"
            @keydown.alt.2="useHotkey('1')"
            @keydown.alt.3="useHotkey('2')"
            @keydown.alt.4="useHotkey('3')"
            @keydown.alt.5="useHotkey('4')"
          />
        </h2>
        <!-- <p class="canvas__age">12+</p> -->
        <input
          type="text"
          placeholder="xx+"
          ref="age"
          v-model="filmData.age"
          @keyup.+="ageSwitch()"
        />
        <input
          type="number"
          placeholder="пк?"
          ref="pCard"
          v-model="filmData.pCard"
          @keyup="pCardSwitch()"
        />
      </div>
      <div class="canvas__price">
        <input
          type="number"
          placeholder="Цена"
          ref="price"
          v-model="filmData.price"
        />
      </div>
    </div>
  </template>
</template>

<script>
import { ref, inject, reactive } from "vue";
export default {
  setup() {
    const isEditable = inject("isEditable");

    const mm = ref(null);
    const title = ref(null);
    const age = ref(null);
    const pCard = ref(null);
    const price = ref(null);

    const filmData = reactive({
      hh: "",
      mm: "",
      title: "",
      age: "",
      pCard: "",
      price: "150",
    });

    function timeInputSwitch(field) {
      if (field === "hh" && filmData.hh.length === 2) {
        mm.value.focus();
      } else if (field === "mm" && filmData.mm.length === 2) {
        title.value.focus();
      }
    }

    function ageSwitch() {
      pCard.value.focus();
    }

    function pCardSwitch() {
      if (filmData.pCard) {
        price.value.focus();
        price.value.select();
      }
    }

    // hotkeys
    const hotkeys = inject("hotkeys");

    function useHotkey(i) {
      filmData.title = hotkeys[i].title;
      filmData.age = hotkeys[i].age;
      filmData.pCard = hotkeys[i].pCard;
      if (filmData.title) {
        price.value.focus();
        price.value.select();
      }
    }

    return {
      isEditable,
      filmData,
      timeInputSwitch,
      ageSwitch,
      pCardSwitch,
      mm,
      title,
      age,
      pCard,
      price,
      hotkeys,
      useHotkey,
    };
  },
};
</script>

<style></style>
