export default {
  getLocation () {
    let config
    let wechatSignApi = ''
    let [lat, lon] = ['', '']
    let scriptElement = document.createElement('script')
    scriptElement.setAttribute('src', 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js')
    scriptElement.onload = function () {
      let xhr = new XMLHttpRequest()
      xhr.open('post', wechatSignApi)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            config = JSON.parse(xhr.responseText)
            wx.config(config)
            wx.ready(function () {
              wx.checkJsApi({
                jsApiList: [
                  'getLocation',
                  'openLocation'
                ],
                success: function (res) {
                  if (!res.checkResult.getLocation) {
                    alert('您微信的版本过低，不支持微信接口，请升级到最新版本！')
                    return
                  }
                }
              })
              wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                  lat = res.latitude
                  lon = res.longitude
                }
              })
            })
          }
        }
      }
      xhr.send()
      return {lat, lon}
    }
  }
}
