<template>
  <div class="home-block">
    <div class="home-creative-active">
      <span class="home-title">公告</span
      ><span class="home-geng"
        >更多<el-icon>
          <ArrowRight /> </el-icon
      ></span>
    </div>
    <div class="home-text">
      <span>09-24</span>
      <span class="text-r">今日头条"清朗·打击网络谣言"专项整治公...</span>
    </div>
    <div class="home-text">
      <span>09-24</span>
      <span class="text-r">今日头条关于开展评论专项整治公告(第三...</span>
    </div>
    <div class="home-text">
      <span>09-24</span>
      <span class="text-r">今日头条关于开展MCN机构治理专项公告</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AsideTop",
});
</script>

<style>
@import "@/assets/scss/communal.scss";
</style>
<style lang="scss" scoped>
.home-block {
  width: 100%;
  height: 184px;
  background-color: #fff;
  margin: 0 0 24px;
  padding: 24px 24px 16px;

  .home-creative-active {
    width: 100%;
    height: 24px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home-title {
      font-size: 14px;
      color: #222;
      width: 36px;
      height: 20px;
      background: #3d89ff;
      color: #fff;
      padding: 0 4px;
      border-radius: 6px;
    }

    .home-geng {
      font-size: 14px;
      color: #666;
      line-height: 24px;
      cursor: pointer;
    }
  }

  .home-text {
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #222;

    .text-r {
      width: 270px;
      height: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }
}
</style>
