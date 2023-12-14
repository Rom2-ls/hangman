<script lang="ts">
import axios from 'axios'
import PartyItem from './PartyItem.vue'
import type { PartyType } from '../types/types'

export default {
  components: {
    PartyItem,
  },
  data() {
    return {
      parties: [] as PartyType[],
    }
  },
  mounted() {
    this.fetchParties()
  },
  methods: {
    fetchParties() {
      axios
        .get('http://localhost:3000/api/parties')
        .then((response) => {
          this.parties = response.data
        })
        .catch((error) => {
          console.error('Error fetching parties:', error)
        })
    },
  },
  watch: {
    parties() {
      // Reload the component when parties has a new value
      this.fetchParties()
    },
  },
}
</script>

<template>
  <div class="nav">
    <h1>Mes parties</h1>
    <div v-for="(party, index) in parties" :key="index">
      <PartyItem :id="party.id" :name="party.name" :status="party.status" />
    </div>
  </div>
</template>

<style>
.nav {
  overflow: auto;
  overflow-x: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  border-left: 3px solid grey;
}
</style>
