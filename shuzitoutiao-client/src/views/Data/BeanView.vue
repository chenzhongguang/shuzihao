<!-- 粉丝数据 -->
<template>
  <div class="Option2">
    <div class="top">
      <CategoryNav>
        <div class="routerlinkto1">
          <router-link to="/bean/">概况</router-link>
        </div>
        <div class="routerlinkto1">
          <router-link to="/bean/followers">粉丝列表</router-link>
        </div>
      </CategoryNav>
    </div>
    <div class="bottom">
      <CategoryContent>
        <div class="contnet"><router-view></router-view></div>
      </CategoryContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CategoryContent from "@/components/CategoryContent.vue";
import CategoryNav from "@/components/CategoryNav.vue";
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
  width: 100%;
  height: 100%;
  .routerlinkto1 {
    padding: 0 7px 0 7px;
    margin-right: 10px;
    height: 100%;
    background-color: rgb(218, 232, 228);
  }
}
</style>
