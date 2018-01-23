<template>
    <div style="overflow: hidden">
      <question question="劝君更尽一杯酒，全家社保上全否？" sub="这会关系到家人医疗险的配置" class="animated fadeInLeft">
        <div slot="options">
          <transition name="options">
            <div v-if="showOption">
              <div class="options que5" >
                <div v-for="member in memberList">
                  <div class="age" >
                    <div>
                      <div class="member" :class="member.class"></div>
                      <p class="member-labelName">{{member.labelName}}</p>
                    </div>
                    <div class="member-security" :class="{'qicked': member.socialSecurity === true}" @click="hasSecurity('y', member)">有社保</div>
                    <div class="member-security" :class="{'qicked': member.socialSecurity === false}" @click="hasSecurity('n', member)">无社保</div>
                  </div>
                </div>
              </div>
              <div class="confirm btn-able" @click="confirm"></div>
            </div>
          </transition>
        </div>
      </question>
      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <answer v-if="showAnswer" :textList="answerlabelName" @modify="modify" wrap></answer>
      </transition>
    </div>
</template>

<script>
  import Question from '@/components/Question'
  import Answer from '@/components/Answer'
  import { mapState, mapMutations } from 'vuex'

    export default {
      name: "fifth-ques",
      data () {
        return {
          showOption: true,
          showAnswer: false,
          memberList: []
        }
      },
      components: {
        Question,
        Answer
      },
      computed: {
        answerlabelName () {
          return this.memberList.map(item => {
            return item.socialSecurity ? item.labelName + ': 有社保' : item.labelName + ': 无社保'
          })
        },
        ...mapState([
          'index',
          'progress',
          'info'
        ])
      },
      methods: {
        ...mapMutations({
          next: 'next',
          setIndex: 'setIndex',
          addSocial: 'addSocial'
        }),
        confirm () {
          this.showOption = false
          this.showAnswer = true
          this.addSocial({data: this.memberList})
          setTimeout(() => {
            this.next({data: this.progress + 1})
          }, 3000)
          setTimeout(() => {
            this.setIndex({data: this.index + 1})
          }, 3500)
        },
        hasSecurity (has, member) {
          if (has === 'y') {
            member.socialSecurity = true
          } else if (has === 'n') {
            member.socialSecurity = false
          }
        },
        modify () {
          this.showAnswer = false
          setTimeout(() => {
            this.showOption = true
          }, 1000)
        },
        getList (origin) {
          if (origin instanceof Array) {
            let members = origin.map(item => {
              return item.labelName
            })
            if ((members.indexOf('爸爸') !== -1 || members.indexOf('妈妈') !== -1 || members.indexOf('配偶妈妈') !== -1 || members.indexOf('配偶爸爸') !== -1) &&
              (members.indexOf('儿子') !== -1 || members.indexOf('女儿') !== -1)) {
              let arr = origin.filter(item => {
                return (item.labelName !== '爸爸' && item.labelName !== '妈妈' && item.labelName !== '配偶爸爸' && item.labelName !== '配偶妈妈')
              })
              return arr.map(item => {
                return {
                  class: item.class,
                  labelName: item.labelName,
                  socialSecurity: true
                }
              })
            } else {
              return origin.map(item => {
                return {
                  class: item.class,
                  labelName: item.labelName,
                  socialSecurity: true
                }
              })
            }
          }
        }
      },
      created () {
        let family = this.info.family.filter(item => {
          return item.labelName.indexOf('狗') === -1
        })
        this.memberList = [{
          class: this.info.sex === 'M' ? 'male' : 'female',
          labelName: '本人',
          socialSecurity: true
        }, ...this.getList(family)]
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  @import "../styles/animation";
  .que5 {
    padding-top: 0.5rem;
    padding-bottom: 2.5rem;
    .age {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      margin-bottom: 0.6rem;
      .member {
        width: 1.53rem;
        height: 1.53rem;
        margin-right: 0.8rem;
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
      .member-security {
        width: 2.5rem;
        height: 1rem;
        border-radius: 30px;
        border:solid 1px;
        font-size: 0.5rem;
        text-align: center;
        line-height: 1rem;
        margin-top: 0.15rem;
        margin-right: 0.3rem;
        color: rgb(126, 126, 126);
      }
      .qicked {
        border-color: rgb(252, 216, 75);
        color: rgb(252, 216, 75);
      }
      .member-labelName {
        font-size: 0.5rem;
        padding-left: 0.25rem;
      }
    }
  }

</style>
