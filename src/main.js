// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'animate.css'
import VueScroller from 'vue-scroller'
import VueJsonp from 'vue-jsonp'
import axios from 'axios'
import $ from 'jquery'
import Bus from './bus'
import echarts from 'echarts'
import Picker from 'mint-ui'
import ElementUI from 'element-ui'
import 'lib-flexible/flexible.js'
import 'element-ui/lib/theme-chalk/index.css'
import domain from './domain.js'
import '../static/index.css'


Vue.use(VueScroller)
Vue.use(VueJsonp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.prototype.axios = axios
Vue.prototype.Bus = Bus

Vue.prototype.domain = domain
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title =binding.value
    // el.remove()
  }
})

var codes;
function searchSubstring(str,subStr,order){
  var pos = str.indexOf(subStr);
  var num = 1;
  while(pos>-1){
    if(num == order) {
      return pos;
    }
    pos = str.indexOf(subStr,pos+1);
    num++;
  }

  return -1;
}

//根据name获取cookie值
Vue.prototype.getCookie = function(name) {
  var arr;
  var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return arr[2];
  } else {
    return null;
  }
};

Vue.prototype.setCookie = function(name,value,days)
{
  var exp = new Date();
  exp.setTime(exp.getTime() + days*24*60*60*1000);
  document.cookie = name + "="+ value + ";expires=" + exp.toGMTString() +"; path=/";
}

Vue.prototype.delCookie = function(name)
{
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var currVal=this.getCookie(name);
  if(currVal!=null){
    document.cookie= name + "="+currVal+";expires="+exp.toGMTString() +"; path=/";
  }
}

Vue.prototype.login = function() {
  this.delCookie("token");
  var thisUrl = location.href;
  var splitIndex = searchSubstring(thisUrl,"/",3);
  var docUrl;
  if(splitIndex > 0){
    docUrl = thisUrl.slice(splitIndex);
  }

  // console.info("登录系统");
  var redirectUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8b581378855cb9ba&redirect_uri=https%3a%2f%2fweixin.mintbao.com"+docUrl.replace("#","%23").replace(new RegExp("/","gm"),"%2f")+"&response_type=code&scope=snsapi_userinfo#wechat_redirect";
  window.location.href = redirectUrl;
}

Vue.prototype.auth = function() {
  // 获取当前页面的文档路径
  var thisUrl = location.href;
  var splitIndex = searchSubstring(thisUrl,"/",3);
  var docUrl;
  if(splitIndex > 0){
    docUrl = thisUrl.slice(splitIndex);
  }
  // console.info("获取docUrl域名字符串是多少-----"+docUrl);

  //判断cookies是否存在*************************
  var strCookie=document.cookie;
  //将多cookie切割为多个名/值对
  var arrCookie=strCookie.split(";");
  var userId;
  //遍历cookie数组，处理每个cookie对
  for(var i=0;i<arrCookie.length;i++){
    var arr=arrCookie[i].split("=");
    // console.info("这是所有cookies"+arr[i])
    //找到名称为userId的cookie，        并返回它的值
    if("token"==arr[0]){
      userId=arr[1];
      break;
    }
  }
//***************************
  // console.info("找到userid:"+userId);

  //获取当前时间***************************
  var date=new Date();
  var expireDays=0.5;
  //将date设置为15天以后的时间
  date.setTime(date.getTime()+expireDays*24*3600*1000);
  // date.setTime(date.getTime()+30000);

  //**************************
  // document.cookie="openid="+"111222"+";"+"expire="+date.toGMTString()+"; path=/";

  // 判断链接有没有code--》有code
  var nb = location.href;//当前页面地址
  var codeisOn = nb.indexOf("code=");//返回一个索引值，不存在返回-1
  //  console.info("codeisOn是否存在 "+codeisOn)


  // userId、code都不存在说明是首次进入该页面，则进行是否已登录校验
  if(userId == undefined && codeisOn<0){
    //  console.info("来到了第一步");
    var redirectUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8b581378855cb9ba&redirect_uri=https%3a%2f%2fweixin.mintbao.com"+docUrl.replace("#","%23").replace(new RegExp("/","gm"),"%2f")+"&response_type=code&scope=snsapi_userinfo#wechat_redirect";
    // window.location.href = redirectUrl;
  }
  // userId不存在、code存在，则说明已经获取了用户授权，需要提交后台登录换取token
  else if(userId == undefined&&codeisOn>=0){
    // code存在

    var index1 = nb.indexOf("code=")+5;
    var index2 = nb.indexOf("&state");
    // thisUrl是全局的locationhref
    // console.info("提取的code字符串是"+thisUrl.slice(index1,index2))
    var codedata = nb.slice(index1,index2);//获取到的codedata
    // console.info("获取到了code是"+codedata)

    //发送code到服务器
    // 发送code给服务器，然后返回一个openid
    // 获取openid，然后进行缓存
    $.ajax({
      url: 'https://eva.mintbao.com/user/wechat/login?code=' + codedata,
      type:"GET",
      success: data => {
        // console.info("获取openid，对其进行cookies设置和所有页面覆盖")
        // console.info(data);
        //设置网站全局cookies
        document.cookie="token="+data.result.token+";"+"expire="+date.toGMTString()+"; path=/";
        document.code = "code="+codedata+';'+"expire="+date.toGMTString()+";path=/";
        console.log("wirte userid to cookie result:" + document.cookie);
        // 获取用户昵称
        var usernickname = data.result.nickName;

        // 去掉url里的code
        var codeIndex = thisUrl.indexOf("code=");
        var checkChar = thisUrl.slice(codeIndex-1, codeIndex);
        document.location.href = thisUrl.slice(0, codeIndex-1)
      },
      error:function(){
        // console.info("发送数据到服务器失败----////")
      }
    });
  }
}

var config
var wechatSignApi = 'https://eva.mintbao.com/wechat/jsapi/getSignature?url=https://weixin.mintbao.com/#/'

function getToken (name) {
  var arr;
  var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return arr[2];
  } else {
    return null;
  }
}
var xhr = new XMLHttpRequest()
xhr.open('GET', wechatSignApi, true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.setRequestHeader("token", getToken('token'))
xhr.onload = function(e) {
  if(this.status == 200||this.status == 304){
    var obj = JSON.parse(this.responseText);
    var result = obj.result;
    console.log(result);

    wx.config({
      debug: false,
      appId: result.appId,
      timestamp: result.timestamp,
      nonceStr: result.nonceStr,
      signature: result.signature,
      jsApiList: ['checkJsApi','getLocation']
    });

    wx.ready(function () {
      wx.getLocation({
        success: function (res) {
          console.log('location', JSON.stringify(res));
          Vue.jsonp('https://apis.map.qq.com/ws/geocoder/v1/', {
            output: 'jsonp',
            location: res.latitude + ',' + res.longitude,
            key: 'NGABZ-F5M3U-AVUV7-4JCF3-CL5UZ-RCBVO'
          }).then(data => {
            console.log('cityInfo', data)
            store.commit('setCity', {
              data: {
                name: data.result.address_component.province + ' ' + data.result.address_component.city,
                value: data.result.ad_info.adcode.substr(0, 4) + '00'
              }
            })
            store.commit('setDefaultCity', {
              data: [data.result.ad_info.adcode.substr(0, 2) + '0000', data.result.ad_info.adcode.substr(0, 4) + '00']
            })
          }).catch(err => {
            console.log(err)
          })
        },
        cancel: function (res) {
          alert('用户拒绝授权获取地理位置');
        }
      });
    });

    wx.error(function (res) {
      alert(res.errMsg);
    });
  }
};
xhr.send();


