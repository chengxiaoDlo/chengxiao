<template>
    <div>
      <question question="玉盘珍馐值万钱，你家收支多少钱？" sub="我们会基于家庭收入及贷款来为您规划合理的保额及保费预">
        <div slot="options">
          <div class="options que3" >
            <div v-for="member in memberList">
              <div class="age" >
                <div class="avatar">
                  <div class="member" :class="member.class"></div>
                  <p class="member-text">{{member.text}}</p>
                </div>
                <div class="member-age">{{member.value}}</div>
                <div class="unit">{{member.unit}}</div>
              </div>
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
      name: "sixth-ques",
      components: {
        Question
      },
      data () {
        return {
          memberList: [
            {
              class: 'me',
              text: '爸爸收入',
              value: '税前收入',
              unit: '万元/年'
            },
            {
              class: 'wife',
              text: '妈妈收入',
              value: '税前收入',
              unit: '万元/年'
            },
            {
              class: 'son',
              text: '家庭贷款',
              value: '房贷、车贷等',
              unit: '万元'
            }
          ]
        }
      },
      methods: {
        confirm () {}
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  .que3 {
    padding-top: 0.5rem;
    padding-bottom: 2.5rem;
    .age {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      width: 100%;
      padding-left: 1rem;
      margin-bottom: 0.6rem;
      .avatar {
        flex-basis: 2.7rem;
        text-align: center;
      }
      .member {
        width: 1.53rem;
        height: 1.53rem;
        margin: 0 auto;
      }
      .me {
        background: url("../assets/images/dad.png") no-repeat;
        background-size: 100%;
      }
      .wife {
        background: url("../assets/images/mom.png") no-repeat;
        background-size: 100%;
      }
      .son {
        background: url("../assets/images/son.png") no-repeat;
        background-size: 100%;
      }
      .member-age {
        width: 3.67rem;
        height: 1rem;
        border-radius: 30px;
        border:solid 1px;
        font-size: 0.47rem;
        text-align: center;
        line-height: 1rem;
        margin-top: 0.15rem;
        color: rgb(126, 126, 126);
      }
      .member-text {
        font-size: 0.5rem;
        padding-left: 0.25rem;
      }
      .unit {
        font-size: 0.47rem;
        margin-top: 0.37rem;
        margin-left: 0.2rem;
      }
    }
  }
</style>
