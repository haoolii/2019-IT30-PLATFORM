<template>
  <div class="login-form">
    <div class="icon"></div>
    <template v-if="!done">
      <p>註冊會將登入密碼寄送至信箱</p>
      <form action="" @submit.prevent="register" autocomplete="off">
        <input
          type="email"
          placeholder="信箱"
          v-model="email"
          :class="{ emptyRed: isEmptyWarning(email) }"
          autocomplete="off"
        />
        <button type="submit">註冊</button>
      </form>
      <span class="note">
        已經有帳號了?
        <router-link to="login">登入</router-link>
      </span>
    </template>
    <template v-else>
      <p>信箱註冊的密碼已經送到你的信箱</p>
      <p>
        請至註冊信箱取得密碼並
        <router-link to="login">登入</router-link>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      done: false,
      emptyError: false
    }
  },
  methods: {
    isEmptyWarning (data) {
      if (this.emptyError) {
        if (data) {
          return false
        } else {
          return true
        }
      }
    },
    register () {
      if (!this.email) {
        this.$store.dispatch('pushError', { error: '欄位不能為空' })
        this.emptyError = true
        return null
      }
      this.$store.dispatch('register', {
        email: this.email
      })
        .then((res) => {
          this.done = true
        }).catch(err => {
          this.$store.dispatch('pushError', err.response.data)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.login-form {
  width: 300px;
  padding: 3rem 2rem 2rem 2rem;
  font-size: 1.6rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border: 1px solid #d3ad44;
  p {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
  .icon {
    background-image: url('~@/assets/logo.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100px;
    height: 60px;
    margin: 0 auto;
  }
  h2 {
    text-align: center;
    font-size: 1.5rem;
  }

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
      &.emptyRed {
        border-color: crimson;
      }
      &.emptyRed::placeholder {
        color: crimson;
        opacity: 1;
      }
    }

    button {
      width: 100%;
      height: 40px;
      margin-top: 20px;
      margin-bottom: 20px;
      line-height: 2rem;
      border: 1px solid $gold-color;
      background: none;
    }
  }
  .note {
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
