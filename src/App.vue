<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { GetCity, GetConfig } from "@/models/api"

export default {
  name: 'App',
  methods: {
    initWx () {
      new GetConfig().GET({
        params: {url: encodeURI('https://weixin.mintbao.com/#/')}
      })
        .then((data) => {
          console.log(44, data)
          let config = {
            debug: false,
            appId: data.data.result.appId,
            timestamp: data.data.result.timestamp,
            nonceStr: data.data.result.nonceStr,
            signature: data.data.result.signature,
            jsApiList: ['checkJsApi', 'getLocation']
          }
          wx.config(config)
          wx.ready(function () {
            console.log('ready!!!!')
            wx.checkJsApi({
              jsApiList: [
                'getLocation'
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
                console.log('location', res)
                this.$jsonp('http://apis.map.qq.com/ws/geocoder/v1/', {
                  output: 'jsonp',
                  location: res.latitude + ',' + res.longitude,
                  key: 'NGABZ-F5M3U-AVUV7-4JCF3-CL5UZ-RCBVO'
                }).then(data => {
                  console.log('cityInfo', data)
                }).catch(err => {
                  console.log(err)
                })
              },
              error: function (err) {
                console.log(33333333333, err)
              }
            })
          })
          wx.error(function(res) {
            console.log('errrrrrr', res)
          })
        })
        .catch(err => {
          alert(err)
        })

      wx.ready()
    }
  },
  created () {
    // this.initWx()
    console.log(990, wx)

  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
* {
  margin: 0;
  padding: 0;
}
html {
  background: rgb(246, 246, 246);
}
html, body {
  width: 100%;
  height: 100%;
}
div {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
body:before {
  content: ' ';
  position: fixed;
  z-index: -1;
  top: 180px;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("./assets/images/bg.png") no-repeat;
  background-size: 300px 360px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(65, 65, 65);
  font-size: 32px;
  min-height: 100%;
  width: 100%;
  background: url("./assets/images/bg.png") no-repeat;
  background-size: 300px 360px;
  background-position-y: 180px;
  background-attachment: fixed;
}
</style>
