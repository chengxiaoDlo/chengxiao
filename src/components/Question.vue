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
      props: {
        question: {
          type: String,
          default: ''
        },
        sub: {
          type: String,
          default: ''
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.question {
  margin-top: 60px;
  margin-left: 16px;
  .first-line {
    display: flex;
    .avatar {
      height: 90px;
      width: 90px;
      background: url("../assets/images/avatar.png") no-repeat;
      background-size: 100%;
      margin-top: 0.60px;
    }
    .dialogue {
      width: 620px;
      box-sizing: border-box;
      position: relative;
      background: #ffffff;
      padding: 18px 60px;
      padding-right: 30px;
      word-wrap: break-word;
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
      .subtitle {
        font-size: 28px;
        color: #c3c3c3;
      }
    }
    .done {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
</style>
