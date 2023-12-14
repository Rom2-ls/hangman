<script lang="ts">
import axios from 'axios'
import type { PartyType } from '@/types/types'
import { Hangman } from '@/assets/hangman'

export default {
  data() {
    return {
      partyId: this.$route.params.id,
      party: {} as PartyType,
      alphabet: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
      processedWord: [] as string[],
    }
  },
  mounted() {
    this.initGame()
  },
  methods: {
    initGame() {
      axios
        .get(`http://localhost:3000/api/parties/${this.partyId}`)
        .then((response) => {
          this.party = response.data.party
          this.processedWord = this.party.wordToGuess
            .split('')
            .filter(function (item, pos, self) {
              return self.indexOf(item) == pos
            })
          Hangman(this.party.guessesRemaining)
        })
        .catch((error) => {
          console.error('Error fetching parties:', error)
        })
    },
    selectLetter(letter: string) {
      if (this.party.wordToGuess.includes(letter)) {
        this.party.lettersGuessed.push(letter)
        if (this.party.lettersGuessed?.length == this.processedWord?.length) {
          this.party.status = 'win'
        }
      } else {
        this.party.guessesRemaining -= 1
        Hangman(this.party.guessesRemaining)
        if (this.party.guessesRemaining == 0) {
          this.party.status = 'lose'
        }
      }
      this.party.lettersUsed.push(letter)
      this.updateParty()
    },
    updateParty() {
      axios
        .put(`http://localhost:3000/api/parties`, {
          ...this.party,
          lettersUsed: this.party.lettersUsed,
          lettersGuessed: this.party.lettersGuessed,
          status: this.party.status,
        })
        .then(() => {
          this.$forceUpdate()
        })
        .catch((error) => {
          console.error('Error updating party:', error)
        })
    },
  },
  watch: {
    '$route.params.id': function (newId) {
      this.partyId = newId
      this.initGame()
      this.$forceUpdate()
    },
  },
}
</script>

<template>
  <div class="container">
    <router-link :to="`/`" class="go-back">Retour</router-link>
    <h1 class="title">{{ party.name }}</h1>

    <div class="animation"></div>

    <div class="keyboard-container">
      <div>
        <div class="underscore-container">
          <div v-for="letter in party.wordToGuess" class="letter-container">
            <p class="letter" v-if="party.lettersGuessed?.includes(letter)">
              {{ letter }}
            </p>
          </div>
        </div>

        <div class="underscore-container">
          <div v-for="letter in party.wordToGuess" class="underscore"></div>
        </div>
      </div>

      <div v-if="party.status == 'win'">
        <p>Vous avez gagné</p>
      </div>
      <div v-else-if="party.status == 'play'">
        <button
          v-for="letter in alphabet"
          class="letter-button"
          :key="letter"
          :class="
            party.lettersUsed?.includes(letter)
              ? party?.lettersGuessed.includes(letter)
                ? 'green'
                : 'red'
              : ''
          "
          :disabled="party.lettersUsed?.includes(letter)"
          @click="selectLetter(letter)"
        >
          <p class="medium-letter">{{ letter }}</p>
        </button>
      </div>

      <div v-else-if="party.status == 'lose'">
        <p>Vous avez perdu</p>
        <p>Le mot a deviner était {{ party.wordToGuess }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.go-back {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 5px 20px;
  border-radius: 8px;
  border: 3px solid aquamarine;
  color: black;
}

.title {
  position: absolute;
  top: 20px;
}

.underscore-container {
  display: flex;
  gap: 16px;
}

.underscore {
  width: 50px;
  height: 5px;
  background-color: black;
  border-radius: 10px;
}

.letter-container {
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.keyboard-container {
  position: absolute;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.letter-button {
  width: 50px;
  height: 50px;
  margin: 4px;
  border-radius: 8px;
  border: 0px;
}

.medium-letter {
  font-size: 24px;
}

.letter {
  font-size: 48px;
}

.green {
  background-color: rgba(0, 255, 0, 0.3);
}

.red {
  background-color: rgba(255, 0, 0, 0.3);
}

.disable {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
