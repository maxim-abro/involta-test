<template>
<div class="card">
  <div class="card__top">
    <div class="card__top__title">{{ title }}</div>
    <div class="card__top__description">{{ description }}</div>
  </div>

  <div class="card__bottom">
    <a class="card__bottom__link" :href="link">Подробнее</a>
    <div class="card__bottom__footer">
      <div class="card__bottom__footer__source">{{ source }}</div>
      <div class="card__bottom__footer__date">{{ dateText }}</div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
interface IProps {
  title?: string;
  description?: string;
  source?: string;
  date?: string;
  link?: string;
}

const props = defineProps<IProps>();

const dateText = computed(() => {
  if (!props.date) return '';

  return new Date(props.date).toLocaleDateString('ru-RU');
})
</script>

<style scoped lang="scss">
.card {
  border-radius: $default-radius;
  box-shadow: $default-shadow;
  padding: 30px 30px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__top {
    &__title {
      margin-bottom: 25px;
      font-size: 28px;
      font-weight: 700;
      color: $primary-color;
    }
    &__description {
      margin-bottom: 20px;
    }
  }

  &__bottom {
    &__link {
      display: block;
      margin-bottom: 19px;
      color: $primary-color;
    }
    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $second-color;
    }
  }
}
</style>
