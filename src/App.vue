<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { GetCity } from "@/models/api"

export default {
  name: 'App',
  methods: {
    initWx () {
      wx.config()
      wx.ready()
    }
  },
  created () {
    console.log(990, wx)
    this.$jsonp('http://apis.map.qq.com/ws/geocoder/v1/', {
      output: 'jsonp',
      location: '39.984154,116.307490',
      key: 'NGABZ-F5M3U-AVUV7-4JCF3-CL5UZ-RCBVO'
    }).then(data => {
      console.log(44444, data)
    }).catch(err => {
      console.log(err)
    })
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
  font-size: 30px;
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
  top: 3rem;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("./assets/images/bg.png") no-repeat;
  background-size: 5rem 5.6rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(65, 65, 65);
  font-size: 0.53rem;
  min-height: 100%;
  width: 100%;
  background: url("./assets/images/bg.png") no-repeat;
  background-size: 5rem 5.6rem;
  background-position-y: 3rem;
  background-attachment: fixed;
}
  /*@media screen and (min-width: 320px) {*/
    /*html {*/
      /*font-size: 25.6px;*/
    /*}*/
  /*}*/
  /*@media screen and (min-width: 360px) {*/
    /*html {*/
      /*font-size: 28.5px;*/
    /*}*/
  /*}*/
  /*@media screen and (min-width: 375px) {*/
    /*html {*/
      /*font-size: 30px !important;*/
    /*}*/
  /*}*/
  /*@media screen and (min-width: 410px) {*/
    /*html {*/
      /*font-size: 32px;*/
    /*}*/
  /*}*/
  /*@media screen and (min-width: 480px) {*/
    /*html {*/
      /*font-size: 38.4px;*/
    /*};*/
  /*}*/
</style>
