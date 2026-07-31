<template>
<div>
  <VHeader/>

  <div class="wrap-cards">
    <VVerticalCard
        v-for="item of items"
        :key="item.link"
        :title="item.title"
        :description="item.description"
        :link="item.link"
        :source="item.sourceName"
        :date="item.date"
    />
  </div>
</div>
</template>

<script setup lang="ts">

const { data: items, pending, error } = await useFetch('/api/rss')
</script>

<style scoped lang="scss">
.wrap-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
</style>