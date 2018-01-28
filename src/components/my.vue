<template lang="html">
  <div class="">


<!--父母辈  -->

  <div class="">
      <div class="img-lia">
        <div class="img">
          <img :src="'static/' +zhaopian[child.memberType+'_'+child.gender] +'.png'" alt="">
          <p>{{child.labelName}}</p>
        </div>
         <ul class="ulon">
            <li>
              <p>{{child.age}}</p>

              <span>年龄(岁)</span>
            </li>
            <li>
              <p>{{gender[child.gender+'']}}</p>

              <span>性别</span>
            </li>
            <li>
              <p>{{location}}</p>

              <span>所在地</span>
            </li>
         </ul>

      </div>
      <b></b>
      <div class="shuii">
        <div class="l-tui">
          <h4 class="chtui">智能组合推荐</h4>
          <div class="l-tuitui">
            <p>总预算:</p>
            <span>{{baofei}}</span>元/年
          </div>

        </div>

          <div class="baoTu">

           <div class="ul2" v-for='itemy of child.schemes'>
             <div class="ul2-two">

               <img v-if="itemy.productType=='1'" src="static/zhongji.png" alt="">
               <img v-else-if="itemy.productType=='2'" src="static/yiwai.png" alt="">
               <img v-else-if="itemy.productType=='3'" src="static/yiliao.png" alt="">
               <img v-else="itemy.productType=='4'" src="static/dingshou.png" alt="">
             <p>{{baoxianType[itemy.productType + ''] }}</p>
             <p class="buy" v-if='itemy.details.length>1'>组合购买</p>

             </div>
             <p class="xial"></p>
            <div class="ulops">


           <div class="ulop" v-for='item2 of itemy.details'>


          <div @click='getin(item2,itemy,itemy.details)' class="two"><p>{{item2.planName}}</p>
             </div >
            <div class="two-xia">
              <div class="twoxia-left">
               <div>
               <span>保额:</span>
               <p v-if='item2.sumInsured'>{{(item2.sumInsured)/10000}}万</p>
                <p v-else>
                   -
                </p>
             </div>

             <div>
             <span>保障:</span>
             <p v-if="(item2.insurancePeriod).indexOf('A')>0">至{{item2.insurancePeriod.substr(0,(item2.insurancePeriod).indexOf('A'))}}岁</p>
               <p v-else-if="(item2.insurancePeriod).indexOf('Y')>0">
                {{item2.insurancePeriod.substr(0,(item2.insurancePeriod).indexOf('Y'))}}年</p>

            <p v-else>终身</p>
            </div>
            </div>
            <div class="baoxia-right">
             <div><span>缴费:</span><p>{{item2.paymentPeriod}}年</p></div>
             <div class="mo">
               <span>保费:</span>
               <p v-if='item2.premium!="0"'>{{(item2.premium).substr(0,(item2.premium).indexOf('.00'))}}元/年</p>
              <p v-else>0元/年</p>
            </div >
           </div>
           </div>

          </div>
          <img v-if='itemy.details.length>1' src="static/weishi.png" alt="">
           </div>
          </div>

          </div>
      </div>
      <b class="ba"></b>
  <!-- shebao -->
  <div class="baos">
       <p class="chtui1">我的社保</p>

<!-- 有社保 -->
       <div v-if='child.hasSocialInsurance=="1"' class="ul2" id="lplp" @click='name(rt)'>

              <div @click='name1(rt)' class="ul3-two">
                 <img class="baoimg" src="static/zhongji.png" alt="">
                 <p class="yibao">医保</p>
                  <p class="buy1">保障中</p>
              </div>
             <p class="xial1"></p>
             <div class="ul3-right">
               <div @click='name1(rt)' class="two">
                 <p>{{location}}市城镇居民医疗保险</p>
               </div>
                <p class="chakan">[查看保障详情]</p>
              </div>
          </div>
<!-- 无社保 -->
          <div v-if='child.hasSocialInsurance=="0"' class="ul2" id="lplp" @click='name(rt)'>

                 <div @click='name1(rt)' class="ul3-two">
                    <img src="static/yiliao.png" alt="">
                    <p class="yibao">医保</p>
                     <p class="buy2">无保障</p>
                  </div>

                <div class="ul3-right">
                  <div @click='name1(rt)' class="two">
                    <p class="wu">{{location}}市城镇居民医疗保险</p>
                  </div>
                   <p class="banli">不办社保后果严重，建议尽快办理!</p>
                 </div>
             </div>
             <!-- 上海 -->
             <div v-if='(child.hasSocialInsurance=="1")&&(location=="上海")&&((child.label.indexOf("boy")||child.label.indexOf("girl"))&&child.age<18)' class="ul2" id="lplp" @click='name(rt)'>
                    <div @click='name1(rt)' class="ul2-two">
                       <img src="static/jijin.png" alt="">
                       <p class="yibao">互助基金</p>
                       <p class="buy1">保障中</p>
                     </div>

                   <div class="ul2-right">
                     <div @click='name1(rt)' class="two">
                       <p>{{location}}市少儿住院互助基金</p>
                     </div>
                      <p class="chakan">[查看保障详情]</p>
                    </div>
                </div>

                <div v-if='(child.hasSocialInsurance=="0")&&(location=="上海")&&((child.label.indexOf("boy")||child.label.indexOf("girl"))&&child.age<18)' class="ul2" id="lplp" @click='name(rt)'>
                       <div @click='name1(rt)' class="ul2-two">
                          <img src="static/jijin.png" alt="">
                          <p class="yibao">互助基金</p>
                          <p class="buy2">无保障</p>
                        </div>

                      <div class="ul2-right">
                        <div @click='name1(rt)' class="two">
                          <p>{{location}}市少儿住院互助基金</p>
                        </div>
                         <p>建议尽快办理，了解[如何办理]</p>
                       </div>
                   </div>

</div>

 <p class="update" @click='xiugai()'><img src="static/update.png" alt=""></p>

   <div class="baos">
        <p class="chtui1">{{renya[child.labelName+'']}}的保单</p>
        <div v-if='child.policies.length>0' class="ul2" id="lplp" v-for='(rt,index) in child.policies' :index=index  @click='name1(rt)'>

          <div @click='name1(rt)' class="ul3-two">
             <img v-if="rt.productType=='1'" src="static/zhongji.png" alt="">
             <img v-else-if="rt.productType=='2'" src="static/yiwai.png" alt="">
             <img v-else-if="rt.productType=='3'" src="static/yiliao.png" alt="">
             <img v-else="rt.productType=='4'" src="static/dingshou.png" alt="">
             <p>{{baoxianType[rt.productType + ''] }}</p>
              <p class="buy1">{{youxiaos[index]}}</p>
           </div>
          <p class="xial1"></p>
         <div class="ul3-right">
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
            <p class="chakan1"  @click='name1(rt)'>[查看保障详情]</p>
          </div>
      </div>

         </div>
         <div v-if='child.policies.length<=0' class="luoben">
             <p>哎呀，没找到保单信息，不会在裸奔吧~</p>
         </div>


      <div @click='baodan()' class="wei">
        <img src="static/add.png" alt="">
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
        // console.log(startYear);
        // console.log(endYear);
        // console.log(endMonth);
        // console.log(parseInt(endMonth)*30+parseInt(endDay));
        // console.log(parseInt(startMonth)*30+parseInt(startDay));
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

var qunaju;
var ok;
var po;
export default {
  props:['child'],
  data() {
    return {
      guo: '',
      age:'',
      birthday:'',
      baofei:'',
      youi: 0,
      user: [],
      cin:'',
      baozu:[],
      xiangqing: [],
      occu: '',
      label:'',
      nianfen:'',
      location:'',
      renya:{
        "本人":"我",
        "配偶":"配偶",
        "父亲":"父亲",
        "爸爸":"爸爸",
        "妈妈":"妈妈",
        "配偶爸爸":"配偶爸爸",
        "配偶妈妈":"配偶妈妈",
        "儿子":"儿子",
        "大儿子":"大儿子",
        "二儿子":"二儿子",
        "小儿子":"小儿子",
        "女儿":"女儿",
        "大女儿":"大女儿",
        "二女儿":"二女儿",
        "小女儿":"小女儿"

      },
      baoxianType: {
        '1': '重疾险',
        '2': '意外险',
        '3': '医疗险',
        '4': '定期寿险'
      },
      gender:{
        'M':'男',
        'F':'女'
      },
      name:{
        '本人':'我'
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
      youxiaos:[],
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
      chuild:'',
      huu: '',
      huw: '',
      memberId: '',
      qule: 'e',
      start: '',
      end: '',
    }
  },
  methods: {
    baodan() {
      // console.log(e);
      this.$router.push({
        path: '/addbao/1',
        query: {
          memberId: this.child.label,
          renyuan: this.child.labelName,
        }
      })
      this.qule = 'e'
    },
    xiugai(){
      this.$router.push({
        path: '/hospital',
        query:{
          result:this.child
        }
      })
    },
    name1(e) {
      this.$router.push({
        path: '/xiang',
        query: {
          xinxi:e,
          // policyId:this.pocy,
          renyuan: this.child.labelName,

        }
      })
    },
    getin(e,r,o) {
      console.log(e);
      console.log(r);
      console.log(o);
      // console.log(e.details[0].planId);
      localStorage.setItem('chanPinData', JSON.stringify(e));
      localStorage.setItem('ageXIng', JSON.stringify(this.chuild));
      this.$router.push({
        path: '/chanpin/' + r.productType,
        query: {
          // policyId:e.policyId,
          label:this.label,
          chanpin: e,
          buty: this.child,
          bu: r.productType,
          oi:o,
          child:this.chuild,
          // meiren: this.chu,
          gender: this.huu
        }
      })
    }
  },
  watch: {
    '$route' (newV, oldV) {
      console.log(oldV.path);
    console.log(this.$route.query);
    console.log(this.child);
      if (oldV.path!="/familypolicies") {

   if (oldV.path=="/addbao/2") {
     console.log(this.youxiaos);
     console.log(this.child);
     if (this.$route.query.guo.label==this.child.label) {
        console.log('我的label名字是');

          for (var i = 0; i < this.child.policies.length; i++) {
            console.log(this.child.policies);

                     if (this.$route.query.id==this.child.policies[i].policyId) {
                       console.log('我到底该怎，吗解决的');
                         this.child.policies.splice(i,1,this.$route.query.guo);
                         console.log(this.child.policies);
                        //  this.youxiaos.splice(i,1);
                         this.$emit('update:itemCon', this.child);
                         break;
                     }
     }
      //  if(this.$route.query.guo != undefined){
      //    this.child.policies.push(this.$route.query.guo);
      //    this.$emit('update:itemCon', this.child);
      //  }
       console.log(this.child.policies);
     }
    //  else {
    //    console.log('kkpokpokpkpkpkpkp');
    //    this.$router.push({
    //
    //      path: '/goods',
    //     //  query: {
    //     //    id: this.$route.query.policyId,
    //     //    guo: er,
    //     //    label:er.label
    //      //
    //     //  }
    //    })
    //  }
         // console.log(this.child);
         var that = this;

         var k = this.$route.query;
         that.chu = k.id;
         this.chuild = this.child;
         // console.log(this.child);
         // that.birthday = this.child.birthday;
         //              that.nianfen = new Date().getFullYear();
         //              that.birthday = (this.child.birthday).substr(0,4);

                      that.age = this.child.age;
                     //  console.log(that.age);

                     that.wo = this.child.schemes
                              //  console.log(that.wo);
                               var sum = 0;

                                 if (that.wo) {
                                   for (var h = 0; h < that.wo.length; h++) {
                                     for (var k = 0; k < that.wo[h].details.length; k++) {
                                        sum = parseInt(that.wo[h].details[k].premium) + parseInt(sum)
                                   }
                                     that.occu = sum
                                 }


                               }else {
                                 that.occu = '0';
                               }
                               that.user = this.child.policies
                               console.log(that.user);
                                that.youxiaos=[];
                           if (that.user.length>0) {
                             for (var x = 0; x < that.user.length; x++) {
                               that.start = that.user[x].expirationDate;
                               that.end = that.user[x].effectiveDate;
                               that.youxiao = jsGetAge(that.start)
                               that.youxiaos.push(that.youxiao)
                             }
                          } else {

                             that.user = []
                           }

   } else if(oldV.path=="/xiang") {
     console.log('gnagdsajsdfdsj');
       console.log(this.youxiaos);
       if (this.$route.query.id==this.child.label) {
         //  console.log('我的label名字是');
         console.log('我手机刚想');
            for (var i = 0; i < this.child.policies.length; i++) {
                       if (this.$route.query.policyId==this.child.policies[i].policyId) {
                           this.child.policies.splice(i,1);
                           this.youxiaos.splice(i,1);
                           this.$emit('update:itemCon', this.child);
                           break;

                       }
       }
         if(this.$route.query.guo != undefined){
           this.child.policies.push(this.$route.query.guo);
           this.$emit('update:itemCon', this.child);
         }
         // console.log(this.child.policies);
           }
           // console.log(this.child);
           var that = this;

           var k = this.$route.query;
           that.chu = k.id;
           this.chuild = this.child;
           // console.log(this.child);
           that.birthday = this.child.birthday;
                        that.nianfen = new Date().getFullYear();
                        that.birthday = (this.child.birthday).substr(0,4);

                        that.age = parseInt(that.nianfen)-parseInt(that.birthday);
                       //  console.log(that.age);

                       that.wo = this.child.schemes
                                //  console.log(that.wo);
                                 var sum = 0;

                                   if (that.wo) {
                                     for (var h = 0; h < that.wo.length; h++) {
                                       for (var k = 0; k < that.wo[h].details.length; k++) {
                                          sum = parseInt(that.wo[h].details[k].premium) + parseInt(sum)
                                     }
                                       that.occu = sum
                                   }


                                 }else {
                                   that.occu = '0';
                                 }
                                 that.user = this.child.policies
                                 // console.log(that.user);
                                  that.youxiaos=[];
                             if (that.user.length>0) {
                               for (var x = 0; x < that.user.length; x++) {
                                 that.start = that.user[x].expirationDate;
                                 that.end = that.user[x].effectiveDate;
                                 that.youxiao = jsGetAge(that.start)
                                 that.youxiaos.push(that.youxiao)
                               }
                            } else {

                               that.user = []
                             }

     }else if(oldV.path=="/addbao/1") {
       console.log('gnagdsajsdfdsj');
         console.log(this.youxiaos);
         if (this.$route.query.guo.label==this.child.label) {
           //  console.log('我的label名字是');
           console.log('我手机刚想');
              for (var i = 0; i < this.child.policies.length; i++) {
                         if (this.$route.query.policyId==this.child.policies[i].policyId) {
                           console.log('lalalallalalall');
                             this.child.policies.splice(i,1);
                             this.youxiaos.splice(i,1);
                             this.$emit('update:itemCon', this.child);
                             break;

                         }
         }
           if(this.$route.query.guo != undefined){
             console.log(this.youxiaos);
             this.child.policies.push(this.$route.query.guo);
             this.$emit('update:itemCon', this.child);
           }
           // console.log(this.child.policies);
             }
             // console.log(this.child);
             var that = this;

             var k = this.$route.query;
             that.chu = k.id;
             this.chuild = this.child;
             // console.log(this.child);
             that.birthday = this.child.birthday;
                          that.nianfen = new Date().getFullYear();
                          that.birthday = (this.child.birthday).substr(0,4);

                          that.age = parseInt(that.nianfen)-parseInt(that.birthday);
                         //  console.log(that.age);

                         that.wo = this.child.schemes
                                  //  console.log(that.wo);
                                   var sum = 0;

                                     if (that.wo) {
                                       for (var h = 0; h < that.wo.length; h++) {
                                         for (var k = 0; k < that.wo[h].details.length; k++) {
                                            sum = parseInt(that.wo[h].details[k].premium) + parseInt(sum)
                                       }
                                         that.occu = sum
                                     }


                                   }else {
                                     that.occu = '0';
                                   }
                                   that.user = this.child.policies
                                   // console.log(that.user);
                                   that.youxiaos=[];
                               if (that.user.length>0) {
                                 for (var x = 0; x < that.user.length; x++) {
                                   that.start = that.user[x].expirationDate;
                                   that.end = that.user[x].effectiveDate;
                                   that.youxiao = jsGetAge(that.start)
                                   that.youxiaos.push(that.youxiao)
                                 }
                              } else {

                                 that.user = []
                               }

       }
}

}

  },
  mounted() {

  var that = this;

  var k = this.$route.query;
that.chu = k.id;
this.chuild = this.child;
// console.log(this.child);
 that.birthday = this.child.birthday;
               that.nianfen = new Date().getFullYear();
               that.birthday = (this.child.birthday).substr(0,4);

               that.age = parseInt(that.nianfen)-parseInt(that.birthday);

              that.wo = this.child.schemes
                       //  console.log(that.wo);
                        var sum = 0;

                          if (that.wo) {
                            for (var h = 0; h < that.wo.length; h++) {
                              for (var k = 0; k < that.wo[h].details.length; k++) {
                                 sum = parseInt(that.wo[h].details[k].premium) + parseInt(sum)
                            }
                              that.occu = sum
                          }


                        }else {
                          that.occu = '0';
                        }
                        that.user = this.child.policies
                        // console.log(that.user);
                    if (that.user.length>0) {

                      for (var x = 0; x < that.user.length; x++) {
                          that.youxiao = '';
                        that.start = that.user[x].expirationDate;
                        that.end = that.user[x].effectiveDate;
                        that.youxiao = jsGetAge(that.start)
                        that.youxiaos.push(that.youxiao)
                      }


                    } else {

                      that.user = []
                    }







  },
  updated() {

  },
  created() {
    console.log(this.$route.query);
    // console.log('~~~~~~~~~~~~~~~~~~');
    // console.log(this.child);
    var that = this;
    var fei=0;
      this.axios.get('city.json').then(function(res){
        // console.log(res.data.city)
        for (var c = 0; c < res.data.city.length; c++) {
          if (res.data.city[c].value==that.child.residence) {
              that.location = res.data.city[c].label
          }
        }
      })
                 that.birthday =this.child.birthday;

                 that.nianfen = new Date().getFullYear();

                 that.birthday = (this.child.birthday).substr(0,4);

                 that.age = parseInt(that.nianfen)-parseInt(that.birthday);
                for (var d = 0; d < this.child.schemes.length; d++) {
                     for (var h = 0; h < this.child.schemes[d].details.length; h++) {
                       if ((this.child.schemes[d].details[h].premium).indexOf('.00')!=-1) {
                          fei = parseInt(fei)+parseInt((this.child.schemes[d].details[h].premium).substr(0,(this.child.schemes[d].details[h].premium).indexOf('.00')))
                       }else {
                         console.log('daodidapdidaodadosjfhsjfsh');
                         fei = parseInt(fei)+parseInt(this.child.schemes[d].details[h].premium)
                       }

                     }
                }
                that.baofei = fei

                              that.wo = this.child.schemes

                                        var sum = 0;

                                          if (that.wo) {
                                            for (var h = 0; h < that.wo.length; h++) {
                                              for (var k = 0; k < that.wo[h].details.length; k++) {
                                                 sum = parseInt(that.wo[h].details[k].premium) + parseInt(sum)
                                            }
                                              that.occu = sum
                                          }


                                        }else {
                                          that.occu = '0';
                                        }
                                        that.user = this.child.policies

                                    if (that.user.length>0) {

                                      for (var x = 0; x < that.user.length; x++) {
                                          that.youxiao = '';
                                        that.start = that.user[x].expirationDate;
                                        that.end = that.user[x].effectiveDate;
                                        that.youxiao = jsGetAge(that.start)
                                        that.youxiaos.push(that.youxiao)
                                      }
                                    } else {

                                      that.user = []
                                    }






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

.ul2 .two p{
  padding: 0 10px;
  height: 50px;
  line-height: 50px;
  border-radius: 30px 30px 30px 30px;
  border: 3px solid #FADF76;
  font-size: 30px;
  width: 100%;
  margin: 0 auto;
  margin-top:10px;
  color: #EBBB00;

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
    color: #808080;
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
.update{
  text-align: center;
}
.update img{
  width: 298px;
  height: 164px;
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


}
.ulop:nth-of-type(2){
   margin-top: 80px;
}
.ulop:nth-of-type(1){
   margin-top: 32px;
   margin-bottom: 32px;

}

.ulops{
  width: 68%;
  position: relative;

}
.ulops img{
  width: 58px;
  height: 64px;
  top: -260px;
  left: -20px;
  position: relative;

}
.ulop .two{
  float: left;
  margin-left: 30px;
  margin-bottom: 20px;
}
.ulop .two p{
  /*margin-top: 30px;*/
  font-size: 30px;
  color: #FADF76;
  /*width: 85%;*/
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
  color: #838383;
}
.baoxia-right div p{
  font-size: 30px;
  margin: 0;
  margin-left: 10px;
}
#lplp{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
}
.ul2-two{
  width:30%;

}
.ul3-two{
  width:30%;
  text-align: center;
  margin-left: -100px;
}
.ul3-two p:nth-of-type(1){
  font-size:32px;
  font-weight: 600;
  margin: 0;
  margin-left: 30px;
}
.ul3-two img{
  height: 36px;
  width:36px;
  margin-left: 10px;
}
.ul2-two img{
  width: 40px;
  height: 40px;
}
.ul2-two p:nth-of-type(1){
  font-size:32px;
  font-weight: 600;
  margin: 0;
}
.ul2-two p:nth-of-type(2){
  font-size:24px;
}
.ul2-right{
  width: 50%;
}
.ul3-right{

  margin-left: 30px;
}
.ul3-right .ulop-left{
  width: 100%;
  margin-left: 9px;
  margin-top: 20px;
}
.ul3-right .ulop-left p{
  margin-left: 20px;
}
.ul3-right .ulop-right{
  width:100%;
}
.ul3-right .ulop-right p{
  margin-left: 20px;
}
.ul3-right .two p{
  text-align: center;
}
.ul3-right .two{
  float: left;
}
.ul3-right .chakan{
margin-top: 120px;
}
.ulop-left,.ulop-right{
  display: flex;
  text-align: left;
  flex-direction: row;
  align-items: center;


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
.chakan{
  color: #808080;
  font-size: 26px;

}
.chakan1{
  color: #808080;
  font-size: 26px;

}
.buy{
  border: 2px solid #A0A0A0;
  border-radius: 25px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  width: 120px;
  color: #414141;
  margin-left: 40px;
}
.buy1{
  border: 2px solid #A0A0A0;
  border-radius: 25px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  width: 120px;
  text-align: center;
  color: #414141;
  margin-left: 40px;
  /*margin-left: 40px;*/
}
.buy2{
  border: 2px solid #A0A0A0;
  border-radius: 25px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  width: 120px;
  text-align: center;
  color: #414141;
  background: #D8D8D8;
  margin-left: 40px;
  /*margin-left: 40px;*/
}
.xial{
  width: 4px;
  background: #F7F7F7;
  height: 150px;
}
.xial1{
  width: 4px;
  background: #F7F7F7;
  height: 150px;
}

.yibao{
  width: 120px;
  padding-left: 20px;
}
.baoimg{
  margin-left: 30px;
}
.ul3-right .two .wu{
  color: #808080;
  border: 2px solid #808080;
}
.banli{
  color: #808080;
  font-size: 26px;
  margin-top: 120px;
}
</style>
