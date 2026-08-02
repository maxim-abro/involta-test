<template>
  <div class="search-wrap">
    <input v-bind="attrs" v-model="model" class="search-wrap__input">
  </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

const model = defineModel<string>({
  default: '',
});
const attrs = useAttrs() as InputHTMLAttributes;
</script>

<style scoped lang="scss">
.search-wrap {
  border-radius: $default-radius;
  box-shadow: $default-shadow;
  position: relative;
  padding-right: 32px;
  background: #fff;
  &::after {
    content: "";
    position: absolute;
    right: 12px;
    top: 50%;
    height: 16px;
    width: 16px;
    transform: translateY(-50%);
    background: #fff url("~/assets/images/magnifier.svg") center / contain no-repeat;
    pointer-events: none;
  }
 &__input {
   width: calc(100% - 32px);
   border: none;
   padding: 10px 13px;
   &:focus {
     outline: none;
   }
 }
}
</style>
