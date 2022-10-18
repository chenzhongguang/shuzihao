<!-- 作品数据 -->
<template>
  <div class="Option2" @click="allFn">
    <div class="top">
      <CategoryNav>
        <div class="routerlinkto1">
          <router-link to="/production/">
            <div :class="{ router: all == '1' }" data-all="1">整体</div>
          </router-link>
        </div>
        <div class="routerlinkto1">
          <router-link to="/production/signle">
            <div :class="{ router: all == '2' }" data-all="2">单篇</div>
          </router-link>
        </div>
      </CategoryNav>
    </div>
    <div class="bottom">
      <CategoryContent>
        <div class="contnet">
          <router-view></router-view>
        </div>
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
    return {
      all: "1",
    };
  },
  components: {
    CategoryContent,
    CategoryNav,
  },
  methods: {
    allFn(event: Event) {
      if ((event.target as HTMLElement).dataset.all)
        this.all = (event.target as HTMLElement).dataset.all as string;
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/sass/option2.scss";
</style>
