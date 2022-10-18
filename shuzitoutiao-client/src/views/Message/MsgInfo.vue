<template>
  <div class="main">
    <div class="side">
      <div class="avatar">
        <img src="@/assets/image/avatar.png" alt="" />
      </div>
    </div>
    <div class="contain">
      <div class="sign">系统通知</div>
      <div class="content">
        你提交的头条号信息修改申请审核已通过。你本月还有改申请审核已通过。
        你本月还有修改资料次数:改申请审修改资料次数:改申请审核已通过。你本月还有修改资料次数:用用户头像4次，用户简介4次
      </div>
      <div class="time">09-22 11:24</div>
    </div>
  </div>
  <footer>
        没有更多了
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "msginfo",
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  //   height: 132px;
  margin: 0 12px;
  padding: 24px 0;
  display: flex;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;

  .side {
    width: 56px;
    height: 100%;
    .avatar {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .contain {
    width: 100%;
    height: 100%;
    .sign {
      height: 20px;
      font-size: 14px;
      font-weight: 666;
      margin-bottom: 8px;
      color: #222;
    }
    .content {
      width: 100%;
      margin-bottom: 12px;
      color: #000;
      font-size: 16px;
    }
    .time {
      height: 20px;
      width: 100%;
      font-size: 14px;
      color: #666;
    }
  }
}

footer{
    width: 100%;
    margin: 20px 0;
    font-size: 16px;
    color: #666;
    position: absolute;
    bottom: 0;
    text-align: center;
}
</style>
