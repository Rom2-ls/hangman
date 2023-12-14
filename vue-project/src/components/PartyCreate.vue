<script lang="ts">
import axios from 'axios'
import { Hangman } from '../assets/hangman'

export default {
  data() {
    return {
      numberOfPlayers: Number(1),
      name: '',
      wordToGuess: '',
    }
  },
  mounted() {
    Hangman(null)
  },
  methods: {
    getRandomWord() {
      return axios
        .get('http://localhost:3000/api/words/random')
        .then((response) => {
          return response.data.word.toUpperCase()
        })
        .catch((error) => {
          console.error('Error getting word:', error)
        })
    },
    async createParty() {
      const wordToGuess =
        this.numberOfPlayers == 1
          ? await this.getRandomWord()
          : this.wordToGuess.toUpperCase().trim()

      axios
        .post('http://localhost:3000/api/parties', {
          name: this.name,
          wordToGuess: wordToGuess,
        })
        .then((response) => {
          console.log('Party created:', response.data)
          this.name = ''
          this.wordToGuess = ''
          this.$router.push({ path: `/party/${response.data.id}` })
        })
        .catch((error) => {
          console.error('Error creating party:', error)
        })
    },
    selectNumberOfPlayers(number: number) {
      this.numberOfPlayers = number
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="animation"></div>
    <form @submit.prevent="createParty" class="party-form">
      <label for="numberOfPlayers" class="form-label">Nombre de joueur:</label>
      <div class="horizontal-container">
        <button
          type="button"
          :class="{ 'form-button-selected': numberOfPlayers === 1 }"
          @click="selectNumberOfPlayers(1)"
          class="form-button"
        >
          1
        </button>
        <button
          type="button"
          :class="{ 'form-button-selected': numberOfPlayers === 2 }"
          @click="selectNumberOfPlayers(2)"
          class="form-button"
        >
          2
        </button>
      </div>

      <label for="name" class="form-label">Nom de la Partie:</label>
      <input type="text" id="name" v-model="name" required class="form-input" />

      <div v-if="numberOfPlayers !== 1" class="vertical-container">
        <label for="wordToGuess" class="form-label">Mot à deviner:</label>
        <input
          type="text"
          id="wordToGuess"
          v-model="wordToGuess"
          required
          class="form-input"
        />
      </div>

      <button type="submit" class="form-button" :class="'form-button-validate'">
        Créer une partie
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  overflow: hidden;
}

.animation {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
}

.horizontal-container {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.vertical-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.party-form {
  z-index: 1;
  position: absolute;
  top: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.form-input {
  padding: 5px;
  margin-bottom: 10px;
  border: 3px solid grey;
  border-radius: 8px;
}

.form-button {
  padding: 10px 20px;
  background-color: white;
  border-radius: 8px;
  border: 3px solid grey;
  cursor: pointer;
}

.form-button-validate {
  background-color: rgb(42, 201, 42);
  color: white;
  border: none;
}

.form-button-selected {
  background-color: rgb(72, 72, 255);
  color: white;
}

.hidden {
  display: none;
}
</style>
