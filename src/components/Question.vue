<template>
    <div class="question">
      <div class="row-with-avatar">
        <div class="first-line">
           <div class="avatar"></div>
           <div class="dialogue">Hi，{微信昵称} 我是薄荷博士，您的智能保险顾问。</div>
        </div>
      </div>
      <div class="row-without-avatar" v-if="hi">
        <div class="dialogue">我会基于您的动态风险，为您规划全家庭的保险方案。让我们开始吧~</div>
        <transition name="slide">
          <div class="content" :class="{'slide': slide}" v-if="!slide">
            <div class="btn" :class="{'slide': slide}" @click="start"></div>
          </div>
        </transition>
      </div>
        <div class="answer" v-if="showAnswer" :class="{'fadeIn-right': showAnswer}">开始</div>
      <div class="row-with-avatar" v-if="firstQues">
        <div class="first-line">
          <div class="avatar"></div>
          <div class="dialogue">江上往来人，敢问是何人？</div>
        </div>

        <div class="content">
          <div class="sex"></div>
          <div class="sex"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'question',
      data () {
        return {
          hi: false,
          firstQues: false,
          secondQues: false,
          slide: false,
          showAnswer: false
        }
      },
      methods: {
        start () {
          this.slide = true
          setTimeout(() => {
            this.showAnswer = true
          }, 3000)
          setTimeout(() => {
            this.firstQues = true
          }, 4000)
        }
      },
      created () {
        setTimeout(() => {
          this.hi = true
        }, 2000)
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.question {
  margin: 0 0.67rem 0 0.27rem;
  .row-with-avatar {
    margin-top: 1rem;
    position: relative;
    -webkit-animation: fadeIn 2s;
    -o-animation: fadeIn 2s;
    animation: fadeIn 2s;
    .first-line {
      display: flex;
      .avatar {
        height: 1.8rem;
        width: 1.8rem;
        background: url("../assets/images/avatar.png") no-repeat;
        background-size: 100%;
        margin-top: 0.1rem;
      }
      .dialogue {
        width: 10.34rem;
        background: url("../assets/images/dialogue.png") no-repeat;
        background-size: cover;
        position: relative;
        left: -0.3rem;
        font-size: 0.5rem;
        padding: 0.3rem 1rem;
        padding-right: 0.5rem;
        overflow: hidden;
        word-wrap: break-word;
      }
    }
    .content {
      background: #fff;
      width: 9.85rem;
      position: absolute;
      right: 0;
      .sex {
        width: 2rem;
        height: 2rem;
        background: #000000;
        border-radius: 50%;
      }
    }
  }
  .row-without-avatar {
    margin-top: 0.67rem;
    margin-left: 1rem;
    width: 10.34rem;
    position: relative;
    -webkit-animation: fadeIn 2s;
    -o-animation: fadeIn 2s;
    animation: fadeIn 2s;
    .dialogue {






      background: url("../assets/images/dialogue.png") no-repeat;
      background-size: 100%;
      font-size: 0.5rem;
      padding: 0.3rem 1rem;
      padding-right: 0.5rem;
      word-wrap: break-word;
      position: relative;
    }
    .content {
      height: 2rem;
      background: #fff;
      width: 9.85rem;
      position: absolute;
      right: 0;
    }
    .btn {
      width: 5rem;
      height: 2.74rem;
      background: url("../assets/images/start-btn.png") no-repeat;
      background-size: 100%;
      border: none;
      position: absolute;
      bottom: -0.9rem;
      left: 2.6rem;
    }
    .slide-enter-active, .slide-leave-active {
      transition: opacity 2s;
    }
    .slide-enter, .slide-leave-to {
      opacity: 0;
    }
  }
  .answer {
    width: 2.89rem;
    height: 1.6rem;
    box-sizing: border-box;
    padding-left: 0.6rem;
    background: url("../assets/images/answer.png") no-repeat;
    background-size: 100%;
    margin-top: 1rem;
    font-size: 0.54rem;
    color: rgb(122, 103, 90);
    line-height: 1.6rem;
    position: relative;
    right: -8.5rem;
  }
  .fadeIn-right {
    -webkit-animation: fadeInRight 2s;
    -o-animation: fadeInRight 2s;
    animation: fadeInRight 2s;
  }
}
  @keyframes fadeIn {
    from { left: -100%; }
    to { left: 0; }
  }
 @-webkit-keyframes fadeIn {
   from { left: -100%; }
   to { left: 0; }
 }
  @keyframes fadeInRight {
    from { right: -100% }
    to {right: -8.5rem}
  }
</style>
