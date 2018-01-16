<template>
    <div>
      <head-progress-bar :step="progress"></head-progress-bar>
      123132121
    </div>
</template>

<script>
import HeadProgressBar from '@/components/HeadProgressBar'
export default {
  name: 'questionnaire',
  components: {
    HeadProgressBar
  },
  data () {
    return {
      progress: 2
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
