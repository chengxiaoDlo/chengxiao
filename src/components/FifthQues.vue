<template>
    <div style="overflow: hidden" id="que5" :class="{'hidden': isModify && progress <= 5}">
      <question question="劝君更尽一杯酒，全家社保上全否？" sub="这会关系到家人医疗险的配置" class="question5">
        <div slot="options">
          <div v-if="showOption" id="options">
            <div class="options que5" >
              <div v-for="member in memberList">
                <div class="age" >
                  <div>
                    <div class="member" :class="member.class"></div>
                    <p class="member-labelName">{{member.labelName}}</p>
                  </div>
                  <div class="member-security" :class="{'qicked': member.socialSecurity === true}" @click="hasSecurity('y', member)">有社保</div>
                  <div class="member-security" :class="{'qicked': member.socialSecurity === false}" @click="hasSecurity('n', member)">无社保</div>
                </div>
              </div>
            </div>
            <div class="confirm btn-able" @click="confirm"></div>
          </div>
        </div>
      </question>
      <transition name="answer" @after-enter="toNext">
        <answer v-if="showAnswer" :textList="answerlabelName" @modify="modify" wrap></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'

    export default {
      name: "fifth-ques",
      data () {
        return {
          showOption: true,
          showAnswer: false,
          memberList: []
        }
      },
      components: {
        Question,
        Answer
      },
      computed: {
        answerlabelName () {
          return this.memberList.map(item => {
            return item.socialSecurity ? item.labelName + ': 有社保' : item.labelName + ': 无社保'
          })
        },
        ...mapState([
          'progress',
          'info',
          'isModify'
        ])
      },
      methods: {
        ...mapMutations({
          next: 'next',
          addSocial: 'addSocial',
          toggleModify: 'toggleModify'
        }),
        confirm () {
          this.showOption = false
          this.showAnswer = true
          this.addSocial({data: this.memberList})
          this.$emit('fill-height', document.getElementById('options').offsetHeight)
        },
        toNext () {
          if (this.progress === 5) {
            setTimeout(() => {
              this.next({data: 6})
              setTimeout(() => {
                this.$emit('scroll-to', document.getElementById('que5').offsetTop + document.getElementById('que5').offsetHeight)
              }, 500)
            }, 500)
          } else {
            this.next({data: 5})
            setTimeout(() => {
              this.next({data: 6})
              this.toggleModify()
              setTimeout(() => {
                this.toggleModify()
                this.$emit('scroll-to', document.getElementById('que5').offsetTop + document.getElementById('que5').offsetHeight)
              }, 500)
            }, 500)
          }
        },
        hasSecurity (has, member) {
          if (has === 'y') {
            member.socialSecurity = true
          } else if (has === 'n') {
            member.socialSecurity = false
          }
        },
        modify () {
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        },
        getList (origin) {
          if (origin instanceof Array) {
            let members = origin.map(item => {
              return item.labelName
            })
            if ((members.indexOf('爸爸') !== -1 || members.indexOf('妈妈') !== -1 || members.indexOf('配偶妈妈') !== -1 || members.indexOf('配偶爸爸') !== -1) &&
              (members.some(item => { return /\w*[儿子|女儿]/.test(item)}))) {
              let arr = origin.filter(item => {
                return (item.labelName !== '爸爸' && item.labelName !== '妈妈' && item.labelName !== '配偶爸爸' && item.labelName !== '配偶妈妈')
              })
              return arr.map(item => {
                return {
                  class: item.class,
                  labelName: item.labelName,
                  socialSecurity: true
                }
              })
            } else {
              return origin.map(item => {
                return {
                  class: item.class,
                  labelName: item.labelName,
                  socialSecurity: true
                }
              })
            }
          }
        },
        init () {
          let family = this.info.family.filter(item => {
            return item.labelName.indexOf('狗') === -1
          })
          this.memberList = [{
            class: this.info.sex === 'M' ? 'male' : 'female',
            labelName: '本人',
            socialSecurity: true
          }, ...this.getList(family)]
        }
      },
      mounted () {
        this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que5').offsetHeight)
      },
      created () {
        this.init()
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
  @include keyframes(slideRight, 100%, 0);
  @include keyframes(slideLeft1, -740px, 0);
  .question5 {
    transform: translateX(-740px);
    -webkit-transform: translateX(-740px);
    -webkit-animation: slideLeft1 1s ease-out;
    -o-animation: slideLeft1 1s ease-out;
    animation: slideLeft1 1s ease-out;
    animation-fill-mode: forwards;
    animation-delay: 1s;
    -webkit-animation-delay: 1s;
  }
  .que5 {
    padding-top: 30px;
    padding-bottom: 150px;
    .age {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      margin-bottom: 36px;
      .member {
        width: 92px;
        height: 92px;
        margin-right: 48px;
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
      .member-security {
        width: 150px;
        height: 60px;
        border-radius: 30px;
        border:solid 2px;
        font-size: 30px;
        text-align: center;
        line-height: 60px;
        margin-top: 9px;
        margin-right: 18px;
        color: rgb(126, 126, 126);
      }
      .qicked {
        border-color: rgb(252, 216, 75);
        color: rgb(252, 216, 75);
      }
      .member-labelName {
        font-size: 30px;
        padding-left: 15px;
      }
    }
  }
  .answer-enter-active {
    animation: slideRight 1s;
    -webkit-animation: slideRight 1s;
  }
  .answer-leave-active {
    -webkit-animation: slideRight 1s reverse;
    -o-animation: slideRight 1s reverse;
    animation: slideRight 1s reverse;
  }

</style>
