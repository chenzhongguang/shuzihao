<template>
  <MyNav></MyNav>
  <div class="content">
    <div class="bg"><img src="@/assets/image/bg.jpeg" alt="" /></div>
    <div class="articleinfo" v-for="item in articles" :key="item.aid">
      <h1 class="title">{{ item.title }}</h1>
      <div class="userinfo">
        <div class="user-l">
          <div class="avatar"><img :src="item.avatar" alt="" /></div>
          <span class="username">{{ item.username }}</span>
          <span>·</span>
          <span class="category">{{ item.categorys }}</span>
          <span>·</span>
          <span class="time">{{ item.addtime }}</span>
        </div>
        <div class="user-r">
          <el-icon><Pointer /></el-icon>
          <div class="support">{{ item.supports }}</div>
          <el-icon><ChatDotRound /></el-icon>
          <div class="comment">{{ item.comments }}</div>
        </div>
      </div>
      <div class="main" v-html="item.content"></div>
    </div>
  </div>
  <MyFooter></MyFooter>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyNav from "@/components/MyNav.vue";
import MyFooter from "@/components/MyFooter.vue";
import { articledetail } from "@/utils/api";
import getYMDHMS from "@/utils/filter";

interface IactionType {
  aid: number;
  title: string;
  content: string;
  mainpic: string;
  categorys: number;
  supports: number;
  comments: number;
  reading: number;
  impress: number;
  addtime: string;
  uid: number;
  username: string;
  avatar: string;
  introduce: string;
}

interface IdataType {
  articles: Array<IactionType>;
}
export default defineComponent({
  name: "ArticleDetail",
  components: {
    MyNav,
    MyFooter,
  },
  data: function (): IdataType {
    return {
      articles: [],
    };
  },
  methods: {
    // 获取文章信息
    getArticle() {
      const aid = this.$route.query.aid as unknown as number;
      articledetail(aid)
        .then((res) => {
          let aInfo = res.data.aInfo;
          aInfo[0].addtime = getYMDHMS(aInfo[0].addtime);
          this.articles = aInfo;
          console.log(aInfo);
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
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  .bg {
    width: 100%;
    height: 700px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .articleinfo {
    width: 1200px;
    margin-top: -320px;
  }
  .title {
    width: 1200px;
    height: 160px;
    font-size: 60px;
    // line-height: 160px;
    padding-left: 10px;
    margin-bottom: 100px;
    color: #fff;
  }
  .userinfo {
    width: 1200px;
    height: 40px;
    padding: 0 10px;
    font-size: 12px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .user-l {
      display: flex;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      span{
        margin: 5px;
        cursor: pointer;
      }
    }
    .user-r {
      display: flex;
      align-items: center;
      cursor: pointer;
      .support {
        margin-right: 20px;
      }
    }
  }
  .main {
    width: 860px;
    margin: auto;
    // height: 500px;
    padding: 80px;
    background-color: #fff;
  }
}
</style>
