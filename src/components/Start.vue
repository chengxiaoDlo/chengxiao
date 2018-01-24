<template>
    <div class="start">
      <div class="row-with-avatar animated fadeInLeft">
        <div class="first-line  ">
          <div class="avatar"></div>
          <div class="dialogue">
            <div class="angle"></div>
            <p>
              Hi，{微信昵称} 我是薄荷博士，您的智能保险顾问。
            </p>
          </div>
        </div>
      </div>
      <div class="row-without-avatar animated fadeInLeft">
        <div class="dialogue" :class="{'done': goToStart}">
          <div class="angle"></div>
          <p>我会基于您的动态风险，为您规划全家庭的保险方案。让我们开始吧~</p>
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
          showStartBtn: true
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
  margin-left: 0.27rem;
  .row-with-avatar {
    position: relative;
    animation-duration: 2s;

    .first-line {
      display: flex;

      .avatar {
        height: 1.5rem;
        width: 1.5rem;
        background: url("../assets/images/avatar.png") no-repeat;
        background-size: 100%;
        margin-top: 0.1rem;
        margin-right: 0.1rem;
      }

      .dialogue {
        width: 10.34rem;
        box-sizing: border-box;
        position: relative;
        background: #ffffff;
        padding: 0.3rem 1rem;
        padding-right: 0.5rem;
        word-wrap: break-word;
        .angle {
          background: url("../assets/images/ques-angle.png") no-repeat;
          background-size: 100%;
          width: 0.4rem;
          height: 1rem;
          position: absolute;
          top: 0;
          left: -0.4rem;
        }
      }
    }
  }
  .row-without-avatar {
    margin-top: 0.67rem;
    margin-left: 1.5rem;
    animation-delay: 2s;
    overflow: hidden;
    .dialogue {
      background: #ffffff;
      width: 10.34rem;
      box-sizing: border-box;
      padding: 0.3rem 1rem;
      padding-right: 0.5rem;
      word-wrap: break-word;
      position: relative;
      border-radius: 0;
      border-top-right-radius: 5px;
      .angle {
        background: url("../assets/images/ques-angle.png") no-repeat;
        background-size: 100%;
        width: 0.4rem;
        height: 1rem;
        position: absolute;
        top: 0;
        left: -0.4rem;
      }
    }
    .done {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .content {
      height: 2rem;
      background: #fff;
      width: 10.34rem;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .start-btn {
      width: 5rem;
      height: 3rem;
      background: url('../assets/images/start-btn.png') no-repeat;
      background-size: 100%;
      margin: 0 auto;
      margin-top: -1.8rem;
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
