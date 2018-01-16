<template>
    <div class="head-progress-bar" :class="barClass">
    </div>
</template>

<script>
    export default {
      name: 'HeadProgressBar',
      props: {
        step: {
          type: Number,
          default: 1
        }
      },
      computed: {
        barClass () {
          return 'step' + this.step
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
$step: 1;
@function width($step) {
  @return $step * 14.29%;
}

.head-progress-bar {
  height: 0.2rem;
  background: #ffe36e;
}
.step1 {
  width: width(1);
}
.step2 {
  width: width(2);
}
.step3 {
  width: width(3);
}
.step4 {
  width: width(4);
}
.step5 {
  width: width(5);
}
.step6 {
  width: width(6);
}
.step7 {
  width: width(7);
}
</style>
