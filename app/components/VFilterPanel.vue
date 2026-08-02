<template>
  <div class="panel">
    <div class="panel__filters">
      <button
          class="panel__filters__item"
          :class="{
            'active': !activeSource
          }"
          @click="chooseSource(null)"
      >
        Все
      </button>
      <button
          v-for="item of rssSources"
          :key="item.id"
          class="panel__filters__item"
          :class="{
            'active': activeSource === item.id,
          }"
          @click="chooseSource(item.id)"
      >{{ item.name }}</button>
    </div>

    <div class="panel__orientation">
      <button
          class="panel__orientation__button"
          :class="{
            'active': activeOrientation === 'horizontal',
          }"
          @click="chooseOrientation('horizontal')"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="18" height="8" fill="currentColor"/>
          <rect y="10" width="18" height="8" fill="currentColor"/>
        </svg>
      </button>
      <button
          class="panel__orientation__button"
          :class="{
              'active': activeOrientation === 'vertical',
          }"
          @click="chooseOrientation('vertical')"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="8" height="8" fill="currentColor"/>
          <rect y="10" width="8" height="8" fill="currentColor"/>
          <rect x="10" width="8" height="8" fill="currentColor"/>
          <rect x="10" y="10" width="8" height="8" fill="currentColor"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TOrientation } from "~/types/types.ts";
import { rssSources } from "~~/shared/data/rss-sources";

const activeOrientation = defineModel<TOrientation>('orientation', {
  required: true,
});
const activeSource = defineModel<string | null>('activeSource', {
  required: true,
});

const chooseSource = (source: string | null) => {
  activeSource.value = source;
}

const chooseOrientation = (orientation: TOrientation) => {
  activeOrientation.value = orientation;
}
</script>

<style scoped lang="scss">
.panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  &__filters {
    display: flex;
    gap: 8px;
    &__item {
      background: none;
      color: $primary-color;
      font-size: 14px;
      font-weight: 700;
    &.active {
        color: #000000;
      };
    }
  }

  &__orientation {
    display: flex;
    gap: 10px;
    &__button {
      cursor: pointer;
      color: #C4C4C4;
      &.active {
        color: $primary-color;
      }
    }
  }
}
</style>
