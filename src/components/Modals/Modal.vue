<template>
  <div class="modal">
    <div class="modal__card">
      <i class="fa-solid fa-xmark close" @click="closeModal"></i>
      <div class="modal__loading" v-if="!imageURL">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4>Происходит генерация контента</h4>
      </div>
      <modal-screenshot v-if="imageURL" :imageURL="imageURL"></modal-screenshot>
      <!-- <div v-if="isScreenshotModalVisible">Content</div> -->
    </div>
  </div>
</template>

<script>
import { ref, inject, onUnmounted } from "vue";
import ModalScreenshot from "./ModalScreenshot.vue";
export default {
  props: ["imageURL"],
  emits: ["closeModal"],
  setup(props, context) {
    function closeModal() {
      context.emit("closeModal");
    }

    // add and remove scroll from body component
    document.body.classList.add("modal");
    onUnmounted(() => {
      document.body.classList.remove("modal");
    });

    return {
      closeModal,
    };
  },
  components: { ModalScreenshot },
};
</script>

<style></style>
