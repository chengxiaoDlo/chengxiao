<template>
    <div class="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <scroller ref="myscroller">
        <!--<start></start>-->
        <!--<transition name="start" enter-active-class="animated fadeInRight">-->
          <!--<answer text="开始" v-if="goToStart"></answer>-->
        <!--</transition>-->
        <first-ques></first-ques>
        <!--<question question="但愿人长久，家里有几口" sub="我们会基于您的家庭结构和成员情况，考虑每个人的保障~">-->
          <!--<div slot="options" class="options que2">-->
            <!--<div class="option">-->
              <!--<div class="family"></div>-->
              <!--<p class="member">本人</p>-->
            <!--</div>-->
            <!--<div class="option">-->
              <!--<div class="family"></div>-->
              <!--<p class="member">配偶</p>-->
            <!--</div>-->
            <!--<div class="option">-->
              <!--<div class="family"></div>-->
              <!--<p class="member">儿子</p>-->
            <!--</div>-->
            <!--<div class="option">-->
              <!--<div class="family"></div>-->
              <!--<p class="member">女儿</p>-->
            <!--</div>-->
            <!--<div class="option">-->
              <!--<div class="family"></div>-->
              <!--<p class="member">爸爸</p>-->
            <!--</div>-->
            <!--<div class="option">-->
              <!--<div class="family"></div>-->
              <!--<p class="member">妈妈</p>-->
            <!--</div>-->
            <!--<div class="option">-->
              <!--<div class="family"></div>-->
              <!--<p class="member">宠物狗</p>-->
            <!--</div>-->
            <!--<div class="option">-->
              <!--<div class="family"></div>-->
              <!--<p class="member">添加</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</question>-->

      </scroller>
    </div>
</template>

<script>
import HeadProgressBar from '@/components/HeadProgressBar'
import Question from '@/components/Question'
import Start from '@/components/Start'
import Answer from '@/components/Answer'
import FirstQues from '@/components/FirstQues'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'questionnaire',
  components: {
    HeadProgressBar,
    Question,
    Start,
    Answer,
    FirstQues
  },
  data () {
    return {
      progress: 1,
      answer: {
        sex: ''
      }
    }
  },
  computed: mapState([
    'next',
    'goToStart'
  ]),
  methods: {
    ...mapMutations({
      toggleNext: 'toggleNext'
    }),
    selectSex (sex) {
      this.toggleNext()
      this.answer.sex = sex
    }
  },
  mounted () {
    console.log(88, this.$refs.myscroller.getPosition())
  },
  watch: {
    'next': {
      handler (newVal) {
        if (newVal) {
          setTimeout(() => {
            console.log('next!!!')
            this.$refs.myscroller.scrollTo(0, 500, true)
          }, 2000)
        }
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.options {
  display: flex;
  background: #fff;
  box-sizing: border-box;
  padding-bottom: 1rem;
}

.que2 {
  flex-wrap: wrap;
  width: 8.5rem;
  margin-left: 2.02rem;
  .option {
    flex-basis: 33.3%;
    .family {
      width: 2rem;
      height: 2rem;
      background: blueviolet;
      border-radius: 50%;
      margin: 0.1rem auto;
    }
    .member {
      text-align: center;
      font-size: 0.5rem;
    }
  }
}
</style>
