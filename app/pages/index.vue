<template>
<div>
  <VHeader/>

  <div class="wrap-cards">
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
  </div>

  <VPagination v-model="page" :total-pages="totalPages"/>
</div>
</template>

<script setup lang="ts">
const itemsPerPage = 10;


const { data: items, pending, error } = await useFetch('/api/rss')

const page = ref(1);

const totalPages = computed(() => {
  return Math.ceil((items.value?.length ?? 0) / itemsPerPage);
});

const totalPageItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return items.value?.slice(start, end) ?? [];
});
</script>

<style scoped lang="scss">
.wrap-cards {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 20px;
}
</style>
