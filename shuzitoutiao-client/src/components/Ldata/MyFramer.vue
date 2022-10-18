<!-- 整体数据 -->
<template>
  <div class="Option2">
    <!-- 展位 -->
    <div class="top"></div>
    <div class="center">概览</div>
    <div class="bottom">
      <div class="bottom-a">
        <div class="first box-first">
          <div>昨日收益</div>
          <div>
            <span class="span">{{ yesterday }} </span>元
          </div>
          <div>近30日的{{ thirty }}收益</div>
        </div>
        <div class="two box-first">
          <div>本月收益</div>
          <div>
            <span class="span"> {{ benyue }} </span>元
          </div>
          <div>累计收入0元</div>
        </div>
        <div class="three box-first">
          <div>可提现金额</div>
          <div>
            <span class="span"> {{ maydeposit }} </span>元
          </div>
          <div>查看明细</div>
        </div>
      </div>
      <div class="bottom-b">
        <div class="bottom-leave">前往提现</div>
      </div>
    </div>
    <div class="drawing">
      <div>收益趋势分析</div>
    </div>
    <div class="box-drawing">
      <div class="time">
        <div class="time-left">
          <div class="time-a">
            <div class="left">时间</div>
            <div class="rigth" @click="dayFn">
              <span data-day="7" :class="{ rigthday: rigthday == 7 }">7天</span>
              <span data-day="14" :class="{ rigthday: rigthday == 14 }">14天</span>
              <span data-day="30" :class="{ rigthday: rigthday == 30 }">30天</span>
            </div>
          </div>
          <!-- 日期 -->
          <div class="time-b">
            <el-date-picker v-model="value2" type="daterange" start-placeholder="Start Date" end-placeholder="End Date"
              :locale="locale" style="width: 236px" :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]" />
          </div>
        </div>
        <div class="time-rigth" @click="tendencyMapFn">
          <div></div>
          <div :class="{ tendency: true, lista: listmap == 1 }" data-map="1">
            趋势图
          </div>
          <div :class="{ list: true, lista: listmap == 2 }" data-map="2">
            数据列表
          </div>
        </div>
      </div>
      <div :class="{ 'write-map': map, 'write-map1': map1 }" ref="wmap"></div>
      <div :class="{ timecontent: true, timecontent1: timecontent1 }">
        <el-table :data="showTableData" class="label">
          <el-table-column prop="addtime" label="日期" width="390" />
          <el-table-column prop="total" label="总计" />
          <el-table-column prop="createarn" label="创作收益" />
          <el-table-column prop="other" label="其他收益" />
        </el-table>
        <div class="next">
          <el-pagination background layout="prev, pager, next" :total="day.day" @current-change="handleCurrentChange"
            @size-change="handleSizeChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import { locale } from "dayjs";
import { creationdata } from "@/utils/api";
import * as echarts from "echarts";
import { creation } from "@/utils/type";
// import zhCn from "@/../node_modules/element-plusb/locale/lang/zh-cn";
interface objectI {
  addtime: string; //日期
  total: string; //总计
  createarn: string; //文章创作收益
  createarnZ:string,//总创作收益
  basearn: string; //文章基础收益
  subsidy: string; //文章补贴收益
  other: string; //文章其他收益
  otherZ:string;
  video: string; //视频创作收益
  videobasearn: string; //视频基础收益
  videosubsidy: string; //视频补贴收益
  othervideo: string; //视频其他数据
}
export default defineComponent({
  name: "MyFramer",
  data() {
    return {
      listmap: 2, //趋势和数据列表图
      rigthday: 30,
      map1: false,
      timecontent1: false, // 数据图是否显示
      map: false, //图形转换
      earn: {
        //点击文章和视频后的文章改变
        name: "",
        name1: "",
      },
      yesterday: 0,//昨日收益
      benyue: 0,//本月收收益
      maydeposit: 0,//可提现
      thirty: 0,//进三十天的收益
      accummulate: 0,//积累收益
      day: {
        day: 30,
      },
      locale: locale, // 日期数据
      value2: "", // 日期数据
      tableData: [
        // addtime: [], //日期
        // total: [], //总计
        // createarn: [], //文章创作收益
        // basearn: [], //文章基础收益
        // subsidy: [], //文章补贴收益
        // other: [], //文章其他收益
        // video: [], //视频创作收益
        // videobasearn: [], //视频基础收益
        // videosubsidy: [], //视频补贴收益
        // othervideo: [], //视频其他数据
      ],
      //请求回来的数据
      showTableData: [], //在页面的数据
      classfy: {
        // 分页数据
        day: 0,
        currentPage: 1,
      },
      // 保存画图的数据
      savedarwdata: {
        addtime: [], //日期
        total: [], //总计
        createarn: [], //文章创作收益
        basearn: [], //文章基础收益
        subsidy: [], //文章补贴收益
        other: [], //文章其他收益
        video: [], //视频创作收益
        videobasearn: [], //视频基础收益
        videosubsidy: [], //视频补贴收益
        othervideo: [], //视频其他数据


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
          data: ["总计", "创作收益", "其他收益"],
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "总计",
            type: "line",
            stack: "Total",
            data: [1, 2, 3, 4, 0, 5, 10],
          },
          {
            name: "创作收益",
            type: "line",
            stack: "Total",
            data: [31, 32, 3, 34, 30, 35, 10],
          },
          {
            name: "其他收益",
            type: "line",
            stack: "Total",
            data: [21, 22, 13, 14, 10, 15, 30],
          },
        ],
      },
    };
  },
  watch: {
    // 监听分页
    "classfy.currentPage": {
      handler() {
        this.showTableData = this.tableData.slice(
          (this.classfy.currentPage - 1) * 10,
          this.classfy.currentPage * 10
        );
      },
      immediate: true,
    },
    tableData() {
      this.option.xAxis.data = this.savedarwdata.addtime,//total
        this.option.series[0].data = this.savedarwdata.total,//total
        this.option.series[1].data = this.savedarwdata.createarn,//total
        this.option.series[2].data = this.savedarwdata.other,//total
        // 自动获取的三十条数据把时条给当前图
        this.showTableData = this.tableData.slice(0, 10);
    },
    "day.day"() {
      this.option.xAxis.data = this.savedarwdata.addtime.slice(0, this.day.day);//taddtime
      this.option.series[0].data = this.savedarwdata.total.slice(0, this.day.day);//total
      this.option.series[1].data = this.savedarwdata.createarn.slice(0, this.day.day);//createarn
      this.option.series[2].data = this.savedarwdata.other.slice(0, this.day.day);//other
      // 监听点击的天数
      this.myChar();
      if (this.day.day == 7) {
        this.showTableData = this.tableData.slice(0, this.day.day);
      } else {
        this.showTableData = this.tableData.slice(0, 10);
      }
    },
  },
  mounted() {
    // 默认获取数据
    this.creationF({ day: 30 });
  },
  methods: {
    myChar() {
      // 画图函数
      const writeMap = this.$refs.wmap as HTMLElement;
      console.log(writeMap);
      let myChart = echarts.init(writeMap);
      myChart.setOption(this.option);
    }, // 图形切换
    tendencyMapFn(event: Event) {
      // 图形转换
      console.log((event.target as HTMLElement).dataset.map);
      let map = (event.target as HTMLElement).dataset.map as unknown as number;
      if (map == 2) {
        this.map = false;
        this.map1 = true;
        this.timecontent1 = false;
        this.listmap = 2;
      } else if (map == 1) {
        this.map1 = false;
        this.map = true;
        this.timecontent1 = true;
        this.listmap = 1;
        nextTick(() => {
          this.myChar();
          // const writeMap = this.$refs.wmap as HTMLElement;
          // console.log(writeMap);
          // let myChart = echarts.init(writeMap);
          // myChart.setOption(this.option);
        });
      }
    },
    // 第几页,触发
    handleCurrentChange(currentPage: number) {
      console.log(currentPage);

      this.classfy.currentPage = currentPage;

      // this.getData(this.classfy);
      // this.scrollTop(body);
      // console.log('handleCurrentChange');s
    },
    // 每页显示多少条,触发
    handleSizeChange(day: number) {
      // 每页显示多少条
      this.classfy.day = day;
      // this.getData(this.classfy)
    },
    // 获取当前月
    doHandleDate() {
      let myDate = new Date();
      var tMonth = myDate.getMonth();

      var m = (tMonth + 1) as unknown as string;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      return m;
    },
    // 获取服务器数据
    creationF(day: creation) {
      let my = this.doHandleDate();
      console.log(my);
      creationdata(day)
        .then((res) => {
          // this.tableData = res.data;
          res.data.forEach((item: objectI) => {
            //时间格式化
            item.addtime = (item.addtime as unknown as string).substring(0, 10) as never;//日期
            if(item.addtime.slice(5,7) == my) this.benyue += (item.total as unknown as never)/1;//本月收入
            this.savedarwdata.addtime.unshift(item.addtime as unknown as never);//日期
            this.savedarwdata.total.unshift((
              (item.createarn as unknown as never)/1 + 
              (item.videobasearn as unknown as never)/1 +
              (item.basearn as unknown as never)/1 +
              (item.subsidy as unknown as never)/1 +
              (item.other as unknown as never)/1 +
              (item.videobasearn as unknown as never)/1 +
              (item.videosubsidy as unknown as never)/1 +
              (item.othervideo as unknown as never)/1)  as never);//总计
            this.thirty += (item.total as unknown as never) / 1;//进三十天的收益
            this.savedarwdata.createarn.unshift((
              (item.createarn as unknown as never)/1 + 
              (item.videobasearn as unknown as never)/1) as never);//文章创作收益
            // this.savedarwdata.basearn.unshift(item.basearn as unknown as never);//文章基础收益
            // this.savedarwdata.subsidy.unshift(item.subsidy as unknown as never);//文章补贴收益
            this.savedarwdata.other.unshift((
              (item.basearn as unknown as never)/1 +
              (item.subsidy as unknown as never)/1 +
              (item.other as unknown as never)/1 +
              (item.videobasearn as unknown as never)/1 +
              (item.videosubsidy as unknown as never)/1 +
              (item.othervideo as unknown as never)/1 ) as never);//文章其他收益
            // this.savedarwdata.video.unshift(item.video as unknown as never);//视频创作收益
            // this.savedarwdata.videobasearn.unshift(item.videobasearn as unknown as never);//视频基础收益
            // this.savedarwdata.videosubsidy.unshift(item.videosubsidy as unknown as never);//视频补贴收益
            // this.savedarwdata.othervideo.unshift(item.othervideo as unknown as never);//视频其他数据
          });
          this.tableData = res.data;
          this.yesterday = this.savedarwdata.total[28]//昨日收益
          // console.log(this.tableData);
          // console.log(this.savedarwdata);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dayFn(event: Event) {
      let day1 = (event.target as HTMLElement).dataset.day as unknown as number;
      this.day.day = day1 / 1;
      this.rigthday = day1; //改变天数的颜色
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
  .bottom {
    // height: 167px;
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
  .box-drawing {
    .time {
      height: 32px;
      background-color: pink;
      display: flex;
      .time-left {
        line-height: 32px;
        width: 442px;
        height: 32px;
        background-color: cadetblue;
        display: flex;
        .time-a {
          flex: 1;
          display: flex;
          .left {
            margin-right: 5px;
          }
          .rigth {
            flex: 1;
            background-color: pink;
            display: flex;
            span {
              flex: 1;
              border: 1px solid black;
              text-align: center;
              color: #222222;
              font-size: 13px;
            }
            span:hover {
              color: #888888;
            }
          }
        }
        .time-b {
          width: 238px;
          height: 32px;
          background-color: blueviolet;
        }
      }
      .time-rigth {
        flex: 1;
        background-color: red;
        display: flex;
        justify-content: flex-end;
        line-height: 32px;
        .tendency {
          border: 1px solid rgb(99, 89, 89);
          padding: 0 16px;
          height: 32px;
          border-radius: 7px;
          background-color: #666666;
        }
        .list {
          border: 1px solid rgb(99, 89, 89);
          padding: 0 16px;
          background-color: blanchedalmond;
          margin-right: 10px;
          border-radius: 7px;
        }
        .lista {
          color: red;
          border: 1px solid red;
        }
      }
    }
    .write-map {
      margin-top: 30px;
      height: 370px;
      width: 100%;
      // background-color: yellow;
    }
    .write-map1 {
      overflow: hidden;
      height: 0;
    }
    .timecontent {
      margin-top: 30px;
      background-color: antiquewhite;
      .label {
        display: flex;
      }
    }

    .timecontent1 {
      height: 0;
      overflow: hidden;
    }
    .next {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style> -->
