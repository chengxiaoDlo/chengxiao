<template lang="html">
  <div v-title="'风险测评报告'" class="">
      <div class="l-title">
          <img src="static/jia1.png" alt="">

      </div>
      <div class="imgsji">
        <div v-if='biaoqian[0].memberBiao3' class="one">
          <img src="static/1t.png" alt="">
          <p>{{biaoqian[0].memberBiao3}}</p>
        </div>
        <div v-if='biaoqian[0].memberBiao4' class="two">
          <img src="static/2t.png" alt="">
          <p>{{biaoqian[0].memberBiao4}}</p>
        </div>
        <div v-if='biaoqian[0].age' class="three">
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

      <div class="laia">
        <div class="lai">
          <h1>愚公移山</h1>
          <p>的家庭成员</p>
        </div>

      </div>
      <div class="yuh">
         <div v-for='item of data1' class="yugong">
              <img :src="'static/' +zhaopian[item.memberType+'_'+item.gender] +'.png'" alt="">
              <p>{{item.labelName}}</p>
         </div>
      </div>
      <div class="baogao">
        <img src="static/baogao.png" alt="">
      </div>
      <div @click='looki()' class="look">
         <p>查看方案</p>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      data1:'',
      result:'',
      biaoqian:[],
      duixiang:{},
      ageBiao:'',
      memberBiao1:'',
      memberBiao2:'',
      memberBiao3:'',
      memberBiao4:'',
      memberBiao5:'',
      location:'',
      rich:'',
      middleRich:'',
      hao:'',
      homeNu:'',
      noDet:'',
      membersKu:[],
      zhaopian:{
        '0_M':'M',
        '0_F':'F',
        '1_M':'M',
        '1_F':'F',
        "3_M":'S',
        '3_F':'D'
      },
    }
  },
  watch:{
    '$route' (newV, oldV) {

  console.log(this.$route.query);
  this.biaoqian = this.$route.query.biaoqian

}
  },
  methods:{
    looki(){
      this.$router.push({
            path:'/goods',
            query:{
              biaoqian:this.biaoqian,
              result:this.result
            }
          })
    }
  },
  created(){

    var that = this;
    var d = new Date();
    var endYear = d.getFullYear();
      this.axios.get(that.domain+'/scheme/getFamilyScheme',{headers:{"token":this.getCookie("token")}}).then(function(res){
        console.log(res)
        if(res.data.isSuccess){
          var jsondatas = JSON.stringify(res);
          var sm = JSON.parse(jsondatas);
          console.log(sm.data.result);
          that.result = sm.data.result;
          that.data1 = sm.data.result.members;

          console.log(that.data1);

          for (var d = 0; d < that.data1.length; d++) {
             that.membersKu.push(that.data1[d].label)
            if (that.data1[d].label=="self") {
              that.axios.get('city.json').then(function(res){
                console.log(res.data.city)
                for (var c = 0; c < res.data.city.length; c++) {
                  if (res.data.city[c].value==that.data1[0].residence) {
                      that.location = res.data.city[c].label
                  }
                }
              })
              //  that.location =that.data1[d].residence;
               that.duixiang.location = that.location

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

                      // if (that.membersKu.length>2) {
                      //      that.memberBiao2 = '孝顺父母';
                      //
                      // }
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
         that.biaoqian.push(that.duixiang)
        console.log(that.biaoqian);
        localStorage.setItem('biaoqian', that.biaoqian)
        } else if(res.data.errorCode == '10001'){

        } else {
          alert(res.data.errorMsg);
        }

      })



  }
}
</script>

<style lang="css" scoped>
body{
  margin: 0;
  padding: 0;
}
 .l-title{

   margin-top: -50px;
   position: relative;
   width: 100%;
    height:900px;
 }
 .l-title>img{

  position: absolute;
  top:50px;
  left: 0;
  width: 100%;
  height:900px;
 }
 .yugong{
   margin-left: 30px;
   z-index:2000;
   float: left;
   height: 100px;
   margin-bottom: 50px;
 }
 .yugong>img{

   width: 104px;
   height: 104px;
   z-index:2000;

 }
 .yugong>p{
  font-size: 28px;
  text-align: center;
  width: 100px;
  margin-top: 0;
 }
 .yuh{
   margin-left: 100px;
   position: relative;
   width: 80%;
   z-index: 999;
   top: 50px;
 }
 .lai{
   width: 70%;
   z-index: 999;
   display: flex;
  flex-direction: row;
margin-left: 90px;
 }
 .laia{
   margin-top: -150px;
   z-index: 999;
   width: 80%;
   margin-left: 120px;

 }
 .lai h1{
   z-index: 999;
   font-size: 40px;
 }
 .lai p{
   z-index: 999;
   margin-top:40px;
   font-size: 30px;
 }
 .baogao{
   width: 100%;
   margin-bottom: 200px;
 }
 .baogao img{
   width: 100%;
   margin-top: 170px;

 }
 .imgsji{
   z-index: 10000000;
   position: absolute;
   left: 50px;
   top: 130px;
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

   top:300px;
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
  margin-top: 400px;
  margin-bottom: 100px;
 text-align: center;
 }
 .text img{
   width: 90%;
 }
 .look{

   left: 0;
   bottom: 0;
   position: fixed;
   height: 102px;
   width: 100%;
   background: #FCEA6E;
   color: #7A675A;

   font-size: 32px;
   box-shadow: 0 0 3px 3px #F3EFC9;
 }
.look p{
  margin-top: 0;
  font-weight: 600;
  text-align: center;
  line-height: 102px;
}
</style>
