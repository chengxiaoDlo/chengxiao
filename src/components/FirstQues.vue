<template>
    <div class="ques" id="que1">
      <question question="江上往来人，敢问是何人？" class="question1">
          <div slot="options" >
            <div v-if="showOption" class="options que1" id="options">
              <div @click="selectSex('M')">
                <div class="sex male" >
                  <div class="pick" v-if="sex === '先生'"></div>
                </div>
                <p class="sex-name">先生</p>
              </div>
              <div @click="selectSex('F')">
                <div class="sex female" >
                  <div class="pick" v-if="sex === '女士' "></div>
                </div>
                <p class="sex-name">女士</p>
              </div>
            </div>
          </div>
      </question>
      <transition name="answer" @after-enter="toNext">
        <answer :text="sex" v-if="showAnswer" @modify="modify"></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'
    export default {
      name: 'firstQues',
      data () {
        return {
          showOption: true,
          showAnswer: false,
          sex: ''
        }
      },
      components: {
        Question,
        Answer
      },
      computed: mapState([
        'isModify',
        'progress'
      ]),
      methods: {
        ...mapMutations({
          next: 'next',
          chooseSex: 'chooseSex',
          toggleModify: 'toggleModify',
          clear: 'clear'
        }),
        selectSex (sex) {
          this.sex = sex === 'M' ? '先生' : '女士'
          this.chooseSex({data: sex})
          setTimeout(() => {
            this.showOption = false
            this.showAnswer = true
          }, 1000)
          this.$emit('fill-height', document.getElementById('options').offsetHeight)
        },
        modify () {
          console.log(333)
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        },
        toNext () {
          if (this.progress === 1) {
            setTimeout(() => {
              this.next({data: 2})
              setTimeout(() => {
                this.$emit('scroll-to', document.getElementById('que1').offsetTop + document.getElementById('que1').offsetHeight)
              }, 500)
            }, 500)
          } else {
            this.clear()
            this.next({data: 1})
            setTimeout(() => {
              this.next({data: 2})
              this.toggleModify()
              setTimeout(() => {
                this.toggleModify()
                this.$emit('scroll-to', document.getElementById('que1').offsetTop + document.getElementById('que1').offsetHeight)
              }, 500)
            }, 500)
          }
        }
      },
      mounted () {
        this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que1').offsetHeight)
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
  @include keyframes(slideLeft1, -740px, 0);
  @include keyframes(slideRight, 100%, 0);
  .ques {
    overflow: hidden;
    min-height: 100%;
  }
  .question1 {
    transform: translateX(-740px);
    -webkit-transform: translateX(-740px);
    -webkit-animation: slideLeft1 1s ease-out;
    -o-animation: slideLeft1 1s ease-out;
    animation: slideLeft1 1s ease-out;
    animation-fill-mode: forwards;
    animation-delay: 1s;
    -webkit-animation-delay: 1s;
  }
  .que1 {
    display: flex;
    justify-content: center;
    width: 620px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
    .sex {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 36px;
      position: relative;
      .pick {
        width: 60px;
        height: 60px;
        background: url("../assets/images/pick.png") no-repeat;
        background-size: 100%;
        position: absolute;
        bottom: 0;
        right: -24px;
      }
    }
    .sex-name {
      text-align: center;
      font-size: 30px;
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
