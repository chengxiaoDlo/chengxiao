<template>
    <div class="generate" id="ge">
      <div class="card">
        <div class="title">开始分析你的家庭数据</div>
        <div class="flow">
          <x-progress :percent="percent"></x-progress>
        </div>
        <div class="list">
          <div class="step">
            <div class="text">分析家庭成员</div>
            <div class="state" :class="{'animated fadeIn done': first}">
              <x-circle :percent="percent1" :stroke-width="10" stroke-color="#F15D4C" v-show="!first"></x-circle>
            </div>
          </div>
          <div class="step">
            <div class="text">生成保险配置</div>
            <div class="state" :class="{'animated fadeIn done': second}">
              <x-circle :percent="percent2" :stroke-width="10" stroke-color="#F15D4C" v-if="!second"></x-circle>
            </div>
          </div>
          <div class="step">
            <div class="text">筛选条款费率</div>
            <div class="state" :class="{'animated slideIn done': third}">
              <x-circle :percent="percent3" :stroke-width="10" stroke-color="#F15D4C" v-if="!third"></x-circle>
            </div>
          </div>
        </div>
      </div>
      <question question="完成！立即开启风险测评报告！" v-if="percent3 === 100" class="animated slideInLeft"></question>
      <div class="btn animated slideIn" v-if="showBtn" @click="submit"></div>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import { XProgress, XCircle } from 'vux'
  import { mapState } from 'vuex'
    export default {
      name: "generate-report",
      components: {
        Question,
        XProgress,
        XCircle
      },
      data () {
        return {
          percent1: 0,
          percent2: 0,
          percent3: 0,
          first: false,
          second: false,
          third: false,
          showBtn: false,
        }
      },
      computed: {
        percent () {
          return (this.percent1 + this.percent2 + this.percent3) / 3
        },
        ...mapState([
          'info'
        ])
      },
      methods: {
        submit () {
          console.log(555, this.json)
          this.$router.push('baogao')
        }
      },
      mounted () {
        // document.getElementById('ge').style.minHeight = document.documentElement.clientHeight + 'px'
        this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que7').offsetHeight)
      },
      created () {
        let t1 = setInterval(() => {
          this.percent1++
          if (this.percent1 === 100) {
            clearInterval(t1)
          }
        }, 20)
        setTimeout(() => {
          this.first = true
          let t2 = setInterval(() => {
            this.percent2++
            if (this.percent2 === 100) {
              clearInterval(t2)
            }
          })
        }, 2800)
        setTimeout(() => {
          this.second = true
          let t3 = setInterval(() => {
            this.percent3++
            if (this.percent3 === 100) {
              clearInterval(t3)
            }
          })
        }, 4000)
        setTimeout(() => {
          this.third = true
        }, 5000)
        setTimeout(() => {
          this.showBtn = true
        }, 6500)
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/animation";
  @include keyframes(fadeLeft, -700px, 30px);
.generate {
  .card {
    width: 690px;
    background: #ffffff;
    margin-top: 60px;
    margin-bottom: 60px;
    margin-left: -700px;
    -webkit-animation: fadeLeft 1s ease-out;
    -o-animation: fadeLeft 1s ease-out;
    animation: fadeLeft 1s ease-out;
    animation-fill-mode: forwards;
    animation-delay: 1s;
    padding-top: 48px;
    border-radius: 5px;
    padding-bottom: 84px;
    .title {
      width: 100%;
      text-align: center;
      font-size: 34px;
    }
    .flow {
      margin: 60px auto;
      width: 576px;
    }
    .list {
      padding-left: 60px;
      padding-right: 60px;
      .step {
        font-size: 30px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .state {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
        }
      }
      .done {
        background: url("../assets/images/pick.png") no-repeat;
        background-size: 100%;
      }
    }
  }
  .btn {
    width: 412px;
    height: 164px;
    background: url("../assets/images/get-report.png") no-repeat;
    background-size: 100%;
    margin: 60px auto;
  }
  .slideInLeft {
    animation-delay: 1s;
  }
}
</style>
