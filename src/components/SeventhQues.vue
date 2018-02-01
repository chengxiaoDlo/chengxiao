<template>
    <div style="overflow: hidden;" id="que7" :class="{'hidden': isModify && progress <= 7}">
      <question question="蓝田日暖玉生烟，日常能抽几支烟？" sub="部分寿险产品会为非吸烟体用户提供高性价比产品，我们也会全面考虑哦~" class="question7">
        <div slot="options">
          <div v-if="showOption" id="options">
            <div class="options que7" >
              <div v-for="member in memberList">
                <div class="age" >
                  <div>
                    <div class="member" :class="member.class"></div>
                    <p class="member-text">{{member.text}}</p>
                  </div>
                  <div class="member-security" :class="{'qicked': member.smoke === true}" @click="isSomker('y', member)">抽烟</div>
                  <div class="member-security" :class="{'qicked': member.smoke === false}" @click="isSomker('n', member)">不抽烟</div>
                </div>
              </div>
            </div>
            <div class="confirm btn-able" @click="confirm"></div>
          </div>
        </div>
      </question>
      <transition name="answer" @after-enter="toNext">
        <answer v-if="showAnswer" :textList="answerText" @modify="modify" wrap></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'
  import { Submit } from '@/models/api'

  export default {
      name: "seventh-ques",
      components: {
        Question,
        Answer
      },
      data () {
        return {
          showOption: true,
          showAnswer: false,
          memberList: [
            {
              text: '本人',
              class: 'me',
              smoke: false
            },
            {
              text: '配偶',
              class: 'wife',
              smoke: false
            }
          ],
          json: {}
        }
      },
      computed: {
        answerText () {
          return this.memberList.map(item => {
            return item.smoke ? item.text + ': 抽烟' : item.text + ': 不抽烟'
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
          addSmoke: 'addSmoke'
        }),
        formatJson () {
          this.json.familyDebt = parseInt(this.info.familyDebt + '0000')
          this.json.familyIncome = parseInt(this.info.familyIncome + '0000')
          this.json.members = [{
            age: parseInt(this.info.age),
            gender: this.info.sex,
            hasSocialInsurance: this.info.socialSecurity ? 1 : 0,
            income: this.info.income,
            label: 'self',
            labelName: '本人',
            memberType: 1,
            residence: this.info.residence,
            isSmoking: this.info.isSmoking ? 1: 0
          }]
          this.info.family.forEach(item => {
            if (item.label !== 'dog') {
              this.json.members.push({
                age: item.age ? parseInt(item.age ) : '',
                gender: item.gender,
                hasSocialInsurance: item.hasSocialInsurance ? 1 : 0,
                income: item.income ? parseInt(item.income + '0000') : '',
                label: item.label,
                labelName: item.labelName,
                memberType: item.memberType,
                residence: item.residence,
                isSmoking: item.isSmoking ? 1 : 0
              })
            } else {
              this.json.members.push({
                label: item.label,
                labelName: item.labelName,
                memberType: item.memberType
              })
            }
          })
        },
        isSomker (is, member) {
          if (is === 'y') {
            member.smoke = true
          } else if (is === 'n') {
            member.smoke = false
          }
        },
        confirm () {
          this.showAnswer = true
          this.showOption = false
          this.addSmoke({data: this.memberList})
          this.formatJson()
          console.log(444, this.json)
          new Submit().POST({data: this.json})
            .then((res) => {
              console.log(555, res)
            })
            .catch(err => {
              console.log(666, err)
            })
          this.$emit('fill-height', document.getElementById('options').offsetHeight)
        },
        toNext () {
          setTimeout(() => {
            this.next({data: 8})
            setTimeout(() => {
              this.$emit('scroll-to', document.getElementById('que7').offsetTop + document.getElementById('que7').offsetHeight)
            }, 500)
          }, 500)
        },
        modify () {
          this.showAnswer = false
          this.next({data: 7})
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        }
      },
      mounted () {
        this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que7').offsetHeight)
      },
      created () {
        if (this.info.family.filter(item => {
            return item.labelName === '配偶'
          }).length > 0) {
          this.memberList = [
            {
              text: '本人',
              class: this.info.sex === 'M' ? 'male' : 'female',
              smoke: false
            },
            {
              text: '配偶',
              class: this.info.sex === 'M' ? 'female' : 'male',
              smoke: false
            }
          ]
        } else {
          this.memberList = [
            {
              text: '本人',
              class: this.info.sex === 'M' ? 'male' : 'female',
              smoke: false
            }
          ]
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/animation";
  @import "../styles/common";
  @include keyframes(slideRight, 100%, 0);
  @include keyframes(slideLeft1, -740px, 0);
  .question7 {
    transform: translateX(-740px);
    -webkit-transform: translateX(-740px);
    -webkit-animation: slideLeft1 1s ease-out;
    -o-animation: slideLeft1 1s ease-out;
    animation: slideLeft1 1s ease-out;
    animation-fill-mode: forwards;
    animation-delay: 1s;
    -webkit-animation-delay: 1s;
  }
  .que7 {
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
      .member-text {
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
