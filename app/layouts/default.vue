<template>
  <div class="container">
    <slot/>
  </div>
</template>

<style scoped>
.container {
  max-width: 1060px;
  margin: 36px auto;
}
@media (max-width: 1060px) {
  .container {
    padding: 0 20px;
  }
}
</style>