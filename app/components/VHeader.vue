<template>
<div class="header">
  <div class="header__title">
    <div class="header__title__text">
      Список новостей
    </div>
    <button class="header__title__button-reload">
      <img src="~/assets/images/reload.svg" alt="Перезагрузка">
    </button>
  </div>

  <div class="header__input">
    <VInputSearch />
  </div>
</div>
</template>

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
