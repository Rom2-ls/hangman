<script lang="ts">
import PartyList from './components/PartyList.vue'

export default {
  components: {
    PartyList,
  },
}
</script>

<template>
  <main>
    <router-view />
    <PartyList />
  </main>
</template>

<style>
main {
  width: 100%;
  height: 100vh;
  display: flex;
}
</style>
