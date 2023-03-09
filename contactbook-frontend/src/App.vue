<script>
import appHeader from "@/components/AppHeader.vue";
export default {
  components: {
    appHeader,
  },
};
</script>

<template>
  <div id="app">
    <appHeader />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  /* max-width: 400px; */
  margin: auto;
}
</style>
