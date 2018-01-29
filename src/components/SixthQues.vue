<template>
    <div style="overflow: hidden;" id="que6" :class="{'hidden': isModify && progress <= 6}">
      <div @click="cancel">
        <question question="玉盘珍馐值万钱，你家收支多少钱？" sub="我们会基于家庭收入及贷款来为你规划合理的保额及保费预算" class="animated slideInLeft">
          <div slot="options">
            <transition name="options">
              <div v-if="showOption" id="options">
                <div class="options que3" >
                  <div v-for="member in memberList">
                    <div class="age" >
                      <div class="avatar">
                        <div class="member" :class="member.class"></div>
                        <p class="member-text">{{member.text}}</p>
                      </div>
                      <div class="member-age" :class="{'picked': member.focus}" @click="input(member)">{{member.value}}</div>
                      <div class="unit">{{member.unit}}</div>
                    </div>
                  </div>
                </div>
                <div class="confirm" :class="btnAbled ? 'btn-able' : 'btn-disable' " @click="confirm"></div>
              </div>
            </transition>
          </div>
        </question>
        <transition enter-active-class="animated slideInRight" leave-active-class="animated fadeOutRight">
          <answer v-if="showAnswer" :textList="answerText" @modify="modify" wrap></answer>
        </transition>
      </div>
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
          }) && !this.inputMoney
        },
        ...mapState([
          'inputNumber',
          'progress',
          'info',
          'isModify',
          'showKeyBoard'
        ])
      },
      methods: {
        ...mapMutations({
          next: 'next',
          toggleKeyboard: 'toggleKeyboard',
          addIncome: 'addIncome',
          toggleModify: 'toggleModify',
          setInputNumber: 'setInputNumber',
        }),
        input (member) {
          this.current = member.text
          if (member.value !== '税前收入' && member.value !== '房贷、车贷等') {
            this.setInputNumber({data: member.value} )
          } else {
            this.setInputNumber({data: ''})
          }
          setTimeout(() => {
            this.toggleKeyboard()
          }, 200)
        },
        confirm () {
          if (this.btnAbled) {
            this.showAnswer = true
            this.showOption = false
            this.addIncome({data: this.memberList})
            this.$emit('fill-height', document.getElementById('options').offsetHeight)
            if (this.progress === 6) {
              setTimeout(() => {
                this.next({data: 7})
              }, 3000)
              setTimeout(() => {
                this.$emit('scroll-to', document.getElementById('que6').offsetTop + document.getElementById('que6').offsetHeight)
              }, 3500)
            } else {
              this.next({data: 6})
              setTimeout(() => {
                this.next({data: 7})
                this.toggleModify()
              }, 3000)
              setTimeout(() => {
                this.toggleModify()
                this.$emit('scroll-to', document.getElementById('que6').offsetTop + document.getElementById('que6').offsetHeight)
              }, 3500)
            }
          }
        },
        modify () {
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        },
        cancel () {
          console.log('cancel')
          this.showKeyBoard && (this.toggleKeyboard())
        }
      },
      mounted () {
        this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que6').offsetHeight)
      },
      created () {
        let arr = this.info.family.filter(item => {
          return item.labelName === '配偶'
        })
        if (arr.length > 0) {
          this.memberList = [
            {
              class: this.info.sex === 'M' ? 'male' : 'female',
              text:  '本人收入',
              value: '税前收入',
              focus: false,
              tag: 'me',
              unit: '万元/年'
            },
            {
              class: this.info.sex === 'M' ? 'female' : 'male',
              text: '配偶收入',
              value: '税前收入',
              focus: false,
              tag: 'spouse',
              unit: '万元/年'
            },
            {
              class: 'loan',
              text: '家庭贷款',
              focus: false,
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
              focus: false,
              tag: 'me',
              unit: '万元/年'
            },
            {
              class: 'loan',
              text: '家庭贷款',
              value: '房贷、车贷等',
              focus: false,
              tag: 'debt',
              unit: '万元'
            }
          ]
        }
      },
      watch: {
        'inputNumber': {
          handler (newVal) {
            this.memberList.forEach(item => {
              if (!newVal) {
                if (item.text === this.current) {
                  if (item.text === '家庭贷款') {
                    item.value = '房贷、车贷等'
                  } else {
                    item.value = '税前收入'
                  }
                }
              } else {
                if (item.text === this.current) {
                  item.value = newVal
                }
              }
            })
          }
        },
        'showKeyBoard': {
          handler (newVal) {
            this.memberList.forEach(item => {
              if (item.text === this.current) {
                if (newVal) {
                  item.focus = true
                } else {
                  item.focus = false
                }
              }
            })
          }
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
  .que3 {
    padding-top: 30px;
    padding-bottom: 150px;
    .age {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      width: 100%;
      padding-left: 60px;
      margin-bottom: 36px;
      .avatar {
        flex-basis: 162px;
        text-align: center;
      }
      .member {
        width: 92px;
        height: 92px;
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
        width: 220px;
        height: 60px;
        border-radius: 30px;
        border:solid 2px;
        font-size: 28px;
        text-align: center;
        line-height: 60px;
        margin-top: 9px;
        color: rgb(126, 126, 126);
      }
      .picked {
        border-color: rgb(252, 216, 75);
      }
      .member-text {
        font-size: 30px;
        padding-left: 15px;
      }
      .unit {
        font-size: 28px;
        margin-top: 22px;
        margin-left: 12px;
      }
    }
  }
</style>
