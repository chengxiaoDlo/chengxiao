<template>
    <div style="overflow: hidden">
      <question question="青春作伴好还乡，而今哪里是家乡？" sub="我们会考虑当地的社保政策、产品区域限制、消费水平等因素哒~" class="animated fadeInLeft">
        <div slot="options">
          <transition name="options">
            <div v-if="showOption">
              <div class="options que4" >
                <div class="location" >
                  <div>
                    <div class="member me"></div>
                    <p class="member-text">本人</p>
                  </div>
                  <div class="member-city" @click="selectCity">{{city}}</div>
                </div>
              </div>
              <div class="confirm btn-able" @click="confirm"></div>
            </div>
          </transition>
        </div>
      </question>
      <div class="picker" v-if="chooseCity">
        <slide-picker :list="cityList" :col="2" @quit="cancel" @confirm="selected" ></slide-picker>
      </div>
      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <answer v-if="showAnswer" :text="city" @modify="modify"></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import SlidePicker from '@/components/SlidePicker'
  import utils from '@/utils/consts'
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'

    export default {
      name: "fourth-ques",
      components: {
        Question,
        SlidePicker,
        Answer
      },
      data () {
        return {
          chooseCity: false,
          showOption: true,
          showAnswer: false,
          city: '河北省石家庄市',
          residence: '',
          cityList: utils.cityList
        }
      },
      computed: mapState([
        'index',
        'progress'
      ]),
      methods: {
        ...mapMutations({
          next: 'next',
          setIndex: 'setIndex',
          stopSwiper: 'stopSwiper',
          useSwiper: 'useSwiper'
        }),
        confirm () {
          this.showOption = false
          this.showAnswer = true
          setTimeout(() => {
            this.next({data: this.progress + 1})
          }, 3000)
          setTimeout(() => {
            this.setIndex({data: this.index + 1})
          }, 3500)
        },
        cancel () {
          this.chooseCity = false
          this.useSwiper()
        },
        selected (val) {
          console.log(333, val)
          this.city = val.label
          this.residence = ''
          this.chooseCity = false
          this.useSwiper()
        },
        selectCity () {
          this.chooseCity = true
          this.stopSwiper()
        },
        modify () {
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        }
      },
      created () {
        this.$emit('initHeight')
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
.que4{
  padding-top: 0.5rem;
  padding-bottom: 2.5rem;
  .location {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    margin-bottom: 0.6rem;
    .me {
      background: url("../assets/images/dad.png") no-repeat;
      background-size: 100%;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.8rem;
    }
    .member-text {
      font-size: 0.5rem;
      padding-left: 0.25rem;
    }
    .member-city {
      width: 5rem;
      height: 1rem;
      border-radius: 30px;
      border:solid 1px;
      font-size: 0.5rem;
      text-align: center;
      line-height: 1rem;
      margin-top: 0.15rem;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 0.2rem;
      white-space: nowrap;
      color: rgb(126, 126, 126);
    }
  }
}
.confirm {
  background: url("../assets/images/confirm-btn.png") no-repeat;
  background-size: 100%;
  width: 5rem;
  height: 3rem;
  margin-top: -2rem;
  margin-left: 4.5rem;
}
</style>
