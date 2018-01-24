<template>
    <div class="questionnaire" id="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <scroller ref="scroll">
        <div style="padding-top: 1rem;">
          <start @scroll-to="scroll"></start>
          <first-ques v-if="progress > 0" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></first-ques>
          <second-ques v-if="progress > 1" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></second-ques>
          <third-ques v-if="progress > 2" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></third-ques>
          <fourth-ques v-if="progress > 3" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></fourth-ques>
          <fifth-ques v-if="progress > 4" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></fifth-ques>
          <sixth-ques v-if="progress > 5" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></sixth-ques>
          <seventh-ques v-if="progress > 6" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></seventh-ques>
          <generate-report v-if="progress > 7" @change-height="changeHeight" @fill-height="fillHeight"></generate-report>
          <div style="width: 100%;" id="block"></div>
        </div>
      </scroller>
      <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
        <keyboard v-if="showKeyBoard" @quit="cancel" @on-change="change" @ok="ok"></keyboard>
      </transition>
      <slide-picker v-if="showPicker" :list="chooseList" :col="1" @quit="cancel" @confirm="selected" :default="defaultAge"></slide-picker>
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
import SlidePicker from '@/components/SlidePicker'
import Keyboard from '@/components/Keyboard'
import { mapState, mapMutations, mapGetters } from 'vuex'

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
    GenerateReport,
    Keyboard,
    SlidePicker
  },
  data () {
    return {
      blockHeight: ''
    }
  },
  computed: {
    ...mapState({
      progress: 'progress',
      showPicker: 'showPicker',
      showKeyBoard: 'showKeyBoard'
    }),
    ...mapGetters({
      youngList: 'youngList',
      childList: 'childList',
      oldList: 'oldList'
    })
  },
  methods: {
    ...mapMutations({
      initAgeList: 'initAgeList'
    }),
    changeHeight (val) {
      this.blockHeight = val
      document.getElementById('block').style.height = val + 'px'
    },
    fillHeight (val) {
      document.getElementById('block').style.height = this.blockHeight + val + 'px'
    },
    scroll (val) {
      console.log(333, val)
      this.$refs.scroll.scrollTo(0, val, true)
    }
  },
  created () {
    this.initAgeList()
    console.log(55, this.youngList)
  }
}
</script>

<style type="text/scss" lang="scss">
  .questionnaire {
    height: 100%;
  }
  .scroll {
    padding-top: 1rem;
  }
  .questionnaire .vux-slider {
    overflow: inherit;
  }
  .questionnaire .vux-slider .vux-swiper {
    overflow: inherit;
  }
</style>
