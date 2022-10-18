<template>
    <div>
        <div class="titleborder">
            <h3 class="title">核心数据
                <span>当前数据为前日数据,14:00前更新昨日数据</span>
            </h3>
            <div class="show">
                <div class="show1">
                    <div>前日展现量
                        <span class="iconfont icon-wenhao"></span>
                    </div>
                    <div class="count fc">{{count1.sum1}}</div>
                    <div>粉丝展现量
                        <span class="num fc">{{count1.sum1}}</span>
                    </div>
                </div>
                <div class="show1">
                    <div>前日阅读(播放)量</div>
                    <div class="count fc">{{count1.fans}}</div>
                    <div>粉丝阅读(播放)量
                        <span class="num fc">{{count1.fans}}</span>
                    </div>

                </div>
                <div class="show1">
                    <div>前日点赞量</div>
                    <div class="count fc">{{count1.supports}}</div>
                </div>
                <div class="show1">
                    <div>前日评论</div>
                    <div class="count fc">{{count1.comments}}</div>
                </div>
            </div>

        </div>
        <div class="traffanaly">
            <h3 class="title">流量分析</h3>
            <div class="show1">
                <span class="lable labeltime">时间</span>
                <div class="styti" @click="clidays">
                    <span class="lable" :data-day='7' :class="{col:7 == timestyle }">7天</span>
                    <span class="lable" :data-day='30' :class="{col:30 == timestyle }">30天</span>
                </div>
                <el-config-provider :locale="locale">
                    <div class="demo-date-picker">
                        <div class="block">
                            <el-date-picker v-model="value" type="daterange" start-placeholder="Start date"
                                end-placeholder="End date" :default-time="defaultTime" :locale="locale"
                                style="width: 210px;" />
                        </div>
                    </div>
                </el-config-provider>
            </div>
        </div>
        <div class="DataTrending">
            <div class="datapending">
                <div class="title">数据趋势</div>
                <div class="rightchoose">
                    <div class="dataandped" @click="dalist">
                        <div class="datalist" :data-id="1" :class="{qs:1== zdyid}">
                            <span class="iconfont icon-qushitu"></span>
                            趋势图
                        </div>
                        <div class="datalist" :data-id="2" :class="{qs:2== zdyid}">
                            <span class="iconfont icon-biaoge"></span>
                            数据列表
                        </div>
                    </div>
                    <div class="datalist upload">
                        <span class="iconfont icon-xiazai"></span>
                        下载Excel
                    </div>
                </div>
            </div>
            <div class="myEcharts" ref="myEcharts1" :class="{echar:chts}">

            </div>
            <div id="dataListEchart" :class="{echar:chtslist}">
                <el-table :data="tableData" style="width:100%">
                    <el-table-column fixed prop="addtime" label="时间" width="150" />
                    <el-table-column prop="impress" label="展现量" width="120" />
                    <el-table-column prop="read" label="阅读(播放)量" width="200" />
                    <el-table-column prop="beanimpress" label="粉丝展现量" width="200" />
                    <el-table-column prop="beanread" label="粉丝阅读(播放)量" width="200" />
                    <el-table-column prop="supports" label="点赞量" width="120" />
                    <el-table-column prop="comments" label="评论量" width="120" />
                </el-table>
                <div class="page">
                    <el-pagination background layout="prev, pager, next" :total="tableData.length/10"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </div>
        </div>
        <div class="DataTrending">
            <div class="datapending">
                <div class="genderDistribution">
                    <div>性别分布</div>
                    <div id="genderEachrts" ref="genderEachrts1">
                    </div>
                </div>
                <div class="ageDistribution">
                    <div>年龄分布</div>
                    <div id="ageEacharts" ref="ageEacharts1">
                    </div>
                </div>
            </div>
        </div>
        <div class="DataTrending">
            <div class="datapending">
                <div class="title">地域分布</div>
            </div>
            <div class="mapChart" id="main" ref="mapDom">
            </div>
        </div>
        <div class="DataTrending">
            <div class="datapending">
                <div class="title">机型价格分布</div>
            </div>
            <div id="paceEacharts" ref="paceEacharts1">
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref, nextTick } from 'vue';
import { locale } from 'dayjs';
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import * as echarts from 'echarts'
import '../../../public/China.js-master/china.js'
import axios from 'axios'
import echartMap from '@/echartMap/echartMap'
import { updataData, getGender } from '@/utils/api';
import { addtmeId } from '@/utils/type';
let mapRender = echartMap()
interface objectI {
    addtime: string[];
    beanimpress: string[];
    beanreading: string[];
    supports: string[];
    comments: string[];
    impress: [];
    reading: [];
}
interface objtype {
    addtime: string,
    impress: string,
    read: string,
    beanimpress: string,
    beanread: string,
    supports: string,
    comments: string
}

export default defineComponent({
    data() {
        // 时间中文
        const defaultTime = ref<[Date, Date]>([
            new Date(2000, 1, 1, 0, 0, 0),
            new Date(2000, 2, 1, 23, 59, 59),
        ]);
        return {
            value: '',
            defaultTime,
            locale: zhCn,
            chart: null,
            mapData: [],  //地图所需
            tableData: [],  //渲染在表格上的数据
            tableData1: [],
            obj: [],
            ref: null,
            chts: false,
            chtslist: true,
            day: {
                day: 30
            },
            // 分页
            classfy: {  // 分页数据
                day: 0,
                currentPage: 1,
            },
            count1: {
                sum1: '待更新',
                fans: '待更新',
                supports: '待更新',
                comments: '待更新'
            },
            qs: false,
            zdyid: 1,
            timestyle: 30,
            manydata: {
                addtime: [],
                beanimpress: [],
                beanread: [],
                supports: [],
                comments: [],
                impress: [],
                read: []
            },  //返回来的所有数据
            usedata: [],  //要用的数据数组
            col: true,  // 7/30天样式
            option: {
                title: {
                    text: '展现量-阅读量'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['展现量', '阅读(播放)量', '粉丝展现量', '粉丝阅读(播放)量', '点赞量', '评论量']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [1, 2, 3, 4, 5, 6]   //时间 'manydata.addtime'
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '展现量',
                        type: 'line',
                        stack: 'Total',
                        data: [10, 20, 30, 40, 50, 60]    //展现量 'manydata.impress'
                    },
                    {
                        name: '阅读(播放)量',
                        type: 'line',
                        stack: 'Total',
                        data: [22, 33, 44, 55, 66, 11]   //阅读量  'manydata.read'
                    },
                    {
                        name: '粉丝展现量',
                        type: 'line',
                        stack: 'Total',
                        data: [1, 2, 3, 5, 8, 9]  //粉丝展现量 'manydata.beanimpress'
                    },
                    {
                        name: '粉丝阅读量',
                        type: 'line',
                        stack: 'Total',
                        data: [4, 1, 2, 5, 6, 5] //粉丝阅读量 'manydata.beanread' 
                    },
                    {
                        name: '点赞量',
                        type: 'line',
                        stack: 'Total',
                        data: [1, 22, 33, 44, 55, 88]  //点赞量  'manydata.sopports'
                    }
                    ,
                    {
                        name: '评论量',
                        type: 'line',
                        stack: 'Total',
                        data: [15, 25, 35, 45, 55, 66]  //评论量  'manydata.comments' 
                    }
                ]
            },
            option1: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        color: ['#F78585', '#007ACC'],
                        data: [
                            { value: 5, name: '女' },
                            { value: 55, name: '男' }
                        ]
                    }
                ]
            },
            option2: {
                xAxis: {
                    type: 'category',
                    name: '年龄/岁',
                    data: ['0-18', '18-23', '24-30', '31-40', '41-50', '50+']
                },
                yAxis: {
                    type: 'value',
                    name: '年龄分布',
                    axisLabel: {
                        formatter: '{value}%'
                    }
                },
                series: [
                    {
                        data: [0, 10, 20, 40, 60, 80, 100],
                        type: 'bar'
                    }
                ]
            },
            option3: {
                xAxis: {
                    type: 'category',
                    name: '价格/元',
                    data: ['0~999', '1000~1999', '2000~2999', '3000~3999', '4000~4999', '5000以上']
                },
                yAxis: {
                    type: 'value',
                    name: '比例',
                    axisLabel: {
                        formatter: '{value}%'
                    }
                },
                series: [
                    {
                        data: [0, 20, 40, 60, 80, 100],
                        type: 'bar'
                    },
                    {
                        // barCategoryGap:'20%'
                    }
                ]
            },
        }
    },
    watch: {
        // 监听分页
        'classfy.currentPage': {
            handler() {
                this.tableData = this.obj.slice(
                    (this.classfy.currentPage - 1) * 10,
                    this.classfy.currentPage * 10
                );
            },
            immediate: true
        },
    },
    methods: {
        // 默认发起请求,去获取30天的数据
        getData(amid: addtmeId) {
            updataData(amid)
                .then((res) => {
                    console.log(555555, res.data);
                    // 时间截取
                    res.data.forEach((item: objectI) => {//时间格式化
                        item.addtime = (item.addtime as unknown as string).substring(0, 10) as never
                        (this.obj as unknown as Array<objtype>).push({
                            addtime: item.addtime as unknown as string,
                            impress: item.impress as unknown as string,
                            read: item.reading as unknown as string,
                            beanimpress: item.beanimpress as unknown as string,
                            beanread: item.beanreading as unknown as string,
                            supports: item.supports as unknown as string,
                            comments: item.comments as unknown as string,
                        })
                        this.manydata.addtime.push((item.addtime as unknown as string).substring(0, 10) as never);
                        this.manydata.impress.push((item.impress as unknown as string) as never);
                        this.manydata.read.push((item.reading as unknown as string) as never);
                        this.manydata.beanimpress.push((item.beanimpress as unknown as string) as never);
                        this.manydata.beanread.push((item.beanreading as unknown as string) as never);
                        this.manydata.supports.push((item.supports as unknown as string) as never);
                        this.manydata.comments.push((item.comments as unknown as string) as never);

                    });
                    this.tableData = this.obj.slice(0, 10)
                    // 取前两条数据
                    let beani = this.manydata.beanimpress.slice(0, 2)
                    let beanr = this.manydata.beanread.slice(0, 2)
                    let beans = this.manydata.supports.slice(0, 2)
                    let beanc = this.manydata.comments.slice(0, 2)
                    this.count1.sum1 = (beani[0] + beani[1]) as unknown as string
                    this.count1.fans = (beanr[0] + beanr[1]) as unknown as string
                    this.count1.supports = (beans[0] + beans[1]) as unknown as string
                    this.count1.comments = (beanc[0] + beanc[1]) as unknown as string

                    // 画趋势图
                    this.option.xAxis.data = this.manydata.addtime
                    this.option.series[0].data = this.manydata.impress
                    this.option.series[1].data = this.manydata.read
                    this.option.series[2].data = this.manydata.beanimpress
                    this.option.series[3].data = this.manydata.beanread
                    this.option.series[4].data = this.manydata.supports
                    this.option.series[5].data = this.manydata.comments

                    nextTick(() => {
                        this.drawLine()
                    })

                })
                .catch((error) => {
                    console.log(error);
                });
        },

        // 拿到性别年龄等数据
        getGenderData() {
            let u = localStorage.getItem('uid') as unknown as number;
            getGender({ uid: u }).then((res) => {
                console.log(111111, res.data);
                // 画饼图 --性别
                this.option1.series[0].data[0].value = res.data[0][1].sumg
                this.option1.series[0].data[1].value = res.data[0][0].sumg

                // 年龄    !!!
                // res.data[1].foreach((i)=>{

                // })
                this.option2.series[0].data= [0,1,1,0,0]

                nextTick(() => {
                    this.drawGraph()
                    this.drawBar()
                })
            }).catch((error) => {
                console.log(error);

            })


        },
        // 点击进行图形变换
        dalist(event: Event) {
            this.zdyid = (event.target as HTMLElement).dataset.id as unknown as number;
            if (this.zdyid == 1) {
                this.chtslist = true;
                this.chts = false;

            } else if (this.zdyid == 2) {
                this.chts = true;
                this.chtslist = false;
                nextTick(() => {
                    this.drawLine()
                })
            }
        },
        clidays(event: Event) {
            // 默认是30天的数据
            if ((event.target as HTMLElement).dataset.day == '7') {
                this.timestyle = 7
            } else if ((event.target as HTMLElement).dataset.day == '30') {
                this.timestyle = 30
            }
        },
        // 每页显示的条数
        handleSizeChange(day: number) {
            this.classfy.day = day;
        },
        // 显示第几页
        handleCurrentChange(currentPage: number) {
            this.classfy.currentPage = currentPage;

        },
        // 趋势图函数
        drawLine() {
            this.option.xAxis.data = this.manydata.addtime.slice(0, this.day.day)
            this.option.series[0].data = this.manydata.impress.slice(0, this.day.day)
            this.option.series[1].data = this.manydata.read.slice(0, this.day.day)
            this.option.series[2].data = this.manydata.beanimpress.slice(0, this.day.day)
            this.option.series[3].data = this.manydata.beanread.slice(0, this.day.day)
            this.option.series[4].data = this.manydata.supports.slice(0, this.day.day)
            this.option.series[5].data = this.manydata.comments.slice(0, this.day.day)
            let myEcharts = this.$refs.myEcharts1 as HTMLElement;
            let myEchart = echarts.init(myEcharts)
            myEchart.setOption(this.option);

        },
        drawGraph() {
            let genderEachrts = this.$refs.genderEachrts1 as HTMLElement;
            let genderEachrt = echarts.init(genderEachrts)
            genderEachrt.setOption(this.option1);
        },

        drawBar() {
            let ageEacharts = this.$refs.ageEacharts1 as HTMLElement;
            let ageEachart = echarts.init(ageEacharts)
            ageEachart.setOption(this.option2);
        }

    },

    mounted() {
        // 获取数据
        this.getData({ amid: 30 })
        this.drawLine()
        this.getGenderData()
        this.drawGraph()
        this.drawBar()
        // 获取容器
        let paceEacharts = this.$refs.paceEacharts1 as HTMLElement;
        // 初始化
        let paceEachart = echarts.init(paceEacharts)
        // 画图
        const option3 = this.option3;
        paceEachart.setOption(option3);


        let map = echarts.init(this.$refs.mapDom as HTMLElement)
        axios
            .get(`https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json`)
            .then((res: any) => {
                this.mapData = res.data
                // registerMap 注册一个地图   mapData 地图的数据包 根据不同的数据渲染不同的地图
                echarts.registerMap('china', res.data)
                // 这个调用是进行地图的渲染
                map.setOption(mapRender(res.data.features))
            })
    },

});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/drawGraph.scss'
</style>