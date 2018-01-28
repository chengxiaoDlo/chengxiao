<template lang="html">
  <div v-title="'家庭保险清单'" class="">
    <div v-if='xianshi' class="weice">
        <img class="xianlia" src="static/weice.png" alt="">
        <p>采用AI测评，多维度识别家庭风险</p>
        <p>持续追踪生命各周期的风险变化</p>
        <p>提供专业的家庭财富配比指导和保险方案规划</p>
        <img @click='chongce()' class="canyu" src="static/canyu.png" alt="">
    </div>
    <div v-else class="">


  <div class="l-title">

     <p class="p1" @click='change(1)'>家庭保险清单</p>

  </div>
   <div class="familyq l-familyq">

    <div class="box">
        <p id="rt" :class="{gaibia:-1==num}" @click='gai(-1)' class="mine">我的家</p>
        <div v-for='(item,index) in data1' class="boxs">
          <p @click='gai(index)'  :id="'btn'+item.label" :class="{gaibia:index==num}">
          {{item.labelName}}</p>
          <p @click='gai(index)' v-if='((item.label).indexOf("dog")!="-1")' :class="{gaibia:index==num}" :id="'btn'+item.label">狗狗</p>
        </div>
    </div>
         <myhome :number='number' :child='data1' :resul.sync='result' :biao.sync = 'biaoqian' v-show="-1 == num"></myhome>
         <my v-for='(itemCon,index) in data1' v-show='index == num' :child.sync='itemCon'></my>
         <father v-for='(itemCon,index) in data1' v-show="index == num" :resul.sync='result'></father>
         <dog v-for='(itemCon,index) in data1' v-show="(index == num)&&(data1[num].label=='dog')" :resul.sync='result'></dog>
  </div>
</div>


  </div>
</template>
<script>
import myhome from '../components/myhome'
import my from '../components/my'
import father from '../components/father'
import dog from '../components/dog'
export default {
  data(){
    return{
      guo: '',
      xianshi:false,
      age:'',
      birthday:'',
      youi: 0,
      user: [],
      biaoqian:'',
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
      myhome:'home',
      result:'',
      hidd:{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "white"
      },
      num:-1,
      //active:-1,
      show:true,
      ik:{
        "width":"100%",
        "height":'300px'
      },
       data2:'保是国家提供的普惠的基本医疗保障，建议先上社保。另外通过配置医疗险，用来规避大额看病支出的风险。此外还应配置重疾险，只要确诊约定的疾病就能一次性赔付，能有效弥补患病人员或者',
       data1:'',
       shouzhi:{},
       number:this.$route.query.id
    }
  },
  watch: {
    '$route' (newV, oldV) {
      console.log(oldV);
      if(oldV.path == "/"){
        window.location.reload();

      }
    if (oldV.path == "/baogao") {
      this.data1 = this.$route.query.result.members;
      this.result = this.$route.query.result;
    }


      }



  },

  created(){
    var that = this;
      this.axios.get(that.domain+'/scheme/getFamilyScheme',{headers:{"token":this.getCookie("token")}}).then(function(res){
        console.log(res)
        if(res.data.isSuccess){
          var jsondatas = JSON.stringify(res);
          var sm = JSON.parse(jsondatas);
          console.log(sm.data.result);
          that.result = sm.data.result;
          that.data1 = sm.data.result.members;
          console.log(that.data1);
         that.huu =that.data1;
          if (that.data1.length) {
            this.xianshi = true;
          }
        } else if(res.data.errorCode == '10001'){
          this.login();
        } else {
          alert(res.data.errorMsg);
        }

      })
  console.log(this.$route.query);
  this.biaoqian = this.$route.query.biaoqian;

},
  updated(){

  },

mounted(){

     console.log(this.number);

  setTimeout(()=>{
    if (this.number=='self') {
      $('#btn'+this.number).css({"color":"#EDC013","border-bottom":"1px solid #EDC013"});
      if (this.number=='self') {
         $('#btn'+this.number).trigger('click');
      }
    }
    if (this.number=='spouse') {
      $('#btn'+this.number).css({"color":"#EDC013","border-bottom":"1px solid #EDC013"});
    }
    if (this.number=='boy1') {
      $('#btn'+this.number).css({"color":"#EDC013","border-bottom":"1px solid #EDC013"});
    }
    if (this.number=='girl1') {
      $('#btn'+this.number).css({"color":"#EDC013","border-bottom":"1px solid #EDC013"});
    }
    if (this.number=='boy2') {
      $('#btn'+this.number).css({"color":"#EDC013","border-bottom":"1px solid #EDC013"});
    }
    if (this.number=='girl2') {
      $('#btn'+this.number).css({"color":"#EDC013","border-bottom":"1px solid #EDC013"});
    }
  },300)
},
components:{
    myhome,
    my,
    father,
    dog
  },
methods:{
  hui(){
    this.$router.push({
          path:'/'
        })
  },
  chongce(){
    this.$router.push({
          path:'/'
        })
  },
   gai(e){
     console.log(e);
     this.num = e;
      }

   }
}
</script>

<style lang="css">
.el-progress{
  margin-left: 40px;
}
.el-progress-bar{
  width: 110px;
}
.el-progress__text{
     color: #606266;
    display: inline-block;
    vertical-align: middle;
    float: left;
    font-size: 26px! important;
    line-height: 1;
}
.el-progress-bar__outer{
  height: 5px !important;
}
.el-progress-bar__inner{
height: 3px;
background:#F4D046;
}

.l-title{
    height: 100px;
    background: white;
    z-index: 100;
    position: fixed;

    top: 0;
    left: 0;
    display:flex;
    flex-direction: row;
    width: 100%;
}
.box{
  z-index: 100;
}
.boxs{
  width: 4000px;
}

 .l-title .p1{
  text-align: center;
  width: 80%;
  margin-left: 36px;
  flex: 0 1 auto;
  font-size:34px;
}
.l-title .p2{
  text-align: center;
  width: 20%;
  color: #CCCCCC;
  flex: 0 1 auto;
  font-size: 34px;
  margin-top: 25px;
}
.l-familyq{
  margin-top: 100px;
}
.box{
  margin-top: 20px;
  z-index: 100;
  width: 100%;
  overflow: auto;
  border-bottom: 1px solid #E7E7E7;
  height:100px;
}
.box::-webkit-scrollbar{
  display: none;
}
.box p{
  font-size: 26px;
  float: left;
  width: 15%;
  text-align: center;
  height: 50px;
  margin-left: 10px;
}
.ll{color:#EDC013;
border-bottom:1px solid #EDC013;}
#app{
  width: 100%;
}
.boxs p{
  width: 3%;
}
.gaibia{
  color:#EDC013;
  border-bottom:1px solid #EDC013;
}
.weice{
  padding-top: 100px;
  width: 100%;
  text-align: center;
}
.weice p{
  font-size: 30px;
  margin: 0;
  color: #414141;
}
.xianlia{
  width: 60%;
  height: 60%;
  margin-bottom: 100px;
}
.canyu{
  width: 298px;
  height: 164px;
  margin-top: 50px;
}
</style>
