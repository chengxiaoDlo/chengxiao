<template>
    <div style="overflow: hidden;" id="que6">
      <div @click="cancel">
        <question question="玉盘珍馐值万钱，你家收支多少钱？" sub="我们会基于家庭收入及贷款来为您规划合理的保额及保费预" class="animated fadeInLeft">
          <div slot="options">
            <transition name="options">
              <div v-if="showOption">
                <div class="options que3" >
                  <div v-for="member in memberList">
                    <div class="age" >
                      <div class="avatar">
                        <div class="member" :class="member.class"></div>
                        <p class="member-text">{{member.text}}</p>
                      </div>
                      <div class="member-age" @click="input(member)">{{member.value}}</div>
                      <div class="unit">{{member.unit}}</div>
                    </div>
                  </div>
                </div>
                <div class="confirm" :class="btnAbled ? 'btn-able' : 'btn-disable' " @click="confirm"></div>
              </div>
            </transition>
          </div>
        </question>
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
          <answer v-if="showAnswer" :textList="answerText" @modify="modify" wrap></answer>
        </transition>
      </div>
      <keyboard v-if="inputMoney" @on-change="change" @ok="ok"></keyboard>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Keyboard from '@/components/Keyboard'
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'

    export default {
      name: "sixth-ques",
      components: {
        Question,
        Keyboard,
        Answer
      },
      data () {
        return {
          inputMoney: false,
          showOption: true,
          showAnswer: false,
          current: '',
          memberList: []
        }
      },
      computed: {
        answerText () {
          return this.memberList.map(item => {
            if (item.value === '房贷、车贷等' || item.value === '0') {
              return item.text + ': 无'
            } else {
              return item.text + ': ' + item.value + item.unit
            }
          })
        },
        btnAbled () {
          let arr = this.memberList.filter(item => {
            return item.text !== '家庭贷款'
          })
          return arr.every(item => {
            return item.value !== '税前收入'
          })
        },
        ...mapState([
          'index',
          'progress',
          'info'
        ])
      },
      methods: {
        ...mapMutations({
          next: 'next',
          setIndex: 'setIndex',
          stopSwiper: 'stopSwiper',
          useSwiper: 'useSwiper',
          addIncome: 'addIncome'
        }),
        input (member) {
          this.current = member.text
          setTimeout(() => {
            this.inputMoney = true
            this.stopSwiper()
          }, 100)
        },
        change (val) {
          this.memberList.forEach(item => {
            if (item.text === this.current) {
              item.value = val
            }
          })
        },
        ok () {
          this.inputMoney = false
          this.useSwiper()
        },
        confirm () {
          if (this.btnAbled) {
            this.showAnswer = true
            this.showOption = false
            this.addIncome({data: this.memberList})
            setTimeout(() => {
              this.next({data: this.progress + 1})
            }, 3000)
            setTimeout(() => {
              this.setIndex({data: this.index + 1})
              window.scrollTo(0, document.getElementById('que6').offsetTop + document.getElementById('que6').offsetHeight)
            }, 3500)
          }
        },
        modify () {
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        },
        cancel () {
          if (this.inputMoney) {
            this.inputMoney = false
            this.useSwiper()
            this.memberList.forEach(item => {
              if (item.text === this.current) {
                if (this.current === '家庭贷款') {
                  item.value = '房贷、车贷等'
                } else {
                  item.value = '税前收入'
                }
              }
            })
          }
        }
      },
      mounted () {
        document.getElementById('que6').style.minHeight = document.documentElement.clientHeight + 'px'
      },
      created () {
        let arr = this.info.family.filter(item => {
          return item.text === '配偶'
        })
        if (arr.length > 0) {
          this.memberList = [
            {
              class: this.info.sex === 'M' ? 'male' : 'female',
              text: this.info.sex === 'M' ? '爸爸收入' : '妈妈收入',
              value: '税前收入',
              tag: 'me',
              unit: '万元/年'
            },
            {
              class: this.info.sex === 'M' ? 'male' : 'female',
              text: this.info.sex === 'M' ? '妈妈收入' : '爸爸收入',
              value: '税前收入',
              tag: 'spouse',
              unit: '万元/年'
            },
            {
              class: 'son',
              text: '家庭贷款',
              value: '房贷、车贷等',
              tag: 'debt',
              unit: '万元'
            }
          ]
        } else {
          this.memberList = [
            {
              class: this.info.sex === 'M' ? 'male' : 'female',
              text: '本人收入',
              value: '税前收入',
              tag: 'me',
              unit: '万元/年'
            },
            {
              class: 'son',
              text: '家庭贷款',
              value: '房贷、车贷等',
              tag: 'debt',
              unit: '万元'
            }
          ]
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
  .que3 {
    padding-top: 0.5rem;
    padding-bottom: 2.5rem;
    .age {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      width: 100%;
      padding-left: 1rem;
      margin-bottom: 0.6rem;
      .avatar {
        flex-basis: 2.7rem;
        text-align: center;
      }
      .member {
        width: 1.53rem;
        height: 1.53rem;
        margin: 0 auto;
      }
      .me {
        background: url("../assets/images/dad.png") no-repeat;
        background-size: 100%;
      }
      .wife {
        background: url("../assets/images/mom.png") no-repeat;
        background-size: 100%;
      }
      .son {
        background: url("../assets/images/son.png") no-repeat;
        background-size: 100%;
      }
      .member-age {
        width: 3.67rem;
        height: 1rem;
        border-radius: 30px;
        border:solid 1px;
        font-size: 0.47rem;
        text-align: center;
        line-height: 1rem;
        margin-top: 0.15rem;
        color: rgb(126, 126, 126);
      }
      .member-text {
        font-size: 0.5rem;
        padding-left: 0.25rem;
      }
      .unit {
        font-size: 0.47rem;
        margin-top: 0.37rem;
        margin-left: 0.2rem;
      }
    }
  }
</style>
