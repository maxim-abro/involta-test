<template>
<div>
  <VHeader v-model:search="search"/>
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
import type { TOrientation } from "~/types/types.ts";
import type {IRssItem} from "#server/types/rss.ts";

const itemsPerPage = 4;
const route = useRoute();
const router = useRouter();

const { data: items } = await useFetch('/api/rss');

const getQueryValue = (value: unknown) => {
  return Array.isArray(value) ? value[0] : value;
};

const updateQuery = (query: Record<string, string | number | null>) => {
  const nextQuery = { ...route.query };

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === '') {
      delete nextQuery[key];
      return;
    }

    nextQuery[key] = String(value);
  });

  router.replace({ query: nextQuery });
};

const page = computed({
  get() {
    const queryPage = Number(getQueryValue(route.query.page));

    return Number.isInteger(queryPage) && queryPage > 0 ? queryPage : 1;
  },
  set(value: number) {
    updateQuery({ page: value > 1 ? value : null });
  },
});

const cardsOrientation = ref<TOrientation>('vertical');

const activeSource = computed<string | null>({
  get() {
    return getQueryValue(route.query.source) ?? null;
  },
  set(value: string | null) {
    updateQuery({ source: value, page: null });
  },
});

const search = computed({
  get() {
    return getQueryValue(route.query.q) ?? '';
  },
  set(value: string) {
    updateQuery({ q: value.trim(), page: null });
  },
});

const filterItemsBySource = (): IRssItem[] => {
  if (!activeSource.value) return items?.value ?? [];

  return items.value?.filter(item => item.sourceId === activeSource.value) ?? [];
}

const filteredItems = computed(() =>{
  const sourceItems = filterItemsBySource();
  const normalizedSearch = search.value.toLowerCase();

  if (!normalizedSearch) return sourceItems;

  return sourceItems.filter((item) => {
    return [
      item.title,
      item.description,
      item.sourceName,
    ].some((value) => value?.toLowerCase().includes(normalizedSearch));
  });
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage));
});

watch(totalPages, (value) => {
  if (page.value > value) {
    updateQuery({ page: value > 1 ? value : null });
  }
});

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
