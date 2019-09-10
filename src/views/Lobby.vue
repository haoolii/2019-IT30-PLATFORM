<template>
  <div class="lobby-container">
    <nav>
      <div class="menu-icon"
           @click="menuClick">
        <i class="fa fa-bars fa-2x"></i>
      </div>
      <div class="logo">
        <img src="@/assets/logo.png"
             alt="">
      </div>
      <div class="menu">
        <ul :class="{appear: menuOpen}">
          <li>
            <router-link :to="{ name: 'gamelist' }">大廳</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'deposit' }">充值</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'withdrawal' }">提現</router-link>
          </li>
          <li><a href="#"
               class="logout">登出</a></li>
        </ul>
      </div>
      <div class="balance">
        <div class="mask"></div>
        <span>目前餘額: ${{userInfo.balance}}</span>
      </div>
    </nav>

    <div class="body">
      <div class="marquee">
        <marquee-text>
          {{marqueeContent}}
        </marquee-text>
      </div>
      <transition name="page"
                  mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  components: {
    MarqueeText
  },
  created () {
    this.$router.afterEach((to, from) => {
      this.menuOpen = false
    })
    this.$store.dispatch('updateUserInfo').then(() => {
      console.log('update success')
    })
    axios.get('//localhost:3000/lobby').then(({ data }) => {
      if (data.lobbyInfo.notify) {
        this.notifyArray = data.lobbyInfo.notify
      }
    })
  },
  data () {
    return {
      notifyArray: ['測試訊息', '三十天路邊賭場上線了！', '沒有美女荷官', '沒法使用新台幣'],
      menuOpen: false
    }
  },
  computed: {
    marqueeContent () {
      let res = this.notifyArray.reduce((a, b) => {
        return `${a} ${b}`
      }, '')
      return res + res
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    menuClick () {
      this.menuOpen = !this.menuOpen
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.lobby-container {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 120px 3rem 3rem 3rem;
  background-color: rgba(0, 0, 0, 0.5);

  .logo {
    position: absolute;
    left: 0;
    top: 0;
    line-height: 60px;
    color: #fff;
    margin: 14px 44px;
  }

  nav {
    position: absolute;
    z-index: 9;
    left: 0;
    top: 0;
    width: 100%;
    line-height: 60px;

    ul {
      line-height: 50px;
      padding-bottom: 30px;
      list-style: none;
      background: rgba(0, 0, 0, 0);
      overflow: hidden;
      text-align: right;
      padding-right: 40px;
      transition: 0.4s;
      margin: 0;
      padding: 0;
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
    .balance {
      position: relative;
      line-height: 30px;
      letter-spacing: 0.2rem;
      font-size: 1.4rem;
      background: $gold-color;
      text-align: center;
      span {
        color: white;
      }
    }
  }

  nav ul li {
    display: inline-block;
    padding: 14px 20px;

    a {
      display: inline-block;
      width: 50px;
      line-height: 40px;
      font-size: 14px;
      border-bottom: 1px solid $gold-color;
      text-decoration: none;
      text-align: center;
      opacity: 1;
      transition: 0.3s;
      &:hover {
        opacity: 0.6;
      }

      &.logout {
        text-align: center;
        border: 1px solid $gold-color;
        border-radius: 20px;
        width: 80px;
        background: none;
        &:hover {
          opacity: 1;
          color: white;
          background: $gold-color;
        }
      }
    }
  }

  .menu-icon {
    display: none;
    width: 100%;
    background: black;
    text-align: right;
    padding: 15px 24px;
    color: #fff;
    cursor: pointer;
  }

  .body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .marquee {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
    }
    h2 {
      line-height: 60px;
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
    }
  }
}

/* Responsive */

@media (max-width: 768px) {
  .lobby-container {
    .menu-icon {
      display: block;
    }
    .logo {
      top: 0;
      margin-top: 14px;
      margin-left: 30px;
    }

    nav ul {
      background: black;
      max-height: 0;
    }

    .appear {
      max-height: 30rem;
    }

    nav ul li {
      width: 100%;
      padding: 1rem;
      text-align: center;
    }
  }
}
</style>
