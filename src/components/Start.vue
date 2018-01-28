<template>
    <div class="start">
      <div class="row-with-avatar animated fadeInLeft">
        <div class="first-line  ">
          <div class="avatar"></div>
          <div class="dialogue">
            <div class="angle"></div>
            <p>
              Hi，{{name}}! 我是常博士，保险问题找我就对了！
            </p>
          </div>
        </div>
      </div>
      <div class="row-without-avatar animated fadeInLeft">
        <div class="dialogue" :class="{'done': goToStart}">
          <div class="angle"></div>
          <p>让我来为你规划专属的家庭保险方案吧~</p>
        </div>
        <transition name="start">
          <div v-if="!goToStart">
            <div class="content"></div>
            <div class="start-btn" @click="start"></div>
          </div>
        </transition>
        <transition name="start" enter-active-class="animated fadeInRight">
          <answer text="开始" v-if="goToStart" :modifiable="false"></answer>
        </transition>
      </div>
    </div>
</template>

<script>
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'

    export default {
      name: 'Start',
      components: {
        Answer
      },
      data () {
        return {
          goToStart: false,
          showStartBtn: true,
          name: '程效'
        }
      },
      computed: mapState([
        'progress',
        'index'
      ]),
      methods: {
        ...mapMutations({
          next: 'next',
          setIndex: 'setIndex'
        }),
        start () {
          console.log(44454, document.getElementById('questionnaire'))
          this.goToStart = true
          setTimeout(() => {
            if (this.progress === 0) {
              this.next({data: 1})
            }
          }, 3000)
          setTimeout(() => {
            this.$emit('scroll-to', document.getElementsByClassName('start')[0].offsetTop + document.getElementsByClassName('start')[0].offsetHeight)
//            window.scrollTo(0, document.getElementsByClassName('start')[0].offsetTop + document.getElementsByClassName('start')[0].offsetHeight)
            this.setIndex({data: this.index + 1})
          }, 3500)
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
@import "../styles/animation";
.start {
  margin-left: 16px;
  .row-with-avatar {
    position: relative;
    animation-duration: 2s;

    .first-line {
      display: flex;

      .avatar {
        height: 90px;
        width: 90px;
        background: url("../assets/images/avatar.png") no-repeat;
        background-size: 100%;
        margin-top: 6px;
        margin-right: 6px;
      }

      .dialogue {
        width: 620px;
        box-sizing: border-box;
        position: relative;
        background: #ffffff;
        padding: 18px 60px;
        padding-right: 30px;
        word-wrap: break-word;
        .angle {
          background: url("../assets/images/ques-angle.png") no-repeat;
          background-size: 100%;
          width: 24px;
          height: 60px;
          position: absolute;
          top: 0;
          left: -24px;
        }
      }
    }
  }
  .row-without-avatar {
    margin-top: 40px;
    margin-left: 90px;
    animation-delay: 3s;
    overflow: hidden;
    .dialogue {
      background: #ffffff;
      width: 620px;
      box-sizing: border-box;
      padding: 18px 60px;
      padding-right: 30px;
      word-wrap: break-word;
      position: relative;
      border-radius: 0;
      border-top-right-radius: 10px;
      .angle {
        background: url("../assets/images/ques-angle.png") no-repeat;
        background-size: 100%;
        width: 24px;
        height: 60px;
        position: absolute;
        top: 0;
        left: -24px;
      }
    }
    .done {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .content {
      height: 120px;
      background: #fff;
      width: 620px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .start-btn {
      width: 300px;
      height: 180px;
      background: url('../assets/images/start-btn.png') no-repeat;
      background-size: 100%;
      margin: 0 auto;
      margin-top: -108px;
    }
  }
  .start-leave-active {
    animation: fade 2s;
  }
  .fadeInRight {
    animation-delay: 2s;
  }
}

</style>
