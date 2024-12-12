<template>
  <div>
    <p>
      Ссылка на изображение готова. Для того, чтобы увидеть результат, выполните
      с нижестоящей ссылкой следующие действия:<br />
      &mdash; Правая Клавиша Мыши (ПКМ) (может зависнуть на пару секунд)<br />&rarr;
      Открыть ссылку в новой вкладке<br />&rarr; Откройте вкладку браузера с
      изображением<br />&rarr; ПКМ<br />&rarr; Сохранить картинку как...
    </p>
    <br />
    <p class="modal__image-link" v-html="imageURL"></p>
  </div>
</template>

<script>
export default {
  props: ["imageURL"],
};
</script>

<style></style>
