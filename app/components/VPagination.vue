<template>
  <nav class="pagination" aria-label="Пагинация">
    <button
      v-for="item in paginationItems"
      :key="item.key"
      class="pagination__item"
      :class="{ 'pagination__item--active': item.page === modelValue }"
      :disabled="item.type === 'ellipsis'"
      type="button"
      @click="selectPage(item.page)"
    >
      {{ item.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
interface IProps {
  totalPages: number;
  visiblePages?: number;
}

interface IPaginationItem {
  key: string;
  label: string;
  page: number;
  type: 'page' | 'ellipsis';
}

const props = withDefaults(defineProps<IProps>(), {
  visiblePages: 3,
});

const modelValue = defineModel<number>({required: true})

const paginationItems = computed<IPaginationItem[]>(() => {
  const totalPages = Math.max(1, props.totalPages);
  const visiblePages = Math.max(1, props.visiblePages);
  const currentPage = Math.min(Math.max(1, modelValue.value), totalPages);
  const items: IPaginationItem[] = [];

  const addPage = (page: number) => {
    items.push({
      key: `page-${page}`,
      label: String(page),
      page,
      type: 'page',
    });
  };

  const addEllipsis = (key: string) => {
    items.push({
      key,
      label: '...',
      page: currentPage,
      type: 'ellipsis',
    });
  };

  if (totalPages <= visiblePages + 1) {
    for (let page = 1; page <= totalPages; page++) {
      addPage(page);
    }

    return items;
  }

  addPage(1);

  const middlePages = Math.min(visiblePages, totalPages - 2);
  const half = Math.floor(middlePages / 2);
  let startPage = currentPage - half;
  let endPage = startPage + middlePages - 1;

  if (startPage < 2) {
    startPage = 2;
    endPage = startPage + middlePages - 1;
  }

  if (endPage > totalPages - 1) {
    endPage = totalPages - 1;
    startPage = endPage - middlePages + 1;
  }

  if (startPage > 2) {
    addEllipsis('ellipsis-start');
  }

  for (let page = startPage; page <= endPage; page++) {
    addPage(page);
  }

  if (endPage < totalPages - 1) {
    addEllipsis('ellipsis-end');
  }

  addPage(totalPages);

  return items;
});

const selectPage = async (page: number) => {
  if (page === modelValue.value) return;

  modelValue.value = page;
  await nextTick();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  gap: 16px;

  &__item {
    font-size: 18px;
    font-weight: 700;
    &:disabled {
      cursor: default;
    }

    &--active {
      color: $primary-color;
    }
  }
}
</style>
