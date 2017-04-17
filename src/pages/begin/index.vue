<template>
  <div id="begin" ref="begin">
    <div class="begin-head">
      <p class="begin-title" :class="{'title-big' : isBig}">欢迎进入</p>
      <p class="begin-subtitle" :class="{'subtitle-big' : isBig}">我的世界</p>
    </div>
    <div class="begin-screen" :class="{'screen-end' : isEnding}" v-if="isEnd"></div>
  </div>
</template>

<script>
export default {
  name: 'begin',
  methods: {
    welcome () {
      this.$refs.begin.style.height = screen.height + 'px'
      this.isBig = true
      setTimeout(() => {
        this.isEnd = true
        setTimeout(() => {
          this.isEnding = true
          this.goRouter()
        }, 1000)
      }, 2000)
    },
    goRouter () {
      setTimeout(() => {
        this.$router.push('/home')
      }, 2000)
    }
  },
  created () {
    // 因为created优先级高于页面渲染
    setTimeout(() => {
      this.welcome()
    }, 0)
  },
  data () {
    return {
      isBig: false,
      isEnd: false,
      isEnding: false
    }
  }
}
</script>

<style lang="scss">
#begin {
  background-color: #eee;
  .begin-head {
    height: 200px;
    overflow: auto;
    p {
      text-align: center;
    }
    .begin-title {
      margin-top: 40px;
      font-size: 12px;
      transition: margin-top 2s, font-size 2s;
      -webkit-transition: margin-top 2s, font-size 2s;
    }
    .title-big {
      margin-top: 32px;
      font-size: 20px;
    }
    .begin-subtitle {
      margin-top: 40px;
      font-size: 14px;
      transition: margin-top 2s, font-size 2s;
      -webkit-transition: margin-top 2s, font-size 2s;
    }
    .subtitle-big {
      margin-top: 24px;
      font-size: 30px;
    }
  }
  .begin-screen {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #333;
    opacity: 0;
    transition: opacity 2s;
    -webkit-transition: opacity 2s;
  }
  .screen-end {
    opacity: 1;
  }
}
</style>
