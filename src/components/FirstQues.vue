<template>
    <div class="ques" id="que1">
      <question question="江上往来人，敢问是何人？" class="animated fadeInLeft">
          <div slot="options" >
            <transition name="fade" >
              <div v-if="showOption" class="options que1" id="options">
                <div @click="selectSex('M')">
                  <div class="sex male" ></div>
                  <p class="sex-name">壮士</p>
                </div>
                <div @click="selectSex('F')">
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
          this.sex = sex === 'M' ? '壮士' : '女子'
          this.chooseSex({data: sex})
          this.showOption = false
          this.showAnswer = true
          this.$emit('fill-height', document.getElementById('options').offsetHeight)
          setTimeout(() => {
            this.next({data: 2})
          }, 3000)
          setTimeout(() => {
            this.$emit('scroll-to', document.getElementById('que1').offsetTop + document.getElementById('que1').offsetHeight)
//            window.scrollTo(0, document.getElementById('que1').offsetTop + document.getElementById('que1').offsetHeight)
          }, 3500)
        },
        modify () {
          console.log(333)
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        }
      },
      mounted () {
        this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que1').offsetHeight)
        // document.getElementById('que1').style.minHeight = document.documentElement.clientHeight + 'px'
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
  .ques {
    overflow: hidden;
    min-height: 100%;
  }
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
