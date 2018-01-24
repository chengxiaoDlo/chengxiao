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
          inputNumber: ''
        }
      },
      props: {
        value: {
          type: String,
          default: ''
        }
      },
      methods: {
        quit () {
          this.$emit('quit')
        },
        confirm () {
          this.$emit('ok', this.inputNumber)
        },
        clickNum (num) {
          if (this.inputNumber.length < 3) {
            this.inputNumber += num
          }
        },
        del () {
          console.log(909, this.inputNumber)
          this.inputNumber = this.inputNumber.substr(0, this.inputNumber.length - 1)
        }
      },
      created () {
        this.value && (this.inputNumber = this.value)
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
  height: 8.67rem;
  position: fixed;
  bottom: 0;
  background: rgba(210, 213, 219, 0.9);
  overflow: hidden;
  header {
    height: 1.5rem;
    line-height: 1.5rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(left, rgb(250, 234, 124), rgb(244, 208, 70));
    background: -webkit-gradient(linear, left top, right top, from(#f6e15a), to(#f4d046));
    span {
      font-size: 0.5rem;
      color: rgb(122, 103, 90)
    }
  }
  .keys {
    height: 7.17rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num-line {
      display: flex;
      justify-content: center;
      margin-top: 0.2rem;
      .key {
        flex-basis: 3.9rem;
        margin-left: 0.2rem;
        height: 1.5rem;
        text-align: center;
        background: #ffffff;
        border-radius: 10px;
        .num {
          font-size: 0.83rem;
          line-height: 1rem;
        }
        .sp {
          line-height: 1.5rem;
        }
        .abc {
          font-size: 0.33rem;
        }
      }
    }
    .right {
      margin-right: 0.2rem;
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
        height: 0.6rem;
        width: 0.83rem;
        background: url("../assets/images/del.png") no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
