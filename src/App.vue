<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(65, 65, 65);
  font-size: 0.53rem;
  height: 100%;
  width: 100%;
  background: url("./assets/images/bg.png") no-repeat;
  background-size: 5rem 5.6rem;
  background-position-y: 3rem;
}
  @media screen and (min-width: 320px) {
    html {
      font-size: 25.6px;
    }
  }
  @media screen and (min-width: 360px) {
    html {
      font-size: 28.5px;
    }
  }
  @media screen and (min-width: 370px) {
    html {
      font-size: 30px;
    }
  }
  @media screen and (min-width: 410px) {
    html {
      font-size: 32px;
    }
  }
  @media screen and (min-width: 480px) {
    html {
      font-size: 38.4px;
    };
  }
</style>
