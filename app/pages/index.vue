<template>
<div>
  <VHeader
      v-model:search="search"
      @clear-filters="clearFilters"
  />

  <hr>

  <VFilterPanel
    v-model:orientation="cardsOrientation"
    v-model:active-source="activeSource"
  />

  <div
      v-if="!isError"
      class="wrap-cards"
      :class="[cardsOrientation]"
  >
    <template v-if="cardsOrientation === 'horizontal'">
      <VHorizontalCard
          v-for="item of totalPageItems"
          :key="item.link"
          :title="item.title"
          :description="item.description"
          :link="item.link"
          :source="item.sourceName"
          :date="item.date"
          :image="item.image"
      />
    </template>
    <template v-else>
      <VVerticalCard
          v-for="item of totalPageItems"
          :key="item.link"
          :title="item.title"
          :description="item.description"
          :link="item.link"
          :source="item.sourceName"
          :date="item.date"
          :image="item.image"
      />
    </template>
  </div>
  <div v-else>
    Ошибка!!!
  </div>
  <div v-if="!isError && isNewsEmpty">
    Ничего не найдено
  </div>

  <VPagination
      v-model="page"
      :total-pages="totalPages"
  />
</div>
</template>

<script setup lang="ts">
import type { TOrientation } from "~/types/types.ts";
import {useNewsFilters} from "~/composables/useNewsFilters.ts";
import {useLocalStorage} from "~/composables/useLocalStorage.ts";

const { data: items, status } = await useAsyncData('news', () => $fetch('/api/rss'));

const news = computed(() => items.value ?? []);

const isError = computed(() => status.value === 'error');
const isNewsEmpty = computed(() => totalPageItems.value.length === 0);

const cardsOrientation = useLocalStorage<TOrientation>('cards-orientation', 'horizontal');

const {
  clearFilters,
  updateQuery,
  totalPageItems,
  activeSource,
  totalPages,
  search,
  page,
} = useNewsFilters(news);

watch(totalPages, (value) => {
  if (page.value > value) {
    updateQuery({ page: value > 1 ? value : null });
  }
});
</script>

<style scoped lang="scss">
.wrap-cards {
  display: grid;
  gap: 20px;
  margin-bottom: 50px;
  &.horizontal {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  &.vertical {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

hr {
  margin: 36px 0 25px;
}

@media (max-width: 1280px) {
  .wrap-cards {
    &.vertical {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@media(max-width: 720px) {
  .wrap-cards {
    &.vertical {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
}
</style>
