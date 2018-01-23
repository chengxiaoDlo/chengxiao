<template>
    <div class="questionnaire" id="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <start></start>
      <first-ques v-if="progress > 0" @change-height="changeHeight" @fill-height="fillHeight"></first-ques>
      <second-ques v-if="progress > 1" @change-height="changeHeight" @fill-height="fillHeight"></second-ques>
      <third-ques v-if="progress > 2" @change-height="changeHeight" @fill-height="fillHeight"></third-ques>
      <fourth-ques v-if="progress > 3" @change-height="changeHeight" @fill-height="fillHeight"></fourth-ques>
      <fifth-ques v-if="progress > 4" @change-height="changeHeight" @fill-height="fillHeight"></fifth-ques>
      <sixth-ques v-if="progress > 5" @change-height="changeHeight" @fill-height="fillHeight"></sixth-ques>
      <seventh-ques v-if="progress > 6" @change-height="changeHeight" @fill-height="fillHeight"></seventh-ques>
      <generate-report v-if="progress > 7" @change-height="changeHeight" @fill-height="fillHeight"></generate-report>
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
      blockHeight: ''
    }
  },
  computed: mapState({
    progress: 'progress'
  }),
  methods: {
    changeHeight (val) {
      this.blockHeight = val
      document.getElementById('block').style.height = val + 'px'
    },
    fillHeight (val) {
      document.getElementById('block').style.height = this.blockHeight + val + 'px'
    }
  },
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
