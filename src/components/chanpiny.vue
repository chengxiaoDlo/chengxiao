<template lang="html">
  <div v-title="'医疗险'" class="">
    <div class="shangbian">
       <h1>{{accidentone}}</h1>
       <div v-for='(item,index) in data' class="shang-l">
          <p v-if='item.groups==1'>{{item.coverageName}}:</p>
          <p v-if='item.groups==1'>{{item.coverageContent}}</p>
       </div>
       <img src="static/xin.png" alt="">
    </div>
    <p class="xiay"></p>

  <div v-if='reso' class="app-w">
    <div :style='yin'>
      <div class="cesuan">
        投保信息
      </div>
      <div class="suggestion">
          <div class="suggestion-left">
              <div class="">
                  <h2 v-if='rtt.premium'>{{rtt.premium.substr(0,rtt.premium.indexOf('.00'))}}</h2>
                  <p>元/年</p>
              </div>
              <p>保费</p>
          </div>
          <b></b>
          <div class="suggestion-right">
             <div class="one">
                 <div class="one-left">
                   <span>保额:</span>
                   <p>{{(rtt.sumInsured)/10000}}万</p>
                 </div>
                 <div class="one-right">
                   <span>保障期限:</span>
                   <p v-if='rtt.insurancePeriod'>{{(rtt.insurancePeriod).substr(0,(rtt.insurancePeriod).indexOf('Y'))}}年</p>
                 </div>
             </div>
             <div class="two">
               <div class="one-left">
                 <span>年龄:</span>
                 <p v-if='rty.age'>{{rty.age}}岁</p>
               </div>
               <div class="one-right oneone">
                 <span>缴费年限:</span>
                 <p v-if='rtt.paymentPeriod'>{{rtt.paymentPeriod}}年</p>
               </div>
             </div>
             <div class="three">
               <div class="one-left">
                 <span>性别:</span>
                 <p>{{genderp[huu.gender+'']}}</p>
               </div>

             </div>
          </div>
      </div>
      <div class="cesuan">
        产品详情
      </div>

      <div v-for='(item,index) in data' v-show='item.groups!=1' class="product-zong">
        <div class="product">
           <p>{{item.coverageName}}</p>
           <p v-if='item.coverageContent'>{{item.coverageContent}}</p>
           <p class="heng" v-else>-</p>
           <span class="span1" @click='fuwu(item.id)' v-if="item.coverageDesc" ></span>
           <!-- <span class="span2" v-show='show2&&(indexid==item.id)' @click='heshang(item.id)'></span> -->
        </div>
        <div v-show="(item.coverageDesc)&&(indexid==item.id)&&isshow" class="yeye">

          <p class="">{{item.coverageDesc}}</p>
        </div>
      </div>



    </div>
    <p class="xia"></p>
    <div @click='health()' class="tell">
        <div class="tell-top">
          <div class="">
            <img src="static/question.png" alt="">
            <p>健康告知</p>
          </div>
            <p class="you">投保之前请关注健康告知，针对家人自身健康状况进行判断哟！</p>
        </div>
        <img @click='health()' src="static/enter.png" alt="">

    </div>
    <p class="xia"></p>
    <div class="wei">
        <p @click='duih()'>对比产品</p>
        <p v-if="ur1.indexOf('h')>-1" class="to2">
          <a :href="ur1">跳转官网</a>
        </p>
        <p v-else @click='tiaozhuan(ur1)' class="to2">跳转官网</p>
    </div>
    <!-- <div class="l-wei">
       <div class="baofei">
           <p>保费</p>
       </div>
       <div class="baolia">
         <p v-if='rtt.premium' class="meinian">{{rtt.premium.substr(0,rtt.premium.indexOf('.00'))}}元/年</p>
        <div class="toubao">
           <p @click='duih()' class="to1">对比产品</p>
           <p v-if="ur1.indexOf('h')>-1" class="to2">
             <a :href="ur1">我要投保</a>
           </p>
           <p v-else @click='show2(ur1)' class="to2">我要投保</p>
        </div>
       </div>

    </div> -->
<!--
    <div v-for='item1 of huancun' v-show='indexid==item1.id' class="shuoo">
      <div>
        <div>
          <h3>{{item1.coverageName}}</h3>

        </div>
      </div>
        <p class="pingj">{{item1.coverageDesc}}</p>
        <p class="po"><img @click='close()' src="static/close.png" alt=""></p>
        </div> -->

  </div>
  <div v-else class="tupian">
    <img src="static/loading.gif" alt="">
  </div>
  </div>
</template>

<script>
// var spans = document.querySelectorAll('.product span');
// console.log(spans.length);
// for (var i = 0; i < spans.length; i++) {
//    (function(num) {
//      spans[num].onclick=function(){
//        console.log(num);
//      }
//       // $(spans[num]).click(function(event) {
//       //     console.log(num);
//       // })
//    })(i)
// }


export default {
  data(){
    return{
      appw:{
        display:"none"
      },
      ur1:'',
      show:false,
      show1:true,
      show2:false,
      indexid:'',
      shio:'',
      xianzhong:'',
      biaoti:'',
      pingji:'',
      reso:'',
      shio:'',
      data1:'',
      genderp:{
        'M':'男',
        'F':'女'
      },
      shebao:{
        '1': '有',
        '0': '无'
      },
      rtt:'',
      huu:'',
      data2:'',
      type1:[],
      type2:[],
      type3:[],
      birthday:'',
      nianfen:'',
      age:'',
      type4:[],
      cang:'',
      yin:'',
      show:'',
      pruductype:'',
      accidentone:'-',
      one1:'-',
      accidenttwo:'-',
      two1:'-',
      three:'-',
      isshow:true,
      three1:'-',
      label:'',
      four:'-',
      four1:'-',
      five:'-',
      five1:'-',
      six:'-',
      six1:'-',
      tyzz:'',
      idzhi:'',
      yingw:'',
      age:'-',
      tu:{},
      age1:'-',
      seven:'-',
      seven1:'-',

      }
  },
  methods:{
    back(){
      history.back()
    },
    tiaozhuan(e){
      console.log('0000');
       var that = this;
         console.log(e);
          this.chuxian = true;
          this.$message({
            message:e,

          })

    },

    duih(){
      this.$router.push({
            path:'/HelloWorld',
            query:{
              su1:this.$route.query,
              id:this.idzhi,
              type:'3',
              data:this.reso
            }
          })
    },
    health(){
      this.$router.push({
            path:'/health',
            query:{
              type:this.$route.query.bu
            }

          })
    },
    close(){
        this.shio='',
        this.indexid=''
    },
    fuwu(e){
      if (this.isshow) {
        this.isshow=!this.isshow
        $('.product span').className='span2'
      }else{
        this.isshow=!this.isshow
        $('.product span').className='span1'

      }
      this.indexid = e;
      // $('.yeye').css('display', 'block');
      console.log(this.indexid);
        $('.yop h3').addClass('iop')
        // this.pingji = this.wenhao.server
          this.shio='shio'
        //   this.biaoti = this.wenhao.pin
        // this.show1 = false;
        // this.show = true;
        // this.show2 = true;
    },

},
mounted:{


},

  created(){

    var that = this;

    var k = this.$route.query;
    console.log(this.$route.query);
    localStorage.setItem('yiproduct', JSON.stringify(this.$route.query.chanpin))
    var kl = JSON.parse(localStorage.getItem('yiproduct'));
    console.log(kl);
      that.label = k.label;
    that.tyzz = this.$route.query.buty;
    that.rtt = this.$route.query.chanpin;
    that.rty = this.$route.query.buty;
  var plansId = JSON.parse(localStorage.getItem('chanPinData')).planId;
     this.idzhi = plansId; //产品的planID
     console.log(plansId);
     this.typezhi = JSON.parse(localStorage.getItem('chanPinData')).productType
     this.axios.get(this.domain+'/commodity/getPlanList?productType=3',{headers:{"token":this.getCookie("token")}}).then(function(res) {

       if(res.data.isSuccess){
         console.log(res);
         console.log(res.data.result);
         that.reso = res.data.result;//20个意外险
        localStorage.setItem('liaoproduct', JSON.stringify(that.reso))
         for (var i = 0; i < res.data.result.length; i++) {
              if (res.data.result[i].planId==plansId) {

                that.accidentone = res.data.result[i].planName;
                that.accidenttwo = res.data.result[i].companyName;
                that.ur1 = res.data.result[i].applicationUrl

                that.data = res.data.result[i].coverages;
                console.log(that.data);

              }
         }

       } else if(res.data.errorCode == '10001'){
         this.login();
       } else {
         alert(res.data.errorMsg);
       }


       })

  }
}
</script>

<style lang="css" scoped>
.shuoo{
  position: fixed;
  top: 30%;
  left: 15%;
  width: 70%;

  border-radius: 3px 3px 3px 3px;
  background: white;
}
.shuo{
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: black;
  opacity: .5;

}
.yop{
 text-align: center;
 margin-top: 60px;
 display: flex;
 flex-direction: row;
}
.yop .opp{
 text-align: center;
  margin: 0 auto;
  margin-top: -20px;
}
.yop h3{
  font-weight: 600;
  margin-top: -4px;
  float: left;
  font-size: 42px;
}
.yop .opp .src1{
  height:50px;
  float: left;
  margin-top: -2%;
}
.yop .opp h3{
  float: left;
  font-weight: 700;
}
.yop .opp .src2{
  height: 50px;
  float: left;
}
.pingj{
  margin-top: 0px;
  text-align: center;
   width: 90%;
   margin-left: 15px;
  font-size: 32px;
}
.po{
  margin-top: 20%;
  text-align: center;
}
.po img{

  width: 10%;
  height: 10%;
}
.l-wei{
  position: fixed;
  bottom: 0;
  background: white;
  width: 99%;
  left: 0;
  right: 0;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.l-wei .baofei{

  padding-top: 20px;
  margin-left: -7px;
  width: 49%;
  font-weight: 700;
  padding-left: 3px;
  border: 1px solid #F3F3F3;
  border-right: 0;
  border-top: none;

}
.l-wei .baofei>p{
  text-align: center;
  height: 50px;
  border-right: 1px solid #F3F3F3;
  font-size: 32px;
}
.add{

  background: #F4D046;
  width: 100px;
}
.l-wei .baolia{
   text-align: center;
  margin-left: -15px;
  width: 49%;

  border-top: none;
  border-left: none;
}
.iop{
  margin-left: 20px;
}
.l-wei .baolia .meinian{
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
}
.baolia .toubao{
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
}
.baolia .toubao .to1{
  font-size: 32px;
  width: 40%;
  height: 70px;
  border: .5px solid #A5A5A5;
  line-height: 70px;
  margin-top: -10px;
  margin-left: 15px;
}
.baolia .toubao .to2{
  font-size:32px;
  width: 40%;
  height: 70px;
 font-weight: 400;
  line-height: 70px;
  margin-top: -10px;
  margin-left: 15px;
  background: #F4D046;
}
.l-wei .baoli{
  text-align: center;
  margin-left: -3px;
  width: 6rem;
}
.l-wei .baoli p{
  width: 90px;
}
.shaixuan{
  width: 100%;
}

.l-xia{
  margin-top: 50px;
  position: relative;
  width: 100%;
  border-top: 2px solid #F3F3F3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 2px solid #F3F3F3;
}

.l-xia img{
  width: 7%;
  height: 7%;
  margin-top: 40PX;
}
.l-xia .right{
  width: 80%;
  text-align: left;
}
.l-xia .right>p{
  font-size: 1.2rem;
}
.r-xia{
  margin-top: -20px;
  height: 30px;
}
.r-xia p{

  float: left;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.l-table{

  width: 99%;
  border-right: 1px solid #E7E7E7;
  margin-bottom: 250px;
}

.th1{
  text-align: center;
  width: 50%;
  font-size: 32px;
  border-right: 1px solid #F6D763;
}
.th2{
  text-align: center;
  font-size: 32px;
  width: 50%;
}
.hy{
  margin-left: 14px;
}
.th3{
  width: 30%;
}


.hs{
  margin-left: 10px;
  width: 150%;
  flex: 0 1 auto;
  display: flex;
  flex-direction: row;
}

.l-duititle{
  position: fixed;
  top:50px;
  background: white;
  z-index: 100;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;

}

.l-duititle .lia{
  position: relative;
  margin-top: 5px;

  flex: 0 1 auto;
   width: 30%;
  margin-right: 0px;
}
.lia p{
  margin-right: 50px;
  width: 50px;
  color: #A1A1A1;

}
.l-duititle .lia img{
  top: 20px;
  position: absolute;
  right: 10px;
  width: 30%;
  height: 25%;
}
.l-title{
    background: white;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    display:flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid #E7E7E7;
}
.l-title img{

  width: 10%;
  height: 90%;
  flex: 0 1 auto;
}
.l-title p{
  font-size: 32px;
  text-align: center;
   width: 80%;
  flex: 0 1 auto;
}
.shaixuan{
  position: absolute;
  background: white;
  top: 50px;
  left: 0;
}
.shaixuan .hs{
  width: 65%;
  float: left;
}
.shaixuan .lia{
  position: fixed;
  right: 20px;
  z-index: 100;
  margin-left: 20px;
  margin-top: 5PX;
  width: 20%;
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.shaixuan .lia img{
  margin-left: 0px;
  flex: 0 0 auto;
  width: 30%;
  height: 20%;
}
.shaixuan .lia p{
  margin-left: 40px;
  width: 35px;
  flex: 0 0 auto;
  margin-right: 0;
}

.tiaokuan{
  line-height:100px;
  border-bottom: 1px solid #E7E7E7;
  height: 100px;
  width: 200%;
  font-size: 32px;
  text-align: center;
  border-left: 1px solid #E7E7E7;
}
.cesuan{
  line-height:100px;

  height: 100px;
  /*width: 200%;*/
  font-size: 30px;
  text-align: center;
  color: #414141;
  font-weight: 600;
}
.app-w{
/*margin-top:120px;*/
padding-top: 20px;
}
.tupian{

  width: 100%;
  height: 700px;
}
.tupian img{
   position: relative;
   left: 40%;
  top: 50%;


}
.baolia .toubao .to2 a{
  color: black;
  text-decoration: none;
}
.suggestion{
  list-style: none;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      margin: 0.266667rem auto;
      padding: 0;
      width: 90%;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-shadow: 0 0.053333rem 0.106667rem 0.066667rem #F9F9F9;
      box-shadow: 0 0.053333rem 0.106667rem 0.066667rem #F9F9F9;
      height: 200px;

}
.suggestion b{
  display: block;
  height: 100px;
  width: 3px;
  background: #F7F7F7;
}
.suggestion-left>div{
  display: flex;
  flex-direction: row;
}
.suggestion-left>div>h2{
  font-size: 48px;
  color: #EBBB00;
margin: 0;
}
.suggestion-left>div>p{
  font-size: 26px;
  color: #EBBB00;
margin: 0;
padding-top: 20px;
}
.suggestion-left>p{
  margin:0;
  font-size: 30px;
  color: #414141;
  text-align: center;
}
.suggestion-right{
  margin-top: 10px;
}
.suggestion-right .one,.suggestion-right .two{
  display: flex;
  flex-direction: row;
}
.one-left{
  display: flex;
  flex-direction: row;
}
.one-left span{
  display: inline-block;
  height: 50px;
  font-size: 30px;
  color: #808080;

}
.one-right{
  display: flex;
  flex-direction: row;
    margin-left: 20px;
}
.oneone{
  display: flex;
  flex-direction: row;
    margin-left:70px;
}
.one-right span{
  font-size: 30px;
  color: #808080;

}
.one-right p{
  font-size: 30px;
  color: #414141;
  margin: 0;
  margin-left: 20px;


}
.one-left p{
  margin: 0;
  font-size: 30px;
  color: #414141;
  margin-left: 20px;

}
.product{
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 95%;
  margin-left: 20px;
  justify-content: space-around;

  height: 100px;
}
.product p{

  margin: 0;
}
.product p:nth-of-type(2){
  width: 70%;
  text-align: right;
  /*padding-top: 30px;*/
  font-size: 30px;
  color: #414141;
}
.product p:nth-of-type(1){
  height: 100px;
  font-size: 30px;
  color: #414141;
  line-height: 100px;
}
.product:nth-child(even){
  background: #F6F6F6;
}
.product span{
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #414141;
}
.xia{
  width: 100%;
  height: 20px;
  background: #F7F7F7;
}
.xiay{
  width: 100%;
  height: 20px;
  background: #F7F7F7;
  margin: 0;
}
.tell-top{
  width: 95%;
  /*display: flex;
  flex-direction: row;*/
}
.tell-top>div>img{
  margin-left: 20px;
  width: 44px;
  height: 46px;
}
.tell-top>div{
  width: 100%;
  display: flex;
  flex-direction: row;
}
.tell-top>div>p{
  font-size: 30px;
  margin: 0;
  margin-left: 20px;
}
.tell{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.you{
  font-size:28px;
  color: #808080;
  width: 70%;
  margin-left: 20px;
}
.tell>img{
  width: 20px;
  height: 40px;
}
.wei{
  background: white;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.wei p{
  text-align:center;
border:2px solid #FEDE60;
padding:10px 40px;
background:#FEDE60;
width:150px;
line-height: 50px;
height:50px;
border-radius:45px;
font-size: 28px;
color: #7A675A;

}

.xia:nth-of-type(2){
  margin-bottom: 110px;
}
.yeye{
  color: #808080;
  font-size: 28px;
  width: 90%;
  margin-left: 35px;
  padding-bottom: 20px;
  margin-top: 0;
}
.yeye p{
  margin: 0;
}
.product-zong:nth-child(even){
    background: #F6F6F6;
}
.shang-l{
  z-index: 10000;
  display: flex;
  flex-direction: row;
  width:70%;
  margin-left: 30px;
}
.shang-l p{
    z-index: 10000;
  margin: 0;
  font-size: 30px;
  margin-bottom: 20px;
  color: #414141;
}
.shang-l p:nth-of-type(2){
  margin: 0;
  margin-left: 20px;
}
.shangbian h1{
  font-size: 40px;
  font-weight: 550;
margin-bottom: 50px;
margin-left: 30px;
color: #414141;
}
.shangbian{
  position: relative;
  padding-top: 30px;
  background: #FDE265;
  padding-bottom: 40px;
}
.shangbian img{
position:absolute;
left: 68%;
bottom: 40px;
}
.wei p a{
  color: #7A675A;
  text-decoration: none;
}
</style>
