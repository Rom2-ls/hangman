<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      icon: {
        win: 'fa-solid fa-check',
        lose: 'fa-solid fa-xmark',
        play: 'fa-solid fa-play',
      },
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteParty() {
      axios
        .delete(`http://localhost:3000/api/parties/${this.id}`)
        .then((response) => {
          console.log('Party deleted:', response.data)
        })
        .catch((error) => {
          console.error('Error deleting party:', error)
        })
    },
  },
}
</script>

<template>
  <div class="party-item">
    <font-awesome-icon
      :icon="icon[status as keyof typeof icon]"
      :class="status"
    />
    <span class="party-name">{{ name }}</span>
    <div class="button-container">
      <button class="delete-button" @click="deleteParty">Supprimer</button>
      <router-link :to="`/party/${id}`" class="play-button">Jouer</router-link>
    </div>
  </div>
</template>

<style scoped>
.party-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid grey;
  padding: 10px 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.delete-button,
.play-button {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  padding: 10px;
  background-color: #f44336;
  color: white;
  cursor: pointer;
}

.play-button {
  background-color: #4caf50;
}

.win {
  color: #4caf50;
}

.play {
  color: #ffc107;
}

.lose {
  color: #f44336;
}
</style>
