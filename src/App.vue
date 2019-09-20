<template>
  <div id="app">
    <div class="errorBlock" v-if="true">
      <span v-for="(error, index) in this.$store.state.errors" :key="index">
        {{ error.content.error }}
      </span>
    </div>
    <div class="container">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/global.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.container {
  margin: 0 auto;
  max-width: 750px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.errorBlock {
  text-align: center;
  position: fixed;
  width: 100%;
  span {
    display: block;
    background: crimson;
    height: 2rem;
    line-height: 2rem;
    color: white;
    width: 100%;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
