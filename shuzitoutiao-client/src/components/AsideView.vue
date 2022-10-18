<template>
  <div class="asios">
    <el-container
      class="layout-container-demo"
      style="height: calc(100vh - 64px)"
    >
      <el-aside width="252px" @click="allFn">
        <el-scrollbar>
          <el-menu>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/first" class="option"
                  ><div :class="{ router: all == '1' }" data-all="1">
                    <el-icon><House /></el-icon>
                    主页
                  </div></router-link
                >
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1">
              <template #title
                ><el-icon><EditPen /></el-icon>创作</template
              >
              <el-menu-item index="2-4-1">
                <router-link to="/publish" class="option"
                  ><div :class="{ router: all == '2' }" data-all="2">
                    文章
                  </div></router-link
                >
              </el-menu-item>
              <el-menu-item index="2-4-1"
                ><router-link to="/videoclip" class="option"
                  ><div :class="{ router: all == '3' }" data-all="3">
                    视频
                  </div></router-link
                ></el-menu-item
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/headline" class="option"
                  ><div :class="{ router: all == '4' }" data-all="4">
                    微头条
                  </div></router-link
                ></el-menu-item
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/questions" class="option"
                  ><div :class="{ router: all == '5' }" data-all="5">
                    问答
                  </div></router-link
                ></el-menu-item
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/frequency" class="option"
                  ><div :class="{ router: all == '6' }" data-all="6">
                    音频
                  </div></router-link
                ></el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title
                ><el-icon><Menu /></el-icon>管理</template
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/sample" class="option"
                  ><div :class="{ router: all == '7' }" data-all="7">
                    作品管理
                  </div></router-link
                ></el-menu-item
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/comment" class="option"
                  ><div :class="{ router: all == '8' }" data-all="8">
                    评论管理
                  </div></router-link
                ></el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title
                ><el-icon><Histogram /></el-icon>数据</template
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/earnings" class="option"
                  ><div :class="{ router: all == '9' }" data-all="9">
                    收益数据
                  </div></router-link
                ></el-menu-item
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/production" class="option"
                  ><div :class="{ router: all == '10' }" data-all="10">
                    作品数据
                  </div></router-link
                ></el-menu-item
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/bean" class="option"
                  ><div :class="{ router: all == '11' }" data-all="11">
                    粉丝数据
                  </div></router-link
                ></el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title
                ><el-icon><Box /></el-icon>工具</template
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/laboratory" class="option"
                  ><div :class="{ router: all == '17' }" data-all="17">
                    功能实验室
                  </div></router-link
                ></el-menu-item
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/material" class="option"
                  ><div :class="{ router: all == '18' }" data-all="18">
                    图片素材
                  </div></router-link
                ></el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="6">
              <template #title style="text-align: center"
                ><el-icon><Setting /></el-icon>设置</template
              >
              <el-menu-item index="2-4-1"
                ><router-link to="/set" class="option"
                  ><div :class="{ router: all == '19' }" data-all="19">
                    设置
                  </div></router-link
                ></el-menu-item
              >
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      all: "1",
    };
  },
  methods: {
    allFn(event: Event) {
      if ((event.target as HTMLElement).dataset.all)
        this.all = (event.target as HTMLElement).dataset.all as string;
    },
  },
});
</script>

<style>
.el-sub-menu__title {
  display: flex;
  margin-left: 20px;
}

.el-menu {
  background-color: #f8f8f8 !important;
}
</style>

<style scoped lang="scss">
.asios {
  position: fixed;
}
.option {
  border-radius: 5px;
  width: 100%;
  display: block;
  text-decoration: none;
  color: rgb(34, 34, 34);
  .router {
    font-weight: 500;
    width: 100%;
    height: 100%;
    color: red;
    font-size: 18px;
  }
}
// .option:hover {
//   background-color: rgb(240, 240, 240);
// }

.el-menu-item-group,
.el-sub-menu,
.el-menu-item {
  margin-left: 20px;
}
</style>
