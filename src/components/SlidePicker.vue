<template>
    <div>
      <div class="picker">
        <header>
          <span @click="quit">取消</span>
          <span @click="confirm">确定</span>
        </header>
        <picker :data="list" @on-change="change" :columns="col" v-model="value" ref="myPicker"></picker>
      </div>
    </div>
</template>

<script>
  import { Picker } from 'vux'
    export default {
      name: "slide-picker",
      components: {
        Picker
      },
      data () {
        return {
          value: [this.default]
        }
      },
      props: {
        list: {
          type: Array,
          default: []
        },
        col: {
          type: Number,
          default: 1
        },
        default: {}
      },
      methods: {
        change (val) {},
        quit () {
          this.$emit('quit')
        },
        confirm () {
          console.log(1111, this.$refs.myPicker.getNameValues(this.value))
          this.$emit('confirm', {
            label: this.$refs.myPicker.getNameValues(this.value),
            value: this.value
          })
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  .picker {
    width: 100%;
    height: 480px;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    overflow: hidden;
    z-index: 100;
    header {
      height: 90px;
      line-height: 90px;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      background: linear-gradient(left, rgb(250, 234, 124), rgb(244, 208, 70));
      background: -webkit-gradient(linear, left top, right top, from(#f6e15a), to(#f4d046));
      span {
        font-size: 30px;
        color: rgb(122, 103, 90)
      }
    }
  }
</style>
