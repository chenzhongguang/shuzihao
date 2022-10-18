<!-- 评论管理 -->
<template>
  <div class="Option2">
    <div class="top" @click="allFn">
      <CategoryNav>
        <div class="routerlinkto1">
          <div :class="{ router: all == '1' }" data-all="1">
            全部
            </div>
          </div>
        <div class="routerlinkto1">
          <div :class="{ router: all == '2' }" data-all="2">
            文章
            </div>
          </div>
        <div class="routerlinkto1">
          <div :class="{ router: all == '3' }" data-all="3">
            视频
            </div>
          </div>
        <div class="routerlinkto1">
          <div :class="{ router: all == '4' }" data-all="4">
            微头条
            </div>
          </div>
        <div class="routerlinkto1">
          <div :class="{ router: all == '5' }" data-all="5">
            问答
            </div>
          </div>
      </CategoryNav>
    </div>
    <div class="bottom">
      <CategoryContent>
        <div class="contnet">
          <div class="article">
            <div class="headsearch">
              <el-input
                v-model="input2"
                class="w-50 m-2"
                placeholder="Type something"
                :prefix-icon="Search"
                @change="changeFn"
              />
            </div>
            <!-- 根据当前的文章显示后面下滑线 -->
            <div
              :class="{
                'article-details': true,
                'article-details1': articleid == item.aid,
              }"
              v-for="item in artcleData"
              :key="item.aid"
              :data-uid="item.aid"
              @click="articleidFn"
            >
              <div class="img">
                <router-link to="">
                  <img :src="item.mainpic" alt="" />
                </router-link>
              </div>
              <div class="commentdata" :data-uid="item.aid">
                <div class="title" :data-uid="item.aid">{{ item.title }}</div>
                <div class="bottom" :data-uid="item.aid">
                  评论{{ item.attention }}
                </div>
              </div>
            </div>
            <div class="none">没有更多了</div>
          </div>
          <div class="box-comment" v-if="value">
            <div class="comment-content">
              <el-empty description="暂无评论" />
            </div>
          </div>
          <div class="comment" v-else>
            <div class="comment-item" v-for="tmp in attention" :key="tmp.cid">
              <div>
                <div class="comment-head">
                  <div>
                    <img :src="tmp.avatar" alt="" />
                  </div>
                  <div>{{ tmp.username }}</div>
                </div>
                <div class="comment-content">{{ tmp.content }}</div>
                <div class="comment-addtime">
                  <div class="addtime">{{ tmp.addtimes.slice(0, 10) }}</div>
                  <div class="rigth">
                    <div class="pcid">
                      <div @click="replyFn" :data-pcid="tmp.cid" v-if="reply">回复</div>
                      <div @click="replyFnf" :data-pcid="tmp.cid" v-else>取消回复</div>
                    </div>
                    <div class="pcid">
                      <el-icon><Apple /></el-icon>赞
                    </div>
                    <div class="pcid">
                      <el-icon><CaretTop /></el-icon>置顶
                    </div> 
                    <span
                      ><el-icon><MoreFilled /></el-icon
                    ></span>
                  </div>
                </div>
              </div>
              <div :class="{ point: true, point1: point != tmp.cid }">
                <div class="box-point">
                  <el-input
                    v-model="textarea2"
                    :autosize="{ minRows: 4, maxRows: 7 }"
                    type="textarea"
                    placeholder="Please input"
                  />
                  <button :class="{ issue: true, issue1: issue }" @click="issueFn">发布</button>
                </div>
              </div>
            </div>
            <div class="none">没有更多了</div>
          </div>
        </div>
      </CategoryContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CategoryContent from "@/components/CategoryContent.vue";
import CategoryNav from "@/components/CategoryNav.vue";
import { articleData, comments } from "@/utils/api";
import { Search } from "@element-plus/icons-vue";
interface artcleI {
  aid: number;
  mainpic: string;
  title: string;
  attention: string;
}
interface attentionI {
  addtimes: string;
  aid: number;
  avatar: string;
  cid: number;
  content: string;
  username: string;
}
interface dataI {
  value: boolean;
  articleid: number;
  point: number;
  input2: string;
  Search: object;
  textarea2: string;
  issue: boolean;
  artcleData: Array<artcleI>;
  attention: Array<attentionI>;
  reply:boolean,
  all:string,
}
export default defineComponent({
  data(): dataI {
    return {
      all:"1",
      value: true,
      reply:true,
      articleid: 1, // 对应每篇文章
      point: 0,
      input2: "",
      Search: Search,
      textarea2: "", // 评论框的值
      issue: false, // 控制发布的颜色
      artcleData: [],
      attention: [], // 评论数据
    };
  },
  components: {
    CategoryContent,
    CategoryNav,
  },
  watch: {
    textarea2() {
      if (this.textarea2 != "") {
        this.issue = true;
      } else {
        this.issue = false;
      }
    },
    articleid() {
      this.getcomentFn();
    },
    attention() {
      // 监听是否有评论内容
      if (this.attention.length != 0) {
        this.value = false;
      } else if (this.attention.length == 0) {
        this.value = true;
      }
    },
  },
  methods: {
    allFn(event: Event) {
      if((event.target as HTMLElement).dataset.all) this.all = (event.target as HTMLElement).dataset.all as string;
    },
    // 发布
    issueFn(){
      this.reply = true;
      this.point = 0;
    },
     articleidFn(event: Event) {
      console.log((event.target as HTMLElement).dataset.aid);
      this.articleid = (event.target as HTMLElement).dataset
        .uid as unknown as number;
    },
    replyFn(event: Event) {
      this.point = (event.target as HTMLElement).dataset
        .pcid as unknown as number;
        this.reply = false;
    },
    replyFnf() {
        this.reply = true;
        this.point = 0;
    },
    changeFn() {
      console.log(1111);
    },
    // 获取用户的创作的文章
    getarticleFn() {
      articleData()
        .then((res) => {
          console.log(res);
          this.articleid = res.data.articleList[0].aid;
          this.artcleData = res.data.articleList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取文章的评论
    getcomentFn() {
      console.log(this.articleid);
      comments({ aid: this.articleid })
        .then((res) => {
          console.log(res);
          this.attention = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getarticleFn();
    // this.getcomentFn();
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  width: 100%;
  height: 100%;
  // background-color: rgb(183, 199, 41);
  .routerlinkto1 {
    padding: 0 7px 0 7px;
    margin-right: 10px;
    height: 100%;
    // background-color: rgb(218, 232, 228);
    .router {
          font-weight: 600;
          width: 100%;
          height: 100%;
          color: #48a2ff;
          border-bottom: 2px solid #48a2ff;
        }
  }
  .contnet {
    margin-top: 50px;
    display: flex;
    min-height: 500px;
    .article {
      width: 350px;
      // height: 400px;
      .headsearch {
        padding-right: 50px;
        height: 56px;
      }
      .article-details1 {
        border-right: 3px solid red;
        background-color: #fafafa;
      }
      .article-details {
        height: 124px;
        padding: 24px 32px 24px 0;
        display: flex;
        border-bottom: 1px solid #dad5d5;
        .img {
          height: 72px;
          width: 72px;
          a {
            width: 100%;
            height: 100%;
            img {
              border-radius: 5px;
              width: 100%;
              height: 100%;
            }
          }
        }
        .commentdata {
          height: 72px;
          padding-left: 12px;
          flex: 1;
          display: flex;
          color: #999999;
          flex-direction: column;
          justify-content: space-between;
          .title {
            height: 20px;
            color: #222222;
            font-size: 15px;
            overflow: hidden;
          }
          .bottom {
            font-size: 14px;
          }
        }
      }
      .none {
        padding-left: 80px;
        margin-top: 30px;
        height: 20px;
        font-size: 14px;
        color: #cdbebe;
        margin-bottom: 50px;
      }
    }
    .comment {
      padding-top: 54px;
      flex: 1;
      // background-color: aquamarine;
      .comment-item {
        margin: 0 50px;
        // background-color: pink;
        min-height: 132px;
        margin-bottom: 10px;
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        border-bottom: 2px solid #c8c6c6;
        .comment-head {
          display: flex;
          height: 28px;
          img {
            height: 28px;
            width: 28px;
            border-radius: 50%;
          }
          div {
            height: 100%;
            line-height: 28px;
            margin-left: 5px;
            color: #666666;
            font-size: 13px;
          }
        }
        .comment-content {
          height: 24px;
          line-height: 24px;
          padding-top: 3px;
          padding-left: 7px;
          color: #222222;
          font-size: 15px;
        }
        .comment-addtime {
          padding-top: 10px;
          padding-left: 7px;
          height: 30px;
          display: flex;
          color: #999999;
          font-size: 14px;
          justify-content: space-between;
          // .addtime {
          //   // background-color: #fafafa;
          // }
          .rigth {
            width: 230px;
            display: flex;
            // background-color: #fafafa;
            .pcid{
              // border: 1px solid black;
              flex: 1;
              color: #222222;
              display: flex;
              align-items: center;
              div{
                width: 100%;
                height: 100%;
              }
            }
            .pcid:hover {
              color: #908a8a;
            }
            span {
              width: 18px;
              // background-color: yellow;
            }
          }
        }
        .point {
          overflow: hidden;
          height: 144px;
          // background-color: rgb(193, 173, 176);
          display: flex;
          justify-content: center;
          position: relative;
          .box-point {
            padding: 0 20px;
            margin-top: 20px;
            width: 100%;
            height: 100%;
            height: 124px;
            .issue {
              width: 62px;
              height: 32px;
              border-radius: 7px;
              position: absolute;
              bottom: 36px;
              right: 25px;
              background-color: #f5f5f5;
              color: #bfbfbf;
              border: 0.6px solid #bfbfbf;
              pointer-events: none;
            }
            .issue1 {
              width: 62px;
              height: 32px;
              border-radius: 7px;
              color: #fafafa;
              background-color: red;
              pointer-events: auto;
            }
          }
        }
        .point1 {
          height: 0;
        }
      }
      .none {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        height: 20px;
        font-size: 14px;
        color: #cdbebe;
      }
    }
    .box-comment {
      padding-top: 54px;
      flex: 1;
      min-height: 300px;
      // background-color: pink;
      display: flex;
      justify-content: center;
      .comment-content {
        margin-top: 70px;
        width: 100%;
        height: 300px;
        // background-color: yellow;
      }
    }
  }
}
</style>
