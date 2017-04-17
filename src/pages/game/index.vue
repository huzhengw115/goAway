<template>
  <div id="game" ref="game">
    <div class="begin-screen" :class="{'game-begin' : isBegining}" v-if="isBegin"></div>
    <div class="game-content">
      <div class="game-cell" ref="cell">
        <div class="game-cell-y" v-for="(cell, y) in cellY">
          <div :id="'grid-'+x+'-'+y" v-for="(grid, x) in cellX" class="game-grid" ref="gameGrid" @click="goTo(x, y)"></div>
        </div>
      </div>
    </div>
    <game-talk :talkData="talkData" v-if="isTalk" class="game-talk"></game-talk>
  </div>
</template>

<script>
import gameTalk from './talk'
export default {
  name: 'game',
  components: {
    gameTalk
  },
  methods: {
    begin () {
      // this.$http.get('/api/person').then((res) => {
      // })
      this.gridSize()
      this.$refs.gameGrid[this.nowIndex].style.backgroundColor = '#00f'
      setTimeout(() => {
        this.isBegin = false
      }, 2000)
    },
    end () {
      this.isBegin = true
      setTimeout(() => {
        this.isBegining = false
      }, 0)
    },
    gridSize () {
      let width = screen.width
      let cellWidth = width - 20
      this.$refs.cell.style.width = cellWidth + 'px'
      let grid = this.$refs.gameGrid
      // let gameData = this.gameData
      let gridWidth = (cellWidth - 12) / 7
      for (let i = 0; i < grid.length; ++i) {
        grid[i].style.width = gridWidth + 'px'
        grid[i].style.height = gridWidth + 'px'
        grid[i].style.lineHeight = gridWidth + 'px'
        // grid[i].style.backgroundColor = gameData[i].color
      }
      this.gridAround(this.oldX, this.oldY)
    },
    goTo (x, y) {
      // 触发事件
      this.plot(x, y)
      if (!this.gameData[y][x].adopt) {
        return
      }
      if (!(x === this.oldX + 1 && y === this.oldY) && !(x === this.oldX && y === this.oldY + 1) && !(x === this.oldX - 1 && y === this.oldY) && !(x === this.oldX && y === this.oldY - 1)) {
        return
      }
      // 可活动下界的y = 9
      if (y === 9 && this.gridCenterY !== this.storeDataLength - 11) {
        // 当页面到达最下面的时候，将数据转换，然后周围的背景转换
        // 但是中心的红点不能变，这个时候的红点位于点击点的上方
        this.gridCenterY++
        let data = []
        let gameData = this.storeData.slice(this.gridCenterY, this.gridCenterY + 11)
        for (let i = 0; i < 11; ++i) {
          data[i] = gameData[i].slice(this.gridCenterX, this.gridCenterX + 7)
        }
        this.gameData = data
        this.gridAround(x, y - 1)
        // 上面的先渲染周围的环境，然后将主角点渲染
        let index = (y - 1) * 7 + x
        this.$refs.gameGrid[index].style.backgroundColor = '#00f'
      } else if (y === 1 && this.gridCenterY !== 0) {
        // 可活动的上界y = 1
        this.gridCenterY--
        let data = []
        let gameData = this.storeData.slice(this.gridCenterY, this.gridCenterY + 11)
        for (let i = 0; i < 11; ++i) {
          data[i] = gameData[i].slice(this.gridCenterX, this.gridCenterX + 7)
        }
        this.gameData = data
        this.gridAround(x, y + 1)
        let index = (y + 1) * 7 + x
        this.$refs.gameGrid[index].style.backgroundColor = '#00f'
      } else if (x === 5 && this.gridCenterX !== this.storeSingleLength - 7) {
        // 可活动的右界
        this.gridCenterX++
        let data = []
        let gameData = this.storeData.slice(this.gridCenterY, this.gridCenterY + 11)
        for (let i = 0; i < 11; ++i) {
          data[i] = gameData[i].slice(this.gridCenterX, this.gridCenterX + 9)
        }
        this.gameData = data
        this.gridAround(x - 1, y)
        let index = y * 7 + x - 1
        this.$refs.gameGrid[index].style.backgroundColor = '#00f'
      } else if (x === 1 && this.gridCenterX !== 0) {
        // 可活动的左界
        this.gridCenterX--
        let data = []
        let gameData = this.storeData.slice(this.gridCenterY, this.gridCenterY + 11)
        for (let i = 0; i < 11; ++i) {
          data[i] = gameData[i].slice(this.gridCenterX, this.gridCenterX + 8)
        }
        this.gameData = data
        this.gridAround(x + 1, y)
        let index = y * 7 + x + 1
        this.$refs.gameGrid[index].style.backgroundColor = '#00f'
      } else {
        // 首先将周围的渲染关掉
        this.gridAround(this.oldX, this.oldY, 1)
        let index = y * 7 + x
        // 找到主角所在的位置
        this.nowIndex = index
        this.$refs.gameGrid[this.nowIndex].style.backgroundColor = '#00f'
        // 最后渲染现在周围的环境
        this.gridAround(x, y)
        this.oldX = x
        this.oldY = y
      }
    },
    gridAround (x, y, judge) {
      // judge用于判断是隐藏格子（单纯的变成灰色），还是精致渲染
      let gameGrids = [[x, y - 1], [x, y + 1], [x + 1, y], [x - 1, y], [x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1]]
      let index = 0
      if (!judge) {
        for (let i = 0; i < gameGrids.length; ++i) {
          index = gameGrids[i][1] * 7 + gameGrids[i][0]
          this.$refs.gameGrid[index].style.backgroundColor = this.gameData[gameGrids[i][1]][gameGrids[i][0]].color
        }
      } else {
        for (let i = 0; i < gameGrids.length; ++i) {
          index = gameGrids[i][1] * 7 + gameGrids[i][0]
          this.$refs.gameGrid[index].style.backgroundColor = '#666'
        }
      }
    },
    // 触发事件
    plot (x, y) {
      if (this.gameData[y][x].name === 'NPC') {
        this.talkData = this.gameData[y][x].event
        this.isTalk = true
      }
    }
  },
  created () {
    this.gameData = this.storeData.slice(this.gridCenterY, this.gridCenterY + 11)
    setTimeout(() => {
      this.begin()
      this.isBegining = true
    }, 200)
  },
  data () {
    return {
      isBegin: false,
      isBegining: false,
      cellX: [0, 1, 2, 3, 4, 5, 6],
      cellY: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11],
      storeData: this.$store.state.first.data,
      storeDataLength: this.$store.state.first.data.length,
      storeSingleLength: this.$store.state.first.data[0].length,
      gameData: [],
      nowIndex: 38,
      oldX: 3,
      oldY: 5,
      gridCenterX: 0,
      gridCenterY: 0,
      talkData: '',
      isTalk: false
    }
  }
}
</script>

<style lang="scss">
#game {
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
  .game-begin {
    opacity: 0;
  }
  .game-content {
    overflow: auto;
    .game-cell {
      margin: auto;
      margin-top: 10px;
      background-color: #ddd;
      .game-cell-y {
        display: flex;
        .game-grid {
          margin: 1px;
          text-align: center;
          background: #666;
        }
      }
    }
  }
  .game-talk {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0 ,0 , 0, 0);
    border-top: 1px solid #aaa;
  }
}
</style>
