<template>
  <div class="home-block" v-for="item in articles">
    <div class="data-item">
      <div class="data-item-top">
        <el-icon><Avatar style="color: red; magin: 2px 0" /></el-icon
        ><span>粉丝数</span>
      </div>
      <div class="data-item-md">
        <router-link to="/bean">
          {{ item.sups }}
        </router-link>
      </div>
      <div class="data-item-foot">
        <span class="item-change">昨日变化</span>
      </div>
    </div>
    <div class="data-item">
      <div class="data-item-top">
        <el-icon><InfoFilled style="color: blue; magin: 2px 0" /></el-icon
        ><span>总阅读量</span>
      </div>
      <div class="data-item-md">
        <router-link to="/production">{{ item.rds }}</router-link>
      </div>
      <div class="data-item-foot">
        <span class="item-change">昨日变化</span>
      </div>
    </div>
    <div class="data-item">
      <div class="data-item-top">
        <el-icon
          ><CirclePlusFilled style="color: yellow; magin: 2px 0" /></el-icon
        ><span>收藏量</span>
      </div>
      <div class="data-item-md">
        <router-link to="/earnings">{{ item.earn }}</router-link>
      </div>
      <div class="data-item-foot">
        <span class="item-change">昨日变化</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { articleList } from "@/utils/api";

interface IarticeMainType {
  sups: number;
  rds: number;
  earn: number;
}
interface dataType {
  articles: Array<IarticeMainType>;
}
export default defineComponent({
  name: "FirstTop",
  data: function (): dataType {
    return {
      articles: [],
    };
  },
  methods: {
    // 获取文章信息
    getArticle() {
      let uid: number = Number(window.localStorage.getItem("uid"));
      articleList(uid)
        .then((res) => {
            console.log(res,'top');
          let data = res.data.auser;
          data[0].earn = res.data.earn[0].earn;
          this.articles = data;
          //   console.log(this.articles);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getArticle();
  },
});
</script>

<style>
.router-link {
  font-size: 20px;
}
</style>

<style lang="scss" scoped>
.home-block {
  width: 100%;
  height: 178px;
  background-color: #fff;
  margin: 0 0 24px;
  padding: 24px 24px 16px;
  display: flex;
  justify-content: space-evenly;

  .data-item {
    width: 178px;
    height: 138px;
    text-align: center;
    color: #666;

    .data-item-top {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      line-height: 20px;
    }

    .data-item-md {
      height: 94px;
      line-height: 94px;
      font-size: 36px;
      color: #222;
      > a {
        font-size: 36px;
      }
    }

    .data-item-foot {
      height: 24px;

      .item-change {
        display: inline-block;
        width: 84px;
        height: 100%;
        border-radius: 12px;
        background-color: #fafafa;
      }
    }
  }
}
</style>
