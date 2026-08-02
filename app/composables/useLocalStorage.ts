export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const value = ref<T>(defaultValue)

  onMounted(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      try {
        value.value = JSON.parse(savedValue);
      } catch {
        value.value = defaultValue;
      }
    }

    watch(value, (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    }, {
      deep: true,
    });
  });

  return value;
}
