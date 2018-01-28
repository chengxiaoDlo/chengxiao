<template lang="html">
  <div class="">


  <div class="">
    <div class="l-title">
       <img @click='back()' src="static/f1.png" alt="">
       <p @click='change(1)'>产品对比</p>
    </div>
    <div class="l-duititle">
      <!-- <div class="hs">
        <img v-if='touXiang' :src="'static/' +zhaopian[touXiang.memberType+'_'+touXiang.gender] +'.png'" alt="">
        <h4>重疾险</h4>
        <h4>产品对比结果</h4>
      </div> -->
      <div class="hs">
        <p class="message">投保信息:</p>
        <p class="zuhe">{{genderp[gender+'']}}/{{age}}岁</p>
      </div>

       <div class="lia">
         <p>筛选产品</p>

         <span class="lia-one" v-if='pp' @click='xiala1()'></span>
         <span class="lia-two" v-else @click='xiala()'></span>
       </div>

    </div>
    <!-- 产品名称 -->
    <div v-if="yin=='yin'" class="tr1">
       <p class="th1">产品名称</p>
         <p class="th2">{{one1}}</p>
       <p class="th3">{{one}}</p>

    </div>
    <table v-if="yin=='yin'" class="l-table">

      <!-- 保险公司 -->
      <tr class="tr">
         <td class="td1">保险公司</td>
         <td class="td2">{{two1}}</td>
         <td class="td3">{{two}}</td>
      </tr>
    </table>
      <div v-if="yin=='yin'" class="l-zong">


      <div class="l-middle">
           <div v-for='item5 of data1'  class="littleMiddle">
                <div class="l-left">
                    {{item5.coverageName}}
                    <img @click='fuwu(item5.id)' v-if='item5.coverageDesc' src="static/que.png" class="img1" alt="">
                </div>
                <div class="l-mid">
                    <div v-if='item5.coverageContent' class="">
                      {{item5.coverageContent}}
                   </div>
                   <div v-else class="">
                        -
                   </div>
                </div>
           </div>
      </div>
      <div class="l-right">
        <div v-if='item6.coverageContent' v-for='item6 of data2' class="">
            {{item6.coverageContent}}
        </div>
        <div v-else class="">
           -
        </div>
      </div>
        </div>
      <table v-if="yin=='yin'" class="l-table">
      <div class="cesuan">
          保费测算
      </div>

      <!-- 保费测算 -->
      <!-- 缴费年限 -->
      <!-- <tr class="tr">
         <td class="td1">有无社保</td>
         <td class="td2">{{shebao[sus.hasSocialInsurance+'']}}</td>
         <td class="td3">{{shebao[sus.hasSocialInsurance+'']}}</td>
      </tr> -->
      <!-- <tr class="tr">
         <td class="td1">保额</td>
         <td class="td2">{{(sus1.sumInsured)/10000}}万</td>
         <td class="td3">{{(sus1.sumInsured)/10000}}万</td>
      </tr> -->
      <tr class="tr">
         <td class="td1">缴费年限</td>
         <td class="td2">{{(sus1.paymentPeriod)}}年</td>
         <td class="td3">{{(sus1.paymentPeriod)}}年</td>
      </tr>
      <!-- <tr class="tr">
         <td class="td1">保障期限</td>
         <td class="td2" v-if='sus1.insurancePeriod'>{{(sus1.insurancePeriod).substr(0,(sus1.insurancePeriod).indexOf('Y'))}}年</td>
         <td class="td3" v-if='sus1.insurancePeriod'>{{(sus1.insurancePeriod).substr(0,(sus1.insurancePeriod).indexOf('Y'))}}年</td>
      </tr> -->
      <tr class="tr">
         <td class="td1">性别</td>
         <td class="td2">{{genderp[gender + '']}}</td>
         <td class="td3">{{genderp[gender + '']}}</td>
      </tr>

      <!-- 性别 -->
      <tr class="tr">
         <td class="td1">年龄</td>
         <td class="td2">{{age}}岁</td>
         <td class="td3">{{age}}岁</td>
      </tr>
      <tr class="tr">
         <td class="td1">是否抽烟</td>
         <td class="td2">{{smoke[smoking+'']}}</td>
         <td class="td3">{{smoke[smoking+'']}}</td>
      </tr>
    </table>
    <div v-if="yin=='yin'" class="l-wei">
       <div class="baofei">
           <p>保费</p>
       </div>

       <div class="baoli">
         <p v-if='fei2!=null'>{{fei2.substr(0,fei2.indexOf('.00'))}}元/年</p>
         <p v-if="ur2.indexOf('h')>-1" class="add">
           <a :href="ur2">我要投保</a>
         </p>
         <p v-else @click='show3(ur2)' class="add">我要投保</p>
       </div>
       <div class="baolia">
           <p v-if='fei1!=null'>{{fei1.substr(0,fei1.indexOf('.00'))}}元/年</p>
           <p v-if="ur1.indexOf('h')>-1" class="add">
             <a :href="ur1">我要投保</a>
           </p>
           <p v-else @click='show2(ur1)' class="add">我要投保</p>
       </div>
    </div>
       <transition name="fade">
          <div v-if='shaio' class="shaixuan">
        <div v-for='item of dataliu' class='list'>

          <div class='all'>
            <span class="anxin an">{{item.companyName}}</span>
            <div class='left'>
              <div class='top-mid'>
                <p class="top-midtext">{{item.planName}}</p>
              </div>

            </div>

            <div class='right'>
              <img @click='chan1(item.planId)' v-if="show.indexOf(item.planId)!=-1" src="static/check.png"></img>
              <img v-else @click='chan1(item.planId)' src="static/nocheck.png"></img>

            </div>
          </div>
        </div>


         </div>
       </transition>
       <div v-if="shio=='shio'" class="shuo">

       </div>

       <div v-for='item1 of data1' v-show='indexid==item1.id' class="shuoo">
         <img class="chahua" src="static/chahua.png" alt="">
         <div class="yop">
           <div class="opp">


             <h3>『{{item1.coverageName}}』</h3>


           </div>
         </div>
           <p class="pingj">{{item1.coverageDesc}}</p>
           <img class="imgshow" @click='close()' src="static/xiala.png" alt="">
           </div>
  </div>
  <!-- <div v-else class="tupian">
    <img src="static/loading.gif" alt="">
  </div> -->
  </div>
</template>

<script>
var yu;
var plkan;
export default {
  data(){
    return{
      genderp:{
        'M':'男',
        'F':'女'
      },
      smoke:{
        '1': '是',
        '0': '否'
      },
      datali:[],
      smoking:'',
      fei1:'',
      fei2:'',
      sus:'',
      sus1:'',
      feifei:'',
      idz:'',
      data1:'',
      pp:false,
      touXiang: '',
      pro1: [],
      pro3: [],
      resulo:'',
      ur1:'',
      ur2:'',
      pro4: [],
      pro2: [],
      ss:'sd',
      mingcheng:'',
      dat:'',
      hu:'fr',
      shoew:'',
      aa:'',
      bb:'',
      cc:'',
      dd:'',
      ee:'',
      ff:'',
      gg:'',
      zhaopian:{
        '0_M':'M',
        '0_F':'F',
        '1_M':'M',
        '1_F':'F',
        "3_M":'S',
        '3_F':'D'
      },
      uig:"",
      shaio:false,
      type1:[],
      type2:[],
      type3:[],
      type4:'',
      tyzz:'',
      cang:'',
      yin:'yin',
      pruductype:'',
      one:'-',
      one1:'-',
      two:'-',
      two1:'-',
      three:'-',
      three1:'-',
      indexid:'',
      four:'-',
      four1:'-',
      five:'-',
      five1:'-',
      six:'-',
      daya1:'',
      daya2:'',
      dataliu:'',
      shebao:{
        '1': '有',
        '0': '无'
      },
      data1:'',
      data2:'',
      six1:'-',
      age:'-',
      woyin:true,
      age1:'-',
      show: [],
      seven:'-',
      gender:'',
      seven1:'-',
      nianfen:'',
      age:'',
      birthday:'',
              biaoti:'',
              pingji:'',
              shio:'',
      // 接口转换字典

    }
  },
  methods:{
    fuwu(e){
      console.log(e);
      console.log(this.data1);
      this.indexid = e;
      console.log(this.indexid);
        $('.yop h3').addClass('iop')
        // this.pingji = this.wenhao.server
          this.shio='shio'
        //   this.biaoti = this.wenhao.pin

    },
    show2(e){

       var that = this;
         console.log(e);

          this.$message({
            message:e,

          })

    },
    show3(t){

       var that = this;
         console.log(t);
      this.$message({
            message:e,

          })

    },
    chan1(e) {

        //
     var that =this;
      if (this.show.indexOf(e) == -1) {
        if (this.show.length < 2) {
          this.show.push(e)
          console.log(this.show);
        }
        if (this.show.length >=2) {
          this.shaio = false
          this.ss = 'sd';
          this.woyin = true


          this.yin = 'yin'
          this.pp = false;

               that.dataliu = this.dat;
              for (var v = 0; v < that.dataliu.length; v++) {
                console.log(that.dataliu);

                  if (that.dataliu[v].planId == that.show[0]) {
                    console.log(that.one);
                      that.one = that.dataliu[v].planName
                      that.two = that.dataliu[v].companyName
                        that.ur1 = this.dat[v].applicationUrl
                      that.data1 = that.dataliu[v].coverages;
                      console.log(that.data1);
                  }
                  if (that.dataliu[v].planId == that.show[1]) {
                      console.log(that.one1);
                      that.one1 = that.dataliu[v].planName
                      that.two1 = that.dataliu[v].companyName
                      that.ur2 = this.dat[v].applicationUrl
                      that.data2 = that.dataliu[v].coverages;
                      console.log(that.data2);
                  }



              }
              $.ajax({
                         url: that.domain+'/commodity/getPremium',
                         type:"POST",//请求方法
                         headers : { 'content-type' : 'application/json',"token":that.getCookie("token") },
                         data:JSON.stringify({
                           'planId':that.show[0],
                           "birthday":that.age,
                           "sumInsured":that.sus1.sumInsured,
                           "insurancePeriod":that.sus1.insurancePeriod,
                           "paymentPeriod":that.sus1.paymentPeriod,
                           "isSmoking":that.smoking
                         }),
                         success: data => {
                              console.log(data);
                              console.log(data.result.amount);
                              that.fei1 = data.result.amount;
                         },
               })
               $.ajax({
                          url: that.domain+'/commodity/getPremium',
                          type:"POST",//请求方法
                          headers : { 'content-type' : 'application/json',"token":that.getCookie("token") },
                          data:JSON.stringify({
                            'planId':that.show[1],
                            "birthday":that.age,
                            "sumInsured":that.sus1.sumInsured,
                            "insurancePeriod":that.sus1.insurancePeriod,
                            "paymentPeriod":that.sus1.paymentPeriod,
                             "isSmoking":that.smoking
                          }),
                          success: data => {
                            console.log(data);
                               console.log(data.result.amount);
                               that.fei2 = data.result.amount;
                          },
                })


           this.tyzz = '';




        }
      } else {
        this.show.forEach((item, index, arr) => {
          if (item == e) {
            this.show.splice(index, 1)
          }
        });
      }
    },
    // 保障期限

    close(){
      this.shio='',
      this.indexid=''
    },

    back(){
      history.back()
    },

    xiala(){
        //
      var that = this;
      this.shaio = true,
      console.log(this.shaio);
      this.se='se',
      console.log(this.se);
      this.woyin = false,
      console.log(this.$route.query);
      this.pp=true;
      // this.idz = this.$route.query.rou + '';
      // console.log(this.show);
      // this.uig = this.$route.params.id;



                   that.dataliu =this.dat;
                    console.log(that.dataliu);
                     for (var v = 0; v < that.dataliu.length; v++) {
                       console.log(that.dataliu);


                     }


      this.ss = '';

      this.yin = {
        opacity:0.1
      }
      this.cang = {
        display:'none'
      }
    },

    xiala1(){
      this.shaio = false,
      this.se = '',
      this.ss = 'sd';
      this.tyzz='',
      this.idz='';
      this.pruductype = '',
      this.yin ='yin'

      this.pp = false;
}
  },
  created(){
var that = this;
    // 更换头像
    console.log(JSON.parse(localStorage.getItem('chanP')));
    console.log(this.$route.query);
    this.age =  JSON.parse(localStorage.getItem('ageXIng')).age
    this.gender = JSON.parse(localStorage.getItem('ageXIng')).gender
    this.smoking = JSON.parse(localStorage.getItem('ageXIng')).isSmoking
    // this.touXiang = this.$route.query.huan.su1.child;
    console.log(this.touXiang);
    // var tob = JSON.parse(localStorage.getItem('yiwai'))
// JSON.parse(localStorage.getItem('yiwai'))
  //  this.sus1 = this.$route.query.huan.su1.chanpin;

  this.sus1 = JSON.parse(localStorage.getItem('chanPinData'));
  console.log(this.sus1);
  this.dat = JSON.parse(localStorage.getItem('showproduct'));
    that.tyzz = this.$route.query.rou;
    if (this.$route.query.rou=='1') {
         this.mingcheng = "重疾险"
    }else if (this.$route.query.rou=='2') {
          this.mingcheng = "意外险"
    }else if (this.$route.query.rou=='3') {
            this.mingcheng = "医疗险"
    }else if (this.$route.query.rou=='4') {
            this.mingcheng = "定期寿险"
    }
    this.touXiang = this.$route.query.gender;
     var plansId =this.$route.query.planId
     console.log(plansId);
    //  var first = this.idDictionary[plansId[0]];
    //  console.log(first);
    //  var second = this.idDictionary[plansId[1]];

         for (var i = 0; i <this.dat.length; i++) {

           if (this.dat[i].planId == plansId[0]) {

                             that.one = this.dat[i].planName;
                             console.log(that.one);
                             that.two = this.dat[i].companyName;
                               that.ur1 = this.dat[i].applicationUrl
                             that.data1 = this.dat[i].coverages;
                             console.log(that.data1);

              }
              if (this.dat[i].planId == plansId[1]) {

                      that.one1 = this.dat[i].planName;
                      that.two1 = this.dat[i].companyName;
                       that.ur2 = this.dat[i].applicationUrl
                      that.data2 = this.dat[i].coverages;
                      console.log(that.data2);

                     }

         }


         $.ajax({
                    url: that.domain+'/commodity/getPremium',
                    type:"POST",//请求方法
                    headers : { 'content-type' : 'application/json',"token":that.getCookie("token") },
                    data:JSON.stringify({
                      'planId':plansId[0],
                      "birthday":that.age,
                      "sumInsured":that.sus1.sumInsured,
                      "insurancePeriod":that.sus1.insurancePeriod,
                      "paymentPeriod":that.sus1.paymentPeriod,
                      "isSmoking":that.smoking
                    }),
                    success: data => {
                         console.log(data);
                         console.log(data.result.amount);
                         that.fei1 = data.result.amount;
                    },
          })
          $.ajax({
                     url: that.domain+'/commodity/getPremium',
                     type:"POST",//请求方法
                     headers : { 'content-type' : 'application/json',"token":that.getCookie("token") },
                     data:JSON.stringify({
                       'planId':plansId[1],
                       "birthday":that.age,
                       "sumInsured":that.sus1.sumInsured,
                       "insurancePeriod":that.sus1.insurancePeriod,
                       "paymentPeriod":that.sus1.paymentPeriod,
                       "isSmoking":that.smoking

                     }),
                     success: data => {
                       console.log(data);
                          console.log(data.result.amount);
                          that.fei2 = data.result.amount;
                     },
           })

},
watch:{
  '$route':{
    handler(newV, oldV) {
      console.log(oldV);
    },
    deep:true
  }
},
}
</script>

<style lang="css" scoped>
.all img{
  margin-left: 10px;
  width: 20%;
  height: 20%;
}
.shuo{
  z-index: 101;
}
.shuoo{
  position: fixed;
  top: 30%;
  left: 15%;
  width: 70%;
z-index: 106;
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
  font-size:36px;
  color: #EBBB00;
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
  font-size: 28px;
}
.po{
  margin-top: 20%;
  text-align: center;
}
.po img{

  width: 10%;
  height: 10%;
}
.tr .td1{
  font-size: 28px;
  color: black;
}
.tr .td2{
  font-size: .8rem;
  color: black;
}
.tr .td3{
  font-size: .8rem;
  color: black;
}
.l-table{
  overflow: hidden;
  margin-bottom: 170px;
  width: 99%;
  border-right: 1px solid #E7E7E7;
}
.list:first-child{
  margin-top: 20px;

}
.l-wei{
  height: 170px;
  position: fixed;
  bottom: 0;
  left: 0px;
  background: white;
  width: 100%;
  border-left: 1px solid #F5F5F5;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.l-wei .baofei{
  padding-top: 20px;
  margin-left: -14px;
  width: 44%;
  text-align: center;
  padding-left: 3px;
  font-size: 32px;
  /*border: 1px solid #F4F4F4;*/
  border-top: none;

}
 .add{
   margin-left: 10px;
  height: 80px;
  line-height: 80px;
  background: #F4D046;
  width: 80%;
  font-size: 32px;
  position: absolute;
  bottom: -.4rem;
  text-align: center;

}
.l-wei .baolia{
  position: relative;
   text-align: center;
   width: 40%;
  border: 1px solid #F3F3F3;
  border-top: none;
  border-left: none;
}
.l-wei .baolia .add1{

  margin: 0 auto;
  font-weight: 700;
  width: 80%;
}

.l-wei .baolia p{
  font-size: 32px;
width: 80%;
margin-left: 10px;
}
.l-wei .baoli{
  position: relative;
 font-size: 32px;
  text-align: center;
  margin-left: -3px;
  width: 38%;
}
.l-wei .baoli .add1{
  margin: 0 auto;
    font-weight: 700;
    width: 80%;
  font-size: 32px;
  height: 40px;
  font-weight: 700;
  /*position: absolute;
  bottom: 40px;*/
}
.l-wei .baoli p{
 width: 80%;
  font-size: 32px;
}
.shaixuan{
  width: 100%;
  margin-top: 150px;
}

.l-xia{
  position: relative;
  width: 100%;
  border-top: 2px solid #F3F3F3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 2px solid #F3F3F3;
}
.l-wei .baolia p{
  margin-left: 30px;
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

.tr1{
  text-align: center;
  height:140px;
  margin-top: 220px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 99%;
  color:#4E4E4E;

  background:#FADF76;
}
.th1{
  height: 40px;
  font-size: 32px;
  width: 30%;
  text-align: center;
   margin-top: 50px;
}
.th2{
  font-size: 30px;
   width: 30%;
}
.hy{
  margin-left: 14px;
}
.th3{
  font-size: 30px;
  width: 30%;

}
.td1,.td3{
  position:relative;
  width:100px;

  text-align:center;
  word-wrap:break-word;
  border-left:1px solid #E7E7E7;
  border-bottom:1px solid #E7E7E7;
  font-size:28px;
  color:#9D9D9D;
  padding-top:10px;
  padding-bottom:10px;

}
.td2{
  position:relative;
  width:100px;
  text-align:center;
  word-wrap:break-word;
  border-left:1px solid #E7E7E7;
  border-bottom:1px solid #E7E7E7;
  font-size:26px;
  color:#9D9D9D;
  padding-top:.5rem;
  padding-bottom:.5rem;
}
.hs{
  margin-top: 5px;
  margin-left: 10px;
  width: 90%;
  flex: 0 1 auto;
  display: flex;
  flex-direction: row;
}
.hs h4{
  margin-top: 20px;
  font-size: 32px;
}
.hs img{
  width: 12%;
  height: 90%;
}

.l-duititle{
  position: fixed;
  top:100px;
  background: white;
  z-index: 999;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  left:0;
  justify-content: space-around;

}

/*.l-duititle .lia{
  position: relative;
  margin-top: 20px;

  flex: 0 1 auto;
   width:50%;
  margin-right: 0px;

}*/
.lia{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 180px;
  height: 60px;
  margin-right: 20px;
  border: 2px solid #EBBB00;
  border-radius: 25px;
  color:#EBBB00;
  font-size: 26px;
  margin-top: 20px;
  padding-left: 20px;

}
.lia .lia-one{
    width: 0;
    height: 0;
    border-left: 0.133333rem solid transparent;
    border-right: 0.133333rem solid transparent;
  border-bottom: 0.133333rem solid #EBBB00;
}
.lia .lia-two{
    width: 0;
    height: 0;
    border-left: 0.133333rem solid transparent;
    border-right: 0.133333rem solid transparent;

      border-top: 0.133333rem solid #EBBB00;
}
/*.lia p{
  font-size: 32px;
  margin-right: 30%;
  width: 80%;
  color: #A1A1A1;
  margin-top: 10px;

}
.l-duititle .lia img{
  top: 20px;
  position: absolute;
  right: 50px;
  width: 20%;
  height: 25%;
}*/

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
    z-index:999;
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
  z-index: 200;
  position: absolute;

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
  margin-top: 15px;
  width: 30%;
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.shaixuan .lia img{
  position: absolute;
  top:-80px;
  right: 0px;
  margin-left: 0px;
  flex: 0 0 auto;
  width: 42px;
  height: 32px;

}
.shaixuan .lia p{
  margin-left: 40px;
  width: 70%;
  flex: 0 0 auto;
  margin-right: 0;
  margin-top: -110px;
}
.tr {
  position: relative;
  width: 100%;

}
.l-left .img1{
  position: absolute;
  right: 0;
  top: 0;
  height: 32px;
  width: 32px;
}
.tr .td1 .img2{
  position: absolute;
  right: 0;
  height: 40%;
}
.tr .img3,.tr .img4{
  position: absolute;
  right: 0;
  height: 40%;
}
.tr .img5{
  position: absolute;
  right: 0;

  height: 40%;
}
.tr .td1{
  /*width: 60%;*/
  font-size: 32px;
  text-align: center;
}
.tr .td1 p{
  width:60%;
  margin: 0 auto;
}
.tr .td2{
  width: 33%;
  font-size: 28px;
}
.tr .td3{
  width: 33%;
  font-size: 28px;
}
.tr .td1{

}

.tiaokuan{
  line-height:100px;
  border-bottom: 1px solid #E7E7E7;
  height: 100px;
  width: 100%;
  font-size: 32px;
  text-align: center;
  border-left: 1px solid #E7E7E7;
}
.cesuan{
  line-height:100px;
  border-bottom: 1px solid #E7E7E7;
  height: 100px;
  width:300%;
  font-size: 32px;
  text-align: center;
  border-left: 1px solid #E7E7E7;
}
.all img{
  margin-top: 30px;
}
.l-title p {
  text-align: center;
  width: 80%;
  flex: 0 1 auto;
}

.l-top-top {
  width: 100%;
  height: 12px;
  border-radius: 10% 10% 5% 5%;
  background-color: #FADF76;

}

.list {
  margin-bottom: 1rem;
  width: 100%;
  height: 140px;
  margin-bottom: 1rem;
  margin-top: .4rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.14);
}

.all {
  width: 100%;
margin-top: 30px;
  display: flex;

}
.lihe{
  height: 60px;
}

.right img {
  width: 15px;
  height: 15px;
  margin-top: 15px;
  position: absolute;
}

.top-midtext {
  text-align: left;
  padding-left: 10px;
  font-size: 1.2rem;
  color: #414141;
}

.top-foot {
  width: 200px;
  padding-left: 10px;
  text-align: left;
  margin-left: 26rpx;
  margin-top: -20px;
}

.foottip1 {
  display: flex;
  flex-direction: row;
  height: 2rem;
  padding-left: 1rem;

}

.left {
  width: 70%;
  height: 50px;
  margin-top: 70px;
  font-size: 32px;
}


.foottip2 {
  display: flex;
  flex-direction: row;
  height: 2rem;
  padding-left: 1rem;
}

.right {
  position: relative;
  margin-right: .1rem;
  margin-top: 2.4rem;
  height: 50px;
  width:30px;
  background-color: #fff;
  border-left: 1px solid #DFDFDF;
}
.right img{
  position: absolute;
  left: 15px;
  top: 7px;
}
.anxin {
  background: #FADF76;
  display: inline-block;
  border: 1px solid #E8E8E8;
  border-radius: 50% 50%;
  margin-top:90px;
  height: 10%;
  width: 10%;
  box-shadow: 2px 2px 2px 2px #FAFAFA;
  font-size: 26px;
  padding-top:16px;
  margin-left: .5rem;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  /*line-height: 150%;*/
  text-align: center;
  padding: 0 auto;
}
.list {
  margin-bottom: 1rem;
  width: 100%;
  height: 300px;
  margin-bottom: 1rem;

  margin-top: .4rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.14);
}

.all {
  position: relative;
  width: 100%;

  display: flex;

}

.right img {
  width: 50px;
  height: 50px;
  margin-top: 15px;
  margin-left: 25px;

}

.top-midtext {
  text-align: left;
  padding-left: 10px;
  font-size: 32px;
  color: #414141;
}
.left .top-mid p{
  position: relative;
  padding-top: 10px;
  margin: 0 auto;
  font-size:36px;
  margin-top: 30px;
}
.top-foot {
  padding-left: 10px;
  text-align: left;
  margin-left: 26rpx;
  margin-top: -20px;
}

.foottip1 {
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  height: 50px;

}

.left {
  width: 63%;
  font-size: 42px;
}
.juzhong{
  margin-top: 100px;
  font-size: 40px;
}
.foottip2 {
  display: flex;
  flex-direction: row;
margin-left: 20px;
}

.right {
  text-align: center;

  margin-top: 120px;
  height: 80px;
  width: 50px;
  background-color: #fff;
  border-left: 1px solid #DFDFDF;

}
.littleMiddle{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.l-left{
    position: relative;
    width:52.5%;
    text-align: center;
    word-wrap: break-word;
    border-left: 0.013333rem solid #E7E7E7;
    border-bottom: 0.013333rem solid #E7E7E7;
    font-size: 0.373333rem;
    color: black;
    height: 50px;
    padding-top: .3rem;
    padding-bottom: .3rem;

}
.l-mid{
  height: 50px;
  position: relative;
  width: 50%;
  text-align: center;
  word-wrap: break-word;
  border-left: 0.013333rem solid #E7E7E7;
  border-bottom: 0.013333rem solid #E7E7E7;
  font-size: 0.346667rem;
  color: black;
  padding-top: .3rem;
  padding-bottom: .3rem;
}
.l-zong{
  border-right: 1px solid #E7E7E7;
  /*border-top: .5px solid #E7E7E7;*/
  margin-top: -175px;
  display: flex;
  width: 98.2%;
  flex-direction: row;
  margin-left: 4px;
}
.l-right{
float: left;
width: 33%;
}
.l-right div{
  height: 50px;
  position: relative;
  /*width:100%;*/
  text-align: center;
  word-wrap: break-word;
  border-left: 0.013333rem solid #E7E7E7;
  border-bottom: 0.013333rem solid #E7E7E7;
  font-size: 0.346667rem;
  color:black;
  overflow: hidden;
  padding-top: .3rem;
  padding-bottom: .3rem;
}
.l-middle{
  width: 67%;
}
.add a{
  text-decoration: none;
  color: black;
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
.message{
  color: #808080;
  font-size: 28px;
}
.zuhe{
  font-size: 28px;
  color: #414141;
  margin-left: 20px;
}
.imgshow{
  position: absolute;
  width: 52px;
  height: 246px;
  left:460px;
}
.chahua{
    position: absolute;
    top: -120px;

    width: 100%;
}

</style>
