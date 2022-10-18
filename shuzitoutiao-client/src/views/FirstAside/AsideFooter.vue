<template>
  <div class="home-block">
    <div class="home-creative-active">
      <span class="home-title">优质作品榜</span
      ><span class="home-geng"
        >更多<el-icon> <ArrowRight /> </el-icon
      ></span>
    </div>
    <div class="home-list">
      <div class="work-item" v-for="item in articles" :key="item.aid">
        <div class="work-pic">
          <img :src="item.mainpic" alt="" />
        </div>
        <div class="work-info">
          <div class="info-title">
            <router-link :to="`/articledetail?aid=${item.aid}`">
              {{ item.title }}
            </router-link>
          </div>
          <div class="info-author">
            <span class="avatar"><img :src="item.avatar" alt="" /></span>
            <span class="username"
              >{{ item.username }}<el-icon><GoldMedal /></el-icon
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { articledesc } from "@/utils/api";
interface IactionType {
  aid: number;
  title: string;
  mainpic: string;
  username: string;
  avatar: string;
}
interface IdataType {
  articles: Array<IactionType>;
}
export default defineComponent({
  name: "AsideFooter",
  data: function (): IdataType {
    return {
      articles: [],
    };
  },
  methods: {
    // 获取文章排行
    getArticle() {
      let uid: number = Number(window.localStorage.getItem("uid"));
      articledesc(uid)
        .then((res) => {
          //   console.log(res);
          let articleArr = res.data.aldesc.slice(0, 6);
          this.articles = articleArr;
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
  padding: 24px;

  .home-creative-active {
    width: 100%;
    height: 24px;
    margin: 0 0 16px;
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

  .work-item {
    width: 100%;
    height: 77px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    cursor: pointer;
    .work-pic {
      width: 110px;
      height: 75px;
      img {
        width: 110px;
        height: 75px;
      }
    }

    .work-info {
      width: 205px;
      height: 77px;

      .info-title {
        width: 100%;
        color: #222;
        font-size: 16px;
        // 超出两行隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .info-author {
        width: 100%;
        height: 20px;
        margin: 9px 0 0;
        font-size: 14px;
        color: #666;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        > span {
          margin-right: 10px;
        }
        .avatar {
          width: 20px;
          height: 20px;
          img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
        }
        .username {
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
