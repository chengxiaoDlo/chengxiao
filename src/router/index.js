import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Questionnaire',
      component: resolve => require(['@/views/questionnaire'], resolve)
    },
    {
      path: '/result',
      name: 'result',
      component: resolve => require(['@/views/result'], resolve)
    },
    {
      path: '/duibi/1',
      name: 'duibi',
      component:resolve=>require(['@/components/duibi'],resolve)
    },
    {
      path: '/howbanli',
      name: 'howbanli',
      component:resolve=>require(['@/components/howbanli'],resolve)
    },
    {
      path: '/health',
      name: 'health',
      component:resolve=>require(['@/components/health'],resolve)
    },
    {
      path: '/bianji',
      name: 'bianji',
      component:resolve=>require(['@/components/bianji'],resolve)
    },
    {
      path: '/duibi/2',
      name: 'waiduibi',
      component:resolve=>require(['@/components/waiduibi'],resolve)
    },

    {
      path: '/duibi/3',
      name: 'yiduibi',
      component:resolve=>require(['@/components/yiduibi'],resolve)
    },
    {
      path: '/duibi/4',
      name: 'shouduibi',
      component:resolve=>require(['@/components/shouduibi'],resolve)
    },
    {
      path: '/chanpin/1',
      name: 'chanpin',
      component:resolve=>require(['@/components/chanpin'],resolve)
    },
    {
      path: '/chanpin/2',
      name: 'chanpinwai',
      component:resolve=>require(['@/components/chanpinwai'],resolve)

    },
    {
      path: '/chanpin/3',
      name: 'chanpiny',
      component:resolve=>require(['@/components/chanpiny'],resolve),
      meta: { keepAlive: true }
    },
    {
      path: '/chanpin/4',
      name: 'dingshou',
      component:resolve=>require(['@/components/dingshou'],resolve),
      meta: { keepAlive: true }
    },
    {
      path: '/addbao/:id',
      name: 'addbao',
      component:resolve=>require(['@/components/addbao'],resolve)
    },
    {
      path: '/goods',
      name: 'familylist',
      component:resolve=>require(['@/components/familylist'],resolve),
      meta: { keepAlive: true }
    },
    {
      path: '/xiang',
      name: 'xiang',
      component:resolve=>require(['@/components/xiang'],resolve)
    },
    {
      path: '/chanpin/4',
      name: 'chanpiny',
      component:resolve=>require(['@/components/chanpiny'],resolve),
      meta: { keepAlive: true }
    },
    {
      path: '/chanpin/5',
      name: 'chanpiny',
      component:resolve=>require(['@/components/chanpiny'],resolve),
      meta: { keepAlive: true }
    },
    {
      path: '/chanpin/6',
      name: 'chanpiny',
      component:resolve=>require(['@/components/chanpiny'],resolve),
      meta: { keepAlive: true }
    },
    {
      path: '/chanpin/13',
      name: 'dingshou',
      component:resolve=>require(['@/components/dingshou'],resolve),
      meta: { keepAlive: true }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component:resolve=>require(['@/components/HelloWorld'],resolve)
    },
    {
      path: '/hospital',
      name: 'hospital',
      component:resolve=>require(['@/components/hospital'],resolve)
    },
    {
      path: '/familypolicies',
      name: 'familypolicies',
      component:resolve=>require(['@/components/familypolicies'],resolve)
    },
    // {
    //   path: '/',
    //   name: 'index',
    //   component:resolve=>require(['@/components/index'],resolve)
    // },
    {
      path: '/baogao',
      name: 'baogao',
      component:resolve=>require(['@/components/baogao'],resolve)

    },
  ]
})

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

router.beforeEach((to, from, next) => {
  var thisUrl = location.href;
  var splitIndex = searchSubstring(thisUrl,"/",3);
  var docUrl;
  if(splitIndex > 0){
    docUrl = thisUrl.slice(splitIndex);
  }
  console.info("获取docUrl域名字符串是多少-----"+docUrl);// /#/

//判断cookies是否存在*************************
  var strCookie=document.cookie;
//将多cookie切割为多个名/值对
  var arrCookie=strCookie.split(";");
  var userId;
//遍历cookie数组，处理每个cookie对
  for(var i=0;i<arrCookie.length;i++){
    var arr=arrCookie[i].split("=");
    // console.info("这是所有cookies"+arr[i])
    //找到名称为userId的cookie，并返回它的值
    if("token"==arr[0]){
      userId=arr[1];
      break;
    }
  }
//***************************
  console.info("找到userid:"+userId);
//获取当前时间***************************
  var date=new Date();
  var expireDays=0.5;
//将date设置为15天以后的时间
  date.setTime(date.getTime()+expireDays*24*3600*1000);
// 判断链接有没有code--》有code
  var nb = location.href;//当前页面地址
  var codeisOn = nb.indexOf("code=");//返回一个索引值，不存在返回-1
  console.info("codeisOn是否存在 "+codeisOn)


// userId、code都不存在说明是首次进入该页面，则进行是否已登录校验
  if(userId == undefined && codeisOn<0){
    console.info("来到了第一步");
    var redirectUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8b581378855cb9ba&redirect_uri=https%3a%2f%2fweixin.mintbao.com"+docUrl.replace("#","%23").replace(new RegExp("/","gm"),"%2f")+"&response_type=code&scope=snsapi_userinfo#wechat_redirect";
    window.location.href = redirectUrl;
  }
// userId不存在、code存在，则说明已经获取了用户授权，需要提交后台登录换取token
  else if(userId == undefined&&codeisOn>=0){
    // code存在

    var index1 = nb.indexOf("code=")+5;
    var index2 = nb.indexOf("&state");
    // thisUrl是全局的locationhref
    console.info("提取的code字符串是"+thisUrl.slice(index1,index2))
    var codedata = nb.slice(index1,index2);//获取到的codedata
    console.info("获取到了code是"+codedata)

    //发送code到服务器
    // 发送code给服务器，然后返回一个openid
    // 获取openid，然后进行缓存
    $.ajax({
      url: 'https://eva.mintbao.com/user/wechat/login?code=' + codedata,
      type:"GET",
      success: data => {
        console.info("获取openid，对其进行cookies设置和所有页面覆盖")
        console.info(data);
        //设置网站全局cookies
        document.cookie="token="+data.result.token+";"+"expire="+date.toGMTString()+"; path=/";
        document.code = "code="+codedata+';'+"expire="+date.toGMTString()+";path=/";
        // 获取用户昵称
        var usernickname = data.result.nickName;

        // 去掉url里的code
        var codeIndex = thisUrl.indexOf("code=");
        var checkChar = thisUrl.slice(codeIndex-1, codeIndex);
        document.location.href = thisUrl.slice(0, codeIndex-1)
      },
      error:function(){
        console.info("发送数据到服务器失败----////")
      }
    });
  }

  else {
    //登录过，直接来到index
    //默认来到了用户要进入的页面。
    next();

  }

  next();
})
export default router
