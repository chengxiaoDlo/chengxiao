<template lang="html">
     <div v-title="'更新社保'" class="">
     <div class="l-title">
           <img @click='back()' src="static/f1.png" alt="">
           <p @click='change(1)'>修改个人信息</p>
      </div>
      <div class="">
         <span>社保</span>
         <div class="">
             <p>已办理</p>
             <p>未办理</p>
         </div>
      </div>
      <div class="live">
        <span>医保所在地</span>
        <p class="yibao" @click='show()'>{{address}}</p>
      </div>
      <div class="">
        <span>医保类型</span>
        <el-select v-model="value" placeholder="城镇居民">
       <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
      </div>

      <div class="">
          <span>少儿互助基金</span>
          <div class="">
               <p>已办理</p>
               <p>未办理</p>
          </div>
      </div>

        <div class="">
            <p>保存</p>
        </div>

       <div v-show='areaIsshow' class="areabox">
             <div class="areaboxfix">
                 <span @click="areaChooseOk">确定</span>
             </div>
            <mt-picker :slots="myAddressSlots" @change="onValuesChange"></mt-picker>
       </div>

   </div>
</template>

<script>
 import myaddress from '../../pca.json'

 // import myadd from '../../pca.json'
export default {
  data(){
    return{
      options: [{
          value: '选项1',
          label: '城镇居民'
        }, {
          value: '选项2',
          label: '城镇职工'
        }, {
          value: '选项3',
          label: '新农合'
        }],
        value:'',
      myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 0,
            values: Object.keys(myaddress),  //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            // values:Object.values(myaddress),
            className: 'slot3',
            textAlign: 'center'
          }

        ],
        myAddressProvince:'',
        myAddressCity :'',
        myAddresscounty :'',
        areaIsshow:false,
        address:'',
        province:'',
        city:''


    }
  },
  methods:{
    onValuesChange(picker, values) {

       if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组

          picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组

          this.myAddressProvince = values[0];
          this.myAddressCity = values[1];
          this.myAddresscounty = values[2];
        }

    },
    back(){
      history.back();
    },
    show(){
      this.areaIsshow=true;
    },
    areaChooseOk(){
        // 点击确定，关闭地域模块
        this.areaIsshow=false;
        console.log($('.slot1>.picker-slot-wrapper .picker-selected').html());
        this.province = $('.slot1>.picker-slot-wrapper .picker-selected').html();
        console.log($('.slot3>.picker-slot-wrapper .picker-selected').html());
        this.city = $('.slot3>.picker-slot-wrapper .picker-selected').html()
        $('.yibao').html(this.province+"-"+this.city)
    }

  },
  created(){
    console.log(this.$route.query);
    this.address = this.$route.query.result.residence
  }
}
</script>

<style lang="css" scoped>
@import "../../static/css/index.css";
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
.live{
  margin-top: 300px;
}
.live>p{

  width: 100%;
  height: 50px;
  border: 3px solid black;
}
</style>
