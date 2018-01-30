<template>
  <div class="answer">
    <div class="modify" @click="modify" v-if="modifiable"></div>
    <p class="unwrap" v-if="!wrap">{{text}}</p>
    <div v-if="wrap" v-for="row in textList">
      <p class="wrap">{{row}}</p>
    </div>
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
          default: true
        },
        wrap: {
          type: Boolean,
          default: false
        },
        textList: {
          type: Array,
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
  background: -webkit-gradient(linear, left top, right top, from(#f6e15a), to(#f4d046));
  float: right;
  max-width: 360px;
  padding: 18.5px 40px;
  margin-right: 49.2px;
  color: rgb(122, 103, 90);
  margin-top: 60px;
  position: relative;
  border-radius: 10px;
  border-top-right-radius: 0;
  .unwrap {
    line-height: 67.5px;
  }
  .wrap {
    line-height: 67.5px;
  }
  .modify {
    width: 78px;
    height: 78px;
    background: url("../assets/images/modify.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: -24px;
    left: -42px;
  }
  .angle {
    background: url("../assets/images/ans-angle.png") no-repeat;
    background-size: 100%;
    width: 24px;
    height: 60px;
    position: absolute;
    top: 0;
    right: -24px;
  }
}


</style>
