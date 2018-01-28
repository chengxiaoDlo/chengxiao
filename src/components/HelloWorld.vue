<template>
<div class="">


<div v-if='dataliu' class="l-zong">

  <div class='list'>

    <div class='all'>
      <div class="all-l">
        <img v-if="type=='1'" src="static/zhongji.png" alt="">
        <img v-else-if="type=='2'" src="static/yiwai.png" alt="">
        <img v-else-if="itype=='3'" src="static/yiliao.png" alt="">
        <img v-else="type=='4'" src="static/dingshou.png" alt="">
        <p v-if="type=='1'">{{baoxianType[type+'']}}</p>
        <p v-if="type=='2'">{{baoxianType[type+'']}}</p>
        <p v-if="type=='3'">{{baoxianType[type+'']}}</p>
        <p v-if="type=='4'">{{baoxianType[type+'']}}</p>
      </div>
      <p class="xial"></p>
      <!-- <span class="anxin an">{{zhanshi}}</span> -->
      <div class='left'>
        <div class='top-mid'>
          <p class="top-midtext kaikai">{{kaikai.planName}}</p>
        </div>
        <div class='top-foot'>
          <div class="lashang">


          <div class='foottip1'>
            <p class='tips1'>保额:</p>
            <p class='tips2'>{{(kaikai.sumInsured)/10000}}万</p>
          </div>
          <div class='foottip2'>
            <p class='tips1'>保费:</p>
            <p v-if='kaikai.premium!=0' class='tips2'>{{kaikai.premium.substr(0,kaikai.premium.indexOf('.00'))}}元/年</p>
            <p v-else>0元/年</p>
          </div>



          </div>
          <div class="laxia">

            <div class='foottip1'>
              <p class='tips1'>保障期限:</p>
              <p class='tips2' v-if='kaikai.insurancePeriod'>{{(kaikai.insurancePeriod).substr(0,(kaikai.insurancePeriod).indexOf('Y'))}}年</p>
            </div>

          <div class='foottip2'>
            <p class='tips1'>缴费年限:</p>
            <p v-if='kaikai.paymentPeriod' class='tips2'>{{kaikai.paymentPeriod}}年</p>

          </div>
          </div>
        </div>
      </div>
      <!-- <img class="jian" src="static/jian.png" alt=""> -->
        <img class="check" @click='chan1(idz)' v-if="show.indexOf(idz)!=-1" src="static/check.png"></img>
        <img class="check" v-else @click='chan1(idz)' src="static/nocheck.png"></img>
    </div>
  </div>
  <h3 class="samel">其他同类产品推荐</h3>
  <div class="l-title">
    <img @click='back()' src="static/f1.png" alt="">
    <p @click='change(1)'>{{chan}}</p>
  </div>
  <div class="suoyou">
    <div v-for='item of datali' class='list'>

      <div class='xin-all'>
        <div class="xin">
          <img class="xianzhong" v-if="type=='1'" src="static/zhongji.png" alt="">
          <img class="xianzhong" v-else-if="type=='2'" src="static/yiwai.png" alt="">
          <img class="xianzhong" v-else-if="itype=='3'" src="static/yiliao.png" alt="">
          <img class="xianzhong" v-else="type=='4'" src="static/dingshou.png" alt="">
          <p v-if="type=='1'">{{baoxianType[type+'']}}</p>
          <p  v-if="type=='2'">{{baoxianType[type+'']}}</p>
          <p v-if="type=='3'">{{baoxianType[type+'']}}</p>
          <p v-if="type=='4'">{{baoxianType[type+'']}}</p>
        </div>
        <div class='xin-left' @click='tiao(item)'>
          <div class='top-mid'>
            <p class="top-midtext juzhong">{{item.planName}}</p>

          </div>
        </div>
          <img class="licheck" @click='chan1(item.planId)' v-if="show.indexOf(item.planId)!=-1" src="static/check.png"></img>
           <img class="licheck" v-else @click='chan1(item.planId)' src="static/nocheck.png"></img>
      </div>
    </div>
  </div>
  <div class="bottom">
    <p @click='duibi()'>
      选择2个产品进行对比
    </p>
  </div>
</div>
<div v-else class="tupian">
  <img src="static/loading.gif" alt="">
</div>
</div>
</template>
import $ from 'jquery'
<script>
export default {
  name: 'HelloWorld',
  data() {

    return {
      datali:[],
      shuzu:'',
      tu:{},
      zhanshi:'',
      kaikai:'',
      uk:'',
      ukk: '',
      idz: '',
      tyz: '',
      data: '',
      type:'',
      imge: '',
      baoxianType: {
        '1': '重疾险',
        '2': '意外险',
        '3': '医疗险',
        '4': '定期寿险'
      },
      imge1: '',
      imge2: '',
      imge3: '',
      imge4: '',
      imge5: '',
      imge6: '',
      show: [],
      chan: '产品对比',
      pro1: [],
      pro3: [],
      pro4: [],
      pro2: [],
      dataliu:'',
    }
  },
  methods: {
  back() {
    history.back()
  },
  chan1(e) {
    if (this.show.indexOf(e) == -1) {
      if (this.show.length < 2) {
        this.show.push(e)
      } else {
        this.$message({
          message: '最多可选两个',
          type: 'warning'
        })
      }
    } else {
      this.show.forEach((item, index, arr) => {
        if (item == e) {
          this.show.splice(index, 1)
        }
      });
    }
    console.log(this.show);
  },
  duibi() {

    this.$router.push({
      path: '/duibi/' + this.$route.query.type,
      query: {
        huan:this.$route.query,
        rou:this.$route.query.type,
        planId: this.show,

      }
    })
    this.Bus.$emit('chuanzhi', [this.pro1, this.pro2, this.pro3, this.pro4])
  },

},

  created() {
      console.log(this.$route.query);
      this.type = this.$route.query.type;
        // console.log(JSON.parse(localStorage.getItem('chanP')));
        if (this.$route.query.type==1) {
          this.dataliu =JSON.parse(localStorage.getItem('jiproduct'));
          console.log(this.dataliu);
        }
        if (this.$route.query.type==2) {
          this.dataliu =JSON.parse(localStorage.getItem('waproduct'));
        }
        if (this.$route.query.type==3) {
          this.dataliu =JSON.parse(localStorage.getItem('liaoproduct'));
        }
        if (this.$route.query.type==4) {
          this.dataliu =JSON.parse(localStorage.getItem('showproduct'));
        }
      var that = this;
      // console.log(this.$route.query);
      // console.log(this.$route.query.su1);
        // console.log(this.$route.query.su2);
        this.tu.top = this.$route.query.su1;
        this.tu.bo = this.$route.query.su2;
        // console.log(this.tu);

      //  console.log(JSON.parse(localStorage.getItem('chanPinData')))
      that.kaikai =JSON.parse(localStorage.getItem('chanPinData'));
      console.log(that.kaikai);
      // that.zhanshi =JSON.parse(localStorage.getItem('zhanshi'));
    that.idz = this.$route.query.id + '';
    console.log(that.idz);
    this.show.push(this.$route.query.id + '')
    // console.log(this.show);
    this.tyz = this.$route.query.type;
     console.log(this.tyz);

         for (var v = 0; v < that.dataliu.length; v++) {

           if (that.dataliu[v].planId != that.idz) {
               that.datali.push(that.dataliu[v])

            //  localStorage.setItem('zhanshi', JSON.stringify(that.dataliu[v].companyName));

          }else {
            that.zhanshi = that.dataliu[v].companyName
          }

         }



  }
}
</script>
<style scoped>
.samel {
  width:60%;
  font-size:42px;
}

.anxin {
  background: #FADF76;
  display: inline-block;
  border: 1px solid #E8E8E8;
  border-radius: 50% 50%;
  margin-top: 80px;
  height: 10%;
  width: 10%;
  box-shadow: 2px 2px 2px 2px #FAFAFA;
  font-size: 28px;
  padding-top:16px;
  margin-left: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  /*line-height: 150%;*/
  text-align: center;
  padding: 0 auto;
}
.kaikai{
  margin-left: 20px;
  margin-top: 0;
  margin-bottom: 0;
  margin-top: 50px;
}
.plan{
  position: absolute;
   left: 20px;
  top:150px;
  font-size: 28px;
}
.an{

  height: 23%;
  width:10%;

}

.bottom {
  color: #414141;

  background: #FADF76;
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.bottom p{
  text-align: center;
  font-size: 32px;
}
.l-shang{
  margin-right: 1.1rem;
}
.jian {
  position: absolute;
  height:70px;
  width: 70px;
  right: 20%;
}

.l-zong {
  margin-top: 150px;
  width: 98%;
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

.l-top-top {
  width: 100%;
  height: 12px;
  border-radius: 10% 10% 5% 5%;
  background-color: #FADF76;

}
.suoyou{
  margin-bottom: 5rem;
}
.tips2{
  margin-top: 25px;
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

  width: 100%;
flex-direction: row;
justify-content: space-around;
  display: flex;
align-items: center;
}

/* .all>img {
  width: 100px;
  height: 100px;
  position: relative;
  right: 0px;
  top: 0px;
  margin-left: 25px;

} */

.top-midtext {
  text-align: left;
  padding-left: 10px;
  font-size: 34px;
  color: #414141;
}
.top-mid{
  position: relative;
  padding-top: 10px;
  margin: 0 auto;
}
.top-foot {

  text-align: left;

  margin-top: 30px;
  font-size: 0.4rem;
  width: 100%;
}

.foottip1 {
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  height: 50px;

}

.left {
  width: 63%;
  font-size: 32px;
}
.juzhong{
  margin-top: 100px;
  font-size: 34px;
}
.foottip2 {
  display: flex;
  flex-direction: row;
  margin-left: 20px;
}
.foottip2 p{
  margin: 0;
}
.foottip1 p{
  margin: 0;
}
.right {
  text-align: center;
  /*margin-right: .1rem;*/
  /*margin-top: 2.3rem;*/
  margin-top: 120px;
  height: 80px;
  width: 50px;
  background-color: #fff;


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
.lashang{
  display: flex;
  flex-direction: row;
}
.laxia{
  display: flex;
  flex-direction: row;
}
.all-l{
  text-align: center;
  width: 20%;
}
.all-l>p{
  font-size: 30px;
  margin:0;

}
.all-l>img{
  width: 0.533333rem;
  height: 0.533333rem;

}
.xianzhong{
  width: 0.533333rem;
  height: 0.533333rem;
}
.xial{
  width: 0.053333rem;
  background: #F7F7F7;
  height: 2rem;
}
.check{
  width: 100px;
  height: 100px;
  position: relative;
  right: 0px;
  top: -70px;
  margin-left: 25px;
}
.licheck{
  width: 100px;
  height: 100px;
  position: absolute;
   right: -23px;
  top: 0px;
  /* margin-left: 25px;  */
}
/* .xianzhong{
  width: 100px;
  height: 100px;
  position: relative;
  right: 0px;
  top: -70px;
  margin-left: 25px;
} */
.xin-all{
  position: relative;
    width: 97%;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.xin{
  text-align: center;
width: 20%;
}
.xin p{
  font-size: 0.4rem;
    margin: 0;
}
</style>
