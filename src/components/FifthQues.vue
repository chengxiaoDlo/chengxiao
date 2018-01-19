<template>
    <div>
      <question question="劝君更尽一杯酒，全家社保上全否？" sub="这会关系到家人医疗险的配置">
        <div slot="options">
          <div class="options que5" >
            <div v-for="member in memberList">
              <div class="age" >
                <div>
                  <div class="member" :class="member.class"></div>
                  <p class="member-text">{{member.text}}</p>
                </div>
                <div class="member-security" :class="{'qicked': member.socialSecurity === true}" @click="hasSecurity('y', member)">有社保</div>
                <div class="member-security" :class="{'qicked': member.socialSecurity === false}" @click="hasSecurity('n', member)">无社保</div>
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
      name: "fifth-ques",
      data () {
        return {
          memberList: [
            {
              class: 'me',
              text: '本人',
              socialSecurity: true
            },
            {
              class: 'wife',
              text: '配偶',
              socialSecurity: true
            },
            {
              class: 'son',
              text: '儿子',
              socialSecurity: true
            }
          ]
        }
      },
      components: {
        Question
      },
      methods: {
        confirm () {},
        hasSecurity (has, member) {
          if (has === 'y') {
            member.socialSecurity = true
          } else if (has === 'n') {
            member.socialSecurity = false
          }
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../styles/common";
  .que5 {
    padding-top: 0.5rem;
    padding-bottom: 2.5rem;
    .age {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      margin-bottom: 0.6rem;
      .member {
        width: 1.53rem;
        height: 1.53rem;
        margin-right: 0.8rem;
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
      .member-security {
        width: 2.5rem;
        height: 1rem;
        border-radius: 30px;
        border:solid 1px;
        font-size: 0.5rem;
        text-align: center;
        line-height: 1rem;
        margin-top: 0.15rem;
        margin-right: 0.3rem;
        color: rgb(126, 126, 126);
      }
      .qicked {
        border-color: rgb(252, 216, 75);
        color: rgb(252, 216, 75);
      }
      .member-text {
        font-size: 0.5rem;
        padding-left: 0.25rem;
      }
    }
  }

</style>
