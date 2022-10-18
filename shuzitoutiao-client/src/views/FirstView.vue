<!-- 主页 -->
<template>
  <div class="Option1">
    <div class="pghome">
      <div class="content">
        <FirstTop></FirstTop>
        <FirstMiddle></FirstMiddle>
        <FirstFooter></FirstFooter>
      </div>
      <div class="aside">
        <AsideTop></AsideTop>
        <AsideMd></AsideMd>
        <AsideFooter></AsideFooter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FirstTop from "./First/FirstTop.vue";
import FirstMiddle from "./First/FirstMiddle.vue";
import FirstFooter from "./First/FirstFooter.vue";
import AsideTop from "./FirstAside/AsideTop.vue";
import AsideMd from "./FirstAside/AsideMd.vue";
import AsideFooter from "./FirstAside/AsideFooter.vue";

export default defineComponent({
  name: "FirstView",
  components: {
    FirstTop,
    FirstMiddle,
    FirstFooter,
    AsideTop,
    AsideMd,
    AsideFooter,
  },
});
</script>

<style>
@import "@/assets/scss/communal.scss";
</style>
<style lang="scss" scoped>
.Option1 {
  width: 100%;
  height: 100%;
  padding-top: 24px;

  .pghome {
    width: 1220px;
    overflow-x: hidden;
    display: flex;
    justify-content: space-between;

    .content {
      height: 100%;
      padding: 0 12px 0 12px;
      box-sizing: border-box;
    }

    .aside {
      width: 400px;
      padding: 0 12px 0 12px;
      box-sizing: border-box;
      height: 100%;
    }
  }
}
</style>
