<template>
    <div class="questionnaire">
      <head-progress-bar :step="progress"></head-progress-bar>
      <start></start>
    </div>
</template>

<script>
import HeadProgressBar from '@/components/HeadProgressBar'
import Question from '@/components/Question'
import Start from '@/components/start'

export default {
  name: 'questionnaire',
  components: {
    HeadProgressBar,
    Question,
    Start
  },
  data () {
    return {
      progress: 1
    }
  },
  created () {
    setTimeout(() => {
//      this.progress = 2
    })
  }
}
</script>

<style type="text/scss" lang="scss" scoped>

</style>
