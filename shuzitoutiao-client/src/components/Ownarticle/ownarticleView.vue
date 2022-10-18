<!-- 文章里的内容有图片的模块 -->
<template>
  <div class="Option2">
    <div class="tiao">共{{ articlearray.length }}条内容</div>
    <div class="neirong" v-for="todo in articlearray" v-bind:key="todo.aid">
      <div class="box-content">
        <div class="box-center">
          <router-link :to="`/articledetail?aid=${todo.aid}`">
            <div class="img">
              <img
                :src="todo.mainpic"
                style="max-width: 100%; max-height: 100%"
                alt=""
              />
            </div>
          </router-link>
          <div class="artcle-card">
            <div class="title">
              <div class="box-title">{{ todo.title }}</div>
              <div class="box-tiem">{{ todo.addtime.slice(0, 10) }}</div>
            </div>
            <div class="issue">
              <div class="first">已发布</div>
              <div class="two">多标题</div>
              <div>|</div>
              <div>图标</div>
            </div>
            <div class="show">
              <div class="top">
                <div>展览{{ todo.impress }}</div>
                <div>阅读{{ todo.reading }}</div>
                <div>点赞{{ todo.supports }}</div>
                <div>评论{{ todo.comments }}</div>
              </div>
              <div class="bottom">
                <div class="data" :data-aid="todo.aid" @click="commentFn">
                  查看数据
                </div>
                <div class="comment" @click="commentr">查看评论</div>
                <div class="amend">
                  <router-link :to="`/articledetail?aid=${todo.aid}`">
                    修改
                  </router-link>
                </div>
                <div class="more">更多</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看数据划出框 -->
    <div :class="{ bighuachu: huac.h, bighuachu1: huac.c }" @click="bigFn">
      <div class="myco" data-co="1"></div>
      <div class="mycomment">
        <ExaminedataViewVue :aid="aid"></ExaminedataViewVue>
      </div>
    </div>
    <!-- 查看评论划出框 -->
    <div :class="{ bighuachu: huac1.h, bighuachu1: huac1.c }" @click="bigFn">
      <div class="myco" data-co="2"></div>
      <div class="mycomment">
        <ExaminecommentViewVue></ExaminecommentViewVue>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExaminecommentViewVue from "./Examine/ExaminecommentView.vue";
import ExaminedataViewVue from "./Examine/ExaminedataView.vue";
import { articleData } from "@/utils/api";
interface arcarryI {
  title: string;
  aid: number;
  mainpic: string;
  attention: number;
  supports: number; //点赞
  comments: number; //评论量
  impress: number; //展览量
  reading: number; //阅读量
  addtime: string;
}
interface objectI {
  h: boolean;
  c: boolean;
}
interface dataI {
  huac: objectI;
  aid: number;
  huac1: objectI;
  wid: object;
  articlearray: Array<arcarryI>;
}

export default defineComponent({
  data(): dataI {
    return {
      huac: {
        // 查看数据划出框
        h: true,
        c: false,
      },
      aid: 0,
      huac1: {
        // 查看数据划出框
        h: true,
        c: false,
      },
      wid: {
        wid: 1,
      },
      articlearray: [],
    };
  },
  components: {
    ExaminedataViewVue,
    ExaminecommentViewVue,
  },
  mounted() {
    this.datafn();
  },
  methods: {
    bigFn(event: Event) {
      if ((event.target as HTMLElement).dataset.co == "1") {
        this.huac.c = false;
      } else if ((event.target as HTMLElement).dataset.co == "2") {
        this.huac1.c = false;
      }
    },
    // 数据
    commentFn(event: Event) {
      this.huac.c = true;
      this.aid = (event.target as HTMLElement).dataset.aid as unknown as number;
      // console.log(this.aid);
    },
    // 评论
    commentr() {
      this.huac1.c = true;
    },
    //获取文章信息
    datafn() {
      articleData()
        .then((res) => {
          // console.log(res);
          this.articlearray = res.data.articleList;
          console.log(this.articlearray);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  width: 100%;
  .bighuachu {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 100vw;
    z-index: 10000000;
    transition: all 0.4s;
    display: flex;
    .myco {
      flex: 1;
    }
    .mycomment {
      width: 960px;
      height: 100vh;
      background-color: #ffffff;
      .lititle {
        display: flex;
        justify-content: space-between;
        height: 60px;
        border-bottom: 1px solid #67686b;
        .title1 {
          display: flex;
          padding: 20px 90px 20px 32px;

          > div {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .bighuachu1 {
    left: 0;
  }
  .tiao {
    width: 100%;
    height: 20px;
    margin: 20px 0 8px 0;
  }
  .neirong {
    width: 100%;
    .box-content {
      height: 157px;
      display: flex;
      align-items: center;
      .box-center {
        width: 100%;
        height: 106px;
        display: flex;
        .img {
          border-radius: 7px;
          overflow: hidden;
          width: 106px;
          height: 106px;
          img {
            width: 166px;
            height: 106px;
          }
        }
        .artcle-card {
          height: 106px;
          flex: 1;
          margin-left: 30px;
          .title {
            color: #222222;
            height: 24px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .box-title {
              font-weight: 600;
            }
            .box-tiem {
              color: #7f7575;
              font-size: 13px;
            }
          }
          .issue {
            color: #999999;
            line-height: 20px;
            height: 20px;
            margin-top: 12px;
            font-size: 12px;
            display: flex;
            div {
              padding: 0 3px;
              margin-right: 6px;
            }
            .first {
              background-color: #f4f4f4;
            }
            .two {
              color: #3d89ff;
              background-color: #e6f0ff;
            }
          }
          .show {
            margin-top: 30px;
            height: 20px;
            display: flex;
            justify-content: space-between;
            .top {
              display: flex;
              div {
                color: #666666;
                padding: 0 5px;
              }
            }
            .bottom {
              display: flex;
              div {
                height: 20px;
                padding: 0 5px 5px;
                border: 1px solid black;
                margin-left: 5px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
