<template>
  <div class="answer">
    <div class="modify" @click="modify" v-if="modifiable"></div>
    {{text}}
    <div class="angle"></div>
  </div>
</template>

<script>
    export default {
      name: "answer",
      props: {
        text: {
          type: String,
          default: ''
        },
        modifiable: {
          type: Boolean,
          default: false
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
  background: linear-gradient(left, rgb(246, 225, 90), rgb(244, 208, 70));
  float: right;
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  padding: 0 0.67rem;
  margin-right: 0.82rem;
  color: rgb(122, 103, 90);
  margin-top: 1rem;
  animation-delay: 2s;
  position: relative;
  border-radius: 5px;
  border-top-right-radius: 0;
  .modify {
    width: 1.3rem;
    height: 1.3rem;
    background: url("../assets/images/modify.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: -0.4rem;
    left: -0.7rem;
  }
  .angle {
    background: url("../assets/images/ans-angle.png") no-repeat;
    background-size: 100%;
    width: 0.4rem;
    height: 1rem;
    position: absolute;
    top: 0;
    right: -0.4rem;
  }
}
</style>
