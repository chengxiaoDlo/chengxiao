<template>
  <div id="que3" style="overflow: hidden" :class="{'hidden': isModify && progress <= 3}">
    <question question="对酒当歌，芳龄几何？" sub="年龄会关乎到保险方案和价格的准确性哦~" class="question3">
      <div slot="options">
        <div v-if="showOption" id="options">
          <div class="options que3" >
            <div v-for="member in memberList">
              <div class="age" >
                <div class="avatar">
                  <div class="member" :class="member.class"></div>
                  <p class="member-text">{{member.labelName}}</p>
                </div>
                <div class="member-age" :class="{'picked': member.focus}" @click="selectAge(member)">{{member.value}}</div>
                <div class="unit">岁</div>
              </div>
            </div>
          </div>
          <div class="confirm" :class="btnAbled ? 'btn-able' : 'btn-disable' " @click="confirm"></div>
        </div>
      </div>
    </question>
    <transition name="answer" @after-enter="toNext">
      <answer v-if="showAnswer" :textList="answerText" @modify="modify" wrap></answer>
    </transition>
  </div>
</template>

<script>
import Question from '@/components/Question'
import SlidePicker from '@/components/SlidePicker'
import Answer from '@/components/Answer'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: "third-ques",
  components: {
    Question,
    SlidePicker,
    Answer
  },
  data () {
    return {
      chooseAge: false,
      showOption: true,
      showAnswer: false,
      who: '',
      memberList: [],
      defaultAge: '30',
      ageList: [],
      chooseList: [],
      age: ['']
    }
  },
  computed: {
    answerText () {
     return this.memberList.map(item => {
       return item.labelName + ': ' + item.value + '岁'
     })
    },
    btnAbled () {
      return this.memberList.every(item => {
        return item.value !== '选择年龄'
      })
    },
    ...mapGetters({
      youngList: 'youngList',
      childList: 'childList',
      oldList: 'oldList'
    }),
    ...mapState([
      'isModify',
      'progress',
      'info',
      'selectedAge',
      'showAgePicker',
      'chooseList'
    ])
  },
  methods: {
    ...mapMutations({
      next: 'next',
      addAge: 'addAge',
      toggleAgePicker: 'toggleAgePicker',
      setChooseList: 'setChooseList',
      setDefaultAge: 'setDefaultAge',
      toggleModify: 'toggleModify'
    }),
    confirm () {
      if (this.btnAbled) {
        this.showOption = false
        this.showAnswer = true
        this.addAge({data: this.memberList})
        this.$emit('fill-height', document.getElementById('options').offsetHeight)
      }
    },
    toNext () {
      if (this.progress === 3) {
        setTimeout(() => {
          this.next({data: 4})
          setTimeout(() => {
            this.$emit('scroll-to', document.getElementById('que3').offsetTop + document.getElementById('que3').offsetHeight)
          }, 500)
        }, 500)
      } else {
        this.next({data: 3})
        setTimeout(() => {
          this.next({data: 4})
          this.toggleModify()
          setTimeout(() => {
            this.toggleModify()
            this.$emit('scroll-to', document.getElementById('que3').offsetTop + document.getElementById('que3').offsetHeight)
          }, 500)
        }, 500)
      }
    },
    selectAge (member) {
      switch (member.labelName) {
        case '本人': case '配偶':
          this.setChooseList({data: this.youngList})
          this.setDefaultAge({data: ['30']})
          console.log(90909, this.chooseList)
          break
        case '儿子': case '女儿': case '大儿子': case '大女儿':
          this.setChooseList({data: this.childList})
          this.setDefaultAge({data: ['5']})
          break
        case '二女儿': case '二儿子':
          this.memberList.forEach(item => {
            if (item.labelName === '大女儿' || item.labelName === '大儿子') {
              let list = this.childList.slice(0, parseInt(item.value) + 1)
              this.setChooseList({data: list})
            }
          })
          break
        case '小女儿': case '小儿子':
          let labelList = this.memberList.map(item => {
            return item.labelName
          })
          console.log('listr', labelList)
          if (labelList.indexOf('二儿子') !== -1 || labelList.indexOf('二女儿') !== -1) {
            this.memberList.forEach(item => {
              if (item.labelName === '二女儿' || item.labelName === '二儿子') {
                console.log(555, this.childList.slice(0, parseInt(item.value) + 1))
                this.setChooseList({data: this.childList.slice(0, parseInt(item.value) + 1)})
              }
            })
          } else if (labelList.indexOf('大儿子') !== -1 || labelList.indexOf('大女儿') !== -1) {
            this.memberList.forEach(item => {
              if (item.labelName === '大女儿' || item.labelName === '大儿子') {
                console.log(555, this.childList.slice(0, parseInt(item.value) + 1))
                this.setChooseList({data: this.childList.slice(0, parseInt(item.value) + 1)})
              }
            })
          }
          break
        case '爸爸': case '妈妈': case '配偶爸爸': case '配偶妈妈':
          this.setChooseList({data: this.oldList})
          this.setDefaultAge({data: ['60']})
      }
      this.who = member.labelName
      this.toggleAgePicker()
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
          (members.some(item => { return /\w*[儿子|女儿]/.test(item)}) )) {
          let arr = origin.filter(item => {
            return (item.labelName !== '爸爸' && item.labelName !== '妈妈' && item.labelName !== '配偶爸爸' && item.labelName !== '配偶妈妈')
          })
          return arr.map(item => {
            return {
              class: item.class,
              labelName: item.labelName,
              focus: false,
              value: '选择年龄'
            }
          })
        } else {
          return origin.map(item => {
            return {
              class: item.class,
              labelName: item.labelName,
              focus: false,
              value: '选择年龄'
            }
          })
        }
      }
    },
    init () {
      let family = this.info.family.filter(item => {
        return item.labelName.indexOf('狗') === -1
      })
      this.memberList = [{
        class: this.info.sex === 'M' ? 'male' : 'female',
        labelName: '本人',
        focus: false,
        value: '选择年龄'
      }, ...this.getList(family)]
    }
  },
  mounted () {
    // document.getElementById('que3').style.minHeight = document.documentElement.clientHeight + 'px'
    if (document.documentElement.clientHeight - document.getElementById('que3').offsetHeight > 0) {
      this.$emit('change-height', document.documentElement.clientHeight - document.getElementById('que3').offsetHeight)
    } else {
      this.$emit('change-height', 0)
    }
  },
  created () {
    this.init()
  },
  watch: {
    'info.family': {
      handler () {
        this.init()
      },
      deep: true
    },
    'selectedAge': {
      handler (newVal) {
        if (newVal) {
          this.memberList.forEach(item => {
            if (item.labelName === this.who) {
              item.value = newVal
            }
          })
        }
      }
    },
    'showAgePicker': {
      handler (newVal) {
        console.log('new', newVal)
        this.memberList.forEach(item => {
          if (item.labelName === this.who) {
            item.focus = !item.focus
          }
        })
      }
    }
  }

}
</script>

<style type="text/scss" lang="scss" scoped>
@import "../styles/common";
@import "../styles/animation";
@include keyframes(slideRight, 100%, 0);
@include keyframes(slideLeft1, -740px, 0);
.question3 {
  transform: translateX(-740px);
  -webkit-transform: translateX(-740px);
  -webkit-animation: slideLeft1 1s ease-out;
  -o-animation: slideLeft1 1s ease-out;
  animation: slideLeft1 1s ease-out;
  animation-fill-mode: forwards;
  animation-delay: 1s;
  -webkit-animation-delay: 1s;
}
.que3 {
  padding-top: 30px;
  padding-bottom: 150px;
  .age {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    margin-bottom: 36px;
    .avatar {
      text-align: center;
      flex-basis: 150px;
      margin-right: 30px;
    }
    .member {
      width: 92px;
      height: 92px;
      margin: 0 auto;
    }
    .member-age {
      width: 284px;
      height: 60px;
      border-radius: 30px;
      border:solid 2px;
      font-size: 28px;
      text-align: center;
      line-height: 60px;
      color: rgb(141, 137, 137);
      margin-top: 9px;
    }
    .picked {
      border-color: rgb(252, 216, 75);
    }
    .member-text {
      font-size: 30px;
    }
    .unit {
      font-size: 28px;
      margin-top: 22.2px;
      margin-left: 12px;
    }
  }
}
.answer-enter-active {
  animation: slideRight 1s;
  -webkit-animation: slideRight 1s;
}
.answer-leave-active {
  -webkit-animation: slideRight 1s reverse;
  -o-animation: slideRight 1s reverse;
  animation: slideRight 1s reverse;
}

</style>
