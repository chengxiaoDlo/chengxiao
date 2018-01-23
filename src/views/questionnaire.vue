<template>
    <div class="questionnaire" id="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <!--<swiper :height="height" direction="vertical" class="text-scroll" :show-dots="false" v-model="swiperIndex" @on-index-change="indexChange" ref="swiper">-->
        <!--<swiper-item>-->
          <!--<start v-if="swiperIndex === 0"></start>-->
        <!--</swiper-item>-->
        <!--<swiper-item v-if="progress > 0">-->
          <!--<first-ques v-if="swiperIndex > 0"></first-ques>-->
        <!--</swiper-item>-->
        <!--<swiper-item v-if="progress > 1">-->
          <!--<second-ques v-if="swiperIndex > 1"></second-ques>-->
        <!--</swiper-item>-->
        <!--<swiper-item v-if="progress > 2">-->
          <!--<third-ques v-if="swiperIndex > 2"></third-ques>-->
        <!--</swiper-item>-->
        <!--<swiper-item v-if="progress > 3">-->
          <!--<fourth-ques v-if="swiperIndex > 3"></fourth-ques>-->
        <!--</swiper-item>-->
        <!--<swiper-item v-if="progress > 4">-->
          <!--<fifth-ques v-if="swiperIndex > 4"></fifth-ques>-->
        <!--</swiper-item>-->
        <!--<swiper-item v-if="progress > 5">-->
          <!--<sixth-ques v-if="swiperIndex > 5"></sixth-ques>-->
        <!--</swiper-item>-->
        <!--<swiper-item v-if="progress > 6">-->
          <!--<seventh-ques v-if="swiperIndex > 6"></seventh-ques>-->
        <!--</swiper-item>-->
        <!--<swiper-item v-if="progress > 7">-->
          <!--<generate-report v-if="swiperIndex > 7"></generate-report>-->
        <!--</swiper-item>-->
      <!--</swiper>-->
      <start></start>
      <first-ques v-if="progress > 0"></first-ques>
      <second-ques v-if="progress > 1"></second-ques>
      <third-ques v-if="progress > 2"></third-ques>
      <fourth-ques v-if="progress > 3"></fourth-ques>
      <fifth-ques v-if="progress > 4"></fifth-ques>
      <sixth-ques v-if="progress > 5"></sixth-ques>
      <seventh-ques v-if="progress > 6"></seventh-ques>
      <generate-report v-if="progress > 7"></generate-report>
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
    index: 'index',
    stopScroll: 'stopScroll'
  }),
  methods: {
    ...mapMutations({
      setIndex: 'setIndex',
      next: 'next'
    }),
    indexChange (index) {
//      if (index === 2) {
//        console.log(9090, index)
//        this.$refs.swiper.xheight = this.height
//      }
      this.setIndex({data: index})
//      this.next({data: index})
    },
    changeHeight (height) {
      console.log(98888, height)
//      if ((parseInt(height) + 30) > document.documentElement.clientHeight) {
//        this.$refs.swiper.xheight = parseInt(height) + 30 + 'px'
//      }
    },
    initHeight () {
      this.$refs.swiper.xheight = document.documentElement.clientHeight + 'px'
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
    'progress': {
      handler (newVal) {
        if (newVal === 3) {
          document.body.scrollTop = 200
        }
      }
    }
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
