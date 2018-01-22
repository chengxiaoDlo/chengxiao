<template>
  <div>
    <question question="对酒当歌，芳龄几何？" sub="年龄会关乎到保险方案和价格的准确性哦~" class="animated fadeInLeft">
      <div slot="options">
        <transition name="options">
          <div v-if="showOption">
            <div class="options que3" >
              <div v-for="member in memberList">
                <div class="age" >
                  <div>
                    <div class="member" :class="member.class"></div>
                    <p class="member-text">{{member.text}}</p>
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
    <div class="picker" v-if="chooseAge">
      <slide-picker :list="chooseList" :col="1" @quit="cancel" @confirm="selected" :default="defaultAge"></slide-picker>
    </div>
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
      <answer v-if="showAnswer" :textList="answerText" @modify="modify" wrap></answer>
    </transition>
  </div>
</template>

<script>
import Question from '@/components/Question'
import SlidePicker from '@/components/SlidePicker'
import Answer from '@/components/Answer'
import { mapState, mapMutations } from 'vuex'

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
    youngList () {
      return this.ageList.slice(18, 61)
    },
    childList () {
      return this.ageList.slice(0, 31)
    },
    oldList () {
      return this.ageList.slice(40, 81)
    },
    answerText () {
     return this.memberList.map(item => {
       return item.text + ': ' + item.value + '岁'
     })
    },
    btnAbled () {
      return this.memberList.every(item => {
        return item.value !== '选择年龄'
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
      stopSwiper: 'stopSwiper',
      useSwiper: 'useSwiper'
    }),
    confirm () {
      if (this.btnAbled) {
        this.showOption = false
        this.showAnswer = true
        setTimeout(() => {
          this.next({data: this.progress + 1})
        }, 3000)
        setTimeout(() => {
          this.setIndex({data: this.index + 1})
        }, 3500)
      }
    },
    change (val) {
      console.log(val)
    },
    selectAge (member) {
      switch (member.text) {
        case '本人': case '配偶':
          this.chooseList = this.youngList
          this.defaultAge = '30'
          break
        case '儿子': case '女儿': case '小儿子': case '小女儿': case '大儿子': case '大女儿': case '二儿子': case '二女儿':
          this.chooseList = this.childList
          this.defaultAge = '5'
          break
        case '爸爸': case '妈妈': case '配偶爸爸': case '配偶妈妈':
          this.chooseList = this.oldList
          this.defaultAge = '60'
      }
      this.who = member.text
      this.chooseAge = true
      this.stopSwiper()
    },
    cancel () {
      this.chooseAge = false
      this.useSwiper()
    },
    selected (val) {
      console.log(999, val)
      this.memberList.forEach(item => {
        if (item.text === this.who) {
          item.value = val.value[0]
        }
      })
      this.chooseAge = false
      this.useSwiper()
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
          return item.text
        })
        if ((members.indexOf('爸爸') !== -1 || members.indexOf('妈妈') !== -1 || members.indexOf('配偶妈妈') !== -1 || members.indexOf('配偶爸爸') !== -1) &&
          (members.indexOf('儿子') !== -1 || members.indexOf('女儿') !== -1)) {
          let arr = origin.filter(item => {
            return (item.text !== '爸爸' && item.text !== '妈妈' && item.text !== '配偶爸爸' && item.text !== '配偶妈妈')
          })
          return arr.map(item => {
            return {
              class: item.class,
              text: item.text,
              value: '选择年龄'
            }
          })
        } else {
          return origin.map(item => {
            return {
              class: item.class,
              text: item.text,
              value: '选择年龄'
            }
          })
        }
      }
    }
  },
  created () {
    for (let i = 0; i < 81; i++) {
      this.ageList.push({
        name: i,
        value: i
      })
    }
    let family = this.info.family.filter(item => {
      return item.text.indexOf('狗') === -1
    })
    this.memberList = [{
      class: this.info.sex === '壮士' ? 'male' : 'female',
      text: '本人',
      value: '选择年龄'
    }, ...this.getList(family)]
  },

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
      padding-left: 0.25rem;
    }
    .unit {
      font-size: 0.47rem;
      margin-top: 0.37rem;
      margin-left: 0.2rem;
    }
  }
}

</style>
