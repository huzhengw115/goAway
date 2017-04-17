<template>
  <div id="home" ref="home">
    <div class="home-content">
      <h2>这个是首页</h2>
      <p @click="end">进入游戏</p>
    </div>
    <div class="begin-screen" :class="{'home-begin' : isBegining}" v-if="isBegin"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    begin () {
      this.$refs.home.style.height = screen.height + 'px'
      setTimeout(() => {
        this.isBegin = false
      }, 2000)
    },
    end () {
      this.isBegin = true
      setTimeout(() => {
        this.isBegining = false
        setTimeout(() => {
          this.$router.push('/game')
        }, 2000)
      }, 200)
    }
  },
  created () {
    setTimeout(() => {
      this.begin()
      this.isBegining = true
    }, 200)
  },
  data () {
    return {
      isBegin: true,
      isBegining: false
    }
  }
}
</script>

<style lang="scss">
#home {
  .begin-screen {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    opacity: 1;
    transition: opacity 2s;
    -webkit-transition: opacity 2s;
  }
  .home-begin {
    opacity: 0;
  }
}
</style>
