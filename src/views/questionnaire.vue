<template>
    <div class="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <scroller ref="myscroller">
        <!--<start></start>-->
        <!--<answer text="开始"></answer>-->
        <question question="江上往来人，敢问是何人？">
          <div slot="options" class="que1-options">
            <div class="sex male" @click="selectSex('male')"></div>
            <div class="sex female" @click="selectSex('female')"></div>
          </div>
        </question>
        <answer text="女子"></answer>
      </scroller>
    </div>
</template>

<script>
import HeadProgressBar from '@/components/HeadProgressBar'
import Question from '@/components/Question'
import Start from '@/components/start'
import Answer from '@/components/answer'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'questionnaire',
  components: {
    HeadProgressBar,
    Question,
    Start,
    Answer
  },
  data () {
    return {
      progress: 1
    }
  },
  computed: mapState([
    'next'
  ]),
  methods: {
    ...mapMutations({
      toggleNext: 'toggleNext'
    }),
    selectSex (sex) {
      this.toggleNext()
    }
  },
  mounted () {
    console.log(88, this.$refs.myscroller.getPosition())
  },
  watch: {
    'next': {
      handler (newVal) {
        if (newVal) {
          setTimeout(() => {
            console.log('next!!!')
            this.$refs.myscroller.scrollTo(0, 500, true)
          }, 2000)
        }
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.que1-options {
  display: flex;
  justify-content: center;
  background: #fff;
  width: 8.57rem;
  box-sizing: border-box;
  margin-left: 1.92rem;
  padding-bottom: 1rem;
  .sex {
    width: 2rem;
    height: 2rem;
    background: blueviolet;
    border-radius: 50%;
    margin: 0 0.6rem;
  }
}
</style>
