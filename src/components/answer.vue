<template>
  <transition name="start" enter-active-class="animated fadeInRight">
    <div class="answer" v-if="next">
      {{text}}
    </div>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

    export default {
      name: "answer",
      props: {
        text: {
          type: String,
          default: ''
        }
      },
      computed: mapState([
        'next'
      ]),
    }
</script>

<style type="text/scss" lang="scss" scoped>
.answer {
  background: url("../assets/images/answer.png") no-repeat;
  background-size: 100% 100%;
  float: right;
  font-size: 0.5rem;
  line-height: 1.6rem;
  padding-right: 0.8rem;
  padding-left: 0.4rem;
  margin-right: 0.4rem;
  color: rgb(122, 103, 90);
  margin-top: 1rem;
  animation-delay: 2s;
}
</style>
