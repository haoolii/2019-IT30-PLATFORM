<template>
  <div class="login-form">
    <div class="icon"></div>
    <h2>IT30路邊賭場上線了！</h2>
    <form @submit.prevent="login"
          autocomplete="off">
      <input type="text"
             placeholder="信箱"
             v-model="email"
             autocomplete="off" />
      <input type="password"
             placeholder="密碼"
             v-model="password"
             autocomplete="off" />
      <button type="submit">登入</button>
      <button disabled>試玩</button>
    </form>
    <span class="note">
      沒有帳號嗎？
      <router-link to="register">註冊</router-link>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (!this.email || !this.password) {
        this.$store.dispatch('pushError', '欄位不能為空')
      } else {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
          .then(() => {
            this.$router.push({ name: 'gamelist' })
          }, (err) => {
            this.$store.dispatch('pushError', err.response.data.error)
          })
          .catch(err => {
            this.$store.dispatch('pushError', err.response.data.error)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.login-form {
  padding: 6rem 3rem 3rem 3rem;
  width: 300px;
  font-size: 1.6rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border: 1px solid #d3ad44;
  form {
    input {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      line-height: 2rem;
      background: none;
      border: none;
      border-bottom: 1px solid #555;
      border-color: #555;
      transition: 0.3s;
      transform: scale(1);
      &:focus {
        border-color: $gold-color;
      }
    }

    button {
      width: 100%;
      height: 40px;
      margin-top: 10px;
      margin-bottom: 5px;
      line-height: 2rem;
      border: 1px solid $gold-color;
      background: none;
      cursor: pointer;
      &.submit {
      }
      &.tourist {
        margin-bottom: 20px;
        color: white;
        background: $gold-color;
      }
    }
  }
  .icon {
    background-image: url("~@/assets/logo.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100px;
    height: 60px;
    margin: 0 auto;
  }
  h2 {
    text-align: center;
    margin-top: 15px;
    font-size: 1.5rem;
  }
  .note {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
