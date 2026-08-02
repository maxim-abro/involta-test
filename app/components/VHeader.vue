<template>
<div class="header">
  <div class="header__title">
    <div class="header__title__text">
      Список новостей
    </div>
    <button class="header__title__button-reload" @click="clearFilters">
      <img src="~/assets/images/reload.svg" alt="Перезагрузка">
    </button>
  </div>

  <div class="header__input">
    <VInputSearch v-model="search" />
  </div>
</div>
</template>

<script setup lang="ts">
const search = defineModel<string>('search', {
  required: true,
});

const emits = defineEmits<{
  (e: 'clear-filters'): void;
}>()

const clearFilters = () => emits('clear-filters');
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    display: flex;
    gap: 30px;
    &__text {
      font-size: 36px;
    }
    &__button-reload {
      cursor: pointer;
      background: #FFF;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $primary-color;
      border-radius: 50%;
      padding: 12px 10px;
      box-shadow: $default-shadow;
    }
  }
}
</style>
