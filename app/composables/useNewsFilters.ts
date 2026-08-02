import type {IRssItem} from "#server/types/rss.ts";


export const useNewsFilters = () => {
  const itemsPerPage = 4;

  const route = useRoute();
  const router = useRouter();

  const news = ref<IRssItem[]>([]);

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
  const filterItemsBySource = (): IRssItem[] => {
    if (!activeSource.value) return news?.value ?? [];

    return news.value?.filter(item => item.sourceId === activeSource.value) ?? [];
  }
  const clearFilters = () => {
    router.replace({});
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
  const totalPageItems = computed(() => {
    const start = (page.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return filteredItems.value.slice(start, end);
  });


  const init = (items: IRssItem[]) => {
    news.value = items;
  }

  return {
    clearFilters,
    updateQuery,
    init,

    totalPageItems,
    activeSource,
    totalPages,
    search,
    page,
  }
}
