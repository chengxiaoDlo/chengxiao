<template lang="html">
  <div class="l-home">
    <div class="l-home3">
      <img class="jia" src="static/jia2.png" alt="">
      <img class="U" src="static/U.png" alt="">
       <div class="imgsji">
         <div class="one">
           <img src="static/1t.png" alt="">
           <p>{{biaoqian[0].memberBiao3}}</p>
         </div>
         <div class="two">
           <img src="static/2t.png" alt="">
           <p>{{biaoqian[0].memberBiao4}}</p>
         </div>
         <div class="three">
           <img src="static/3t.png" alt="">
           <p>{{biaoqian[0].age}}后</p>
         </div>
          <div v-if='biaoqian[0].homeNu=="无债一身轻"' class="four">
            <img src="static/6t.png" alt="">
            <p>{{biaoqian[0].homeNu}}</p>
          </div>
          <div v-else class="four">
            <img src="static/1t.png" alt="">
            <p>{{biaoqian[0].homeNu}}</p>
          </div>
         <div class="five">
           <img src="static/2t.png" alt="">
           <p>{{biaoqian[0].location}}</p>
         </div>
         <div v-if='biaoqian[0].rich.length=="5"' class="six">
           <img src="static/6t.png" alt="">
           <p>{{biaoqian[0].rich}}</p>
         </div>
         <div v-else-if='biaoqian[0].rich.length=="4"' class="six">
           <img src="static/4t.png" alt="">
           <p>{{biaoqian[0].rich}}</p>
         </div>
         <div v-else-if='biaoqian[0].rich.length=="2"' class="six">
           <img src="static/2t.png" alt="">
           <p>{{biaoqian[0].rich}}</p>
         </div>

       </div>

       <h3 class="su">风险解读</h3>
         <div class="sugges">
         <p v-if='one'>
           作为 <span>{{result1.members[0].birthday}}</span>岁的你，无论是否单身，所面对的风险并没有什么不同，都有生病的风险，甚至罹患重疾，建议优先配置重疾险和医疗险。
         </p>
         <p v-if='two'>
           目前你已经 <span>{{result1.members[0].birthday}}</span> 岁了，对于自身的风险，都有生病风险，甚至罹患重疾，因此建议优先配置医疗险、<span>重疾险</span>。而对于父母一辈年纪大，生病，或意外风险高，对于父母需要重点关注<span>医疗险</span>、<span>意外险</span>。
         </p>
         <p v-if='three'>
          对于你或配偶而言，需要重点关注<span>重疾险</span>和<span>人寿险</span>，万一不幸患重疾或者意外事故等，获赔保险金可以继续照顾家人，孩子生活可以保障。而对孩子来说，目前年纪还小，更多风险来自重疾和意外风险，建议重点配置<span>重疾险</span>和<span>意外险</span>。
         </p>
         <p v-if='four'>
          目前你和配偶正在为未来打拼，对于整个家庭来说，生病风险 ，甚至罹患重疾，对于整体家庭打击都是巨大的，需要优先配置<span>重疾险</span>和<span>医疗险</span> 来防范风险。
         </p>
         </div>
         <!-- 重新测，看报告-->
        <div class="reStart">
            <p @click='start()' class="re-one">重新测</p>
            <p @click='baogao()' class="re-two">看报告</p>
        </div>

    </div>
    <b></b>
    <div class="bao">
      <h3>家庭保险建议</h3>
      <p>根据家庭收入及贷款状况，建议保费预算:</p>
      <div class="bao-zhong">
         <div class="bao-left">
           <div class="mingzi">
             <h1>{{sum1}}</h1>
             <span>元/年</span>
           </div>
             <p class="p1">保费测算</p>
         </div>
         <div class="juzhong">
         </div>
         <div class="bao-right">
           <div class="mingzi">
              <h1>{{sum2}}</h1>
              <span>万</span>
           </div>
             <p class="p1">提升保额</p>
         </div>
      </div>
      <!-- <h3>每个家庭成员的建议</h3> -->
    </div>

    <div id="myChart" :style="ik"></div>
    <p class="suggestion">家庭保费比例分配建议</p>
    <div class="guihua">
       <div v-for='item of data1' class="fangan">
           <h3>{{item.labelName}}</h3>
           <div  v-if='item.schemes.length!=3' class="self-middle">
            <div class="schemes" v-if='item.schemes[0]'>
              <div class="schemes-l">
                <p v-if='item.schemes[0]'>{{(item.schemes[0].totalSumInsured)/10000}}万</p>
                <span></span>
                <p v-if='item.schemes[0]'>{{ baoxianType[item.schemes[0].productType + ''] }}</p>
              </div>

            <img v-if='item.schemes[0].productType=="1"' src="static/ji.png" alt="">
            <img v-if='item.schemes[0].productType=="2"' src="static/wai.png" alt="">
            <img v-if='item.schemes[0].productType=="3"' src="static/yi.png" alt="">
            <img v-if='item.schemes[0].productType=="4"' src="static/show.png" alt="">
            </div>
            <div v-if='item.schemes[1]' class="schemes">
              <div class="schemes-l">
                <p v-if='item.schemes[1]'>{{(item.schemes[1].totalSumInsured)/10000}}万</p>
                <span></span>
                <p v-if='item.schemes[1]'>{{ baoxianType[item.schemes[1].productType + ''] }}</p>
              </div>

                <img v-if='item.schemes[1].productType=="1"' src="static/ji.png" alt="">
                <img v-if='item.schemes[1].productType=="2"' src="static/wai.png" alt="">
                <img v-if='item.schemes[1].productType=="3"' src="static/yi.png" alt="">
                <img v-if='item.schemes[1].productType=="4"' src="static/show.png" alt="">
            </div>
         </div>

         <div  v-else class="lalae">
          <div class="sches" v-if='item.schemes[0]'>
            <img v-if='item.schemes[0].productType=="1"' src="static/ji.png" alt="">
            <img v-if='item.schemes[0].productType=="2"' src="static/wai.png" alt="">
            <img v-if='item.schemes[0].productType=="3"' src="static/yi.png" alt="">
            <img v-if='item.schemes[0].productType=="4"' src="static/show.png" alt="">
            <div class="">
              <p v-if='item.schemes[0]'>{{(item.schemes[0].totalSumInsured)/10000}}万</p>
              <span></span>
              <p v-if='item.schemes[0]'>{{ baoxianType[item.schemes[0].productType + ''] }}</p>
            </div>


          </div>
          <div class="if-l">

          <div v-if='item.schemes[1]' class="schemes">
            <div class="schemes-l">
              <p v-if='item.schemes[1]'>{{(item.schemes[1].totalSumInsured)/10000}}万</p>
              <span></span>
              <p v-if='item.schemes[1]'>{{ baoxianType[item.schemes[1].productType + ''] }}</p>
            </div>

              <img v-if='item.schemes[1].productType=="1"' src="static/ji.png" alt="">
              <img v-if='item.schemes[1].productType=="2"' src="static/wai.png" alt="">
              <img v-if='item.schemes[1].productType=="3"' src="static/yi.png" alt="">
              <img v-if='item.schemes[1].productType=="4"' src="static/show.png" alt="">
          </div>
          <img :src="'static/'+zhaopian[item.memberType+'_'+item.gender] + '.png'" alt="">
          <div v-if='item.schemes[2]' class="schemes">
            <div class="schemes-l">
              <p v-if='item.schemes[2]'>{{(item.schemes[2].totalSumInsured)/10000}}万</p>
              <span></span>
              <p v-if='item.schemes[2]'>{{ baoxianType[item.schemes[2].productType + ''] }}</p>
            </div>

              <img v-if='item.schemes[2].productType=="1"' src="static/ji.png" alt="">
              <img v-if='item.schemes[2].productType=="2"' src="static/wai.png" alt="">
              <img v-if='item.schemes[2].productType=="3"' src="static/yi.png" alt="">
              <img v-if='item.schemes[2].productType=="4"' src="static/show.png" alt="">
          </div>
          <div v-if='item.schemes[3]' class="schemes">
            <div class="schemes-l">
              <p v-if='item.schemes[3]'>{{(item.schemes[3].totalSumInsured)/10000}}万</p>
              <span></span>
              <p v-if='item.schemes[3]'>{{ baoxianType[item.schemes[3].productType + ''] }}</p>
            </div>
              <img v-if='item.schemes[3].productType=="1"' src="static/ji.png" alt="">
              <img v-if='item.schemes[3].productType=="2"' src="static/wai.png" alt="">
              <img v-if='item.schemes[3].productType=="3"' src="static/yi.png" alt="">
              <img v-if='item.schemes[3].productType=="4"' src="static/show.png" alt="">
          </div>
        </div>
       </div>

         <div v-if='item.schemes.length!=3' class="self-xia">
            <div v-if='item.schemes[2]' class="schemes">
              <div class="schemes-l">
                <p v-if='item.schemes[2]'>{{(item.schemes[2].totalSumInsured)/10000}}万</p>
                <span></span>
                <p v-if='item.schemes[2]'>{{ baoxianType[item.schemes[2].productType + ''] }}</p>
              </div>

                <img v-if='item.schemes[2].productType=="1"' src="static/ji.png" alt="">
                <img v-if='item.schemes[2].productType=="2"' src="static/wai.png" alt="">
                <img v-if='item.schemes[2].productType=="3"' src="static/yi.png" alt="">
                <img v-if='item.schemes[2].productType=="4"' src="static/show.png" alt="">
            </div>
            <img :src="'static/'+zhaopian[item.memberType+'_'+item.gender] + '.png'" alt="">
            <div v-if='item.schemes[3]' class="schemes">
              <div class="schemes-l">
                <p v-if='item.schemes[3]'>{{(item.schemes[3].totalSumInsured)/10000}}万</p>
                <span></span>
                <p v-if='item.schemes[3]'>{{ baoxianType[item.schemes[3].productType + ''] }}</p>
              </div>
                <img v-if='item.schemes[3].productType=="1"' src="static/ji.png" alt="">
                <img v-if='item.schemes[3].productType=="2"' src="static/wai.png" alt="">
                <img v-if='item.schemes[3].productType=="3"' src="static/yi.png" alt="">
                <img v-if='item.schemes[3].productType=="4"' src="static/show.png" alt="">
            </div>
        </div>


        <!-- <div class="self-xi">
           <div v-if='item.schemes[2]' class="schemes">
             <div class="schemes-l">
               <p v-if='item.schemes[2]'>{{(item.schemes[2].totalSumInsured)/10000}}万</p>
               <span></span>
               <p v-if='item.schemes[2]'>{{ baoxianType[item.schemes[2].productType + ''] }}</p>
             </div>

               <img v-if='item.schemes[2].productType=="1"' src="static/ji.png" alt="">
               <img v-if='item.schemes[2].productType=="2"' src="static/wai.png" alt="">
               <img v-if='item.schemes[2].productType=="3"' src="static/yi.png" alt="">
               <img v-if='item.schemes[2].productType=="4"' src="static/show.png" alt="">
           </div>
           <img :src="'static/'+zhaopian[item.memberType+'_'+item.gender] + '.png'" alt="">
           <div v-if='item.schemes[3]' class="schemes">
             <div class="schemes-l">
               <p v-if='item.schemes[3]'>{{(item.schemes[3].totalSumInsured)/10000}}万</p>
               <span></span>
               <p v-if='item.schemes[3]'>{{ baoxianType[item.schemes[3].productType + ''] }}</p>
             </div>
               <img v-if='item.schemes[3].productType=="1"' src="static/ji.png" alt="">
               <img v-if='item.schemes[3].productType=="2"' src="static/wai.png" alt="">
               <img v-if='item.schemes[3].productType=="3"' src="static/yi.png" alt="">
               <img v-if='item.schemes[3].productType=="4"' src="static/show.png" alt="">
           </div>
       </div> -->

    </div>
    <b></b>

  </div>
   <div class="policies">
       <h3>家庭的保险</h3>
       <div @click='look()' class="search">
         <p>查看保单</p>
         <img src="static/enter.png" alt="">
       </div>
  </div>

  <div class="bao-xia">
     <div class="baoxia-left">
       <div class="ming">
         <h1>{{effective}}</h1>
         <span>个</span>
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
  <div class="l-di">
    <img src="static/question.png" alt="">
     <p>建议尽快上传保单信息,推荐的保险方案将会更适合你</p>
  </div>
  </div>
</template>

<script>
var  i = 0;
var obj;
export default {
  data() {
    return {
      touxiang:'',
      biaoqian:[],
      duixiang:{},
      biao1:[],
      ageBiao:'',
      memberBiao1:'',
      memberBiao2:'',
      memberBiao3:'',
      memberBiao4:'',
      memberBiao5:'',
      location:0,
      rich:'',
      middleRich:'',
      hao:'',
      homeNu:'',
      one:'',
      two:'',
      three:'',
      four:'',
      noDet:'',
      membersKu:[],
      genderp:{

      },
      baoxianType: {
        '1': '重疾险',
        '2': '意外险',
        '3': '医疗险',
        '4': '定期寿险'
      },
      effective:0,
      feiyong:0,
      zhaopian:{
        '0_M':'Mo',
        '0_F':'Fo',
        '1_M':'Mo',
        '1_F':'Fo',
        "3_M":'So',
        '3_F':'Do'
      },
      sum:0,
      sum1:0,
      sum2:0,
      can:'',
      kao:'',
      bao:'',
      fei:'',
      fei1:'',
      fei2:'',
      fei3:'',
      fei4:'',
      fei5:'',
      fei6:'',
      fei7:'',
      fei8:'',
      cankaobaofei:0,
      schemes: '',
      comeOne:'',
      comeTwo:'',
      comeThree:'',
      comeFour:'',
      xian: '',
      shuju1: [],
      shuju: [],

      hidd: {
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "white"
      },
      shuju2:'',
      show: true,
      ik: {
        "width": "100%",
        "height": '300px',
        "margin":'20px auto'
      },
      result1:'',
      num:'',
      data6: '',
      data4: '',
      data5: '',
      data3: '',
      data1: '',
      shouzhi: {},
      number:1,
    }
  },
  props: ['number','child','resul','biao'],
  mounted() {
    var that = this;

     this.axios.get(that.domain+'/scheme/getFamilyScheme',{headers:{"token":this.getCookie("token")}}).then(function(res){

       if(res.data.isSuccess){
         var jsondatas = JSON.stringify(res);
         var sm = JSON.parse(jsondatas);

         that.result = sm.data.result;
         that.data1 = sm.data.result.members;
         console.log(that.data1);
    var aodan=0;
    var youxiao =0;
    var baofei=0;
    var baoe=0;
    var obj = {};
    that.shuju1=[];
    for (var i = 0; i < that.data1.length; i++) {
       var obj = {};
     that.shuju.push(that.data1[i].labelName);
       if (that.data1[i].policies.length>0) {


        for (var m = 0; m < that.data1[i].policies.length; m++) {
             aodan =  parseInt(aodan)+parseInt(that.data1[i].policies[m].sumInsured)/10000
             youxiao = parseInt(youxiao)+parseInt(1)
        }
        that.feiyong = aodan
        console.log(that.feiyong);
        that.effective = youxiao
        console.log(that.effective);
    }

     for (var g = 0; g < that.data1[i].schemes.length; g++) {
       baoe =parseInt(baoe) + parseInt(that.data1[i].schemes[g].totalSumInsured)/10000
     for (var s = 0; s < that.data1[i].schemes[g].details.length; s++) {
           baofei = parseInt(baofei)+parseInt(that.data1[i].schemes[g].details[s].premium);
       }
       that.sum1 = baofei;
       that.sum2 = baoe;

         }
         console.log(that.sum1);


     obj.name =that.data1[i].labelName
     var dun = 0;

          if (that.data1[i].label=='self') {
            if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {
                for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                      dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                  }
                  that.can = dun;
                }
              }else {
               that.can = '0';
             }
              obj.value = that.can;
        }
          if (that.data1[i].label=='spouse') {
             if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {
                for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                      dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                   that.kao = dun;
                }
               }else {
               that.kao = '0';
              }
              obj.value = that.kao;
          }
          if (that.data1[i].label=='boy') {
             if (that.data1[i].schemes) {
                for (var j = 0; j < that.data1[i].schemes.length; j++) {
                for (var o = 0; o <    that.data1[i].schemes[j].details.length; o++) {
                      dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                   }
                  that.bao = dun;
               }
             }else {
               that.bao = '0';
             }
               obj.value = that.bao;
             }
          if (that.data1[i].label=='girl') {
             if (that.data1[i].schemes) {
                 for (var j = 0; j < that.data1[i].schemes.length; j++) {
                for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                      dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                    that.fei = dun;
                 }
               }else {
               that.fei = '0';
            }
               obj.value = that.fei;
          }
       if (that.data1[i].label=='girl1') {
          if (that.data1[i].schemes) {
              for (var j = 0; j < that.data1[i].schemes.length; j++) {

             for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                   dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
             }
                that.fei1 = dun;
              }
            }else {
            that.fei1 = '0';
           }
             obj.value = that.fei1;
        }
    if (that.data1[i].label=='boy1') {
       if (that.data1[i].schemes) {
          for (var j = 0; j < that.data1[i].schemes.length; j++) {

              for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                 dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
             }
              that.fei2 = dun;

         }
       }else {
         that.fei2 = '0';
        }
        obj.value = that.fei2;
     }
    if (that.data1[i].label=='boy2') {
    if (that.data1[i].schemes) {
      for (var j = 0; j < that.data1[i].schemes.length; j++) {

         for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
        }
        that.fei3 = dun;
     }
    }else {
      that.fei3 = '0';
    }
      obj.value = that.fei3;
    }
    if (that.data1[i].label=='boy3') {
    if (that.data1[i].schemes) {
    for (var j = 0; j < that.data1[i].schemes.length; j++) {

       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
          dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
    }
    that.fei4= dun;

    }
    }else {
    that.fei4 = '0';
    }
    obj.value = that.fei4;
    }
    if (that.data1[i].label=='girl2') {
    if (that.data1[i].schemes) {
     for (var j = 0; j < that.data1[i].schemes.length; j++) {

       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
         dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
    }
      that.fei5 = dun;
    }
    }else {
    that.fei5 = '0';
    }
    obj.value = that.fei5;
    }
    if (that.data1[i].label=='girl3') {
    if (that.data1[i].schemes) {
     for (var j = 0; j < that.data1[i].schemes.length; j++) {

        for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
         dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
       }
       that.fei6 = dun;
    }
    }else {
    that.fei6 = '0';
    }
      obj.value = that.fei6;
    }
    if (that.data1[i].label=='father') {
    if (that.data1[i].schemes) {
     for (var j = 0; j < that.data1[i].schemes.length; j++) {

      for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
          dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
      }
      that.fei7 = dun;
    }
    }else {
       that.fei7 = '0';
    }
     obj.value = that.fei7;
    }
    if (that.data1[i].label=='monther') {
        if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {

             for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
             }
                that.fei8 = dun;
              }
            }else {
                  that.fei8 = '0';
             }
                obj.value = that.fei8;
             }

     that.shuju1.push(obj)
     console.log('到这一步了吗');
    that.drawPie(that.shuju,that.shuju1)
    }
    // obj = that.shuju;
       } else if(res.data.errorCode == '10001'){
         this.login();
       } else {
         alert(res.data.errorMsg);
       }

     })
    that.shuju1=[];
      console.log('我是家庭');
          that.data1 = that.child;
          console.log(that.data1);
          that.result1 = that.resul;
          console.log(that.result1);

          for (var c = 0; c < that.result1.members.length; c++) {
                   if (that.result1.members.length==1) {
                      that.one = 'one'
                   }
                   if ((that.result1.members[c].label).indexOf('monther')!=-1||(that.result1.members[c].label).indexOf('father')!=-1) {
                     that.two = 'two'
                   }
                   if ((that.result1.members[c].label).indexOf('boy')!=-1||(that.result1.members[c].label).indexOf('girl')!=-1) {
                     that.three = 'three'
                     console.log("儿女双球按");
                   }
                   if ((that.result1.members.length==2)&&((that.result1.members[c].label).indexOf('spouse')!=-1)) {
                     that.four = 'four'
                   }
            }




          that.num = that.index;
          that.biaoqian = that.biao;

          var aodan=0;
          var youxiao =0;
          for (var i = 0; i < that.data1.length; i++) {
              var obj = {};
            that.shuju.push(that.data1[i].labelName);
       // obj.name = that.data1[i].label
          //  obj.name =that.data1[i].labelName
          if (that.data1[i].policies.length>0) {
             for (var m = 0; m < that.data1[i].policies.length; m++) {
                  aodan =  parseInt(aodan)+parseInt(that.data1[i].policies[m].sumInsured)/10000
                  youxiao = parseInt(youxiao)+parseInt(1)
             }
             that.feiyong = aodan
             console.log(that.feiyong);
             that.effective = youxiao
             console.log(that.effective);
           }
            obj.name =that.data1[i].labelName
            var dun = 0;

                 if (that.data1[i].label=='self') {
                   if (that.data1[i].schemes) {
                   for (var j = 0; j < that.data1[i].schemes.length; j++) {
                       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                         }
                         that.can = dun;
                       }
                     }else {
                      that.can = '0';
                    }
                     obj.value = that.can;
               }
                 if (that.data1[i].label=='spouse') {
                    if (that.data1[i].schemes) {
                   for (var j = 0; j < that.data1[i].schemes.length; j++) {
                       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                           }
                          that.kao = dun;
                       }
                      }else {
                      that.kao = '0';
                     }
                     obj.value = that.kao;
                 }
                 if (that.data1[i].label=='boy') {
                    if (that.data1[i].schemes) {
                       for (var j = 0; j < that.data1[i].schemes.length; j++) {
                       for (var o = 0; o <    that.data1[i].schemes[j].details.length; o++) {
                             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                          }
                         that.bao = dun;
                      }
                    }else {
                      that.bao = '0';
                    }
                      obj.value = that.bao;
                    }
                 if (that.data1[i].label=='girl') {
                    if (that.data1[i].schemes) {
                        for (var j = 0; j < that.data1[i].schemes.length; j++) {
                       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                           }
                           that.fei = dun;
                        }
                      }else {
                      that.fei = '0';
                   }
                      obj.value = that.fei;
                 }
              if (that.data1[i].label=='girl1') {
                 if (that.data1[i].schemes) {
                     for (var j = 0; j < that.data1[i].schemes.length; j++) {

                    for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                          dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                       that.fei1 = dun;
                     }
                   }else {
                   that.fei1 = '0';
                  }
                    obj.value = that.fei1;
               }
           if (that.data1[i].label=='boy1') {
              if (that.data1[i].schemes) {
                 for (var j = 0; j < that.data1[i].schemes.length; j++) {

                     for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                        dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                     that.fei2 = dun;

                }
              }else {
                that.fei2 = '0';
               }
               obj.value = that.fei2;
            }
        if (that.data1[i].label=='boy2') {
           if (that.data1[i].schemes) {
             for (var j = 0; j < that.data1[i].schemes.length; j++) {

                for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                    dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
               }
               that.fei3 = dun;
            }
           }else {
             that.fei3 = '0';
           }
             obj.value = that.fei3;
         }
     if (that.data1[i].label=='boy3') {
         if (that.data1[i].schemes) {
           for (var j = 0; j < that.data1[i].schemes.length; j++) {

              for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                 dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
           }
          that.fei4= dun;

         }
        }else {
           that.fei4 = '0';
         }
          obj.value = that.fei4;
        }
    if (that.data1[i].label=='girl2') {
         if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {

              for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
           }
             that.fei5 = dun;
          }
        }else {
           that.fei5 = '0';
          }
         obj.value = that.fei5;
    }
    if (that.data1[i].label=='girl3') {
         if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {

               for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
              }
              that.fei6 = dun;
         }
           }else {
           that.fei6 = '0';
          }
             obj.value = that.fei6;
           }
    if (that.data1[i].label=='father') {
          if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {

             for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                 dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
             }
             that.fei7 = dun;
          }
         }else {
              that.fei7 = '0';
          }
            obj.value = that.fei7;
         }
         if (that.data1[i].label=='monther') {
               if (that.data1[i].schemes) {
                   for (var j = 0; j < that.data1[i].schemes.length; j++) {

                    for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                       dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                       that.fei8 = dun;
                     }
                   }else {
                         that.fei8 = '0';
                    }
                       obj.value = that.fei8;
                    }

            that.shuju1.push(obj)
             that.drawPie(that.shuju,that.shuju1)
          }

 that.drawPie(that.shuju,that.shuju1)


  },
  watch:{
    'child':{
      handler(newV, oldV) {
        console.log('ddddddddd+++++++++++=');
        var that = this;
          that.data1 = that.child;
          console.log(that.data1);
          that.result1 = that.resul;
          for (var c = 0; c < that.result1.members.length; c++) {
                   if (that.result1.members.length==1) {
                      that.one = 'one'
                   }
                   if ((that.result1.members[c].label).indexOf('monther')!=-1||(that.result1.members[c].label).indexOf('father')!=-1) {
                     that.two = 'two'
                   }
                   if ((that.result1.members[c].label).indexOf('boy')!=-1||(that.result1.members[c].label).indexOf('girl')!=-1) {
                     that.three = 'three'
                     console.log("儿女双球按");
                   }
                   if ((that.result1.members.length==2)&&((that.result1.members[c].label).indexOf('spouse')!=-1)) {
                     that.four = 'four'
                   }
            }

          var aodan=0;
          var youxiao =0;
          var baofei=0;
          var baoe=0;
          var obj = {};
          that.shuju1=[];
          for (var i = 0; i < that.data1.length; i++) {
              var obj = {};
            that.shuju.push(that.data1[i].labelName);
        // obj.name = that.data1[i].label
            // obj.name =that.data1[i].labelName
          if (that.data1[i].policies.length>0) {
             for (var m =0; m < that.data1[i].policies.length; m++) {
                  aodan =  parseInt(aodan)+parseInt(that.data1[i].policies[m].sumInsured)/10000
                  youxiao = parseInt(youxiao)+parseInt(1)
             }

           }else {
             that.feiyong =0;
             that.effective = 0;
           }

            for (var g = 0; g < that.data1[i].schemes.length; g++) {
                  baoe =parseInt(baoe) + parseInt(that.data1[i].schemes[g].totalSumInsured)/10000
                for (var s = 0; s < that.data1[i].schemes[g].details.length; s++) {
                      baofei = parseInt(baofei)+parseInt(that.data1[i].schemes[g].details[s].premium);
                  }
                  that.sum1 = baofei;
                  that.sum2 = baoe;
                }
            obj.name =that.data1[i].labelName
            var dun = 0;

                 if (that.data1[i].label=='self') {
                   if (that.data1[i].schemes) {
                   for (var j = 0; j < that.data1[i].schemes.length; j++) {
                       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                         }
                         that.can = dun;
                       }
                     }else {
                      that.can = '0';
                    }
                     obj.value = that.can;
               }
                 if (that.data1[i].label=='spouse') {
                    if (that.data1[i].schemes) {
                   for (var j = 0; j < that.data1[i].schemes.length; j++) {
                       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                           }
                          that.kao = dun;
                       }
                      }else {
                      that.kao = '0';
                     }
                     obj.value = that.kao;
                 }
                 if (that.data1[i].label=='boy') {
                    if (that.data1[i].schemes) {
                       for (var j = 0; j < that.data1[i].schemes.length; j++) {
                       for (var o = 0; o <    that.data1[i].schemes[j].details.length; o++) {
                             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                          }
                         that.bao = dun;
                      }
                    }else {
                      that.bao = '0';
                    }
                      obj.value = that.bao;
                    }
                 if (that.data1[i].label=='girl') {
                    if (that.data1[i].schemes) {
                        for (var j = 0; j < that.data1[i].schemes.length; j++) {
                       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                           }
                           that.fei = dun;
                        }
                      }else {
                      that.fei = '0';
                   }
                      obj.value = that.fei;
                 }
              if (that.data1[i].label=='girl1') {
                 if (that.data1[i].schemes) {
                     for (var j = 0; j < that.data1[i].schemes.length; j++) {

                    for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                          dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                       that.fei1 = dun;
                     }
                   }else {
                   that.fei1 = '0';
                  }
                    obj.value = that.fei1;
               }
           if (that.data1[i].label=='boy1') {
              if (that.data1[i].schemes) {
                 for (var j = 0; j < that.data1[i].schemes.length; j++) {

                     for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                        dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                     that.fei2 = dun;

                }
              }else {
                that.fei2 = '0';
               }
               obj.value = that.fei2;
            }
             if (that.data1[i].label=='boy2') {
           if (that.data1[i].schemes) {
             for (var j = 0; j < that.data1[i].schemes.length; j++) {

                for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                    dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
               }
               that.fei3 = dun;
            }
           }else {
             that.fei3 = '0';
           }
             obj.value = that.fei3;
         }
            if (that.data1[i].label=='boy3') {
         if (that.data1[i].schemes) {
           for (var j = 0; j < that.data1[i].schemes.length; j++) {

              for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                 dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
           }
          that.fei4= dun;

         }
        }else {
           that.fei4 = '0';
         }
          obj.value = that.fei4;
        }
           if (that.data1[i].label=='girl2') {
         if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {

              for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
           }
             that.fei5 = dun;
          }
          }else {
           that.fei5 = '0';
          }
            obj.value = that.fei5;
         }
          if (that.data1[i].label=='girl3') {
         if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {

               for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
              }
              that.fei6 = dun;
           }
           }else {
           that.fei6 = '0';
          }
             obj.value = that.fei6;
           }
          if (that.data1[i].label=='father') {
               if (that.data1[i].schemes) {
            for (var j = 0; j < that.data1[i].schemes.length; j++) {

             for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                 dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
             }
             that.fei7 = dun;
          }
         }else {
              that.fei7 = '0';
          }
            obj.value = that.fei7;
         }
         if (that.data1[i].label=='monther') {
               if (that.data1[i].schemes) {
                   for (var j = 0; j < that.data1[i].schemes.length; j++) {

                    for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                       dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                       that.fei8 = dun;
                     }
                   }else {
                         that.fei8 = '0';
                    }
                       obj.value = that.fei8;
                    }

            that.shuju1.push(obj)
            //  that.drawPie(that.shuju,that.shuju1)

            console.log(that.data1[i]);
            console.log(that.data1[i].label);
            if (that.data1[i].label.indexOf('boy')!=-1||that.data1[i].label.indexOf('girl')!=-1) {
              console.log('iii');


            }else if (that.data1[i].label.indexOf('boy')==-1||that.data1[i].label.indexOf('girl')==-1) {

            }
            if (that.data1[i].label=='self') {

            }
            if (that.data1[i].label=='spouse') {

            }
          }
          // obj = that.shuju;
          that.feiyong = aodan
          console.log(that.feiyong);
          that.effective = youxiao
          console.log(that.effective);
        },
      deep:true
    }
     },

  created() {

       var that = this;
      that.data1 = that.child;
      that.result1 = that.resul;
     that.biaoqian = that.biao;
      //  报告标签
      var aodan=0;
      var youxiao =0;
      var baofei=0;
      var baoe=0;
      var obj = {};
      that.shuju1=[];
      for (var i = 0; i < that.data1.length; i++) {
          var obj = {};
        that.shuju.push(that.data1[i].labelName);
          if (that.data1[i].policies.length>0) {


           for (var m = 0; m < that.data1[i].policies.length; m++) {
                aodan =  parseInt(aodan)+parseInt(that.data1[i].policies[m].sumInsured)/10000
                youxiao = parseInt(youxiao)+parseInt(1)
           }
           that.feiyong = aodan
           console.log(that.feiyong);
           that.effective = youxiao
           console.log(that.effective);
     }

        for (var g = 0; g < that.data1[i].schemes.length; g++) {
          baoe =parseInt(baoe) + parseInt(that.data1[i].schemes[g].totalSumInsured)/10000
        for (var s = 0; s < that.data1[i].schemes[g].details.length; s++) {
              baofei = parseInt(baofei)+parseInt(that.data1[i].schemes[g].details[s].premium);
          }
          that.sum1 = baofei;
          that.sum2 = baoe;

            }
            console.log(that.sum1);


        obj.name =that.data1[i].labelName
        var dun = 0;

             if (that.data1[i].label=='self') {
               if (that.data1[i].schemes) {
               for (var j = 0; j < that.data1[i].schemes.length; j++) {
                   for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                         dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                     }
                     that.can = dun;
                   }
                 }else {
                  that.can = '0';
                }
                 obj.value = that.can;
           }
             if (that.data1[i].label=='spouse') {
                if (that.data1[i].schemes) {
               for (var j = 0; j < that.data1[i].schemes.length; j++) {
                   for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                         dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                       }
                      that.kao = dun;
                   }
                  }else {
                  that.kao = '0';
                 }
                 obj.value = that.kao;
             }
             if (that.data1[i].label=='boy') {
                if (that.data1[i].schemes) {
                   for (var j = 0; j < that.data1[i].schemes.length; j++) {
                   for (var o = 0; o <    that.data1[i].schemes[j].details.length; o++) {
                         dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                      }
                     that.bao = dun;
                  }
                }else {
                  that.bao = '0';
                }
                  obj.value = that.bao;
                }
             if (that.data1[i].label=='girl') {
                if (that.data1[i].schemes) {
                    for (var j = 0; j < that.data1[i].schemes.length; j++) {
                   for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                         dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                       }
                       that.fei = dun;
                    }
                  }else {
                  that.fei = '0';
               }
                  obj.value = that.fei;
             }
          if (that.data1[i].label=='girl1') {
             if (that.data1[i].schemes) {
                 for (var j = 0; j < that.data1[i].schemes.length; j++) {

                for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                      dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                }
                   that.fei1 = dun;
                 }
               }else {
               that.fei1 = '0';
              }
                obj.value = that.fei1;
           }
       if (that.data1[i].label=='boy1') {
          if (that.data1[i].schemes) {
             for (var j = 0; j < that.data1[i].schemes.length; j++) {

                 for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                    dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                }
                 that.fei2 = dun;

            }
          }else {
            that.fei2 = '0';
           }
           obj.value = that.fei2;
        }
    if (that.data1[i].label=='boy2') {
       if (that.data1[i].schemes) {
         for (var j = 0; j < that.data1[i].schemes.length; j++) {

            for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
           }
           that.fei3 = dun;
        }
       }else {
         that.fei3 = '0';
       }
         obj.value = that.fei3;
     }
 if (that.data1[i].label=='boy3') {
     if (that.data1[i].schemes) {
       for (var j = 0; j < that.data1[i].schemes.length; j++) {

          for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
       }
      that.fei4= dun;

     }
    }else {
       that.fei4 = '0';
     }
      obj.value = that.fei4;
    }
if (that.data1[i].label=='girl2') {
     if (that.data1[i].schemes) {
        for (var j = 0; j < that.data1[i].schemes.length; j++) {

          for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
            dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
       }
         that.fei5 = dun;
      }
    }else {
       that.fei5 = '0';
      }
     obj.value = that.fei5;
}
if (that.data1[i].label=='girl3') {
     if (that.data1[i].schemes) {
        for (var j = 0; j < that.data1[i].schemes.length; j++) {

           for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
            dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
          }
          that.fei6 = dun;
     }
       }else {
       that.fei6 = '0';
      }
         obj.value = that.fei6;
       }
if (that.data1[i].label=='father') {
      if (that.data1[i].schemes) {
        for (var j = 0; j < that.data1[i].schemes.length; j++) {

         for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
             dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
         }
         that.fei7 = dun;
      }
     }else {
          that.fei7 = '0';
      }
        obj.value = that.fei7;
     }
     if (that.data1[i].label=='monther') {
           if (that.data1[i].schemes) {
               for (var j = 0; j < that.data1[i].schemes.length; j++) {

                for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                   dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                }
                   that.fei8 = dun;
                 }
               }else {
                     that.fei8 = '0';
                }
                   obj.value = that.fei8;
                }

        that.shuju1.push(obj)

      }
      obj = that.shuju;


      var d = new Date();
      var endYear = d.getFullYear();

      this.axios.get(that.domain+'/scheme/getFamilyScheme',{headers:{"token":this.getCookie("token")}}).then(function(res){

        if(res.data.isSuccess){
          var jsondatas = JSON.stringify(res);
          var sm = JSON.parse(jsondatas);

          that.result = sm.data.result;
          that.data1 = sm.data.result.members;
          console.log(that.data1);



                    for (var d = 0; d < that.data1.length; d++) {
                       that.membersKu.push(that.data1[d].label)
                      if (that.data1[d].label=="self") {
                        that.axios.get('city.json').then(function(res){
                            console.log('我进来了吗');
                          console.log(res.data.city)
                          for (var c = 0; c < res.data.city.length; c++) {
                            if (res.data.city[c].value==that.data1[0].residence) {

                                that.location = res.data.city[c].label
                            }
                          }
                        })
                        //  that.location =that.data1[d].residence;
                        console.log(that.location);
                         (that.duixiang).location = that.location

                         var age = that.data1[d].birthday;
                         var age1 = age.substr(0,4);
                         if (parseInt(endYear)-parseInt(age1)>0) {
                            that.ageBiao = (parseInt(endYear)-parseInt(age1))[2];
                            that.duixiang.age = that.ageBiao

                         }

                         if (0<=(parseInt(that.result.familyIncome)/10000)<=30) {
                            //  that.rich = '财富积累中';
                             that.duixiang.rich = '财富积累中'
                        }else if (30<=(parseInt(that.result.familyIncome)/10000)<60) {
                              that.duixiang.rich = '中产阶级';
                        }else {
                          that.duixiang.rich = '土豪';
                        }

                        if (that.result.familyDebt>0) {
                           that.duixiang.homeNu = '房奴'
                        }else {
                          that.duixiang.homeNu = '无债一身轻'
                        }

                      }

                    }
                    for (var p = 0; p < that.membersKu.length; p++) {
                        if (that.membersKu.length==1) {
                           that.duixiang.memberBiao1 = '单身贵族';

                        }
                        if (that.membersKu.length==2) {
                            if (that.membersKu[1]=='spouse') {
                               that.duixiang.memberBiao2 = '二人世界';

                            }
                            if (((that.membersKu[1]).indexOf('father')!="-1")||((that.membersKu[1]).indexOf('monther')!="-1")) {
                               that.duixiang.memberBiao2 = '孝顺父母';

                            }
                        }

                      if ((that.membersKu[p].indexOf('father')!="-1")||(that.membersKu[p].indexOf('monther')!="-1")) {
                         that.duixiang.memberBiao2 = '孝顺父母';
                            }
                            if ((that.membersKu[p].indexOf('boy')!="-1")||(that.membersKu[p].indexOf('girl')!="-1")) {
                                if (that.membersKu.length>2) {
                                  that.duixiang.memberBiao3 = '顾家';


                                }
                                if (that.data1[0].gender=="M") {
                                     that.duixiang.memberBiao4 = '奶爸';
                                }else {
                                  that.duixiang.memberBiao4 = '辣妈';
                                }

                            }


                    }
                    console.log(that.biaoqian);
                    console.log(that.duixiang);
                    that.biao1.push(that.duixiang);
                  //  that.biaoqian.push(that.duixiang)
                  console.log(that.biao1);
                  that.biaoqian = that.biao1;


    var aodan=0;
    var youxiao =0;
    var baofei=0;
    var baoe=0;
    var obj = {};
    that.shuju1=[];
    for (var i = 0; i < that.data1.length; i++) {
        var obj = {};
      that.shuju.push(that.data1[i].labelName);
        if (that.data1[i].policies.length>0) {


         for (var m = 0; m < that.data1[i].policies.length; m++) {
              aodan =  parseInt(aodan)+parseInt(that.data1[i].policies[m].sumInsured)/10000
              youxiao = parseInt(youxiao)+parseInt(1)
         }
         that.feiyong = aodan
         console.log(that.feiyong);
         that.effective = youxiao
         console.log(that.effective);
   }

      for (var g = 0; g < that.data1[i].schemes.length; g++) {
        baoe =parseInt(baoe) + parseInt(that.data1[i].schemes[g].totalSumInsured)/10000
      for (var s = 0; s < that.data1[i].schemes[g].details.length; s++) {
            baofei = parseInt(baofei)+parseInt(that.data1[i].schemes[g].details[s].premium);
        }
        that.sum1 = baofei;
        that.sum2 = baoe;

          }
          console.log(that.sum1);


      obj.name =that.data1[i].labelName
      var dun = 0;

           if (that.data1[i].label=='self') {
             if (that.data1[i].schemes) {
             for (var j = 0; j < that.data1[i].schemes.length; j++) {
                 for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                       dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                   }
                   that.can = dun;
                 }
               }else {
                that.can = '0';
              }
               obj.value = that.can;
         }
           if (that.data1[i].label=='spouse') {
              if (that.data1[i].schemes) {
             for (var j = 0; j < that.data1[i].schemes.length; j++) {
                 for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                       dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                     }
                    that.kao = dun;
                 }
                }else {
                that.kao = '0';
               }
               obj.value = that.kao;
           }
           if (that.data1[i].label=='boy') {
              if (that.data1[i].schemes) {
                 for (var j = 0; j < that.data1[i].schemes.length; j++) {
                 for (var o = 0; o <    that.data1[i].schemes[j].details.length; o++) {
                       dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                    }
                   that.bao = dun;
                }
              }else {
                that.bao = '0';
              }
                obj.value = that.bao;
              }
           if (that.data1[i].label=='girl') {
              if (that.data1[i].schemes) {
                  for (var j = 0; j < that.data1[i].schemes.length; j++) {
                 for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                       dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
                     }
                     that.fei = dun;
                  }
                }else {
                that.fei = '0';
             }
                obj.value = that.fei;
           }
        if (that.data1[i].label=='girl1') {
           if (that.data1[i].schemes) {
               for (var j = 0; j < that.data1[i].schemes.length; j++) {

              for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                    dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
              }
                 that.fei1 = dun;
               }
             }else {
             that.fei1 = '0';
            }
              obj.value = that.fei1;
         }
     if (that.data1[i].label=='boy1') {
        if (that.data1[i].schemes) {
           for (var j = 0; j < that.data1[i].schemes.length; j++) {

               for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                  dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
              }
               that.fei2 = dun;

          }
        }else {
          that.fei2 = '0';
         }
         obj.value = that.fei2;
      }
  if (that.data1[i].label=='boy2') {
     if (that.data1[i].schemes) {
       for (var j = 0; j < that.data1[i].schemes.length; j++) {

          for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
              dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
         }
         that.fei3 = dun;
      }
     }else {
       that.fei3 = '0';
     }
       obj.value = that.fei3;
   }
if (that.data1[i].label=='boy3') {
   if (that.data1[i].schemes) {
     for (var j = 0; j < that.data1[i].schemes.length; j++) {

        for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
           dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
     }
    that.fei4= dun;

   }
  }else {
     that.fei4 = '0';
   }
    obj.value = that.fei4;
  }
if (that.data1[i].label=='girl2') {
   if (that.data1[i].schemes) {
      for (var j = 0; j < that.data1[i].schemes.length; j++) {

        for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
          dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
     }
       that.fei5 = dun;
    }
  }else {
     that.fei5 = '0';
    }
   obj.value = that.fei5;
}
if (that.data1[i].label=='girl3') {
   if (that.data1[i].schemes) {
      for (var j = 0; j < that.data1[i].schemes.length; j++) {

         for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
          dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
        }
        that.fei6 = dun;
   }
     }else {
     that.fei6 = '0';
    }
       obj.value = that.fei6;
     }
if (that.data1[i].label=='father') {
    if (that.data1[i].schemes) {
      for (var j = 0; j < that.data1[i].schemes.length; j++) {

       for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
           dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
       }
       that.fei7 = dun;
    }
   }else {
        that.fei7 = '0';
    }
      obj.value = that.fei7;
   }
   if (that.data1[i].label=='monther') {
         if (that.data1[i].schemes) {
             for (var j = 0; j < that.data1[i].schemes.length; j++) {

              for (var o = 0; o < that.data1[i].schemes[j].details.length; o++) {
                 dun = parseInt(dun)+parseInt(that.data1[i].schemes[j].details[o].premium);
              }
                 that.fei8 = dun;
               }
             }else {
                   that.fei8 = '0';
              }
                 obj.value = that.fei8;
              }

      that.shuju1.push(obj)

    }
    // obj = that.shuju;
        } else if(res.data.errorCode == '10001'){
          this.login();
        } else {
          alert(res.data.errorMsg);
        }

      })



  },
  methods: {
    look(){
      this.$router.push({
        path: '/familypolicies',
        query:{
          result:this.result1
        }

      })
    },
    start(){
      this.$router.push({
        path: '/'
        })
    },
    baogao(){
      this.$router.push({
        path: '/baogao',
        query:{
          biaoqian:this.biaoqian
        }

      })
    },
    focus() {
      window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyOTkwMzY3NA==&scene=110#webchat_redirect";
    },

    // 饼图表
    // 这个函数可以接受参数.

    drawPie(a,b) {
      console.log("我调用啦");
      console.log(a);
      console.log(b);
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        toolbox: {
       show : true,

   },
   calculabel : true,

        series: [{


          name: '保费金额',
          type: 'pie',
          radius: ['55%', '40%'],
          data: b,
          color:['#F4D046', '#9BDCC3', '#DE826B','#7ED53D','#DD4E42','#75A40B','#4790BB'],
          label:{
            normal:{
              formatter: '{d}%',
            }
          },

          labelLine:{
            normal:{
              show:true,
              length:30,
              length2:30,
              smooth:true,
              lineStyle:{
                type:"solid",
                width:1
              }

            }
          }
        }

       ]
      });
    }
}

}
</script>

<style lang="css" scoped>
/*@import "../src/assets/newindex.css";*/

.use1,.use2{

  line-height: 100px;
  width:200px;
  height: 100px;
  color:#616161;
  margin-right: 50px;
  border: 2px solid #A5A5A5;
  border-radius: 3px 3px 3px 3px;
  font-weight: 700;
  text-align: center;
}
#myChart{
  margin-top: -60px !important;
  margin-bottom: 30px;
  width: 80%;
}
.l-home{
  margin-top: -20px;
  position: relative;

}
.bao{
  margin-top: 30px;
}
.bao h3{
  color: #414141;
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  margin-left: 30px;
}
.bao p{
  font-size: 28px;
  margin-left: 30px;
  color: #A6A6A6;
  margin-top: 0;
  margin-bottom: 0;
}
.guihua .fangan{
  text-align: center;
  padding-top: 5px;
  width: 90%;
  margin: 0 auto;
  background: white;
  box-shadow:0px 4px 8px 5px #F9F9F9;
  margin-bottom: 60px;
}
.guihua .fangan h3{
  font-size: 32px;
}
b{
  display: block;
  height: 30px;

  width: 100%;
  background: #F3F3F3;
}
.by{
  /*margin-bottom: 150px;*/
}
.sugges{
  width:100%;
  font-size: 16px;
  /*height: 340px;*/
  margin-top: -10px;

}
.sugges p{
  width: 90%;
  position: relative;
  font-size: 30px;
  margin-left: 25px;
}
.sugges p span{
  color: #EBBB00;

}

.sugges p .left{
 position: absolute;
 left:0px;
  top: -30px;
  width: 50px;
  height: 50px;
  display: inline-block;
  font-size:32px;
}
.sugges p .sds{
  position: relative;

   top: 10px;
   width: 50px;
   height: 50px;
   display: inline-block;
   font-size: .3rem;
}
.sugges p label{
  font-size: 32px;
  width: 85%;
  display: inline-block;
  margin-top: 20px;
  margin-left: 50px;
}
.self-middle,.self-xia{
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
}
.self-xi>img{
  width: 136px;
  height: 136px;
   margin-left: 150px;
   margin-top: -50px;
}
.self-xi{
  width: 80%;
}
.self-xi .schemes{
  width: 30%;
  margin-left: 100px;
  margin-top: 50px;
}
.self-xia img{
  width: 136px;
  height: 136px;
}
.self-xia{
    margin-left:60px;
}
.self-middle{
  margin-left:60px;
}
.policies{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}
.policies>h3{
  font-size:32px;
   width: 60%;
   color: #5B5B5B;
}
.sches{
  display: flex;
  flex-direction: row;
  width: 60%;
  margin-left: 290px;
}
.sches p{
  margin: 0;
}
.sches img{
  width: 74px;
    height: 64px;
}
.if-l{
  width: 100%;
  display: flex;
  flex-direction: row;
  /*margin-left: 120px;*/
  justify-content: space-around;
  margin-top: 40px;
  margin-bottom:40px;
}
.lalae{
  display: flex;
  flex-direction: column;
}
.lalae p{
      font-size: 0.373333rem;
      color: #616161;
}
.if-l img{
  width: 1.813333rem;
  height: 1.813333rem;
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
  color: #6A6A6A;
  font-size: 28px;
}
.suggestion{
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin-top: -100px;
}
.guihua{
  margin-top: 100px;
}
.l-di{
  color: #919191;
  font-size: 28px;
  display: flex;
  width: 90%;
  margin-left: 20px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
}
.l-di img{
  width: 44px;
  height: 46px;
  margin-right: 20px;
}
.reStart{
  display: flex;
  width: 80%;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 80px;
}
.su{
  width: 80%;
  margin-left: 30px;
  font-size: 32px;
}
.lf-home{
  width: 80%;
  font-size: 48px;
}
.re-one{
  width: 200px;
  border: 2px solid #8B8B8B;
  border-radius: 40px 40px 40px 40px;
  font-size: 30px;
  height: 80px;
  line-height:80px;
  text-align: center;
}
.re-two{
  width: 200px;
  border: 2px solid #8B8B8B;
  border-radius: 40px 40px 40px 40px;
  font-size: 30px;
  height: 80px;
  line-height:80px;
  text-align: center;
}
.l-home3{
  position: relative;
}
.l-home3 img{
  /*width: 100%;*/
  height: 100%;
}
.jia{
  width: 100%;
}
.l-home .U{
  position: absolute;
  width: 208px;
  height: 52px;
  top: 50px;
  left: 35%;
}
.schemes{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.schemes>div{
  margin: 0;
  width: 60%;
  flex: 0 1 auto;
}
.schemes-l>p{
   margin-bottom: 5px;
   margin-top: 5px;
   font-size: 28px;
   color: #616161;
}
.schemes-l>span{
  margin: 0;
  display: block;
  height: 2px;
  width: 30px;
  background: #E9E9E9;
  margin-left: 20px;
}
.schemes img{
   width: 74px;
   height: 64px;
}
.imgsji{
  position: absolute;
  left: 0;
  top: 100px;
  height: 600px;
}
.imgsji img{
  height: 36px;
}
.imgsji p{
  font-size: 26px;
  position: absolute;
  margin: 0;
  padding: 0;

}
.imgsji .one{
  position: absolute;

  top: 60px;
  left: 300px;
}
.one p{
  left: 55px;
  top: 1px;
}
.two p{
  left: 55px;
  top: 1px;
}
.three p{
  left: 55px;
  top: 1px;
}
.four p{
  left: 55px;
  top: 1px;
}
.five p{
  left: 55px;
  top: 1px;
}
.six p{
  left: 55px;
  top: 1px;
}
.imgsji .three{
  position: absolute;

  top: 120px;
  left: 150px;
}
.imgsji .four{
  position: absolute;

  top:250px;
  left: 80px;
}
.imgsji .two{
  position: absolute;

  top:340px;
  left: 250px;

}
.imgsji .six{
  position: absolute;
  top:150px;
  left: 450px;
}
.imgsji .five{
  position: absolute;
  top:280px;
  left: 450px;
}
.text{
  width: 100%;
 margin-top: 300px;
 margin-bottom: 100px;
text-align: center;
}
.text img{
  width: 90%;
}
.look{
  height: 102px;
  width: 100%;
  background: #FCEA6E;
  color: #7A675A;
  font-size: 32px;
  box-shadow: 0 0 3px 3px #F3EFC9;
}
.look p{
 font-weight: 600;
 text-align: center;
 line-height: 102px;
}
</style>
