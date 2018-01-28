import utils from '@/utils/utils'
    var config
    var wechatSignApi = 'https://eva.mintbao.com/wechat/jsapi/getSignature?url=https://weixin.mintbao.com/#/'


      var xhr = new XMLHttpRequest()
      xhr.open('GET', wechatSignApi, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader("token", utils.getToken('token'))
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
      alert('-----------------');
      wx.getLocation({
        success: function (res) {
          alert(JSON.stringify(res));
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


