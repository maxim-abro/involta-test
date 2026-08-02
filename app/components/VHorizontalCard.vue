<template>
  <div class="card">
    <div class="card__top">
      <div class="card__top__image">
        <img v-if="image" :src="image" :alt="title || ''">
      </div>
      <div class="card__top__content">
        <div class="card__top__content__title">{{title}}</div>
        <div class="card__top__content__description">{{description}}</div>
      </div>
    </div>

    <div class="card__bottom">
      <a class="card__bottom__source" :href="link" target="_blank" rel="noopener noreferrer">{{source}}</a>
      <div class="card__bottom__date">{{dateText}}</div>
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
  image?: string;
}

const props = defineProps<IProps>();

const dateText = computed(() => {
  if (!props.date) return '';

  return new Date(props.date).toLocaleDateString('ru-RU');
})
</script>

<style scoped lang="scss">
.card {
  overflow: hidden;
  border-radius: $default-radius;
  background-color: #fff;
  box-shadow: $default-shadow;
  padding-top: 30px;

  &__top {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    padding: 0 30px;
    margin-bottom: 30px;

    &__image {
      width: 200px;
      height: auto;
      flex: 0 0 200px;
      background-color: #f3f3f3;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      min-width: 0;
      padding-top: 1px;

      &__title {
        margin-bottom: 42px;
        color: $primary-color;
        font-size: 18px;
        line-height: 1.25;
        font-weight: 700;
      }

      &__description {
        color: #111;
        font-size: 14px;
        line-height: 1.45;
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FCFCFC;
    color: $second-color;
    font-size: 14px;
    padding: 4px 30px;

    &__source {
      color: inherit;
      text-decoration: underline;
    }

    &__date {
      color: inherit;
    }
  }
}

@media screen and (max-width: 720px) {
  .card {
    padding-top: 20px;
    &__top {
      flex-direction: column;
      margin-bottom: 20px;
      &__image {
        width: 100%;
      }
      &__content {
        &__title {
          font-size: 18px;
          margin-bottom: 20px;
        }
        &__description {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
