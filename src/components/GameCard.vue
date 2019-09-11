<template>
  <div class="game" @click="toGame">
    <div class="mask"></div>
    <div class="gamelogo">
      <img :src="getImgUrl(gameLogo)" alt="" />
    </div>
    <h2>JOIN GAME</h2>
  </div>
</template>

<script>
export default {
  props: {
    gameLogo: {
      type: String,
      default: ''
    }
  },
  methods: {
    getImgUrl (name) {
      return require('@/assets/' + name + '.png')
    },
    toGame () {
      var win = window.open(window.location.origin + '/game', '_blank')
      win.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.game {
  position: relative;
  margin-top: 20px;
  border-radius: 20px;
  width: 100%;
  height: 200px;
  background: rgba($gold-color, 1);
  transition: 0.3s;
  overflow: hidden;
  cursor: pointer;
  .gamelogo {
    height: 80%;
    padding: 20px;
    text-align: center;
    img {
      height: 100%;
    }
  }
  h2 {
    font-size: 2rem;
    text-align: center;
    font-weight: normal;
    letter-spacing: 0.3rem;
    transition: 0.3s;
    color: white;
  }
  &:hover {
    background: rgba($gold-color, 0.8);
    transform: scale(0.95);
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.05) 17%,
      rgba(0, 0, 0, 0.3) 53%,
      rgba(0, 0, 0, 0.5)
    );
  }
}
</style>
