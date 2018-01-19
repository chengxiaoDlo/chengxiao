<template>
    <div>
      <question question="江上往来人，敢问是何人？" class="animated fadeInLeft">
          <div slot="options" >
            <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <div v-if="!done" class="options que1">
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
          </div>
      </question>
      <transition name="start" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <answer :text="sex" v-if="done" @modify="modify"></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'
    export default {
      name: 'firstQues',
      data () {
        return {
          done: false,
          sex: ''
        }
      },
      components: {
        Question,
        Answer
      },
      methods: {
        selectSex (sex) {
          this.sex = sex
          this.done = true
        },
        modify () {
          console.log(333)
          this.done = false
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  .que1 {
    display: flex;
    justify-content: center;
    width: 10.34rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .sex {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin: 0 0.6rem;
    }
    .male {
      background: url("../assets/images/dad.png") no-repeat;
      background-size: 100%;
    }
    .female {
      background: url("../assets/images/mom.png") no-repeat;
      background-size: 100%;
    }
    .sex-name {
      text-align: center;
      font-size: 0.5rem;
    }
  }
  .fadeIn {
    animation-delay: 2s;
  }

</style>
