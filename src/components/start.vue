<template>
    <div class="start">
      <div class="row-with-avatar">
        <div class="first-line">
          <div class="avatar"></div>
          <div class="dialogue">Hi，{微信昵称} 我是薄荷博士，您的智能保险顾问。</div>
        </div>
      </div>
      <div class="row-without-avatar">
        <div class="dialogue">我会基于您的动态风险，为您规划全家庭的保险方案。让我们开始吧~</div>
        <div class="content"></div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'start',
      data () {
        return {

        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
@import "../styles/animation";
.start {
  margin-top: 1rem;
  margin-left: 0.27rem;
  .row-with-avatar {
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
        box-sizing: border-box;
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
  }
  .row-without-avatar {
    margin-top: 0.67rem;
    margin-left: 1.5rem;
    .dialogue {
      background: url("../assets/images/dialogue.png") no-repeat;
      width: 10.34rem;
      box-sizing: border-box;
      background-size: 100%;
      font-size: 0.5rem;
      padding: 0.3rem 1rem;
      padding-right: 0.5rem;
      word-wrap: break-word;
      position: relative;
    }
  }
}

</style>
