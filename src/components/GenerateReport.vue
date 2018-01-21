<template>
    <div class="generate">
      <div class="card animated fadeInLeft">
        <div class="title">开始分析你的家庭数据</div>
        <div class="flow">
          <x-progress :percent="percent"></x-progress>
        </div>
        <div class="list">
          <div class="step">
            <div class="text">家庭成员分析</div>
            <div class="state" :class="{'animated fadeIn done': percent1 === 100}">
              <x-circle :percent="percent1" :stroke-width="10" stroke-color="#04BE02" v-if="percent1 !== 100"></x-circle>
            </div>
          </div>
          <div class="step">
            <div class="text">保险配置建模</div>
            <div class="state" :class="{'animated fadeIn done': percent2 === 100}">
              <x-circle :percent="percent2" :stroke-width="10" stroke-color="#04BE02" v-if="percent2 !== 100"></x-circle>
            </div>
          </div>
          <div class="step">
            <div class="text">条款费率筛选</div>
            <div class="state" :class="{'animated fadeIn done': percent3 === 100}">
              <x-circle :percent="percent3" :stroke-width="10" stroke-color="#04BE02" v-if="percent3 !== 100"></x-circle>
            </div>
          </div>
        </div>
      </div>
      <question question="完成！立即开启风险测评报告！" v-if="percent3 === 100" class="animated fadeInLeft"></question>
      <div class="btn animated fadeIn" v-if="showBtn"></div>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import { XProgress, XCircle } from 'vux'
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
          showBtn: false
        }
      },
      computed: {
        percent () {
          return (this.percent1 + this.percent2 + this.percent3) / 3
        },
      },
      created () {
        let t1 = setInterval(() => {
          this.percent1++
          if (this.percent1 === 100) {
            clearInterval(t1)
            let t2 = setInterval(() => {
              this.percent2++
              if (this.percent2 === 100) {
                clearInterval(t2)
                let t3 = setInterval(() => {
                  this.percent3++
                  if (this.percent3 === 100) {
                    clearInterval(t3)
                    setTimeout(() => {
                      this.showBtn = true
                    }, 2000)
                  }
                }, 30)
              }
            }, 30)
          }
        }, 30)
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.generate {
  .card {
    width: 11.5rem;
    background: #ffffff;
    margin: 1rem auto;
    padding-top: 0.8rem;
    border-radius: 5px;
    padding-bottom: 1.4rem;
    .title {
      width: 100%;
      text-align: center;
      font-size: 0.57rem;
    }
    .flow {
      margin: 1rem auto;
      width: 9.6rem;
    }
    .list {
      padding-left: 1rem;
      padding-right: 1rem;
      .step {
        font-size: 0.5rem;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .state {
        width: 0.67rem;
        height: 0.67rem;
      }
      .done {
        background: url("../assets/images/pick.png") no-repeat;
        background-size: 100%;
      }
    }
  }
  .btn {
    width: 6.87rem;
    height: 2.73rem;
    background: url("../assets/images/get-report.png") no-repeat;
    background-size: 100%;
    margin: 1rem auto;
  }
  .fadeInLeft {
    animation-delay: 1s;
  }
}
</style>
