<!-- 作品管理 -->
<template>
  <div class="Option2">
    <div class="top" @click="allFn">
      <CategoryNav>
        <div class="routerlinkto1">
          <router-link to="/sample/">
            <div :class="{ router: all == '1' }" data-all="1">全部</div>
          </router-link>
        </div>
        <div class="routerlinkto1">
          <router-link to="/sample/artcle">
            <div :class="{ router: all == '2' }" data-all="2">
              文章
            </div></router-link
          >
        </div>
        <div class="routerlinkto1" data-all="3">
          <router-link to="/sample/video">
            <div :class="{ router: all == '3' }" data-all="3">
              视频
            </div></router-link
          >
        </div>
        <div class="routerlinkto1">
          <router-link to="/sample/new">
            <div :class="{ router: all == '4' }" data-all="4">
              微头条
            </div></router-link
          >
        </div>
        <div class="routerlinkto1">
          <router-link to="/sample/question">
            <div :class="{ router: all == '5' }" data-all="5">
              问答
            </div></router-link
          >
        </div>
        <div class="routerlinkto1">
          <router-link to="/sample/xiaovideo">
            <div :class="{ router: all == '6' }" data-all="6">
            小视频
          </div>
          </router-link>
        </div>
        <div class="routerlinkto1">
          <router-link to="/sample/audio">
            <div :class="{ router: all == '7' }" data-all="7">
              音频
            </div></router-link
          >
        </div>
        <div class="routerlinkto1">
          <router-link to="/sample/gather">
            <div :class="{ router: all == '8' }" data-all="8">
              合集
            </div></router-link
          >
        </div>
        <div class="routerlinkto1">|</div>
        <div class="routerlinkto1">
          <router-link to="/sample/draft">
            <div :class="{ router: all == '9' }" data-all="9">
              草稿箱
            </div>
            </router-link
          >
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
      if((event.target as HTMLElement).dataset.all)this.all = (event.target as HTMLElement).dataset.all as string;
    },
  },
});
</script>

<style lang="scss">
  @import '@/assets/sass/option2.scss';
</style>
