<template>
    <div>
      <question question="江上往来人，敢问是何人？" class="animated fadeInLeft">
          <div slot="options" >
            <transition name="fade" >
              <div v-if="showOption" class="options que1">
                <div @click="selectSex('壮士')">
                  <div class="sex male" ></div>
                  <p class="sex-name">壮士</p>
                </div>
                <div @click="selectSex('女子')">
                  <div class="sex female" ></div>
                  <p class="sex-name">女子</p>
                </div>
              </div>
            </transition>
          </div>
      </question>
      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
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
        'index',
        'progress'
      ]),
      methods: {
        ...mapMutations({
          next: 'next',
          setIndex: 'setIndex',
          chooseSex: 'chooseSex'
        }),
        selectSex (sex) {
          this.sex = sex
          this.chooseSex({data: sex})
          this.showOption = false
          this.showAnswer = true
          setTimeout(() => {
            this.next({data: this.progress + 1})
          }, 3000)
          setTimeout(() => {
            this.setIndex({data: this.index + 1})
          }, 3500)
        },
        modify () {
          console.log(333)
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
  .que1 {
    display: flex;
    justify-content: center;
    width: 10.34rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
    .sex {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin: 0 0.6rem;
    }
    .sex-name {
      text-align: center;
      font-size: 0.5rem;
    }
  }
  .fadeInLeft {
    animation-delay: 1s;
  }
  .fade-enter-active {
    animation: fade 2s reverse;
    -webkit-animation: fade 2s reverse;
  }
  .fade-leave-active {
    -webkit-animation: fade 2s;
    -o-animation: fade 2s;
    animation: fade 2s;
  }
</style>
