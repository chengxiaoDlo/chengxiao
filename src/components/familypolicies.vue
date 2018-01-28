<template lang="html">
  <div class="">
    <!-- <div class="l-title">
          <img @click='back()' src="static/f1.png" alt="">
          <p @click='change()'>家庭保单</p>
     </div> -->
     <div class="policies">
         <h3>家庭保单</h3>
         <!-- <div @click='baodan()' class="search">
           <p>添加保单</p>
           <img src="static/enter.png" alt="">
         </div> -->
    </div>
    <div class="bao-xia">
       <div class="baoxia-left">
         <div class="ming">
           <h1>{{effective}}</h1>
           <span>份</span>
         </div>
           <p class="p1">有效保单</p>
       </div>
       <div class="juzhong">

       </div>
       <div class="baoxia-right">
         <div class="ming">
            <h1>{{feiyong}}</h1>
            <span>万元</span>
         </div>
           <p class="p1">有效保额</p>
       </div>
    </div>
     <div v-if='num=="-1"' v-for='child of data1' class="baos">

          <div v-if='child.policies.length>0' class="ul2" id="lplp" v-for='(rt,index) in child.policies'>
            <img :src="'static/' +zhaopian[child.memberType+'_'+child.gender] +'.png'" alt="">
             <p v-if='child.label' class="labelName">{{child.labelName}}</p>
             <p v-else class="labelName">未匹配</p>
            <div class="baos-lo">
              <div class="baos-l">

              </div>
            </div>

            <div class="ul2-two">
              <img v-if="rt.productType=='1'" src="static/zhongji.png" alt="">
              <img v-else-if="rt.productType=='2'" src="static/yiwai.png" alt="">
              <img v-else-if="rt.productType=='3'" src="static/yiliao.png" alt="">
              <img v-else="rt.productType=='4'" src="static/dingshou.png" alt="">
               <p>{{baoxianType[rt.productType + ''] }}</p>
               <p>{{youxiaos[index]}}</p>
                <!-- <p>{{youxiao}}</p> -->
             </div>
            <p class="xial"></p>
           <div class="ul2-right">
             <div class="two">
               <p>{{rt.productName}}</p>
             </div>

              <div class="ulop-left">
               <span>保额:</span>
               <p>{{(rt.sumInsured)/10000}}万</p>
             </div>

              <div class="ulop-right">
                <span>有效期:</span>
                <p v-if='rt.expirationDate'>{{rt.expirationDate}}</p>
                <p v-else>
                  至终身
                </p>
              </div>
              <p @click='name1(rt,child)'>[查看详情]</p>
            </div>
        </div>

           </div>

  </div>

</template>

<script>
function jsGetAge(end){
     console.log(end);

      var returnAge;
      if (typeof(end) == "undefined") {
        console.log('含税角度看');
         returnAge = '保障中';
         return returnAge
      }else {
        var strBirthdayArr=end.split("-");
        var startYear = strBirthdayArr[0];
        var startMonth = strBirthdayArr[1];
        var startDay = strBirthdayArr[2];
        var d = new Date();
        // console.log(d);

        var endYear = d.getFullYear();
        var endMonth =  d.getMonth() + 1;
        var endDay = d.getDate();
        if(endYear == startYear)
          {
            if ((parseInt(endMonth)*30+parseInt(endDay))-(parseInt(startMonth)*30+parseInt(startDay))<30) {
               returnAge = '快过期';
            }else {
               returnAge = '保障中';
            }
           }else {
             var ageDiff = endYear - startYear; //年之差
             if (ageDiff>0) {
                    returnAge = '已失效';

             }else {
               returnAge = '保障中';
             }
           }

      }
       return returnAge;
        }

export default {

  data(){
    return{
      num:-1,
      result:'',
      effective:'',
      youxiao:'',
      youxiaos:[],
      start:'',
      end:'',
      data1:'',
      feiyong:'',
      chu:'',
      zhaopian:{
        '0_M':'self',
        '0_F':'spouse',
        '1_M':'self',
        '1_F':'spouse',
        "3_M":'boy',
        '3_F':'girl'
      },
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
    },
    baodan() {
      // console.log(e);
      this.$router.push({
        path: '/addbao'

      })
      this.qule = 'e'
    },
    name1(e,f) {
      this.$router.push({
        path: '/xiang',
        query: {
          xinxi:e,
          // policyId:this.pocy,
          renyuan: f.labelName,

        }
      })
    }
  },
  created(){
    var that = this;
    var aodan=0;
    var youxiao =0;
    var baofei=0;
    var baoe=0;
    console.log(this.$route.query);
    this.result = this.$route.query.result.members;
    this.axios.get(that.domain+'/scheme/getFamilyScheme',{headers:{"token":this.getCookie("token")}}).then(function(res){
      if(res.data.isSuccess){
        var jsondatas = JSON.stringify(res);
        var sm = JSON.parse(jsondatas);
        console.log(sm.data.result);
        that.result = sm.data.result;
        that.data1 = sm.data.result.members;
        console.log(that.data1);

        for (var i = 0; i < that.data1.length; i++) {
        if (that.data1[i].policies.length>0) {
         for (var x = 0; x < that.data1[i].policies.length; x++) {
            that.start = that.data1[i].policies[x].expirationDate;
            that.end = that.data1[i].policies[x].effectiveDate;
            that.youxiao = jsGetAge(that.start)
            that.youxiaos.push(that.youxiao)
        }
     }
         for (var m = 0; m < that.data1[i].policies.length; m++) {
              aodan =  parseInt(aodan)+parseInt(that.data1[i].policies[m].sumInsured)/10000
              youxiao = parseInt(youxiao)+parseInt(1)
         }
         that.feiyong = aodan
         console.log(that.feiyong);
         that.effective = youxiao
         console.log(that.effective);
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
    border-bottom: 1px solid #E7E7E7;
}
.l-title img{

  width: 10%;
  height: 90%;
  flex: 0 1 auto;
}
.l-title p{
  line-height: 100px;
  font-size: 32px;
  text-align: center;
   width: 80%;
  flex: 0 1 auto;
}
.gaibia{
  color:#EDC013;
  border-bottom:1px solid #EDC013;
}
.box{
  margin-top: 100px;

}
#lplp{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-around;
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;

}
.labelName{
  position: absolute;
  top: -20px;
  margin-left: 15px;
  font-size: 32px;
  font-weight: 600;
}
/*.ul2-two{
  width:30%;
}*/
.ul2-right{
  width: 60%;
}
.policies{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}
.policies>h3{
  font-size:32px;
   width: 90%;
   color: #5B5B5B;
}
.search{
  display: flex;
  flex-direction: row;
  width: 25%;
  justify-content: space-around;
}
.search p{
  font-size: 28px;
  color: #929292;
}
.search img{
  height: 30%;
  width: 15%;
  margin-top: 35px;
  margin-left: 10px;
}
.bao-zhong{
  margin-bottom:100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bao-xia{
  /*margin-bottom:100px;*/
  display: flex;
  width: 70%;
  margin-left: 100px;
  flex-direction: row;
  justify-content: space-around;
}
.baoxia-left,.baoxia-right{
  width: 50%;
  flex: 0 1 auto;
  text-align: center;

}
.bao-left,.bao-right{
  width: 50%;
  flex: 0 1 auto;
  text-align: center;

}
.juzhong{
  height: 100px;
  width: 3px;
  background: #F7F7F7;
  margin-top: 60px;
}
.mingzi{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 100px;

}
.ming{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 65%;
  margin-left: 60px;

}
.mingzi h1{
  font-size: 64px;
  color: #EBBB00;
  font-weight: 400;
  /*width: 50%;*/
}
.ming h1{
  font-size: 64px;
  color: #EBBB00;
  font-weight: 400;

}

.mingzi span,.ming span{
  color: #EBBB00;
  font-size: 28px;
  display:block;
  /*width:40%;*/
  font-weight: 700;
  /*text-align: left;*/
  margin-top: 40px;
}
.bao-left .p1,.bao-right .p1{
  color: #6A6A6A;
  font-size: 28px;
}
.baoxia-left .p1,.baoxia-right .p1{
  color: #414141;
  font-size: 28px;
}
#lplp{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-around;
}
.ul2-two{
  /* width:30%; */
}
.ul2-two p:nth-of-type(1){
  font-size:32px;
  font-weight: 600;
  margin: 0;
  margin-left: 6px;
}
.ul2-two p:nth-of-type(2){
  border: 0.026667rem solid #A0A0A0;
    border-radius: 0.333333rem;
    height: 0.533333rem;
    line-height: 0.533333rem;
    font-size: 24px;
    width: 1.6rem;
    text-align: center;
    color: #414141;

    /* margin-left: 40px; */

}
.ul2-right{
  /*width: 50%;*/
}
.ulop-left{
  display: flex;
  text-align: left;
  flex-direction: row;
  align-items: center;
margin-left: 4px;
  width: 70%;
  text-align: left;
  margin-top: 20px;


}
.ulop-right{
  margin-left: 4px;
  display: flex;
  text-align: left;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  text-align: left;
}
.ulop-left span{
  font-size: 30px;
  color: #808080;
}
.ulop-right span{
  font-size: 30px;
  color: #808080;
}
.ulop-right p{
  font-size: 30px;
  margin: 0;
}
.ulop-left p{
  font-size: 30px;
  margin: 0;
}
.ulop-right span
.luoben{
  width: 100%;
  height: 200px;
  background: #F7F7F7;
  color: #969696;
}
.luoben p{
  width: 45%;
  text-align: center;
  margin: 0 auto;
padding-top: 70px;
}
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
  margin: 20px auto;
  padding: 0;
  width: 90%;
  align-items: center;
       box-shadow: 0 0.053333rem 0.106667rem 0.066667rem #F9F9F9;

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
.ul2 .two{
  float: left;
  /*width: 50%;*/
  margin-top: 10px;
  margin-bottom: 10px;
}
.ul2 .two p{
  padding: 0 10px;
  height: 50px;
  line-height: 50px;
  border-radius: 30px 30px 30px 30px;
  border: 3px solid #FADF76;
  font-size: 30px;
  /*width: 100%;*/
  margin: 0 auto;
  margin-top:10px;
  color: #EBBB00;
  text-align: center;

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
  margin-top: 100px;
position: relative;
  display: flex;
  flex-direction: column;

}
.baos-l{
  position: absolute;
  height: 150px;
  width: 150px;
  background: white;
  border-radius: 100%;
     box-shadow: 0 0.053333rem 0.106667rem 0.066667rem #F9F9F9;


}
.baos-lo{
  position: absolute;
  height: 95px;
  width: 250px;
  top: -90px;
  left: 270px;
  overflow: hidden;
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
.l-tui{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.l-tuitui{
  display: flex;
  flex-direction: row;
  align-items: center;
  width:30%;
  font-size: 28px;
}
.l-tuitui>p{
  font-size: 28px;
}
.chtui{
  font-weight: 700;
  width: 50%;
  color: #414141;
  font-size:32px;
  text-align: left;
  /*margin-left: -100px;*/
}
.chtui1{
  font-weight: 700;
  width: 79%;
  margin-left: 20px;
  font-size: 32px;
}

.tou{
  /*background: #FADF76;*/
}

.baos{
  margin-bottom: 30px;
}

.img img{
  height: 120px;
  width: 120px;

}
b{
  display: block;
  height: 20px;
  width: 100%;
  background: #F7F7F7;
}
.img p{
  font-size: 32px;
   width: 100px;
   font-weight: 600;
   margin: 0 auto;
}
.img{
  padding-top: 30px;
  width: 100%;
  text-align: center;
  height: 200px;
 margin-bottom: 100px;
}
    .ulon{
      list-style: none;
      height:150px;
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

      height: 50px;

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
      font-size: 36px;
      text-align: center;
      margin-top: -15px;
      margin-bottom: 0;
    }
.ulon li span{
  display: block;
  width: 100%;
  color: #ADADAD;
  font-size: 22px;

}
.wei{

  width: 100%;
  height:100px;
  text-align: center;
}
.wei img{
  width: 296px;
  height: 164px;
  margin-left:40px;
}
.ulop{
   list-style: none;
   display: flex;
   flex-direction: column;
/*justify-content: space-around;*/
align-items: center;
width:100%;
}
.ulop:nth-of-type(2){
   margin-top: 150px;
}
.ulop:nth-of-type(1){
   margin-top: 50px;

}

.ulops{
  width: 68%;
  position: relative;

}
.ulops img{

  top: -350px;
  position: relative;

}
.ulop .two p{
  /*margin-top: 30px;*/
  font-size: 30px;
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
.two-xia{
  margin-top: 30px;
  margin-bottom: 10px;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding-left: 40px;
}
/*.two-xia div{
  font-size: 30px;
  float: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}*/
.twoxia-left{
  text-align: center;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.twoxia-left div{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.twoxia-left div span{
  font-size: 30px;
  color: #838383;
}
.twoxia-left div p{
  font-size: 30px;
  margin: 0;
  margin-left: 10px;
}
.baoxia-right{
  text-align: center;
  width: 60%;
  display: flex;
  flex-direction: column;
}
.baoxia-right div{

  display: flex;
  flex-direction: row;
  align-items: center;
}
.baoxia-right div span{
  font-size: 30px;
  color: #ECBB00;
}
.baoxia-right div p{
  font-size: 30px;
  margin: 0;
  margin-left: 10px;
}
.ul2-two img{
  height: 0.48rem;
    width: 0.48rem;
    margin-left: 40px;
}
.xial{
  width: 0.053333rem;
background: #F7F7F7;
height: 2rem;
}
</style>
