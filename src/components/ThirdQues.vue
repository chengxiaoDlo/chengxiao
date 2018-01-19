<template>
  <div>
    <question question="对酒当歌，芳龄几何？" sub="年龄会关乎到保险方案和价格的准确性哦~">
      <div slot="options">
        <div class="options que3" >
          <div v-for="member in memberList">
            <div class="age" >
              <div>
                <div class="member" :class="member.class"></div>
                <p class="member-text">{{member.text}}</p>
              </div>
              <div class="member-age">{{member.value}}</div>
              <div class="unit">岁</div>
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
  name: "third-ques",
  components: {
    Question
  },
  data () {
    return {
      memberList: [
        {
          class: 'me',
          text: '本人',
          value: '选择年龄'
        },
        {
          class: 'wife',
          text: '配偶',
          value: '选择年龄'
        },
        {
          class: 'son',
          text: '儿子',
          value: '选择年龄'
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
    .member-age {
      width: 4.73rem;
      height: 1rem;
      border-radius: 30px;
      border:solid 1px;
      font-size: 0.47rem;
      text-align: center;
      line-height: 1rem;
      color: rgb(141, 137, 137);
      margin-top: 0.15rem;
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
.confirm {
  background: url("../assets/images/confirm-btn.png") no-repeat;
  background-size: 100%;
  width: 5rem;
  height: 3rem;
  margin-top: -2rem;
  margin-left: 4.5rem;
}
</style>
