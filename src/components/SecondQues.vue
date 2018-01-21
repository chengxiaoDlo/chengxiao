<template>
    <div style="height: 100%;" class="second-ques">
      <div v-transfer-dom>
        <x-dialog v-model="showAdd" hide-on-blur>
          <div class="card">
            <div class="title">添加家庭成员</div>
            <div class="add-options">
              <div class="option" v-for="member in addList" @click="add(member)">
                <div class="family" :class="member.class">
                  <div class="pick" v-if="member.picked"></div>
                </div>
                <p class="member">{{member.text}}</p>
              </div>
            </div>
            <div class="btn" @click="confirmAdd()"></div>
          </div>
        </x-dialog>
      </div>
      <question question="但愿人长久，家里有几口？" sub="我们会基于您的家庭结构和成员情况，考虑每个人的保障~" class="animated fadeInLeft">
        <div slot="options" >
          <transition name="options">
            <div v-if="showOption">
              <div class="options que2">
                <div class="option">
                  <div class="family" :class="info.sex === '壮士' ? 'male' : 'female'">
                    <div class="pick"></div>
                  </div>
                  <p class="member">本人</p>
                </div>
                <div class="option" v-for="member in memberList" @click="chooseMember(member)">
                  <div class="family" :class="member.class">
                    <div class="pick" v-if="member.picked"></div>
                  </div>
                  <p class="member">{{member.text}}</p>
                </div>
                <div class="option" @click="addMembers">
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
        <answer :text="answerText" v-if="showAnswer" @modify="modify" modifiable></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Answer from '@/components/Answer'
  import { XDialog, TransferDomDirective as TransferDom} from 'vux'
  import { mapState, mapMutations } from 'vuex'
    export default {
      name: "second-ques",
      directives: {
        TransferDom
      },
      data () {
        return {
          memberList: [
            {
              text: '配偶',
              picked: false,
              class: 'female'
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
              class: 'old-man'
            },
            {
              text: '妈妈',
              picked: false,
              class: 'old-woman'
            },
            {
              text: '宠物狗',
              picked: false,
              class: 'dog'
            }
          ],
          addList: [
            {
              text: '女儿',
              picked: false,
              class: 'daughter'
            },
            {
              text: '儿子',
              picked: false,
              class: 'son'
            },
            {
              text: '配偶爸爸',
              picked: false,
              class: 'old-man'
            },
            {
              text: '配偶妈妈',
              picked: false,
              class: 'old-woman'
            }
          ],
          showOption: true,
          showAnswer: false,
          showAdd: false,
          members: ['本人'],
          addMem: []
        }
      },
      computed: {
        answerText () {
          let text = '本人'
          let choosed = this.memberList.filter(item => {
            return item.picked === true
          })
          choosed.forEach(item => {
              text += '、' + item.text
          })
          return text
        },
        ...mapState([
          'index',
          'info'
        ])
      },
      components: {
        Question,
        Answer,
        XDialog
      },
      methods: {
        ...mapMutations({
          next: 'next',
          setIndex: 'setIndex',
          selectMembers: 'selectMembers'
        }),
        chooseMember (member) {
          let pickedChild = this.memberList.filter(item => {
            return (/\w*[儿子|女儿]/.test(item.text)) && (item.picked === true)
          })
          if (/\w*[儿子|女儿]/.test(member.text)) {
            if (!member.picked) {
              if (pickedChild.length < 3) {
                member.picked = true
              }
            } else {
              member.picked = false
            }
          } else {
            member.picked = !member.picked
          }
        },
        confirm () {
          let chooseList = this.memberList.filter(item => {
            return item.picked === true
          })
          this.selectMembers({data: chooseList})
          this.showOption = false
          this.showAnswer = true
          setTimeout(() => {
            this.next()
          }, 3000)
          setTimeout(() => {
            this.setIndex({data: this.index + 1})
          }, 4000)
        },
        modify () {
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        },
        addMembers () {
          this.showAdd = true
        },
        add (member) {
          if (this.addMem.indexOf(member) === -1) {
            this.addMem.push(member)
            member.picked = true
          } else {
            this.addMem.splice(this.addMem.indexOf(member), 1)
            member.picked = false
          }
          console.log(444, this.addMem)
        },
        confirmAdd () {
          let sons = this.memberList.filter(item1 => {
            return item1.class === 'son'
          })
          let daugthers = this.memberList.filter(item => {
            return item.class === 'daughter'
          })
          let pickedChild = this.memberList.filter(item => {
            return (/\w*[儿子|女儿]/.test(item.text)) && (item.picked === true)
          })
          this.addMem.forEach(item => {
            if (item.text === '儿子') {
              if (pickedChild.length < 3) {
                if (sons.length === 1) {
                  this.memberList.forEach(item2 => {
                    if (item2.text === '儿子') {
                      item2.text = '大儿子'
                    }
                  })
                  this.memberList.push({
                    text: '小儿子',
                    picked: true,
                    class: 'son'
                  })
                } else if (sons.length === 2) {
                  this.memberList.forEach(item2 => {
                    if (item2.text === '小儿子') {
                      item2.text = '二儿子'
                    }
                  })
                  this.memberList.push({
                    text: '小儿子',
                    picked: true,
                    class: 'son'
                  })
                }
              }
            } else if (item.text === '女儿') {
              if (pickedChild.length < 3) {
                if (daugthers.length === 1) {
                  this.memberList.forEach(item2 => {
                    if (item2.text === '女儿') {
                      item2.text = '大女儿'
                    }
                  })
                  this.memberList.push({
                    text: '小女儿',
                    picked: true,
                    class: 'daughter'
                  })
                } else if (daugthers.length === 2) {
                  this.memberList.forEach(item2 => {
                    if (item2.text === '小女儿') {
                      item2.text = '二女儿'
                    }
                  })
                  this.memberList.push({
                    text: '小女儿',
                    picked: true,
                    class: 'daughter'
                  })
                }
              }
            } else {
              if (this.memberList.every(item3 => {
                return item3.text !== item.text
                })) {
                this.memberList.push({
                  text: item.text,
                  picked: true,
                  class: item.class
                })
              }
            }
          })
          this.showAdd = false
          this.addMem = []
        }
      },
      created () {
        console.log(511, this.info)
        if (this.info.sex === '壮士') {
          this.memberList.forEach(item => {
            if (item.text === '配偶') {
              item.class = 'female'
            }
          })
        } else {
          this.memberList.forEach(item => {
            if (item.text === '配偶') {
              item.class = 'male'
            }
          })
        }
      },
      watch: {
        'showAdd': {
          handler (newVal) {
            if (!newVal) {
              console.log(111)
              this.addList.forEach(item => {
                item.picked = false
                item.text = item.text.replace(/[小二]/, '')
              })
            }
          }
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
@import "../styles/common";
@import "../styles/animation";
.que2 {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 2.5rem;
  .option {
    flex-basis: 33.3%;
    .family {
      width: 2rem;
      height: 2rem;
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
    .confirm {
      background: url("../assets/images/confirm-btn.png") no-repeat;
      background-size: 100%;
      width: 5rem;
      height: 3rem;
      margin-top: -2rem;
      margin-left: 4.5rem;
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
  .options-enter-active {
    -webkit-animation: fade 2s reverse;
    -o-animation: fade 2s reverse;
    animation: fade 2s reverse;
  }
  .options-leave-active {
    -webkit-animation: fade 2s;
    -o-animation: fade 2s;
    animation: fade 2s;
  }
  .shadow {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .weui-dialog {
    overflow: inherit !important;
  }
.card {
  background: #ffffff;
  width: 9.27rem;
  margin: 0 auto;
  border-radius: 5px;
  padding-top: 1.23rem;
  padding-bottom: 3rem;
  .title {
    font-size: 0.5rem;
    width: 100%;
    text-align: center;
  }
  .add-options {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    .option {
      flex-basis: 50%;
      margin-bottom: 0.5rem;
      font-size: 0.5rem;
      .family {
        width: 2rem;
        height: 2rem;
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
      .member {
        text-align: center;
        font-size: 0.5rem;
      }
    }
  }
  .btn {
    width: 5rem;
    height: 2.73rem;
    background: url("../assets/images/confirm-btn.png") no-repeat;
    background-size: 100%;
    margin-bottom: -3.8rem;
    margin-left: 2.3rem;
  }
}

</style>
