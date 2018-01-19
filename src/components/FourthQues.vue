<template>
    <div>
      <question question="青春作伴好还乡，而今哪里是家乡？" sub="我们会考虑当地的社保政策、产品区域限制、消费水平等因素哒~">
        <div slot="options">
          <div class="options que4" >
              <div class="location" >
                <div>
                  <div class="member me"></div>
                  <p class="member-text">本人</p>
                </div>
                <div class="member-city">{{city}}</div>
              </div>
          </div>
          <div class="confirm" @click="confirm"></div>
        </div>
      </question>
    </div>
</template>

<script>
  import Question from '@/components/Question'
    export default {
      name: "fourth-ques",
      components: {
        Question
      },
      data () {
        return {
          city: '河北省石家庄市'
        }
      },
      methods: {
        confirm () {}
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
.que4{
  padding-top: 0.5rem;
  padding-bottom: 2.5rem;
  .location {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    margin-bottom: 0.6rem;
    .me {
      background: url("../assets/images/dad.png") no-repeat;
      background-size: 100%;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.8rem;
    }
    .member-text {
      font-size: 0.5rem;
      padding-left: 0.25rem;
    }
    .member-city {
      width: 5rem;
      height: 1rem;
      border-radius: 30px;
      border:solid 1px;
      font-size: 0.5rem;
      text-align: center;
      line-height: 1rem;
      margin-top: 0.15rem;
      color: rgb(126, 126, 126);
    }
  }
}
.confirm {
  background: url("../assets/images/confirm-btn.png") no-repeat;
  background-size: 100%;
  width: 5rem;
  height: 3rem;
  margin-top: -2rem;
  margin-left: 4.5rem;
}
</style>
