<!-- eslint-disable vue/require-v-for-key -->
<!-- 个人中心 -->
<template>
  <div class="Option2">
    <div class="nav">
      <MyNavVue></MyNavVue>
    </div>
    <div class="content">
      <div class="one">
        <div class="box-haed1">
          <img src="../../assets/image/a3dcc20220721101349311.jpeg" alt="" />
        </div>
        <div class="box-name">
          <div class="name">昵称</div>
          <div class="box-number" @click="fenFn">
            <div class="fenshi" data-fen="1"><span>2</span>获赞</div>
            <div class="fenshi" data-fen="2"><span>2</span>粉丝</div>
            <div class="fenshi" data-fen="3"><span>2</span>关注</div>
          </div>
          <div class="jianj">简介：<span>摄影爱好者</span></div>
          <div class="genduo">更多信息<span>></span></div>
        </div>
      </div>
      <div class="seek">
        <div class="left" @click="leftFn">
          <div data-left="1">全部</div>
          <div data-left="1">文章</div>
          <div data-left="1">收藏</div>
        </div>
        <div class="rigth">
          <el-input
            v-on:change="changeFn"
            v-model="input2"
            class="w-50 m-2"
            size="large"
            placeholder="Please Input"
            :prefix-icon="Search"
          />
        </div>
      </div>
      <div class="two">
        <div class="dakuang">
          <div :class="{ twoleft: true, twoleft1: led == 2 }"></div>
          <div class="two-rigth">
            <div class="top" v-for="item in userName" v-bind:key="item.uid">
              <div class="top-img">
                <img :src="item.avater" alt="" />
              </div>
              <div class="top-name">
                <div class="username">{{ item.username }}</div>
                <div class="gf">
                  <div>关注{{ item.attention }}</div>
                  <div>粉丝{{ item.fans }}</div>
                </div>
                <div>简介：<span>摄影爱好者</span></div>
              </div>
              <div class="guanzhu">
                <div v-if="code == 0" @click="attentionFn" :data-uid="item.uid">关注</div>
                <div v-else @click="attentionFnf" :data-uid="item.uid">已关注</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'pop-up': true, 'pop-up1': up == 1 }">
      <div class="up-left" @click="upFn"></div>
      <div class="up-rigth">
        <div class="up-content">
          <div class="up-top" @click="fenguanFn">
            <div class="up-content-left">
              <div :class="{ fenguan: ai == 2 }" data-fenguan="2">粉丝</div>
              <div :class="{ fenguan: ai == 3 }" data-fenguan="3">关注</div>
            </div>
            <div class="up-content-rigth" data-fenguan="4">X</div>
          </div>
          <div class="up-bottom">
            <div class="gao" v-for="item in datafans">
              <div class="img">
                <img :src="item.avater" alt="" />
              </div>
              <div class="yonghui">
                <div>{{ item.username }}</div>
                <div>
                  <div class="yong-top">
                  关注<span>{{ item.attention }}</span>
                </div>
                <div class="yong-bottom">
                  粉丝<span>{{ item.fans }} </span>
                </div>
                </div>
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
import { Search } from "@element-plus/icons-vue";
import MyNavVue from "@/components/MyNav.vue";
import { username, getbean, attentionTrue, attentionFalse } from "@/utils/api";
interface fans {
  uid: number;
  fid: number;
  username: string;
  avater: string;
  fans: string;
  attention: string;
}
interface attention {
  atid: number;
  username: string;
  avater: string;
  fans: string;
  attention: string;
}
interface user {
  name: string;
  time: string;
}
interface dataType {
  ai: number;
  up: number;
  guan: number;
  input2: string;
  Search: object;
  led: number;
  user: user;
  gun: boolean;
  code: number;
  userName: Array<fans>;
  datafans: Array<attention>;
  fans: Array<fans>;
  attention: Array<attention>;
}
export default defineComponent({
  name: "ArticleView",
  data(): dataType {
    return {
      ai: 0, //控制粉丝和关注的样式
      up: 0, //弹出框
      guan: 1, //关注和已经关注
      input2: "", //搜索框
      Search: Search,
      led: 2, //暂时为用
      user: {
        name: "我是小米",
        time: "晚上好",
      },
      userName: [],
      gun: true,
      code: 0, //判断是否关注
      // 粉丝或者关注页面数据
      datafans: [],
      //获取粉丝和关注的数据
      fans: [],
      attention: [],
    };
  },
  components: {
    MyNavVue,
  },
  mounted() {
    this.getbeanFn();
  },
  watch: {
    ai() {
      if (this.ai == 3) {
        (this.datafans as unknown as Array<fans>) = this.fans as Array<fans>;
        console.log(this.datafans);
      } else if (this.ai == 2) {
        (this.datafans as Array<attention>) = this
          .attention as Array<attention>;
        console.log(this.datafans);
      }
    },
  },
  methods: {
    // 实现关注
    attentionFn(event: Event){
      console.log((event.target as HTMLElement).dataset.uid);
      attentionTrue({uid:(event.target as HTMLElement).dataset.uid as unknown as number} )
        .then((res) => {
          console.log(res);
          if(res.data.code == 1) this.code =1;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //取消关注
    attentionFnf(event: Event){
      console.log((event.target as HTMLElement).dataset.uid);
      attentionFalse({uid:(event.target as HTMLElement).dataset.uid as unknown as number} )
        .then((res) => {
          console.log(res);
          if(res.data.code == 1)this.code = 0;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 控制关注和为关注
    guanFn(event: Event) {
      if ((event.target as HTMLElement).dataset.guan == "1") {
        this.gun = true;
      } else if ((event.target as HTMLElement).dataset.guan == "0") {
        this.gun = false;
      }
    },
    fenguanFn(event: Event) {
      if ((event.target as HTMLElement).dataset.fenguan == "2") {
        this.ai = 2;
      } else if ((event.target as HTMLElement).dataset.fenguan == "3") {
        this.ai = 3;
      } else if ((event.target as HTMLElement).dataset.fenguan == "4") {
        this.up = 0;
      }
    },
    // 搜索框
    changeFn() {
      console.log("根据搜索框内容搜索");
      // 发送请求
      username({
        input2: this.input2,
      })
        .then((res) => {
          this.userName = res.data.results;
          this.code = res.data.code;
          console.log(this.userName);
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    upFn() {
      this.up = 0;
    },
    // 获取粉丝数据和关注数据
    getbeanFn() {
      // datafidatid:{
      //   fans:[],
      //   attention:[],
      // },
      getbean()
        .then((res) => {
          this.fans = res.data.fans;
          this.attention = res.data.attention;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //粉丝和关注控制弹出框
    fenFn(event: Event) {
      // 关注
      if ((event.target as HTMLElement).dataset.fen == "3") {
        this.up = 1;
        this.ai = 3;
        //粉丝
      } else if ((event.target as HTMLElement).dataset.fen == "2") {
        this.up = 1;
        this.ai = 2;
      }
    },
    // 控制是文字详情和搜索的
    leftFn(event: Event) {
      if ((event.target as HTMLElement).dataset.left == "1") {
        this.led == 1;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;

  .nav {
    position: fixed;
    width: 100%;
    z-index: 100;
    height: 64px;
    // background-color: pink;
    display: flex;
  }

  .pop-up {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10000;
    left: 100vw;
    display: flex;
    transition: all 0.7s;

    .up-left {
      flex: 1;
      height: 100vh;
    }

    .up-rigth {
      width: 458px;
      height: 100vh;
      background-color: #eee7e7;
      border: 1px solid #eceef1;

      .up-content {
        padding: 20px;

        .up-top {
          height: 34px;
          // background-color: pink;
          color: #333333;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;

          .up-content-left {
            line-height: 34px;
            display: flex;

            div {
              padding: 0 10px;
              // border: 1px solid red;
            }

            div.fenguan {
              color: red;
              border-bottom: 2px solid red;
            }
          }

          .up-content-rigth {
            line-height: 34px;
            padding: 0 19px;
            font-size: 16px;
            font-weight: 500;
            background-color: #545050;
          }
        }

        .up-bottom {
          // background-color: pink;
          overflow: hidden;
          display: flex;
          flex-direction: column;

          .gao {
            height: 76px;
            background-color: #e9e0e0;
            padding: 0 24px;
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            .img {
              width: 44px;
              height: 44px;
              margin-right: 12px;

              > img {
                width: 42px;
                height: 42px;
                border-radius: 50%;
              }
            }

            .yonghui {
              color: #222222;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              > div {
                color: #707070;
                font-size: 14px;
                display: flex;
                div{
                margin-right: 10px;
                }
                span {
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }

  .pop-up1 {
    left: 0;
  }

  .content {
    margin-top: 64px;
    width: 1034px;

    // background-color:#f9f8f8;
    .fenshi {
      padding: 5px;
      // border-right: 1px solid red;
      // background-color: pink;
    }

    // 划出框

    .one {
      margin-top: 40px;
      width: 676px;
      display: flex;

      .box-haed1 {
        width: 150px;
        height: 150px;
        // background-color: aquamarine;

        img {
          width: 112px;
          height: 112px;
          border-radius: 50%;
        }
      }

      .box-name {
        width: 256px;
        height: 150px;
        // background-color: pink;

        .name {
          height: 34px;
          margin-bottom: 8px;
          font-size: 24px;
          font-weight: 600;
        }

        .box-number {
          margin-bottom: 24px;
          display: flex;

          div {
            flex: 1;

            span {
              margin: 0 5px;
            }
          }
        }

        .jianj {
          margin-bottom: 10px;
        }
      }
    }

    .two {
      min-height: 300px;
      margin-top: 20px;
      width: 1034px;
      margin-bottom: 50px;
      overflow: hidden;

      .dakuang {
        width: 2068px;
        display: flex;

        .twoleft {
          width: 1034px;
          height: 150px;
          background-color: cornflowerblue;
        }

        .two-rigth {
          width: 1034px;
          //   background-color: pink;
          display: flex;
          flex-wrap: wrap;

          div.top {
            width: 497px;
            height: 133px;
            // background-color: pink;
            border: 1px solid #eceef1;
            border-radius: 9px;
            margin: 10px;
            padding: 10px;
            display: flex;
            .top-img {
              width: 110px;
              height: 110px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 9px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .top-name {
              flex: 1;
              .username {
                height: 34px;
                margin-bottom: 8px;
                font-size: 24px;
                font-weight: 600;
              }
              .gf {
                margin-bottom: 13px;
                display: flex;
                div {
                  padding-right: 10px;
                }
              }
            }
            .guanzhu {
              width: 110px;
              height: 110px;
              display: flex;
              justify-content: center;
              div {
                height: 23px;
                padding: 0 12px;
                border: 1px solid red;
              }
            }
          }
        }

        .twoleft1 {
          width: 0;
          overflow: hidden;
        }
      }
    }

    .seek {
      height: 50px;
      margin: 20px 0;
      display: flex;

      .left {
        flex: 1;
        display: flex;

        div {
          line-height: 50px;
          padding: 0 10px;
          height: 100%;
          margin-right: 5px;
          //   background-color: aquamarine;
        }
      }

      .rigth {
        display: flex;
        align-items: center;
        padding-left: 100px;
        height: 50px;
        flex: 1.7;
        // background-color: rgb(178, 178, 159);
      }
    }
  }
}
</style>
