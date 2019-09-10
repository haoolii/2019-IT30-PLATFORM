<template>
  <div class="game-list">
    <GameCard :gameLogo="'bcrlogo'" />
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'
export default {
  components: {
    GameCard
  }
}
</script>

<style lang="scss" scoped>
.game-list {
  height: 100%;
  width: 110%;
  padding-right: 10%;
  overflow: scroll;
}
</style>
