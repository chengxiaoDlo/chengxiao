<template>
    <div class="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <swiper :height="height" direction="vertical" class="text-scroll" :show-dots="false" v-model="swiperIndex" @on-index-change="indexChange">
        <swiper-item>
          <start></start>
        </swiper-item>
        <swiper-item v-if="progress > 0">
          <first-ques></first-ques>
        </swiper-item>
        <swiper-item v-if="progress > 1">
          <second-ques></second-ques>
        </swiper-item>
        <swiper-item v-if="progress > 2">
          <third-ques></third-ques>
        </swiper-item>
        <swiper-item v-if="progress > 3">
          <fourth-ques></fourth-ques>
        </swiper-item>
        <swiper-item v-if="progress > 4">
          <fifth-ques></fifth-ques>
        </swiper-item>
        <swiper-item v-if="progress > 5">
          <sixth-ques></sixth-ques>
        </swiper-item>
        <swiper-item v-if="progress > 6">
          <seventh-ques></seventh-ques>
        </swiper-item>
        <swiper-item v-if="progress > 7">
          <generate-report></generate-report>
        </swiper-item>
      </swiper>
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
import { Swiper, SwiperItem } from 'vux'
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
    GenerateReport,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      answer: {
        sex: ''
      },
      height: '',
      swiperIndex: 0
    }
  },
  computed: mapState({
    progress: 'progress',
    index: 'index'
  }),
  methods: {
    ...mapMutations({
      setIndex: 'setIndex'
    }),
    indexChange (index) {
      this.setIndex({data: index})
    }
  },
  created () {
    this.height = window.screen.height + 'px'
  },
  watch: {
    'index': {
      handler (newVal) {
        console.log(111, newVal)
        this.swiperIndex = newVal
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss">
  .questionnaire {
    height: 100%;
  }
  .questionnaire .vux-slider {
    overflow: inherit;
  }
  .questionnaire .vux-slider .vux-swiper {
    overflow: inherit;
  }
</style>
