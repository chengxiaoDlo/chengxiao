<template>
    <div class="keyboard">
      <header>
        <span @click="quit">取消</span>
        <span @click="confirm">确定</span>
      </header>
      <div class="keys">
        <div class="num-line" >
          <div class="key" :class="{'right': index === 2}" v-for="(number, index) in numbers.firstLine" @click="clickNum(number.num)">
            <p class="num">{{number.num}}</p>
            <p class="abc">{{number.abc}}</p>
          </div>
        </div>
        <div class="num-line" >
          <div class="key" :class="{'right': index === 2}" v-for="(number, index) in numbers.secondLine" @click="clickNum(number.num)">
            <p class="num">{{number.num}}</p>
            <p class="abc">{{number.abc}}</p>
          </div>
        </div>
        <div class="num-line" >
          <div class="key" :class="{'right': index === 2}" v-for="(number, index) in numbers.thirdLine" @click="clickNum(number.num)">
            <p class="num">{{number.num}}</p>
            <p class="abc">{{number.abc}}</p>
          </div>
        </div>
        <div class="num-line last">
          <div class="key" @click="clickNum(0)">
            <p class="num sp">0</p>
          </div>
          <div class="key right del" @click="del">
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
    export default {
      name: "keyboard",
      data () {
        return {
          numbers: {
            firstLine: [
              {
                num: 1,
                abc: ''
              },
              {
                num: 2,
                abc: 'ABC'
              },
              {
                num: 3,
                abc: 'DEF'
              }
            ],
            secondLine: [
              {
                num: 4,
                abc: 'GHI'
              },
              {
                num: 5,
                abc: 'JKL'
              },
              {
                num: 6,
                abc: 'MNO'
              }
            ],
            thirdLine: [
              {
                num: 7,
                abc: 'PQRS'
              },
              {
                num: 8,
                abc: 'TUV'
              },
              {
                num: 9,
                abc: 'WXYZ'
              }
            ]
          },
          value: ''
        }
      },
      computed: mapState([
        'inputNumber'
      ]),
      methods: {
        ...mapMutations({
          setInputNumber: 'setInputNumber'
        }),
        quit () {
          this.$emit('quit')
        },
        confirm () {
          this.$emit('ok', this.value)
        },
        clickNum (num) {
          if (this.value.length < 4) {
            this.value += num
          }
        },
        del () {
          console.log(909, this.value)
          this.value = this.value.substr(0, this.value.length - 1)
        }
      },
      created () {
        this.inputNumber && (this.value = this.inputNumber)
      },
      watch: {
        'value': {
          handler (newVal) {
            console.log(33, newVal)
            this.setInputNumber({data: newVal})
          }
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.keyboard {
  width: 100%;
  height: 520px;
  position: fixed;
  bottom: 0;
  background: rgba(210, 213, 219, 0.9);
  overflow: hidden;
  header {
    height: 90px;
    line-height: 90px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(left, rgb(250, 234, 124), rgb(244, 208, 70));
    background: -webkit-gradient(linear, left top, right top, from(#f6e15a), to(#f4d046));
    span {
      font-size: 30px;
      color: rgb(122, 103, 90)
    }
  }
  .keys {
    height: 430px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num-line {
      display: flex;
      justify-content: center;
      margin-top: 12px;
      .key {
        flex-basis: 234px;
        margin-left: 12px;
        height: 90px;
        text-align: center;
        background: #ffffff;
        border-radius: 10px;
        .num {
          font-size: 40px;
          line-height: 60px;
        }
        .sp {
          line-height: 90px;
        }
        .abc {
          font-size: 20px;
        }
      }
    }
    .right {
      margin-right: 12px;
    }
    .last {
      justify-content: flex-end;
    }
    .num-line .del {
      background: rgba(210, 213, 219, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        height: 36px;
        width: 40px;
        background: url("../assets/images/del.png") no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
