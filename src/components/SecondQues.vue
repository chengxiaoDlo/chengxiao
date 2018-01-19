<template>
    <div>
      <question question="但愿人长久，家里有几口？" sub="我们会基于您的家庭结构和成员情况，考虑每个人的保障~">
        <div slot="options" >
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-if="!done">
              <div class="options que2">
                <div class="option" v-for="member in memberList" @click="chooseMember(member)">
                  <div class="family" :class="member.class">
                    <div class="pick" v-if="member.picked"></div>
                  </div>
                  <p class="member">{{member.text}}</p>
                </div>
                <div class="option">
                  <div class="family"></div>
                  <p class="member">宠物狗</p>
                </div>
                <div class="option">
                  <div class="family"></div>
                  <p class="member">添加</p>
                </div>
              </div>
              <div class="confirm" @click="confirm"></div>
            </div>
          </transition>
        </div>
      </question>
      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <answer :text="answerText" v-if="done" @modify="modify" modifiable></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Answer from '@/components/Answer'
    export default {
      name: "second-ques",
      data () {
        return {
          memberList: [
            {
              text: '本人',
              picked: true,
              class: 'me'
            },
            {
              text: '配偶',
              picked: false,
              class: 'wife'
            },
            {
              text: '儿子',
              picked: false,
              class: 'son'
            },
            {
              text: '女儿',
              picked: false,
              class: 'daughter'
            },
            {
              text: '爸爸',
              picked: false,
              class: 'dad'
            },
            {
              text: '妈妈',
              picked: false,
              class: 'mom'
            }
          ],
          done: false,
          members: ['本人']
        }
      },
      computed: {
        answerText () {
          return this.members.join('、')
        }
      },
      components: {
        Question,
        Answer
      },
      methods: {
        chooseMember (member) {
          if (this.members.indexOf(member.text) === -1) {
            this.members.push(member.text)
          } else {
            this.members.splice(this.members.indexOf(member.text), 1)
          }
          member.picked = !member.picked
        },
        confirm () {
          this.done = true
        },
        modify () {
          this.done = false
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
@import "../styles/common";
.que2 {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 2.5rem;
  .option {
    flex-basis: 33.3%;
    .family {
      width: 2rem;
      height: 2rem;
      background: blueviolet;
      border-radius: 50%;
      margin: 0.1rem auto;
      position: relative;
      .pick {
        width: 1rem;
        height: 1rem;
        background: url("../assets/images/pick.png") no-repeat;
        background-size: 100%;
        position: absolute;
        bottom: 0;
        right: -0.4rem;
      }
    }
    .me {
      background: url("../assets/images/dad.png") no-repeat;
      background-size: 100%;
    }
    .wife {
      background: url("../assets/images/mom.png") no-repeat;
      background-size: 100%;
    }
    .son {
      background: url("../assets/images/son.png") no-repeat;
      background-size: 100%;
    }
    .daughter {
      background: url("../assets/images/daughter.png") no-repeat;
      background-size: 100%;
    }
    .mom {
      background: url("../assets/images/grandma.png") no-repeat;
      background-size: 100%;
    }
    .dad {
      background: url("../assets/images/grandpa.png") no-repeat;
      background-size: 100%;
    }
    .member {
      text-align: center;
      font-size: 0.5rem;
    }
  }
}
.confirm {
  background: url("../assets/images/confirm-btn.png") no-repeat;
  background-size: 100%;
  width: 5rem;
  height: 3rem;
  margin-top: -2rem;
  margin-left: 4.5rem;
}
</style>
