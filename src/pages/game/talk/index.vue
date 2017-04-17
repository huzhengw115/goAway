<template>
  <div id="talk">
    <div class="talk-content">
      <p @click="nextTalk" class="talk-state">{{talkContent}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'talk',
  props: ['talkData'],
  methods: {
    nextTalk () {
      if (this.gameDataLength === this.talkWhich) {
        console.log('结束了')
      } else {
        this.talkContent = this.gameData[this.talkWhich]
        console.log('this.talkContent: ', this.talkContent)
        this.talkWhich++
      }
    }
  },
  data () {
    return {
      gameTalk: this.talkData,
      gameData: this.$store.state.firstData.data.talk100.data,
      gameDataLength: this.$store.state.firstData.data.talk100.data.length,
      talkContent: '',
      talkWhich: 0
    }
  },
  created () {
    this.nextTalk()
  }
}
</script>

<style lang="scss">
#talk {
  width: 100%;
  height: 100%;
  .talk-content {
    position: absolute;
    bottom: 0;
    height: 150px;
    width: 100%;
    padding: 10px 0;
    background-color: #eee;
    .talk-state {
      text-align: center;
    }
  }
}
</style>
