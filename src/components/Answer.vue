<template>
  <div class="answer">
    <div class="modify" @click="modify"></div>
    {{text}}
  </div>
</template>

<script>
    export default {
      name: "answer",
      props: {
        text: {
          type: String,
          default: ''
        }
      },
      methods: {
        modify () {
         this.$emit('modify')
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.answer {
  background: url("../assets/images/answer.png") no-repeat;
  background-size: 100%;
  float: right;
  font-size: 0.5rem;
  line-height: 1.2rem;
  padding-right: 1.2rem;
  padding-left: 0.4rem;
  margin-right: 0.4rem;
  color: rgb(122, 103, 90);
  margin-top: 1rem;
  animation-delay: 2s;
  position: relative;
  .modify {
    width: 1.3rem;
    height: 1.3rem;
    background: url("../assets/images/modify.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: -0.4rem;
    left: -0.7rem;
  }
}
</style>
