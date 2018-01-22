<template>
    <div class="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <swiper :height="height" direction="vertical" class="text-scroll" :show-dots="false" :threshold="200" :min-moving-distance="moving" v-model="swiperIndex" @on-index-change="indexChange">
        <swiper-item>
          <start v-if="progress === 0"></start>
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
      swiperIndex: 0,
      moving: 0
    }
  },
  computed: mapState({
    progress: 'progress',
    index: 'index',
    stopScroll: 'stopScroll'
  }),
  methods: {
    ...mapMutations({
      setIndex: 'setIndex',
      next: 'next'
    }),
    indexChange (index) {
      this.setIndex({data: index})
      this.next({data: index})
    }
  },
  created () {
    this.height = document.documentElement.clientHeight + 'px'
  },
  watch: {
    'index': {
      handler (newVal) {
        console.log(111, newVal)
        this.swiperIndex = newVal
      }
    },
    'stopScroll': {
      handler (newVal) {
        if (newVal) {
          this.moving = 1000
        } else {
          this.moving = 0
        }
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
