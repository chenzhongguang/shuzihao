<!-- 草稿箱 -->
<template>
  <div class="Option2">
    <div class="tiao">共{{ articles.length }}条内容</div>
    <div class="neirong">
      <div class="box-content" v-for="item in articles" :key="item.aid">
        <div class="box-center">
          <div class="img">
            <img
              :src="item.mainpic"
              style="max-width: 100%; max-height: 100%"
              alt=""
            />
          </div>
          <div class="artcle-card">
            <div class="title">
              <div class="box-title">{{ item.title }}</div>
              <div class="box-tiem">{{ item.addtime }}</div>
            </div>
            <div class="issue">
              <div class="first">未发布</div>
              <div class="two">多标题</div>
              <div>|</div>
              <div>图标</div>
            </div>
            <div class="show">
              <div class="top">
                <div>展览0</div>
                <div>阅读0</div>
                <div>点赞0</div>
                <div>评论0</div>
              </div>
              <div class="bottom">
                <div class="amend">
                  <router-link
                    :to="{ path: '/publish', query: { aid: item.aid } }"
                    >修改</router-link
                  >
                </div>
                <div class="more">更多</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { issuefalse } from "@/utils/api";
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
  length: number;
  addtime: string;
}

interface IdataType {
  articles: Array<IactionType>;
}
export default defineComponent({
  data: function (): IdataType {
    return {
      articles: [],
    };
  },
  methods: {
    // 获取草稿文章信息
    issuefalse() {
      let uid: number = Number(window.localStorage.getItem("uid"));
      issuefalse(uid)
        .then((res) => {
            console.log(res,"dfjoo");
          let articleArr = res.data;
          articleArr.forEach((item: any) => {
            item.addtime = getYMDHMS(item.addtime);
            if (item.status === 0) {
              this.articles.push(item);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.issuefalse();
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  width: 100%;
  height: 100%;

  .tiao {
    width: 100%;
    height: 20px;
    margin: 20px 0 8px 0;
    // background-color: yellow;
  }
  .neirong {
    width: 100%;
    .box-content {
      height: 157px;
      cursor: pointer;
      margin-top: 10px;
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
              height: 25px;
              div {
                cursor: pointer;
                padding: 0 5px;
                border: 1px solid black;
                margin-left: 5px;
                border-radius: 6px;
                &:hover {
                  background-color: #e6f0ff;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
