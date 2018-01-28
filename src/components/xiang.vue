<template lang="html">
  <div class="">

  <div class="l-title">
        <img @click='back()' src="static/f1.png" alt="">
       <p @click='change(1)'>{{nu.productName}}</p>
    </div>
    <div class="l-table">
      <div class="table">
          <div>
            <p class="one"><span>被保险人</span></p>
            <p class="one1">{{ui}}</p>
          </div>
          <div>
            <p class="one"><span>险种</span></p>
            <p class="one1">{{baoxianType[nu.productType+'']}}</p>
          </div>
          <div>
            <p class="one"><span>生效日期</span></p>
            <p class="one1" v-if='nu.expirationDate'>{{nu.expirationDate}}</p>
            <p class="one1" v-else>至终身</p>
          </div>
          <div>
            <p class="one"><span>有效期</span></p>
            <p class="one1">{{nu.effectiveDate}}</p>
          </div>
          <div>
            <p class="one"><span>保额</span></p>
            <p class="one1">{{(nu.sumInsured)/10000}}</p>
          </div>

      </div>
    </div>
    <div class="wei">
        <p @click='delet()' class="delet">删除</p>
        <p @click='bian(nu)' class="bianji">编辑</p>
    </div>
    <div v-if="shanchu=='shanchu'" class="shanchu">

    </div>
    <div v-if="shanchu=='shanchu'" class="shi">
       <p class="pi">请确认是否删除？</p>
       <div class="ps">
          <p @click='yes()'>是</p>
          <p @click='fou()'>否</p>
       </div>
    </div>
  </div>
</template>

<script>
var ki;

export default {
  data(){
    return{
      shanchu:'',
      nu:[],
      policyId:'',
      ju:'ass',
      id:'',
      luji:'',
      ui:'',
      baoxianType: {
        '1': '重疾险',
        '2': '意外险',
        '3': '医疗险',
        '4': '定期寿险'
      },
    }
  },
  methods:{
    back(){
      // history.back();
      this.$router.push({
        path: '/goods',
        query:{
          id:this.nu.label,
          memver:this.$route.query.memberId,
          renyuan:this.ui,
          xinxi:this.$route.query.xinxi
        }

      })
    },
    bian(r){
      this.$router.push({
        path: '/addbao/2',
        query:{
          xinxi:r,
          policyId:this.nu.policyId,
          memver:this.$route.query.memberId,
          renyuan:this.ui,
        }

      })
    },
    yes(){
      var that = this;
       console.log(this.nu.policyId);
    this.axios.get(this.domain+'/policy/deletePolicy?id='+this.nu.policyId,{headers:{"token":that.getCookie("token")}}).then(function(res) {
      if(res.data.isSuccess){
        console.log('chengon');
      } else if(res.data.errorCode == '10001'){
        this.login();
      } else {
        alert(res.data.errorMsg);
      }

      })


      this.$router.push({
        path: '/goods',
        query:{
          id:this.nu.label,
          policyId:this.nu.policyId,
          memver:this.$route.query.memberId,
          renyuan:this.ui,
          xinxi:this.$route.query.xinxi
        }

      })

    },
    fou(){
        this.shanchu=''
    },
    delet(){
       this.shanchu='shanchu'
    }
  },
  created(){

    var that = this;
    console.log(this.$route.query);
    this.nu = this.$route.query.xinxi;
    console.log(this.nu);
    var sd = this.$route.query.memberId;
    this.id = this.$route.query.memberId;
    this.ui = this.$route.query.renyuan

    this.axios.get(this.domain+'/scheme/getFamilyScheme',{headers:{"token":that.getCookie("token")}}).then(function(res) {
      console.log(res.data.result.members);
      for (var i = 0; i < res.data.result.members.length; i++) {
        for (var j = 0; j < res.data.result.members[i].policies.length; j++) {
               if (res.data.result.members[i].policies[j].policyId==that.nu.policyId) {
                 console.log('ddddd');
                     that.nu = res.data.result.members[i].policies[j]
               }
        }
      }
    })
    console.log('我也请求了');
  }
}
</script>

<style lang="css" scoped>
*{
  margin: 0;
  padding: 0;
}
.shanchu{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: black;
  opacity: .6;
}
.shi{
  height: 300px;
  width: 70%;
  position: fixed;
  top: 450px;
  left:15%;
  border-radius: 5px 5px 5px 5px;
  background: white;
}
.shi .pi{
  height: 200px;
  text-align: center;
  font-size: 32px;
  line-height: 200px;
  border-bottom: 1px solid #F3F3F3;
}

.shi .ps{
  height: 100px;
  font-size: 32px;
  display: flex;
  flex-direction: row;
}
.shi .ps p{
  text-align: center;
  width: 50%;
  height: 100px;
  line-height: 100px;
}
.shi .ps p:last-child{
  color: #F4DA75;
  border-left: 1px solid #F3F3F3;
}
.l-table{
margin-top: 150px;
  padding-top: 20px;
}
.table{
  border-radius: 20px 20px 20px 10px;
}
.wei{
  margin-top: 30px;
  width: 90%;
  display: flex;
  flex-direction: row;
}
.wei .delet{
  line-height: 80px;
  margin-left: 50px;
  height: 80px;
  width: 40%;
  font-size: 31px;
  text-align: center;
  border:2px solid black;
  border-radius: 5px 5px 5px 5px;
}
.wei .bianji{
text-align: center;
  line-height: 80px;
  margin-left: 50px;
  height: 80px;
  font-size: 31px;
  width: 40%;
  border: 2px solid #DCB008;
    border-radius: 5px 5px 5px 5px;
  color: #DCB008;
  border-radius: 2px;
}
.table div{

  align-items: center;
display: flex;
flex-direction: row;
  margin-left: 20px;
  width: 90%;
  height: 100px;
  /*border: 1px solid gray;*/
  box-shadow: 1px 1px 3px 1px #F3F3F3;
}
tr{

}
.one{
  font-size: 32px;
  line-height: 100px;
   width: 150px;
  background: #FADF76;
  text-align: center;

}
.one span{
    border-bottom: 1px solid #F2D254;
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.one1{
 color: #696969;
 font-size: 32px;
  text-align: left;
  padding-left: 10px;
  border-bottom: 1px solid #F4F4F4;
  border: none;
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
</style>
