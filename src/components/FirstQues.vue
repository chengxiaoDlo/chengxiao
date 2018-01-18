<template>
    <div>
      <question question="江上往来人，敢问是何人？" class="animated fadeInLeft">
        <transition name="slideUp">
          <div slot="options" class="options que1" v-if="!done">
            <div @click="selectSex('壮士')">
              <div class="sex male" ></div>
              <p class="sex-name">壮士</p>
            </div>
            <div @click="selectSex('女子')">
              <div class="sex female" ></div>
              <p class="sex-name">女子</p>
            </div>
          </div>
        </transition>
      </question>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import { mapState, mapMutations } from 'vuex'
    export default {
      name: 'firstQues',
      data () {
        return {
          done: false
        }
      },
      components: {
        Question
      },
      methods: {
        selectSex () {
          this.done = true
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  .que1 {
    justify-content: center;
    width: 8.57rem;
    margin-left: 1.92rem;
    .sex {
      width: 2rem;
      height: 2rem;
      background: blueviolet;
      border-radius: 50%;
      margin: 0 0.6rem;
    }
    .sex-name {
      text-align: center;
      font-size: 0.5rem;
    }
  }
</style>
