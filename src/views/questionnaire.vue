<template>
    <div class="questionnaire" id="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <start></start>
      <first-ques v-if="progress > 0"></first-ques>
      <second-ques v-if="progress > 1"></second-ques>
      <third-ques v-if="progress > 2"></third-ques>
      <fourth-ques v-if="progress > 3"></fourth-ques>
      <fifth-ques v-if="progress > 4"></fifth-ques>
      <sixth-ques v-if="progress > 5"></sixth-ques>
      <seventh-ques v-if="progress > 6"></seventh-ques>
      <generate-report v-if="progress > 7"></generate-report>
      <div style="width: 100%;" id="block"></div>
    </div>
</template>

<script>
import HeadProgressBar from '@/components/HeadProgressBar'
import Question from '@/components/Question'
import Start from '@/components/Start'
import FirstQues from '@/components/FirstQues'
import SecondQues from '@/components/SecondQues'
import ThirdQues from '@/components/ThirdQues'
import FourthQues from '@/components/FourthQues'
import FifthQues from '@/components/FifthQues'
import SixthQues from '@/components/SixthQues'
import SeventhQues from '@/components/SeventhQues'
import GenerateReport from '@/components/GenerateReport'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'questionnaire',
  components: {
    HeadProgressBar,
    Question,
    Start,
    FirstQues,
    SecondQues,
    ThirdQues,
    FourthQues,
    FifthQues,
    SixthQues,
    SeventhQues,
    GenerateReport
  },
  data () {
    return {
      answer: {
        sex: ''
      }
    }
  },
  computed: mapState({
    progress: 'progress'
  }),
  mounted () {
  }
}
</script>

<style type="text/scss" lang="scss">
  .questionnaire {
    height: 100%;
    overflow: scroll;
  }
  .questionnaire .vux-slider {
    overflow: inherit;
  }
  .questionnaire .vux-slider .vux-swiper {
    overflow: inherit;
  }
</style>
