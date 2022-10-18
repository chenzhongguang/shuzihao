<!-- 默认页面 -->
<template>
  <div class="box-nav">
    <MyNav></MyNav>
  </div>
  <div class="box-bottom">
    <div clas="box-aside">
      <AsideView></AsideView>
    </div>
    <div class="box-router">
      <router-view></router-view>
    </div>
  </div>
  <div class="box-footer">
    <MyFooter></MyFooter>
  </div>
  <div class="mytop">
    <MyTop target=".mynav"></MyTop>
  </div>
</template>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
}

body {
    background-color: #f8f8f8;
}

.box-nav {
  width: 100%;
  height: 64px;
  // position: fixed;
  top: 0;
  left: 0;
}
.box-bottom {
  display: flex;
  .box-router {
    min-height: calc(100% - 64px);
    margin-left: 251px;
    width: calc(100% - 250px);
  }
}
</style>
<script lang="ts">
import { defineComponent } from "vue";
import AsideView from "../components/AsideView.vue";
import MyNav from "../components/MyNav.vue";
import MyFooter from "@/components/MyFooter.vue";
import MyTop from "@/components/MyTop.vue";
export default defineComponent({
  components: {
    AsideView,
    MyNav,
    MyFooter,
    MyTop,
  },
});
</script>
