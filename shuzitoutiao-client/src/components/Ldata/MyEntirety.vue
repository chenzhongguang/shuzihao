<!-- 收益数据 -->
<template>
  <div class="Option2">
    <!-- 展位 -->
    <div class="top"></div>
    <div class="center center-a">
      <div>概览</div>
      <div class="center-span"><span>创作计算规则图</span></div>
    </div>
    <div class="bottom">
      <div class="bottom-a">
        <div class="first box-first">
          <div>昨日创作收益</div>
          <div><span class="span"> {{createarn}} </span>元</div>
          <div>
            <div>
              基础收益图 <span>{{basearn}}</span>元 + 不贴收益图 <span>{{subsidy}}</span> 元
            </div>
          </div>
        </div>
        <div class="three box-first">
          <div>可提现金额</div>
          <div><span class="span"> 0 </span>元</div>
          <div>查看明细</div>
        </div>
      </div>
    </div>
    <div class="drawing">
      <div>收益趋势分析</div>
    </div>
    <div class="quanbu">
      <div class="quanbu-top" @click="quanbuFn">
        <router-link to="/earnings/benefits/">
          <div
            :class="{ quanbuab: true, all: all == quanbua1 }"
            :data-quanbu="quanbua1"
          >
            全部
          </div>
        </router-link>
        <router-link to="/earnings/benefits/articlegraph">
          <div
            :class="{ quanbuab: true, all: all == quanbua2 }"
            :data-quanbu="quanbua2"
          >
            文章
          </div>
        </router-link>
        <router-link to="/earnings/benefits/videoGraph">
          <div
            :class="{ quanbuab: true, all: all == quanbua3 }"
            :data-quanbu="quanbua3"
          >
            视频
          </div>
        </router-link>
      </div>
      <div :class="{ quanbux: true, quanbuy: quanbuy }">
        <div class="quanbu-b">
          <div class="earnings">
            <div class="earnings-a">
              前日创作收益 <span class="ear-span">{{createarn3}}</span>元
            </div>
            <div class="earnings-b">
              累计创作收益 <span>图</span><span class="ear-span1">0</span>元
            </div>
          </div>
        </div>
        <div class="quanbu-b">
          <div class="earnings">
            <div class="earnings-a">
              前日基础收益 <span class="ear-span">{{basearn3}}</span>元
            </div>
            <div class="earnings-b">
              {{ earn.name }} <span>图</span><span class="ear-span1">0</span>
              {{ earn.name1 }} <span>图</span> <span class="ear-span1">0</span>
            </div>
          </div>
        </div>
        <div class="quanbu-b">
          <div class="earnings">
            <div class="earnings-a">
              前日补贴收益 <span class="ear-span">{{subsidy3}}</span>元
            </div>
            <div class="earnings-b">
              参加补贴的项目<span class="ear-span1">0</span>元
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-drawing">
      <router-view></router-view>
      <!-- <div class="time">
        <div class="time-left">
          <div class="time-a">
            <div class="left">时间</div>
            <div class="rigth" @click="dayFn">
              <span data-day="7">7天</span>
              <span data-day="14">14天</span>
              <span data-day="30">30天</span>
            </div>
          </div>
          <div class="time-b">
            <el-date-picker
              v-model="value2"
              type="daterange"
              start-placeholder="Start Date"
              end-placeholder="End Date"
              :locale="locale"
              style="width: 236px"
              :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
            />
          </div>
        </div>
        <div class="time-rigth" @click="tendencyMapFn">
          <div></div>
          <div class="tendency" data-map="1">趋势图</div>
          <div class="list" data-map="2">数据列表</div>
        </div>
      </div>
      <div :class="{ 'write-map': map, 'write-map1': map1 }" ref="wmap"></div>
      <div :class="{ timecontent: true, timecontent1: timecontent1 }">
        <el-table :data="showTableData" class="label">
          <el-table-column prop="addtime" label="日期" width="380" />
          <el-table-column prop="createarn" label="创作收益" />
          <el-table-column prop="basearn" label="基础收益" />
          <el-table-column prop="subsidy" label="补贴收益" />
        </el-table>
        <div class="next">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="day.day"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { locale } from "dayjs";
import { creationdata } from "@/utils/api";
// import { creationdata } from "@/utils/api";
// import * as echarts from "echarts";
// import { creation } from "@/utils/type";
// 引入柱状图图表，图表后缀都为 Chart
// interface objectI {
//   addtime: string;
//   createarn: string;
//   basearn: string;
//   subsidy: string;
// }
export default defineComponent({
  name: "MyFramer",

  data() {
    return {
      map1: false,
      timecontent1: false, // 数据图是否显示
      map: false, //图形转换
      earn: {
        //点击文章和视频后的文章改变
        name: "",
        name1: "",
      },
      // 全部
      createarn: 0,//昨日收益
      basearn:0,//基础收益
      subsidy:0,//补贴收益

      // 文章
      createarn1: 0,//前日收益
      basearn1:0,//基础收益
      subsidy1:0,//补贴收益

      // 视频
      createarn2: 0,//前日收益
      basearn2:0,//基础收益
      subsidy2:0,//补贴收益

      //渲染数据
      createarn3: 0,//前日收益
      basearn3:0,//基础收益
      subsidy3:0,//补贴收益

      all: 0, //表示当全部显示  当点击其他的时候改变这个值
      quanbua1: 0, //全部的显示class
      quanbua2: 1, //文章的显示class
      quanbua3: 2, //视频的显示clss
      quanbuy: true, // 这点击除全部后的值，高度为0，当点击其他后设置为flase
      day: {
        day: 30,
      },
      locale: locale, // 日期数据
      value2: "", // 日期数据
      tableData: [], //请求回来的数据
      showTableData: [], //在页面的数据
      classfy: {
        // 分页数据
        day: 0,
        currentPage: 1,
      },
      // 画图数据
      option: {
        title: {
          text: "收益/元",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["创作收益", "基础收益", "补贴收益"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "创作收益",
            type: "line",
            stack: "Total",
            data: [],
          },
          {
            name: "基础收益",
            type: "line",
            stack: "Total",
            data: [],
          },
          {
            name: "补贴收益",
            type: "line",
            stack: "Total",
            data: [],
          },
        ],
      },
    };
  },
  watch: {
  },
  mounted() {
      this.creationF()
  },
  methods: {
    creationF() {
      // createarn: 0,//昨日收益
      // basearn:0,//基础收益
      // subsidy:0,//补贴收益
      creationdata(this.day).then((res)=>{
        console.log(res);
        // 全部
       this.createarn = res.data[1].createarn/1 + res.data[1].video/1
       this.basearn = res.data[1].basearn/1 + res.data[1].videobasearn/1
       this.subsidy = res.data[1].subsidy/1 + res.data[1].videosubsidy/1

       // 文章
       this.createarn1 = res.data[1].createarn/1
       this.basearn1 = res.data[1].basearn/1
       this.subsidy1 = res.data[1].subsidy/1

       // 视频
       this.createarn2 = res.data[1].video/1
       this.basearn2 = res.data[1].videobasearn/1
       this.subsidy3 = res.data[1].videosubsidy/1
      }).catch((err)=>{
        console.log(err);
      });
    },
    quanbuFn(event: Event) {
      //做全部和文章视频判断
      let qu = (event.target as HTMLElement).dataset
        .quanbu as unknown as number; //获取当前的点击的自定义属性值
      console.log(qu);
      if (qu) {
        // 如果有这个值，就改变这个值
        this.all = qu;
      }
      if (qu == 1) {
        this.quanbuy = false; //当点击后自定义属性值为1 显示下面框
        (this.earn.name = "千次阅读单价"), (this.earn.name1 = "获取阅读量");
        this.createarn3 = this.createarn1
        this.basearn3 = this.basearn1
        this.subsidy3 = this.subsidy1
      } else if (qu == 2) {
        this.quanbuy = false; //当点击后自定义属性值为1 显示下面框
        (this.earn.name = "千次播放单价"), (this.earn.name1 = "获取播读量");
        this.createarn3 = this.createarn2
        this.basearn3 = this.basearn2
        this.subsidy3 = this.subsidy2
      } else if (qu == 0) {
        this.quanbuy = true;
      }
      // console.log((event.target as HTMLElement).dataset.quanbu);
    },
  },
});
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  /* width: 100%; */
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
<style lang="scss">
@import "../..//assets/sass/dataaritcle.scss";
</style>
<!-- <style lang="scss" scoped>
.Option2 {
  width: 100%;
  // height: 100%;
  min-height: 500px; // 先给一个高度
  background-color: #ffffff;
  .top {
    color: #222222;
    height: 30px;
    // background-color: pink;
  }
  .center {
    margin-bottom: 24px;
  }
  .center-a {
    display: flex;
    justify-content: space-between;
    .center-span {
      font-size: 14px;
      color: #888888;
      margin-right: 40px;
    }
  }
  .bottom {
    //   height: 167px;
    // background-color: aquamarine;
    .bottom-a {
      height: 107px;
      display: flex;
      .box-first {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: #666666;
        font-size: 14px;
        .span {
          font-size: 32px;
          color: #222222;
        }
      }
    }
    .bottom-b {
      margin-top: 30px;
      height: 32px;
      // background-color: antiquewhite;
      display: flex;
      justify-content: center;
      .bottom-leave {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border: 1px solid red;
        color: red;
        line-height: 32px;
        text-align: center;
        border-radius: 7px;
      }
    }
  }
  .drawing {
    height: 32;
    margin: 40px 0px 12px;
    // background-color: antiquewhite;
  }
  .quanbu {
    background-color: pink;
    margin-bottom: 20px;
    .quanbu-top {
      padding: 24px 0;
      display: flex;
      .quanbuab {
        margin-right: 10px;
        padding: 3px 11px;
      }
      .all {
        border: 2px solid red;
        border-radius: 7px;
        color: red;
      }
    }
    .quanbux {
      overflow: hidden;
      height: 96px;
      background-color: yellow;
      display: flex;
      .quanbu-b {
        border: 1px solid black;
        flex: 1;
        .earnings {
          font-size: 14px;
          height: 100%;
          margin-right: 24px;
          padding: 20px 0 0 16px;
          background-color: pink;
          .earnings-a {
            color: #222222;
            margin-bottom: 10px;
            .ear-span {
              font-weight: 500;
              font-size: 24px;
              color: black;
            }
          }
          .earnings-b {
            color: #666666;
            .ear-span1 {
              font-size: 14px;
              color: black;
              font-weight: 500;
            }
          }
        }
      }
    }
    .quanbuy {
      height: 0;
    }
  }
  // .box-drawing {
  //   .time {
  //     height: 32px;
  //     background-color: pink;
  //     display: flex;
  //     .time-left {
  //       line-height: 32px;
  //       width: 442px;
  //       height: 32px;
  //       background-color: cadetblue;
  //       display: flex;
  //       .time-a {
  //         flex: 1;
  //         display: flex;
  //         .left {
  //           margin-right: 5px;
  //         }
  //         .rigth {
  //           flex: 1;
  //           background-color: pink;
  //           display: flex;
  //           span {
  //             flex: 1;
  //             border: 1px solid black;
  //             text-align: center;
  //             color: #222222;
  //             font-size: 13px;
  //           }
  //           span:hover {
  //             color: #888888;
  //           }
  //         }
  //       }
  //       .time-b {
  //         width: 238px;
  //         height: 32px;
  //         background-color: blueviolet;
  //       }
  //     }
  //     .time-rigth {
  //       flex: 1;
  //       background-color: red;
  //       display: flex;
  //       justify-content: flex-end;
  //       line-height: 32px;
  //       .tendency {
  //         border: 1px solid rgb(99, 89, 89);
  //         padding: 0 16px;
  //         height: 32px;
  //         border-radius: 7px;
  //         background-color: #666666;
  //       }
  //       .list {
  //         border: 1px solid rgb(99, 89, 89);
  //         padding: 0 16px;
  //         background-color: blanchedalmond;
  //         margin-right: 10px;
  //         border-radius: 7px;
  //       }
  //       .lista {
  //         color: red;
  //         border: 1px solid red;
  //       }
  //     }
  //   }
  //   .write-map {
  //     margin-top: 30px;
  //     height: 370px;
  //     width: 100%;
  //     // background-color: yellow;
  //   }
  //   .write-map1 {
  //     overflow: hidden;
  //     height: 0;
  //   }
  //   .timecontent {
  //     margin-top: 30px;
  //     background-color: antiquewhite;
  //     .label {
  //       display: flex;
  //     }
  //   }

  //   .timecontent1 {
  //     height: 0;
  //     overflow: hidden;
  //   }
  //   .next {
  //     display: flex;
  //     justify-content: flex-end;
  //   }
  // }
}
</style> -->
