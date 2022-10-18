<template>
  <div class="home-block">
    <div class="home-creative-active">
      <span class="home-title">文章列表</span
      ><span class="home-geng"
        >更多 <el-icon> <ArrowRight /> </el-icon
      ></span>
    </div>
    <div class="homs-list">
      <div class="task-card" v-for="item in articles" :key="item.aid">
        <div class="cover-area">
          <img :src="item.mainpic" alt="" />
        </div>
        <!-- <div class="title">{{ item.title }}</div> -->
        <div class="title">
          <router-link :to="`/articledetail?aid=${item.aid}`">
            {{ item.title }}
          </router-link>
        </div>
        <div class="user-info">
          <span>点赞：{{ item.supports }}</span> |
          <span>评论：{{ item.comments }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { articleList } from "@/utils/api";
interface IactionType {
  aid: number;
  title: string;
  content: string;
  mainpic: string;
  categorys: number;
  supports: number;
  comments: number;
}
interface IdataType {
  articles: Array<IactionType>;
}
export default defineComponent({
  name: "FirstFooter",

  data: function (): IdataType {
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
          let articleArr = res.data.articleList;
          //   articleArr.forEach((el: any) => {
          //     el.manipic = URL.createObjectURL(el.mainpic);
          //   });
          if (articleArr.length > 3) {
            this.articles = articleArr.slice(0, 3);
          } else {
            this.articles = articleArr;
          }
          //   console.log(this.articles, "98958646");
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

<style lang="scss" scoped>
.home-block {
  width: 100%;
  background-color: #fff;
  margin: 0 0 24px;
  padding: 24px 24px 8px;

  .home-creative-active {
    width: 100%;
    height: 24px;
    margin: 0 0 24px;
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
    margin-bottom: 20px;
  }

  .task-card {
    width: 33%;
    // height: 182px;
    margin: -0.5px;
    padding: 0 12px;
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

    .cover-area {
      width: 100%;
      height: 128px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      width: 100%;
      height: 22px;
      color: #222;
      font-size: 14px;
      font-weight: 700;
      margin: 8px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-info {
      width: 100%;
      height: 16px;
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
