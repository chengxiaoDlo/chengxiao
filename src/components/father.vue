<template lang="html">
  <div class="">
      <div v-for='item of result.members' class="" v-if='((item.label).indexOf("father")!="-1")||((item.label).indexOf("monther")!="-1")'>
        <h1 v-if='((item.label).indexOf("father")!="-1")||((item.label).indexOf("monther")!="-1")'>{{item.labelName}}</h1>
            <div v-for='itemy of item.schemes' class="">
                 <div v-for='itemu of itemy.details' class="">
                        <h3>{{itemu.planName}}</h3>
                        <h3>保费{{itemu.premium}}</h3>
                        <h3>缴费年限{{itemu.paymentPeriod}}年</h3>
                        <h4>保障期{{itemu.insurancePeriod}}</h4>

                 </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  props:['resul'],
  data(){
    return{
      result:''
    }
  },
  created() {
    console.log(this.resul);
    this.result = this.resul
  },

  mounted() {
console.log(this.resul);
this.result = this.resul
  }
}
</script>

<style lang="css">
</style>
