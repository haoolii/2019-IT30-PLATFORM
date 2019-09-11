<template>
  <div class="Scrollhide">
    <div class="game-list">
      <GameCard :gameLogo="'bcrlogo'" />
      <GameCard :gameLogo="'bcrlogo'" />
      <GameCard :gameLogo="'bcrlogo'" />
      <GameCard :gameLogo="'bcrlogo'" />
      <GameCard :gameLogo="'bcrlogo'" />
    </div>
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
.Scrollhide {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.game-list {
  height: 100%;
  width: 110%;
  padding-right: 10%;
  overflow-y: scroll;
}
</style>
