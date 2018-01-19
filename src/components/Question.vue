<template>
    <div class="question">
      <div class="first-line">
        <div class="avatar"></div>
        <div class="dialogue">
          <div class="angle"></div>
          <p class="title">{{question}}</p>
          <p class="subtitle">{{sub}}</p>
        </div>
      </div>
      <slot name="options"></slot>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
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
      computed: mapState([
        'next'
      ]),
      props: {
        question: {
          type: String,
          default: ''
        },
        sub: {
          type: String,
          default: ''
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
  margin-top: 1rem;
  margin-left: 0.27rem;
  .first-line {
    display: flex;
    .avatar {
      height: 1.5rem;
      width: 1.5rem;
      background: url("../assets/images/avatar.png") no-repeat;
      background-size: 100%;
      margin-top: 0.1rem;
    }
    .dialogue {
      width: 10.34rem;
      box-sizing: border-box;
      position: relative;
      background: #ffffff;
      padding: 0.3rem 1rem;
      padding-right: 0.5rem;
      word-wrap: break-word;
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
      .subtitle {
        font-size: 0.47rem;
        color: #c3c3c3;
      }
    }
    .done {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
