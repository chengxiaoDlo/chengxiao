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
  @return $step * 12.5%;
}
@mixin keyframes ($a, $start, $end) {
  @-webkit-keyframes #{$a} {
    from { width: $start; }
    to { width: $end; }
  }
  @keyframes #{$a} {
    from { width: $start; }
    to { width: $end; }
  }
}

.head-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 6px;
  background: linear-gradient(left, rgb(255, 241, 153), rgb(254, 222, 96));
  background: -webkit-gradient(linear, left top, right top, from(#f6e15a), to(#f4d046));
}
@include keyframes(step1, width(0), width(1))
@include keyframes(step2, width(1), width(2))
@include keyframes(step3, width(2), width(3))
@include keyframes(step4, width(3), width(4))
@include keyframes(step5, width(4), width(5))
@include keyframes(step6, width(5), width(6))
@include keyframes(step7, width(6), width(7))
@include keyframes(step8, width(7), width(8))

.step1 {
  width: width(1);
  -webkit-animation: step1 1s;
  -o-animation: step1 1s;
  animation: step1 1s;
}
.step2 {
  width: width(2);
  -webkit-animation: step2 1s;
  -o-animation: step2 1s;
  animation: step2 1s;
}
.step3 {
  width: width(3);
  -webkit-animation: step3 1s;
  -o-animation: step3 1s;
  animation: step3 1s;
}
.step4 {
  width: width(4);
  -webkit-animation: step4 1s;
  -o-animation: step4 1s;
  animation: step4 1s;
}
.step5 {
  width: width(5);
  -webkit-animation: step5 1s;
  -o-animation: step5 1s;
  animation: step5 1s;
}
.step6 {
  width: width(6);
  -webkit-animation: step6 1s;
  -o-animation: step6 1s;
  animation: step6 1s;
}
.step7 {
  width: width(7);
  -webkit-animation: step7 1s;
  -o-animation: step7 1s;
  animation: step7 1s;
}
.step8 {
  width: width(8);
  -webkit-animation: step8 1s;
  -o-animation: step8 1s;
  animation: step8 1s;
}

</style>
