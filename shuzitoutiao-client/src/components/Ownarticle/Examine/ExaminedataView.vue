<!-- 查看数据 -->
<template>
  <div class="Option2">
    <div class="top">
      <div class="left">
        <div>{{ articlearray.title }}</div>
        <div>文章</div>
        <div>多标题</div>
        <div>图</div>
        <div>{{ articlearray.addtime.slice(0, 10) }}</div>
      </div>
      <div class="rigth">X</div>
    </div>
    <div class="center">
      <div class="txt-tip">部分数据有延迟</div>
      <div class="first">
        <div class="box-left">
          <div class="head">流量</div>
          <div class="primary">
            <div>
              展现量<span>{{ articlearray.impress }}</span>
            </div>
            <div>
              阅读量<span>{{ articlearray.reading }}</span>
            </div>
          </div>
          <div class="second">
            <div>粉丝阅读量<span>100</span></div>
            <div>粉丝阅读量<span>100</span></div>
          </div>
          <div class="primary">点击率<span>50%</span></div>
          <div class="primary">平均阅读率 <span>50%</span></div>
          <div class="primary">平均阅读时间<span>--</span></div>
        </div>
        <div class="box-rigth">
          <div class="carh">
            <div class="head">收益</div>
            <div class="primary">创作收益<span>无</span></div>
            <div class="primary">
              <div>基础收益<span>无</span></div>
              <div>补贴收益<span>无</span></div>
            </div>
          </div>
          <div class="carh">
            <div class="head">粉丝</div>
            <div class="primary">
              粉丝变化<span>0</span>涨粉<span>0</span> 掉粉 <span>0</span>
            </div>
            <div class="primary">
              <div>基础收益<span>0%</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="two">
        <div class="head">互动</div>
        <div class="primary">
          <div>
            评论<span>{{ articlearray.comments }}</span>
          </div>
          <div>
            点赞<span>{{ articlearray.supports }}</span>
          </div>
          <div>转发<span>0</span></div>
          <div>分享<span>0</span></div>
          <div>收藏<span>0</span></div>
        </div>
      </div>
      <div class="three" @click="mapFn">
        <div data-map="1" :class="{ xiahuanxian: 1 == map }">多标题分析</div>
        <div data-map="2" :class="{ xiahuanxian: 2 == map }">消费分析</div>
        <div data-map="3" :class="{ xiahuanxian: 3 == map }">用户画像</div>
      </div>
      <div class="five">
        <div class="big">
          <div :class="{ more: true, shang: map != 1 }">
            <div class="box-more">
              <div>
                <el-icon size="10"><ChromeFilled /></el-icon>
              </div>
            </div>
            <div class="box-a">阅读量较少，暂无多标题阅读量占比数据</div>
          </div>
          <div :class="{ consume: true, shang: map != 2 }">消费</div>
          <div :class="{ image: true, shang: map != 3 }">
            <div class="top-map">
              <div class="top-map-left" ref="mapleft"></div>
              <div class="top-map-right" ref="mapright"></div>
            </div>
            <div class="conter-map"></div>
            <!-- <div class="bottom-map"></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import * as echarts from "echarts";
import { articleinfo } from "@/utils/api";
// interface arcarryI {
//   title: string;
//   aid: number;
//   mapinpic: string;
//   attention: number;
//   supports: number; //点赞
//   comments: number; //评论量
//   impress: number; //展览量
//   reading: number; //阅读量
//   addtime: string;
// }
export default defineComponent({
  data() {
    return {
      map: 1,
      //性别图数据
      option1: {
        title: {
          text: "性别/比例",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "性别分布",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "女" },
              { value: 735, name: "男" },
            ],
          },
        ],
      },
      option2: {
        title: {
          text: "年龄分布",
        },
        xAxis: {
          type: "category",
          data: ["0-18", "19-23", "24-30", "31-40", "41-50", "50+"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [0, 100 / 100, 0, 0, 0, 0],
            type: "bar",
          },
        ],
      },
      articlearray: {
        title: "",
        aid: "",
        mapinpic: "",
        attention: "",
        supports: "", //点赞
        comments: "", //评论量
        impress: "", //展览量
        reading: "", //阅读量
        addtime: "",
      },
    };
  },
  props: ["aid"],
  watch: {
    aid() {
      if (this.aid != 0) {
        this.aricletFn(this.aid);
        console.log(this.aid);
      }
    },
  },
  methods: {
    // 通过文章id获取文章数据
    aricletFn(aid: 18) {
      articleinfo({ aid: aid })
        .then((res) => {
          console.log(res);
          this.articlearray = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    myChar() {
      // 画图函数
      const mapleft = this.$refs.mapleft as HTMLElement;
      console.log(mapleft);
      let myChart1 = echarts.init(mapleft);
      myChart1.setOption(this.option1);
    },
    mychar1() {
      // 画图
      const mapright = this.$refs.mapright as HTMLElement;
      console.log(mapright);
      let myChart2 = echarts.init(mapright);
      myChart2.setOption(this.option2);
    },

    mapFn(event: Event) {
      this.map = (event.target as HTMLElement).dataset.map as unknown as number;
      nextTick(() => {
        this.myChar();
        this.mychar1();
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  width: 100%;
  // background-color: #fafafa;

  .top {
    height: 60px;
    background-color: chocolate;
    display: flex;
    justify-content: space-between;

    .left {
      padding: 20px 90px 20px 32px;
      display: flex;
      font-size: 12px;
      div {
        padding: 0 3px;
        margin-right: 6px;
        border-color: #fafafa;
      }
    }

    .rigth {
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .center {
    overflow: auto;
    padding: 0 32px;
    height: 892px;
    // background-color: aquamarine;

    .txt-tip {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
    }

    .head {
      margin: 6px 0 10px;
      font-size: 16px;
      height: 24px;
      color: #222222;
      font-weight: 600;
    }

    .primary {
      color: #222222;

      height: 28px;
      display: flex;
      color: #666666;
      margin-bottom: 5px;

      span {
        margin: 0 10px;
        font-size: 16px;
        font-weight: 600;
        color: #222222;
      }

      div {
        flex: 1;
      }
    }

    .second {
      height: 28px;
      display: flex;
      color: #666666;

      span {
        margin: 0 10px;
        font-size: 16px;
        font-weight: 600;
        color: #222222;
      }

      div {
        flex: 1;
      }
    }
    .first {
      height: 264px;
      margin-bottom: 8px;
      display: flex;
      font-size: 14px;
      .box-left {
        flex: 1;
        background-color: #fafafa;
        margin-right: 10px;
        padding: 12px 20px;
        border-radius: 7px;
      }
      .box-rigth {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .carh {
          height: 129px;
          background-color: #fafafa;
          padding: 12px 20px;
          border-radius: 7px;
        }
      }
    }
    .two {
      height: 92px;
      margin-bottom: 8px;
      // background-color: pink;
      padding: 12px 20px;
      background-color: #fafafa;
      border-radius: 7px;
    }
    .three {
      display: flex;
      align-items: center;
      margin-top: 25px;
      height: 42px;
      background-color: #fafafa;
      border-radius: 7px;
      div {
        height: 100%;
        line-height: 42px;
        margin-right: 10px;
        padding: 0 5px;
        font-size: 14px;
      }
      .xiahuanxian {
        border-bottom: 2px solid red;
        color: red;
        font-weight: 600;
      }
    }
    .five {
      overflow: hidden;
      margin-top: 25px;
      // background-color: coral;

      .big {
        width: calc(879px * 3);
        display: flex;
        min-height: 600px;
        color: #999;

        div {
          width: 879px;
          background-color: #ffffff;
        }
        .more {
          width: 879px;
          height: 270px;
          padding: 90px 0 0;
          margin-bottom: 100px;
          .box-more {
            height: 160px;
            display: flex;
            justify-content: center;
            // background-color: pink;
            div {
              width: 150px;
              height: 150px;
              i {
                display: flex;
                width: 150px;
                height: 150px;
                color: #999;
              }
            }
          }
          .box-a {
            display: flex;
            justify-content: center;
            font-size: 14px;
          }
        }
        .image {
          padding: 0 10px;
          .top-map {
            width: 100%;
            display: flex;
            justify-content: space-between;
            // background-color: #fafafa;
            margin: 20px 0;

            .top-map-left {
              margin-right: 20px;
              height: 310px;
              // background-color: pink;
              background-color: #fafafa;
            }

            .top-map-right {
              height: 310px;
              background-color: #fafafa;
              // background-color: pink;
            }
          }

          .conter-map {
            width: 100%;
            height: 420px;
            background-color: #fafafa;
            margin-bottom: 20px;
          }

          .bottom-map {
            width: 100%;
            height: 485px;
            // background-color: pink;
          }
        }

        .shang {
          width: 0;
          height: 0;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
