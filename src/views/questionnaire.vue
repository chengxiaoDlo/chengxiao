<template>
    <div class="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <scroller ref="myscroller">
        <!--<start></start>-->
        <!--<transition name="start" enter-active-class="animated fadeInRight">-->
          <!--<answer text="开始" v-if="goToStart"></answer>-->
        <!--</transition>-->
        <!--<first-ques></first-ques>-->
        <!--<second-ques></second-ques>-->
        <!--<third-ques></third-ques>-->
        <!--<fourth-ques></fourth-ques>-->
        <!--<fifth-ques></fifth-ques>-->
        <sixth-ques></sixth-ques>
      </scroller>
    </div>
</template>

<script>
import HeadProgressBar from '@/components/HeadProgressBar'
import Question from '@/components/Question'
import Start from '@/components/Start'
import Answer from '@/components/Answer'
import FirstQues from '@/components/FirstQues'
import SecondQues from '@/components/SecondQues'
import ThirdQues from '@/components/ThirdQues'
import FourthQues from '@/components/FourthQues'
import FifthQues from '@/components/FifthQues'
import SixthQues from '@/components/SixthQues'
import SeventhQues from '@/components/SeventhQues'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'questionnaire',
  components: {
    HeadProgressBar,
    Question,
    Start,
    Answer,
    FirstQues,
    SecondQues,
    ThirdQues,
    FourthQues,
    FifthQues,
    SixthQues,
    SeventhQues
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
</style>
