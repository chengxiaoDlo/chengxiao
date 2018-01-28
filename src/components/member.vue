<template lang="html">
  <div class="">
      <div class="img-lia">
        <div class="img">
          <img :src="'static/' +zhaopian[child.memberType+'_'+child.gender] +'.png'" alt="">
          <p>{{child.labelName}}</p>
        </div>
         <ul class="ulon">
            <li>
              <p>{{age}}</p>

              <span>年龄(岁)</span>
            </li>
            <li>

              <p v-if='child.income'>{{(child.income)/10000}}</p>
              <p v-else>0</p>
              <span>年收入(万)</span>
            </li>
            <li>
              <p>{{occu}}</p>
              <span>参考保费(元/年)</span>
            </li>
            <li>
              <p>{{shebao[child.hasSocialInsurance+'']}}</p>
              <span>社保</span>
            </li>
            <li>
              <p>{{youi}}</p>
              <span>有效保单(个)</span>
            </li>
            <!-- <li>
              <! <p>{{huu.residence}}</p>
              <span>预算占比</span> -->
            <!-- </li> -->

         </ul>

      </div>
      <b></b>
      <div class="shuii">
          <p class="chtui">保险产品推荐</p>
          <div class="baoTu">
          <ul class="ul1">
            <li class="one1">险种</li>
            <li class="two">产品名称</li>
            <li>保额</li>
            <li class="three">保障期</li>
            <li class="four">缴费期</li>
            <li>参考保费</li>
           </ul>
           <ul class="ul2" v-for='itemy of child.schemes'>
             <li><p>{{baoxianType[itemy.productType + ''] }}</p></li >
               <div class="ulops">


              <ul class="ulop" v-for='item2 of itemy.details'>


             <li @click='getin(item2,itemy,itemy.details)' class="two"><p>{{item2.planName}}</p></li >
             <li><p v-if='item2.sumInsured'>{{(item2.sumInsured)/10000}}万</p>
                <p v-else>
                   -
                </p>
             </li>

           <li>
             <p v-if="(item2.insurancePeriod).indexOf('A')>0">至{{item2.insurancePeriod.substr(0,(item2.insurancePeriod).indexOf('A'))}}岁</p>
               <p v-else-if="(item2.insurancePeriod).indexOf('Y')>0">
                {{item2.insurancePeriod.substr(0,(item2.insurancePeriod).indexOf('Y'))}}年</p>

            <p v-else>终身</p>
            </li >
             <li><p>{{item2.paymentPeriod}}年</p></li>
             <li class="mo"><p v-if='item2.premium!="0"'>{{(item2.premium).substr(0,(item2.premium).indexOf('.00'))}}元/年</p>
              <p v-else>0元/年</p>
             </li >

               </ul>
               </div>
          </ul>
          </div>
      </div>
      <b class="ba"></b>
      <div class="baos">
         <p class="chtui1">{{child.labelName}}的保单</p>
         <ul class="ul3">
          <li>险种</li>
          <li>产品名称</li>

           <li>保额</li>
            <li>状态</li>
         </ul>

           <ul id="lplp" v-for='rt of child.policies' class="ul4" @click='name(rt)'>
               <li><p>{{baoxianType[rt.productType+'']}}</p></li>
               <li @click='name(rt)'><p>{{rt.productName}}</p></li>
               <li><p>{{(rt.sumInsured)/10000}}万</p></li>
               <li id="zui"><p>{{youxiao}}</p></li>
           </ul>

      </div>


      <div @click='baodan(chu)' class="wei">
          <p>添加保单信息</p>
      </div>
  </div>
</template>

<script>
var qunaju;
var ok;
var po;
export default {
  props:['child','age'],
  data() {
    return {
      guo: '',
      age:'',
      birthday:'',
      youi: 0,
      user: [],
      cin:'',
      baozu:[],
      xiangqing: [],
      occu: '',
      label:'',
      nianfen:'',
      baoxianType: {
        '1': '重疾险',
        '2': '意外险',
        '3': '医疗险',
        '4': '定期寿险'
      },
      shebao:{
        '1': '有',
        '0': '无'
      },
      policyId:"",
      wobao:'',
      pocy:'',
      typer: '',
      zhaopian:{
        '0_M':'M',
        '0_F':'F',
        '1_M':'M',
        '1_F':'F',
        "3_M":'S',
        '3_F':'D'
      },
      de: false,
      wode: '',
      peio: '',
      erzi: '',
      baofei:{},
      shu1: [],
      shu2: '',
      baoleio: '',
      woo: '',
      chu: '',
      wo: '',
      youxiao: '',
      peio: '',
      erzi: '',
      huu: '',
      huw: '',
      memberId: '',
      qule: 'e',
      start: '',
      end: '',
    }
  },
  methods: {
    baodan(e) {
      console.log(e);
      this.$router.push({
        path: '/addbao/' + e,
        query: {
          memberId: this.huu.label,
          renyuan: this.huu.labelName,
        }
      })
      this.qule = 'e'
    },
    name(e) {

      this.$router.push({
        path: '/xiang',
        query: {
          xinxi:e,
          policyId:this.pocy,
          memberId:this.cin,
          renyuan: this.huu.labelName,

        }
      })
    },
    getin(e,r,o) {
      console.log(e);
      console.log(r);
      console.log(o);
      // console.log(e.details[0].planId);
      localStorage.setItem('chanPinData', JSON.stringify(e))
      this.$router.push({
        path: '/chanpin/' + r.productType,
        query: {
          // policyId:e.policyId,
          label:this.label,
          chanpin: e,
          buty: e.productType,
          bu: e.planId,
          oi:o,
          // meiren: this.chu,
          gender: this.huu
        }
      })
    }
  },
  watch: {

  },
  mounted() {
  console.log('sss');


  },
  updated() {

    var tus = document.querySelectorAll('#lplp');
    var g = 0;
    for (var i = 1; i <= tus.length; i++) {
      g++;
    }
    this.youi = g;
  },
  created() {
              //
              //  var that = this;
              //
              //     that.huu=that.child
              //     console.log(that.child);
              //
              //
              //     that.wo = that.huu.schemes
              //     console.log(that.wo);
              //     var sum = 0;
              //
              //       if (that.wo) {
              //         for (var h = 0; h < that.wo.length; h++) {
              //           for (var k = 0; k < that.wo[h].details.length; k++) {
              //              sum = parseInt(that.wo[h].details[k].premium) + parseInt(sum)
              //         }
              //           that.occu = sum
              //       }
              //
              //
              //     }else {
              //       that.occu = '0';
              //     }
              //     that.user = that.huu.members[i].policies
              //
              // if (that.user.length>0) {
              //
              //   that.start = that.user[0].expirationDate;
              //   that.end = that.user[0].effectiveDate;
              //
              //     if (that.user[0].expirationDate.substr(0, 4) - that.user[0].expirationDate.substr(0, 4) >= 0) {
              //       that.youxiao = '保障中'
              //     } else {
              //       that.youxiao = '已失效'
              //     }
              //
              // } else {
              //   console.log('进入else');
              //   that.user = []
              // }
       }


}
</script>

<style lang="css" scoped>
ul,li,ol,dl,span,div,em,i,b,section,header,footer{
    padding:0;
    margin:0;
}

.shuii{
  text-align: center;

}
.ul1{
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0;
  width: 100%;

  background: #FADF76;

}
.ul1 li{
  line-height: 100px;
  /*border-right: 1px solid #F6D763;*/
  font-size: 26px;
  width:19%;
vertical-align: middle;
  text-align: center;
height: 100px;
}
.ul1 li:nth-child(2){
  width:19%;
}
.ul1 li:last-child{
  width:19%;
}
.ul1 .one1{
  width: 17.5%;
}
.ul1 .three{
  width: 19%;
}
.ul1 .four{
  width: 19%;
}
.ul2{
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0;
  width: 100%;

}
.ul2>li{

  color: #737373;
  vertical-align: middle;
  border: 1px solid #F0F0F0;
  text-align: center;
  font-size: 26px;
  width:16%;
}
.ul2 li:nth-of-type(4){
  border-left: none;
}
.ul2 li p{
  /*padding-top: 50px;
  padding-bottom: 50px;*/
  font-size: 26px;
  margin-top: 50%;
  margin-bottom: 30px;
}
.ul2 .two p{
  font-size: 24px;
  width: 98%;
  margin: 0 auto;
  margin-top:10px;
}
.ul2 li:nth-child(2){
  width:20%;
  /*color: #F2D154;*/
}
.ul2 li{
  width:17%;
  text-align: center;
}
.ul2 li:last-child{
  width:18%;
}
.baos{
  display: flex;
  flex-direction: column;
}
.ul3{
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  background: #FADF76;
}
.ul3 li{

  line-height: 100px;
  border-right: 1px solid #F6D763;
  font-size: 32px;
  width:25%;
  vertical-align: middle;
  text-align: center;
  height: 100px;
}

.ul4{
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0;
  width: 100%;
}
.ul4 li{
  /*color: #737373;
  vertical-align: middle;*/
  /*border: .5px solid #F0F0F0;*/
  /*border: .5px solid #F0F0F0;
  text-align: center;
  height: 1.4rem;
  padding-top: .7rem;
  padding-bottom: .7rem;
  font-size: .8rem;
  width:23%;*/

  /*line-height: 2.5rem;*/
  border-right: 1px solid #F6D763;
  font-size: 30px;
  width:25%;
  /*vertical-align: middle;*/
  text-align: center;
  height: 100px;
    border: 1px solid #F0F0F0;


}
.ul4 li {


}
.ul4 li:nth-child(2){

}
.ul4 li:nth-child(2) p{
   /*margin-top: -0.2rem;*/
   /*font-size: 16px;*/
   margin-top:0.25rem;
   color: #F2D154;
}
/*.ul4 li:nth-child(4){
  width: 25%;
}*/

.ul3{
  margin: 0 auto;
  padding: 0;
  width: 100%;
}

.ba{
  margin-top: 70px;
  display: block;
  height: 10px;
}

.baoTu{
  display: flex;
  flex-direction: column;
}
.ul1 li:last-child{
  border: none;
}
#zui{
  /*width: 29%;*/
}
.chtui{
  font-weight: 700;
  width: 79%;
  font-size: 42px;
  margin-left: -100px;
}
.chtui1{
  font-weight: 700;
  width: 79%;
  margin-left: 20px;
  font-size: 42px;
}

.tou{
  /*background: #FADF76;*/
}

.baos{
  margin-bottom: 30px;
}

.img img{
  height: 130px;
  width: 130px;

}
b{
  display: block;
  height: 5px;
  width: 100%;
  background: #F3F3F3;
}
.img p{
  font-size: 32px;
   width: 100px;
   margin: 0 auto;
}
.img{
  padding-top: 30px;
  width: 100%;
  text-align: center;
  height: 200px;

}
    .ulon{
      list-style: none;
      height:300px;
      margin-left: 50px;
      list-style: none;
    }
    .ol{
      text-align: center;
      width: 100%;
      text-align: center;
      height: 40px;
      background: #FADF76;
      padding-left: 0!important;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      /*width: 80%;*/
      /*margin-left: 10px;*/
      list-style: none;
    }
    .ulon li{

      height: 100px;
      margin-bottom: 30px;
      float: left;
      width:30%;
     font-size: 32px;
      border-right: 1px solid #F3F3F3;
      text-align: center;
    }

    .ol li{
      text-align: center;
      font-size: .8rem;
      height: 20px;
      margin-top: 10px;
      float: left;

      width: 25%;

    }
    .ol li:nth-child(2){
      width: 35%;

    }
    .ol1 li{
      width: 20%;
      padding-left: .5rem;
      text-align: center;
    }

    .ol1 li:nth-child(2){
      width: 45%;
    }
    .ulon li p{
      width: 100%;
      text-align: center;
      margin-top: 0;
      margin-bottom: 0;
    }
.ulon li span{
  display: block;
  width: 100%;
  color: #ADADAD;
  font-size: 26px;

}
.wei{


  width: 90%;
  height:100px;

  border: 2px solid #FADF76;
  border-radius: 10px 10px 10px 10px;
  margin-left: 20px;
  text-align: center;
}
.wei p{
  color: #FADF76;
  margin-top: 30px;
  font-size: 32px;
}
.ulop{
   list-style: none;
   display: flex;
   flex-direction: row;
/*justify-content: space-around;*/
align-items: center;
width: 100%;
}
.ulop li{
  color: #737373;
vertical-align: middle;
border: 0.013333rem solid #F0F0F0;
text-align: center;
font-size: 20px;
  height: 2rem;
  width: 20%;
}
.ulop li p{
  margin-top: 50px;
  font-size: 26px;
}

.ulops{
  width: 98%;

}
.ulop .two p{
  /*margin-top: 30px;*/
  font-size: 26px;
  color: #FADF76;
}


.baoTu ul:nth-of-type(2) .ulops ul:nth-of-type(1) li:nth-of-type(1) p  {
     /*margin-top: 10px;*/

}
.baoTu>ul:nth-of-type(2)>li:nth-of-type(1) p{
  /*margin-top: 110px;*/
}
.baoTu>ul:nth-of-type(3)>li:nth-of-type(1) p{
  /*margin-top: 110px;*/
}















</style>
