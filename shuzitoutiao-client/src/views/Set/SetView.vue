<!-- 设置 -->
<template>
  <div class="Option2">
    <CategoryNav>
      <router-link to="/set/" class="account">账号详情</router-link>
      <router-link to="/set/future" class="futureSet">功能设置</router-link>
    </CategoryNav>
  </div>
  <CategoryContent>
    <router-view></router-view>
  </CategoryContent>
</template>

<script lang="ts">
import CategoryContent from "@/components/CategoryContent.vue";
import CategoryNav from "@/components/CategoryNav.vue";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
  components: {
    CategoryContent,
    CategoryNav,
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  // background-color: rgb(41, 199, 192);

  .account {
    // margin-left: 64px;
    font-size: 16px;
    color: #222;
    height: 42px;
    // line-height: 42px;
  }

  .futureSet {
    margin-left: 32px;
    font-size: 16px;
    color: #222;
    height: 42px;
    // line-height: 42px;
  }
}
</style>
