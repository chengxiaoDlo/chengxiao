<template>
    <div class="question">
      <div class="first-line">
        <div class="avatar"></div>
        <div class="dialogue">
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
      height: 1.8rem;
      width: 1.8rem;
      background: url("../assets/images/avatar.png") no-repeat;
      background-size: 100%;
      margin-top: 0.1rem;
    }
    .dialogue {
      background: url("../assets/images/dialogue.png") no-repeat;
      background-size: cover;
      position: relative;
      left: -0.3rem;
      font-size: 0.5rem;
      padding: 0.3rem 1rem;
      padding-right: 0.5rem;
      overflow: hidden;
      word-wrap: break-word;
      box-sizing: border-box;
      width: 9rem;

      .subtitle {
        font-size: 0.4rem;
        color: #c3c3c3;
      }
    }
  }
}
</style>
