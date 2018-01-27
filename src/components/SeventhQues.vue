<template>
    <div style="overflow: hidden;" id="que7" :class="{'hidden': isModify && progress <= 7}">
      <question question="蓝田日暖玉生烟，日常能抽几支烟？" sub="部分寿险产品会为非吸烟体用户提供高性价比产品，我们也会全面考虑哦~" class="animated fadeInLeft">
        <div slot="options">
          <transition name="options">
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
          </transition>
        </div>
      </question>
      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <answer v-if="showAnswer" :textList="answerText" @modify="modify" wrap></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'

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
          ]
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
          console.log(444, this.info)
          this.$emit('fill-height', document.getElementById('options').offsetHeight)
          setTimeout(() => {
            this.next({data: 8})
          }, 3000)
          setTimeout(() => {
            this.$emit('scroll-to', document.getElementById('que7').offsetTop + document.getElementById('que7').offsetHeight)
//            window.scrollTo(0, document.getElementById('que7').offsetTop + document.getElementById('que7').offsetHeight)
          }, 3500)
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
        // document.getElementById('que7').style.minHeight = document.documentElement.clientHeight + 'px'
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
  .que7 {
    padding-top: 0.5rem;
    padding-bottom: 2.5rem;
    .age {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      margin-bottom: 0.6rem;
      .member {
        width: 1.53rem;
        height: 1.53rem;
        margin-right: 0.8rem;
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
        width: 2.5rem;
        height: 1rem;
        border-radius: 30px;
        border:solid 1px;
        font-size: 0.5rem;
        text-align: center;
        line-height: 1rem;
        margin-top: 0.15rem;
        margin-right: 0.3rem;
        color: rgb(126, 126, 126);
      }
      .qicked {
        border-color: rgb(252, 216, 75);
        color: rgb(252, 216, 75);
      }
      .member-text {
        font-size: 0.5rem;
        padding-left: 0.25rem;
      }
    }
  }
</style>
