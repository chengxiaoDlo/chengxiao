<template lang="html">
  <div class="baos">
       <div v-if='child.policies.length>0' class="ul2" id="lplp" v-for='(rt,index) in child.policies'>

         <div class="ul2-two">
              <p>{{child.labelName}}</p>
            <p>{{baoxianType[rt.productType + ''] }}</p>
             <!-- <p>{{youxiao}}</p> -->
          </div>

        <div class="ul2-right">
          <div @click='name1(rt)' class="two">
            <p>{{rt.productName}}</p>
          </div>

           <div @click='name1(rt)' class="ulop-left">
            <span>保额:</span>
            <p>{{(rt.sumInsured)/10000}}万</p>
          </div>

           <div @click='name1(rt)' class="ulop-right">
             <span>有效期:</span>
             <p v-if='rt.expirationDate'>{{rt.expirationDate}}</p>
             <p v-else>
               至终身
             </p>
           </div>
           <p>[查看详情]</p>
         </div>
     </div>

        </div>
</template>

<script>
export default {
  props:['child'],
  data(){
    return{
      num:-1,
      result:'',
      baoxianType: {
        '1': '重疾险',
        '2': '意外险',
        '3': '医疗险',
        '4': '定期寿险'
      }
    }
  },
  methods:{
    back(){
      history.back();
    },
    gai(e){
      console.log(e);
      this.num = e;
       }
  },
  created(){
    console.log(this.$route.query);
    this.result = this.$route.query.result.members;
  }
}
</script>

<style lang="css" scoped>
.box{
  margin-top: 100px;
}
#lplp{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.ul2-two{
  width:30%;
}
.ul2-right{
  width: 50%;
}
</style>
