<template>
    <div style="overflow: hidden" id="que4" :class="{'hidden': isModify && progress <= 4}">
      <question question="青春作伴好还乡，而今哪里是家乡？" sub="我们会考虑当地的社保政策、产品区域限制、消费水平等因素哒~" class="animated fadeInLeft">
        <div slot="options">
          <transition name="options">
            <div v-if="showOption" id="options">
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
          showOption: true,
          showAnswer: false
        }
      },
      props: {
        residence: {
          type: String,
          default: ''
        },
        city: {
          type: String
        }
      },
      computed: mapState([
        'isModify',
        'progress'
      ]),
      methods: {
        ...mapMutations({
          next: 'next',
          toggleCityPicker: 'toggleCityPicker',
          addResidence: 'addResidence',
          toggleModify: 'toggleModify'
        }),
        confirm () {
          this.showOption = false
          this.showAnswer = true
          this.addResidence({data: this.residence})
          this.$emit('fill-height', document.getElementById('options').offsetHeight)
          if (this.progress === 4) {
            setTimeout(() => {
              this.next({data: 5})
            }, 3000)
            setTimeout(() => {
              this.$emit('scroll-to', document.getElementById('que4').offsetTop + document.getElementById('que4').offsetHeight)
            }, 3500)
          } else {
            this.next({data: 4})
            setTimeout(() => {
              this.next({data: 5})
              this.toggleModify()
            }, 3000)
            setTimeout(() => {
              this.toggleModify()
              this.$emit('scroll-to', document.getElementById('que4').offsetTop + document.getElementById('que4').offsetHeight)
            }, 3500)
          }
        },
        selectCity () {
          this.toggleCityPicker()
        },
        modify () {
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        }
      },
      mounted () {
        this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que4').offsetHeight)
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
.que4{
  padding-top: 30px;
  padding-bottom: 150px;
  .location {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    margin-bottom: 36px;
    .me {
      background: url("../assets/images/dad.png") no-repeat;
      background-size: 100%;
      width: 90px;
      height: 90px;
      margin-right: 48px;
    }
    .member-text {
      font-size: 30px;
      padding-left: 15px;
    }
    .member-city {
      width: 300px;
      height: 60px;
      border-radius: 30px;
      border:solid 2px;
      font-size: 30px;
      text-align: center;
      line-height: 60px;
      margin-top: 9px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 12px;
      white-space: nowrap;
      color: rgb(126, 126, 126);
    }
  }
}
.confirm {
  background: url("../assets/images/confirm-btn.png") no-repeat;
  background-size: 100%;
  width: 300px;
  height: 180px;
  margin-top: -120px;
  margin-left: 270px;
}
</style>
