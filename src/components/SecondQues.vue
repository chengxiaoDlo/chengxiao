<template>
    <div class="second-ques" :class="{'hidden': isModify && progress <= 2}" id="que2">
      <div v-transfer-dom>
        <x-dialog v-model="showAdd" hide-on-blur>
          <div class="card">
            <div class="title">添加家庭成员</div>
            <div class="add-options">
              <div class="option" v-for="member in addList" @click="add(member)">
                <div class="family" :class="member.class">
                  <div class="pick" v-if="member.picked"></div>
                </div>
                <p class="member">{{member.labelName}}</p>
              </div>
            </div>
            <div class="btn" @click="confirmAdd()"></div>
          </div>
        </x-dialog>
      </div>
      <question question="但愿人长久，家里有几口？" sub="我们会基于你的家庭结构和成员情况，考虑每个人的保障~" class="animated fadeInLeft">
        <div slot="options" >
          <transition name="options">
            <div v-if="showOption" id="options">
              <div class="options que2">
                <div class="option">
                  <div class="family" :class="info.sex === 'M' ? 'male' : 'female'">
                    <div class="pick"></div>
                  </div>
                  <p class="member">本人</p>
                </div>
                <div class="option" v-for="member in memberList" @click="chooseMember(member)">
                  <div class="family" :class="member.class">
                    <div class="pick" v-if="member.picked"></div>
                  </div>
                  <p class="member">{{member.labelName}}</p>
                </div>
                <div class="option" @click="addMembers">
                  <div class="family add"></div>
                  <p class="member">添加</p>
                </div>
              </div>
              <div class="confirm btn-able" @click="confirm"></div>
            </div>
          </transition>
        </div>
      </question>
      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <answer :textList="answerText" v-if="showAnswer" @modify="modify" modifiable wrap></answer>
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
              labelName: '配偶',
              label: 'spouse',
              gender: '',
              memberType: 1,
              picked: false,
              class: 'female'
            },
            {
              labelName: '儿子',
              label: 'boy',
              gender: 'M',
              memberType: 4,
              picked: false,
              class: 'son'
            },
            {
              labelName: '女儿',
              label: 'girl',
              gender: 'F',
              memberType: 4,
              picked: false,
              class: 'daughter'
            },
            {
              labelName: '爸爸',
              label: 'father',
              gender: 'M',
              memberType: 3,
              picked: false,
              class: 'old-man'
            },
            {
              labelName: '妈妈',
              label: 'mother',
              gender: 'F',
              memberType: 4,
              picked: false,
              class: 'old-woman'
            },
            {
              labelName: '宠物狗',
              label: 'dog',
              memberType: 10,
              picked: false,
              class: 'dog'
            }
          ],
          addList: [
            {
              labelName: '女儿',
              label: 'girl',
              gender: 'F',
              memberType: 4,
              picked: false,
              class: 'daughter'
            },
            {
              labelName: '儿子',
              label: 'boy',
              gender: 'M',
              memberType: 4,
              picked: false,
              class: 'son'
            },
            {
              labelName: '配偶爸爸',
              label: 'spouse-father',
              gender: 'M',
              memberType: 3,
              picked: false,
              class: 'old-man'
            },
            {
              labelName: '配偶妈妈',
              label: 'spouse-mother',
              gender: 'F',
              memberType: 3,
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
          let choosed = this.memberList.filter(item => {
            return item.picked === true
          })
          return ['本人', ...choosed.map(item => {
            return item.labelName
          })]
        },
        ...mapState([
          'progress',
          'isModify',
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
          toggleModify: 'toggleModify',
          selectMembers: 'selectMembers',
          clear: 'clear'
        }),
        chooseMember (member) {
          let pickedChild = this.memberList.filter(item => {
            return (/\w*[儿子|女儿]/.test(item.labelName)) && (item.picked === true)
          })
          if (/\w*[儿子|女儿]/.test(member.labelName)) {
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
          let boy = chooseList.filter(item => {return item.label === 'boy'})
          let girl = chooseList.filter(item => {return item.label === 'girl'})
          if (boy.length === 1 || girl.length === 1) {
            chooseList.forEach(item => {
              item.labelName = item.labelName.replace(/[大二小]/g, '')
            })
          } else if (boy.length === 2 || girl.length === 2) {
            chooseList.forEach(item1 => {
              if (item1.labelName.indexOf('二') !== -1) {
                chooseList.forEach(item2 => {
                  if (item2.labelName.indexOf('大') !== -1) {
                    item1.labelName = item1.labelName.replace(/二/g, '小')
                  } else if (item2.labelName.indexOf('小') !== -1) {
                    item1.labelName = item1.labelName.replace(/二/g, '大')
                  }
                })
              }
            })
          }
          this.selectMembers({data: chooseList})
          this.showOption = false
          this.showAnswer = true
          this.$emit('fill-height', document.getElementById('options').offsetHeight)
          if (this.progress === 2) {
            setTimeout(() => {
              this.next({data: 3})
            }, 3000)
            setTimeout(() => {
              this.$emit('scroll-to', document.getElementById('que2').offsetTop + document.getElementById('que2').offsetHeight)
            }, 3500)
          } else {
            this.clear()
            this.next({data: 2})
            setTimeout(() => {
              this.next({data: 3})
              this.toggleModify()
            }, 3000)
            setTimeout(() => {
              this.$emit('scroll-to', document.getElementById('que2').offsetTop + document.getElementById('que2').offsetHeight)
              this.toggleModify()
            }, 3500)
          }

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
        },
        confirmAdd () {
          let sons = this.memberList.filter(item1 => {
            return item1.class === 'son'
          })
          let daugthers = this.memberList.filter(item => {
            return item.class === 'daughter'
          })
          let pickedChild = this.memberList.filter(item => {
            return (/\w*[儿子|女儿]/.test(item.labelName)) && (item.picked === true)
          })
          this.addMem.forEach(item => {
            if (item.labelName === '儿子') {
              if (pickedChild.length < 3) {
                if (sons.length === 1) {
                  this.memberList.forEach(item2 => {
                    if (item2.labelName === '儿子') {
                      item2.labelName = '大儿子'
                    }
                  })
                  this.memberList.push({
                    labelName: '小儿子',
                    label: 'boy',
                    gender: 'M',
                    memberType: 4,
                    picked: true,
                    class: 'son'
                  })
                } else if (sons.length === 2) {
                  this.memberList.forEach(item2 => {
                    if (item2.labelName === '小儿子') {
                      item2.labelName = '二儿子'
                    }
                  })
                  this.memberList.push({
                    labelName: '小儿子',
                    label: 'boy',
                    gender: 'M',
                    memberType: 4,
                    picked: true,
                    class: 'son'
                  })
                }
              }
            } else if (item.labelName === '女儿') {
              if (pickedChild.length < 3) {
                if (daugthers.length === 1) {
                  this.memberList.forEach(item2 => {
                    if (item2.labelName === '女儿') {
                      item2.labelName = '大女儿'
                    }
                  })
                  this.memberList.push({
                    labelName: '小女儿',
                    label: 'girl',
                    gender: 'F',
                    memberType: 4,
                    picked: true,
                    class: 'daughter'
                  })
                } else if (daugthers.length === 2) {
                  this.memberList.forEach(item2 => {
                    if (item2.labelName === '小女儿') {
                      item2.labelName = '二女儿'
                    }
                  })
                  this.memberList.push({
                    labelName: '小女儿',
                    label: 'girl',
                    gender: 'F',
                    memberType: 4,
                    picked: true,
                    class: 'daughter'
                  })
                }
              }
            } else {
              if (this.memberList.every(item3 => {
                return item3.labelName !== item.labelName
                })) {
                this.memberList.push({
                  labelName: item.labelName,
                  picked: true,
                  class: item.class,
                  label: item.label,
                  gender: item.gender,
                  memberType: item.memberType
                })
              }
            }
          })
          this.showAdd = false
          this.addMem = []
        },
        init () {
          if (this.info.sex === 'M') {
            this.memberList.forEach(item => {
              if (item.labelName === '配偶') {
                item.gender = 'F'
                item.class = 'female'
              }
            })
          } else {
            this.memberList.forEach(item => {
              if (item.labelName === '配偶') {
                item.gender = 'M'
                item.class = 'male'
              }
            })
          }
        }
      },
      mounted () {
        // document.getElementById('que2').style.minHeight = document.documentElement.clientHeight + 'px'
        this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que2').offsetHeight)
      },
      created () {
        this.init()
      },
      watch: {
        'showAdd': {
          handler (newVal) {
            if (!newVal) {
              console.log(111)
              this.addList.forEach(item => {
                item.picked = false
                item.labelName = item.labelName.replace(/[小二]/, '')
              })
            }
          }
        },
        'info.sex': {
          handler () {
            this.init()
          }
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
@import "../styles/common";
@import "../styles/animation";
.second-ques {
  overflow: hidden;
  height: 100%;
}
.que2 {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 150px;
  .option {
    flex-basis: 33.3%;
    .family {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 6px auto;
      position: relative;
      .pick {
        width: 60px;
        height: 60px;
        background: url("../assets/images/pick.png") no-repeat;
        background-size: 100%;
        position: absolute;
        bottom: 0;
        right: -24px;
      }
    }
    .add {
      background: url("../assets/images/add.png") no-repeat;
      background-size: 100%;
    }
    .confirm {
      background: url("../assets/images/confirm-btn.png") no-repeat;
      background-size: 100%;
      width: 300px;
      height: 180px;
      margin-top: -120px;
      margin-left: 4.300px;
    }
    .member {
      text-align: center;
      font-size: 30px;
    }
  }
}
.confirm {
  background: url("../assets/images/confirm-btn.png") no-repeat;
  background-size: 100%;
  width: 300px;
  height: 180px;
  margin-top: -120px;
  margin-left: 270px;
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
  width: 556px;
  margin: 0 auto;
  border-radius: 10px;
  padding-top: 73.8px;
  padding-bottom: 180px;
  .title {
    font-size: 30px;
    width: 100%;
    text-align: center;
  }
  .add-options {
    display: flex;
    flex-wrap: wrap;
    margin-top: 60px;
    .option {
      flex-basis: 50%;
      margin-bottom: 30px;
      font-size: 30px;
      .family {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 6px auto;
        position: relative;
        .pick {
          width: 60px;
          height: 60px;
          background: url("../assets/images/pick.png") no-repeat;
          background-size: 100%;
          position: absolute;
          bottom: 0;
          right: -24px;
        }
      }
      .member {
        text-align: center;
        font-size: 30px;
      }
    }
  }
  .btn {
    width: 300px;
    height: 164px;
    background: url("../assets/images/confirm-btn.png") no-repeat;
    background-size: 100%;
    margin-bottom: -225px;
    margin-left: 138px;
  }
}

</style>
