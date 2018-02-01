<template>
    <div class="questionnaire" id="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <scroller ref="scroll">
        <div style="padding-top: 1rem;">
          <start @scroll-to="scroll"></start>
          <first-ques v-if="progress > 0" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></first-ques>
          <second-ques v-if="progress > 1" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></second-ques>
          <third-ques v-if="progress > 2" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></third-ques>
          <fourth-ques :residence="city.value" :city="city.name" v-if="progress > 3" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></fourth-ques>
          <fifth-ques v-if="progress > 4" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></fifth-ques>
          <sixth-ques v-if="progress > 5" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></sixth-ques>
          <seventh-ques v-if="progress > 6" @change-height="changeHeight" @fill-height="fillHeight" @scroll-to="scroll"></seventh-ques>
          <generate-report v-if="progress > 7" @change-height="changeHeight" @fill-height="fillHeight"></generate-report>
          <div style="width: 100%;" id="block"></div>
        </div>
      </scroller>
      <transition name="keyboard">
        <keyboard v-if="showKeyBoard" @quit="cancelInput" @ok="ok"></keyboard>
      </transition>
      <slide-picker v-if="showAgePicker" :list="chooseList" :col="1" @quit="cancelAge" @confirm="selectedAge" :default="defaultAge"></slide-picker>
      <slide-picker v-if="showCityPicker" :list="cityList" :col="2" @quit="cancelCity" @confirm="selectedCity" :default="defaultCity"></slide-picker>
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
import { mapState, mapMutations } from 'vuex'
import consts from '@/utils/consts'

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
      blockHeight: '',
      cityList: consts.cityList
    }
  },
  computed: {
    ...mapState({
      progress: 'progress',
      showAgePicker: 'showAgePicker',
      showKeyBoard: 'showKeyBoard',
      chooseList: 'chooseList',
      defaultAge: 'defaultAge',
      defaultCity: 'defaultCity',
      showCityPicker: 'showCityPicker',
      city: 'city'
    })
  },
  methods: {
    ...mapMutations({
      initAgeList: 'initAgeList',
      toggleAgePicker: 'toggleAgePicker',
      toggleCityPicker: 'toggleCityPicker',
      toggleKeyboard: 'toggleKeyboard',
      setAge: 'setAge',
      clear: 'clear',
      setCity: 'setCity'
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
    },
    cancelAge () {
      this.toggleAgePicker()
    },
    cancelCity () {
      this.toggleCityPicker()
    },
    cancelInput () {
      this.toggleKeyboard()
    },
    selectedAge (val) {
      console.log(val)
      this.setAge({data: val.value[0]})
      setTimeout(() => {
        this.clear()
      }, 100)
      this.toggleAgePicker()
    },
    selectedCity (val) {
      console.log(99, val)
      this.setCity({data: {
          name: val.label,
          value: val.value[1]
        }})
      this.toggleCityPicker()
    },
    ok (val) {
      console.log(33, val)
      this.toggleKeyboard()
    }
  },
  created () {
    this.initAgeList()
    console.log(55, this.city)
  }
}
</script>

<style type="text/scss" lang="scss">
  @import "../styles/common";
  @import "../styles/animation";
  @include keyboard(keyboard, 100%, 0);
  .questionnaire {
    height: 100%;
  }
  .keyboard-enter-active {
    -webkit-animation: keyboard 0.5s;
    -o-animation: keyboard 0.5s;
    animation: keyboard 0.5s;
  }
  .keyboard-leave-active {
    -webkit-animation: keyboard 0.5s reverse;
    -o-animation: keyboard 0.5s reverse;
    animation: keyboard 0.5s reverse;
  }
</style>
