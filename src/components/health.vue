<template lang="html">
  <div v-title="'健康告知'" class="">
     <div class="title">
          <img src="static/que.png" alt="">
          <p>为了保证被保人的保险权益在理赔时不受影响，请确认被保人健康状况是否符合投保条件。</p>
     </div>
     <p class="xia"></p>
     <div class="l-zhong">
        <div class="l-zhong1">
            <p>健康告知</p>
        </div>
        <h5>1、被保险人是否曾出现过以下状况或症状:</h5>
        <p>①高血压、高血脂症、胸痛、心脏病、中风、其它循环系统疾病;</p>
        <p>②哮喘、结核病或任何影响肺器官或呼吸系统的其它情形;</p>
        <p>③癌症、肿瘤或肿块;</p>
        <p>④高血糖、糖尿病、尿糖或任何影响肾脏及胰腺系统的情形;</p>
        <p>⑤肝炎、肝硬化或任何影响肠和消化系统的情形;</p>
        <p>⑥抑郁症、癫痫,任何心理或精神病症;</p>
        <p>⑦脊柱,背部,关节,骨骼,肌肉或任何神经缺陷;</p>
        <p>⑧艾滋病毒,艾滋病,酒精中毒,吸毒;</p>
        <p>⑨贫血或血液病;</p>
        <p>⑩失明,耳聋或其他身体机能障碍或残疾;</p>
        <p>⑪仅适用于年龄≥18的女性被保人:曾患有乳腺或女性生殖器官疾病,或pap涂片异常;</p>
        <h5>2.被保险人过去两年内是否曾因任何疾病连续住院超过5天?</h5>
        <h5>3.被保险人投保寿险、重大疾病险、住院医疗险曾否被保险公司拒保、延期、加费?</h5>
     </div>
     <img @click='know(type)' class='know' src="static/know.png" alt="">
  </div>
</template>

<script>
export default {
  data(){
    return{
      type:'',
    }
  },
  methods:{
    know(e){
      this.$router.push({
            path:'/chanpin/'+e

          })
    }
  },
  created(){
    console.log(this.$route.query);
    this.type = this.$route.query.type;
  }
}
</script>

<style lang="css" scoped>
  .title{
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  }
  .title img{
    width: 46px;
    height: 40px;
    margin-left: 20px;
  }
  .title p{
    width: 80%;
    margin: 0;
    font-size: 28px;
    color: #808080;
    margin-left: 20px;
  }
  .xia{
    width: 100%;
    height: 20px;
    background: #F7F7F7;
  }
  .l-zhong p{
      color: #808080;
      font-size:28px;
      margin: 0;
      width: 90%;
      margin-left: 20px;
  }
  .l-zhong1 p{
    font-size: 30px;
    color: #414141;
    font-weight: 400;
  }
  h5{
    font-size: 28px;
    color: #808080;
    width:90%;
    margin-left: 20px;
    font-weight: 400;
  }
  .know{
    width: 690px;
    height: 96px;
    margin-left: 30px;
  }

</style>
