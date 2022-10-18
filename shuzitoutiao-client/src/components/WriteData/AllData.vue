<template>
  <div class="category">
    <div class="choose" @click="isClick">
      <!-- 单篇的小导航 -->
      <div :data-index="index0" :class="{ all: index0 == index }">全部</div>
      <div :data-index="index1" :class="{ all: index1 == index }">文章</div>
      <div :data-index="index2" :class="{ all: index2 == index }">视频</div>
      <div :data-index="index3" :class="{ all: index3 == index }">微头条</div>
      <div :data-index="index4" :class="{ all: index4 == index }">问答</div>
      <div :data-index="index5" :class="{ all: index5 == index }">小视频</div>
    </div>
    <div class="updatatimes">每日14:00前一日更新</div>
  </div>

  <ShowData />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShowData from "./ShowData.vue";
export default defineComponent({
  data() {
    return {
      index0: 0,
      index1: 1,
      index2: 2,
      index3: 3,
      index4: 4,
      index5: 5,
      index: 0,
    };
  },
  watch: {
    "$route.query": {
      handler() {
        console.log(this.$route.query.aid);
      },
      immediate: true,
    },
  },

  components: {
    ShowData,
  },
  methods: {
    isClick(event: Event) {
      this.index = (event.target as HTMLElement).dataset
        .index as unknown as number;
    },
  },
});
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  position: fixed;
  width: 1170px;
  background-color: #ffffff;
  z-index: 100;
  height: 64px;
  line-height: 64px;
}

.choose {
  display: flex;
  align-items: center;

  div {
    box-sizing: border-box;
    width: 64px;
    text-align: center;
    cursor: pointer;
  }

  .all {
    color: #f04142;
    border: 1px solid #f04142;
    border-radius: 17px;
    width: 64px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
  }

  .all1 {
    width: 0;
    box-sizing: border-box;
  }

  .updatatimes {
    margin-left: 100px;
  }
}
</style>
