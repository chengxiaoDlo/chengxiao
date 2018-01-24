<template>
  <div id="que3" style="overflow: hidden" :class="{'hidden': isModify}">
    <question question="对酒当歌，芳龄几何？" sub="年龄会关乎到保险方案和价格的准确性哦~" class="animated fadeInLeft">
      <div slot="options">
        <transition name="options">
          <div v-if="showOption" id="options">
            <div class="options que3" >
              <div v-for="member in memberList">
                <div class="age" >
                  <div class="avatar">
                    <div class="member" :class="member.class"></div>
                    <p class="member-text">{{member.labelName}}</p>
                  </div>
                  <div class="member-age" @click="selectAge(member)">{{member.value}}</div>
                  <div class="unit">岁</div>
                </div>
              </div>
            </div>
            <div class="confirm" :class="btnAbled ? 'btn-able' : 'btn-disable' " @click="confirm"></div>
          </div>
        </transition>
      </div>
    </question>
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
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
      'selectedAge'
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
        if (this.progress === 3) {
          setTimeout(() => {
            this.next({data: 4})
          }, 3000)
          setTimeout(() => {
            this.$emit('scroll-to', document.getElementById('que3').offsetTop + document.getElementById('que3').offsetHeight)
          }, 3500)
        } else {
          this.next({data: 3})
          setTimeout(() => {
            this.next({data: 4})
            this.toggleModify()
          }, 3000)
          setTimeout(() => {
            this.toggleModify()
            this.$emit('scroll-to', document.getElementById('que3').offsetTop + document.getElementById('que3').offsetHeight)
          }, 3500)
        }
      }
    },
    selectAge (member) {
      switch (member.labelName) {
        case '本人': case '配偶':
          this.setChooseList({data: this.youngList})
          this.setDefaultAge({data: '30'})
          break
        case '儿子': case '女儿': case '小儿子': case '小女儿': case '大儿子': case '大女儿': case '二儿子': case '二女儿':
          this.setChooseList({data: this.childList})
          this.setDefaultAge({data: '5'})
          break
        case '爸爸': case '妈妈': case '配偶爸爸': case '配偶妈妈':
          this.setChooseList({data: this.oldList})
          this.setDefaultAge({data: '60'})
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
          (members.indexOf('儿子') !== -1 || members.indexOf('女儿') !== -1)) {
          let arr = origin.filter(item => {
            return (item.labelName !== '爸爸' && item.labelName !== '妈妈' && item.labelName !== '配偶爸爸' && item.labelName !== '配偶妈妈')
          })
          return arr.map(item => {
            return {
              class: item.class,
              labelName: item.labelName,
              value: '选择年龄'
            }
          })
        } else {
          return origin.map(item => {
            return {
              class: item.class,
              labelName: item.labelName,
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
    }
  }

}
</script>

<style type="text/scss" lang="scss" scoped>
@import "../styles/common";
@import "../styles/animation";
.que3 {
  padding-top: 0.5rem;
  padding-bottom: 2.5rem;
  .age {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    margin-bottom: 0.6rem;
    .avatar {
      text-align: center;
      flex-basis: 2.5rem;
      margin-right: 0.5rem;
    }
    .member {
      width: 1.53rem;
      height: 1.53rem;
      margin: 0 auto;
    }
    .member-age {
      width: 4.73rem;
      height: 1rem;
      border-radius: 30px;
      border:solid 1px;
      font-size: 0.47rem;
      text-align: center;
      line-height: 1rem;
      color: rgb(141, 137, 137);
      margin-top: 0.15rem;
    }
    .member-text {
      font-size: 0.5rem;
    }
    .unit {
      font-size: 0.47rem;
      margin-top: 0.37rem;
      margin-left: 0.2rem;
    }
  }
}

</style>
