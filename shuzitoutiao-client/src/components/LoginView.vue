<template>
  <div class="enter" :class="{ enterid: enterid }">
    <div class="top">
      <div class="close">
        <div>关闭</div>
      </div>
      <div class="logo">Logo</div>
    </div>
    <div class="center">
      <div class="user-center">
        <div class="tle">
          <el-input v-model="form.user" placeholder="手机号" />
        </div>
        <div class="primary">
          <el-input v-model="form.user" placeholder="密码" />
        </div>
        <div class="botton">
          <button>登录</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="none-bottom">
        <div class="none-tel" @click="nonetel">手机号注册登录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      enterid: false,
      form: {
        username: "",
        passwd: "",
        user: "",
      },
    };
  },
  emits: ["get-a"],
  methods: {
    nonetel() {
      this.enterid = !this.enterid;
      console.log("注册页面");
    },
  },
  // mounted() {
  //     this.$emit("get-a",this.enterid);
  // },
});
</script>

<style lang="scss" scoped>
.enterid.enter {
  width: 0;
}
.enter {
  width: 360px;
  height: 460px;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.4s;
  .top {
    height: 90px;
    background-color: pink;
    .close {
      height: 30px;
      background-color: red;
      div {
        line-height: 30px;
        text-align: center;
        float: right;
        width: 80px;
        background-color: darkturquoise;
      }
    }
    .logo {
      width: 100%;
      height: 60px;
      background-color: aliceblue;
      line-height: 60px;
      text-align: center;
      font-size: 30px;
    }
  }
  .center {
    background-color: aqua;
    flex: 1;
    display: flex;
    justify-content: center;
    .user-center {
      width: 270px;
      // background-color: blueviolet;
      div {
        height: 40px;
      }
      .tle {
        margin-top: 10px;
        margin-bottom: 30px;
      }
      .primary {
        margin-bottom: 30px;
      }
      .botton {
        // background-color: brown;
        button {
          border-radius: 6px;
          font-size: 20px;
          color: #fff;
          width: 100%;
          height: 100%;
          background-color: black;
        }
      }
    }
  }
  .bottom {
    height: 160px;
    background-color: pink;
    .none-bottom {
      height: 40px;
      // background-color: yellowgreen;
      display: flex;
      justify-content: center;
      .none-tel {
        font-size: 13px;
        color: rgb(154, 148, 148);
        text-align: center;
        line-height: 40px;
        height: 40px;
        width: 250px;
        background-color: aliceblue;
      }
    }
  }
}
</style>
