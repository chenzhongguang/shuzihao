<!-- 导航右 -->
<template>
  <div class="rigth">
    <div class="one">
      <!-- 消息和铃铛 -->
      <div class="info-a">
        <router-link to="/message?keyword=system" class="dang">
          <span><el-icon><BellFilled /></el-icon></span>
          <span>消息</span>
        </router-link>
      </div>
      <!-- 划出框 -->
      <div class="huachu">
        <div class="content">
          <div><router-link to="/message?keyword=system">系统通知</router-link></div>
          <div><router-link to="/message?keyword=comments">评论</router-link></div>
          <div><router-link to="/message?keyword=fans">粉丝</router-link></div>
          <div><router-link to="/message?keyword=supports">点赞</router-link></div>
          <div><router-link to="/message?keyword=at_me">@我</router-link></div>
          <div><router-link to="/message?keyword=private_letter">私信</router-link></div>
          <div><router-link to="/message?keyword=ask">问答邀请</router-link></div>
        </div>
      </div>
    </div>
    <!-- 主页头像和名称 -->
    <div class="two">
      <HouseView></HouseView>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HouseView from "./HouseView.vue";
export default defineComponent({
  data() {
    return {};
  },
  components: {
    HouseView,
  },
});
</script>
<style>
  @import '../../assets/scss/communal.scss';
</style>
<style lang="scss" scoped>
.rigth {
  width: 100%;
  height: 100%;
  // background-color: pink;
  display: flex;
  .one {
    position: relative;
    margin-left: 20px;
    width: 60px;
    // background-color: aliceblue;
    .info-a {
      line-height: 64px;
      a {
        display: block;
      }
    }
    .huachu {
      border: 7px solid rgba(0, 0, 0, 0);
      // box-sizing: border-box;
      left: -20px;
      top: 64px;
      position: absolute;
      z-index: 10000;
      width: 122px;
      height: 0;
      overflow: hidden;
      transition: all .2s;
      // background-color: chocolate;
      .content {
        overflow: hidden;
        border-radius: 6px;
        padding-top: 10px;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        div {
          line-height: 44px;
          height: 44px;
          a {
            padding-left: 20px;
            width: 100%;
            height: 100%;
            display: block;
            // background-color: aquamarine;
          }
        }
        div:hover {
          background-color: #f8f8f8;
        }
      }
    }
  }
  .one:hover > .huachu {
    height: 318px;
  }
  .two {
    flex: 1;
    // background-color: aqua;
  }
}
</style>
