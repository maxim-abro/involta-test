<template>
<div>
  <VHeader/>
  <hr>
  <VFilterPanel
    v-model:orientation="cardsOrientation"
    v-model:active-source="activeSource"
  />

  <div class="wrap-cards" :class="[cardsOrientation]">
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

  <VPagination
      v-model="page"
      :total-pages="totalPages"
  />
</div>
</template>

<script setup lang="ts">
import type { TOrientationType } from "~/types/types.ts";
import type {IRssItem} from "#server/types/rss.ts";

const itemsPerPage = 4;

const { data: items } = await useFetch('/api/rss');

const page = ref(1);
const cardsOrientation = ref<TOrientationType>('horizontal');
const activeSource = ref<string | null>(null);

const totalPages = computed(() => {
  return Math.ceil((items.value?.length ?? 0) / itemsPerPage);
});

const filterItemsBySource = (): IRssItem[] => {
  if (!activeSource.value) return items?.value ?? [];

  return items.value?.filter(item => item.sourceId === activeSource.value) ?? [];
}

const filteredItems = computed(() =>{
  return filterItemsBySource();
})

const totalPageItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filteredItems.value.slice(start, end);
});
</script>

<style scoped lang="scss">
.wrap-cards {
  display: grid;

  gap: 20px;
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
</style>
