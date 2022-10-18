<template>
  <div class="home-block">
    <div class="slider">
      <img class="pic" src="@/assets/image/slider.png" alt="" />
    </div>
    <div class="home-creative-active">
      <span class="home-title">为你推荐以下创作活动 </span
      ><span class="home-geng"
        >更多<el-icon> <ArrowRight /> </el-icon
      ></span>
    </div>
    <div class="homs-list">
      <div class="task-card" v-for="item in actions" :key="item.acid">
        <div class="task-card-title"><el-icon><Opportunity style="color:#f04142;" /></el-icon>{{ item.title }}</div>
        <div class="task-card-text">{{ item.content }}</div>
        <div class="task-card-numbers">
          奖金总额<span style="color:#f04142;">{{ item.bonus }}</span>万元 | <span>{{ item.people }}</span>人参加
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { action } from "@/utils/api";
interface IactionType {
  acid: number;
  title: string;
  content: string;
  bonus: string;
  people: number;
}
interface IdataType {
  actions: Array<IactionType>;
  status: number;
}
export default defineComponent({
  name: "FirstMiddle",
  data: function (): IdataType {
    return {
      actions: [],
      status: 1,
    };
  },
  methods: {
    // 获取活动信息
    getAction() {
      action(this.status)
        .then((res) => {
          //   console.log(res);
          this.actions = res.data.action;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getAction();
  },
});
</script>

<style lang="scss" scoped>
.home-block {
  width: 100%;
  margin: 0 0 24px;
  padding: 24px;
  background-color: #fff;

  .slider {
    margin-bottom: 50px;

    img.pic {
      width: 100%;
      height: 154px;
    }
  }

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

  .homs-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .task-card {
    width: 50%;
    height: 150px;
    margin: -0.5px;
    padding: 24px;
    border: 1px solid #e8e8e8;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 0 0 rgb(0 0 0 / 15%);
    overflow: hidden;

    &:hover {
      box-shadow: 0 2px 25px rgb(0 0 0 / 15%);
      transition: all 0.3s;
      position: relative;
      z-index: 2;
      border-color: transparent;
    }

    .task-card-title {
      width: 100%;
      height: 22px;
      color: #222;
      font-size: 18px;
    }

    .task-card-text {
      width: 100%;
      height: 62px;
      padding-top: 10px;
      font-size: 14px;
      color: #999;
    }

    .task-card-numbers {
      width: 100%;
      height: 18px;
      line-height: 18px;
      font-size: 14px;
      color: #666;

      span {
        display: inline-block;
        margin:0 10px;
      }
    }
  }
}
</style>
