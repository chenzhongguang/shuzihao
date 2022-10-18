<template>
  <div class="home-block">
    <div class="home-creative-active">
      <span class="home-title">创作灵感</span
      ><span class="home-geng"
        >更多<el-icon>
          <ArrowRight /> </el-icon
      ></span>
    </div>
    <div class="home-content">
      <div class="home-text">
        <span class="text-r">#你曾经的初恋现在还有联系吗#</span
        ><span class="home-geng">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </span>
      </div>
      <div class="home-text">
        <span class="text-r">#你们都喜欢听哪种类型的歌#</span
        ><span class="home-geng">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </span>
      </div>
      <div class="home-text">
        <span class="text-r">#如果人生重来，你会选择回到什么时候#</span
        ><span class="home-geng">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </span>
      </div>
      <div class="home-text">
        <span class="text-r">#有哪些受用一生人生的经典语录#</span
        ><span class="home-geng">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </span>
      </div>
      <div class="home-text">
        <span class="text-r">#中国国内失业率大吗#</span
        ><span class="home-geng">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AsideMd",
});
</script>

<style lang="scss" scoped>
.home-block {
  width: 100%;
  height: 314px;
  background-color: #fff;
  margin: 0 0 24px;
  padding: 24px 24px 14px;

  .home-creative-active {
    width: 100%;
    height: 24px;
    margin: 0 0 16px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home-title {
      font-size: 20px;
      color: #222;
    }

    .home-geng {
      font-size: 14px;
      color: #666;
      line-height: 24px;
      cursor: pointer;
    }
  }

  .home-content {
    width: 100%;

    .home-text {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #222;

      .text-r {
        width: 320px;
        height: 48px;
        padding: 12px 0;
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
}
</style>
