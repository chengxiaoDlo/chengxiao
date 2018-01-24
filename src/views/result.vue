<template>
    <div class="result">
      <header></header>
      <scroller>
        <div class="part">
          <div class="family">
            <div class="title">
              <span class="name">愚公移山</span>
              <span class="text">的家庭成员</span>
            </div>
            <div class="members"></div>
          </div>
        </div>
      </scroller>


    </div>
</template>

<script>
  import { mapState } from 'vuex'

    export default {
      name: 'result',
      data () {
        return {
          memberList: [
            {
              text: '本人'
            },
            {
              text: '配偶'
            },
            {
              text: '儿子'
            },
            {
              text: '女儿'
            }
          ]
        }
      },
      computed: mapState([
        'info'
      ]),
      created () {
        this.memberList = [this.info, ...this.info.family]
        console.log(this.memberList)
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.result {
  background: #ffffff;
  header {
    width: 100%;
    height: 13.3rem;
    background: bisque;
  }
  .part {
    .family {
      width: 10.5rem;
      height: 2rem;
      background: aquamarine;
      margin: 0 auto;
      .title {
        width: 6rem;
        background: #ffffff;
        border-radius: 30px;
        margin: 0 auto;
        position: relative;
        top: -0.3rem;
        text-align: center;
        .name {
          font-size: 0.67rem;
          font-weight: 900;
        }
        .text {
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>
