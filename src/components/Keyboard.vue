<template>
    <div class="keyboard">
      <!--<header>-->
        <!--<span @click="quit">取消</span>-->
        <!--<span @click="confirm">确定</span>-->
      <!--</header>-->
      <div class="keys">
        <div v-for="number in numbers" class="key" @click="clickNum(number)">{{number}}</div>
        <div class="key" @click="del">DEL</div>
        <div class="key" @click="ok">OK</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "keyboard",
      data () {
        return {
          numbers: [],
          inputNumber: ''
        }
      },
      methods: {
        quit () {},
        confirm () {},
        clickNum (num) {
          if (this.inputNumber.length < 3) {
            this.inputNumber += num
          }
        },
        del () {
          this.inputNumber = this.inputNumber.substr(0, this.inputNumber.length - 1)
        },
        ok () {
          this.$emit('ok')
        }
      },
      created () {
        for(let i = 0; i < 10; i++) {
          this.numbers.push(i)
        }
      },
      watch: {
        'inputNumber': {
          handler (newVal) {
            console.log(33, newVal)
            this.$emit('on-change', newVal)
          }
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.keyboard {
  width: 100%;
  height: 10rem;
  position: absolute;
  bottom: 0;
  background: #ffffff;
  overflow: hidden;
  header {
    height: 1.5rem;
    line-height: 1.5rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(left, rgb(250, 234, 124), rgb(244, 208, 70));
    span {
      font-size: 0.5rem;
      color: rgb(122, 103, 90)
    }
  }
  .keys {
    display: flex;
    flex-wrap: wrap;
    .key {
      flex-basis: 33.3%;
      line-height: 2.5rem;
      height: 2.5rem;
      text-align: center;
      background: aquamarine;
    }
  }
}
</style>
