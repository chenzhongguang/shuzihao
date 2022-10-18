<template>
    <div class="sigleContent">
        <div class="contenttitle">
            <div>共有<span>{{tableData.length}}</span>条内容</div>
            <div><span class="iconfont icon-xiazai"></span>下载Excel</div>
        </div>
        <div class="WorkDisplay">
            <el-table :data="tableData" style=" width:100%">
                <el-table-column fixed prop="opus" label="作品" width="300">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <router-link :to="{path:'/',query:{aid:scope.row.aid}}">
                                <div class="opuscont">
                                    <div class="left">
                                        <img :src="scope.row.mainpic" alt="">
                                    </div>
                                    <div class="right">
                                        <div class="title">{{scope.row.title}}</div>
                                        <div class="times">{{scope.row.addtime}}</div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="impress" label="展现量" width="150" />
                <el-table-column prop="reading" label="阅读量" width="150" />
                <el-table-column prop="supports" label="点击率" width="150" />
                <el-table-column prop="reading" label="阅读时长" width="150" />
                <el-table-column prop="supports" label="点赞量" width="150" />
                <el-table-column prop="comments" label="评论量" width="150" />
                <el-table-column fixed="right" label="操作" width="150">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-button link type="primary" size="small"  :data-aid="scope.row.aid">
                                <div :data-aid="scope.row.aid" @click="commentFn">查看详情</div>
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div :class="{ bighuachu: huac[0].h, bighuachu1: huac[0].c }" @click="bigFn">
            <div class="myco" data-co="1"></div>
            <div class="mycomment">
                <ExaminedataViewVue :aid="aid"></ExaminedataViewVue>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getBeanData } from '@/utils/api';
import { defineComponent } from 'vue';
import getYMDHMS from '@/utils/filter'
import ExaminedataViewVue from "@/components/Ownarticle/Examine/ExaminedataView.vue";
import { log } from 'console';
interface objtype {
    addtime: string,
    aid: number,
    title: string,
    impress: string,
    reading: string,
    beanimpress: string,
    beanreading: string,
    supports: string,
    comments: string,
}
interface objtype1 {
    h: boolean,
    c: boolean
}
interface DataType {
    tableData: Array<objtype>,
    huac: Array<objtype1>,
    aid: number
}
export default defineComponent({
    data(): DataType {
        return {
            tableData: [],
            huac: [{
                // 查看数据划出框
                h: true,
                c: false,
            }],
            aid: 0
        }
    },
    components: {
        ExaminedataViewVue
    },
    methods: {
        // 获取数据
        getBeanData() {
            let u = localStorage.getItem('uid') as unknown as number;
            getBeanData({ uid: u }).then((res) => {
                // console.log(2222, res.data);
                let articleArr = res.data;
                articleArr.forEach((item: any) => {
                    item.addtime = getYMDHMS(item.addtime);
                    this.tableData.push(item);
                });
            }).catch((error) => {
                console.log(error);
            })
        },
        bigFn(event: Event) {
            if ((event.target as HTMLElement).dataset.co == "1") {
                this.huac[0].c = false;
            } else if ((event.target as HTMLElement).dataset.co == "2") {
                this.huac[0].c = false;
            }
        },
        commentFn(event: Event) {
            this.huac[0].c = true;
            this.aid = (event.target as HTMLElement).dataset.aid as unknown as number;
            console.log(25, this.aid);



        }
    },
    mounted() {
        this.getBeanData()
    }

})
</script>

<style lang="scss" scoped>
.sigleContent {
    padding: 80px 0 60px;

    .contenttitle {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
    }

    .WorkDisplay {
        display: flex;
        justify-content: space-between;
        z-index: 1;

        >ul {
            display: flex;
        }
    }
}

// 表格样式
.opuscont {
    display: flex;
    padding: 16px 8px 16px 24px;

    >.left {
        margin-right: 6px;

        >img {
            width: 40px;
            height: 40px;
        }
    }

    >.right {
        .title {
            height: 20px;
            margin-bottom: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 180px;
            font-size: 14px;
            color: #222222;
        }

        .times {
            line-height: 16px;
            font-size: 12px;
            color: #666;
        }
    }
}

.bighuachu {
    width: 100vw;
    height: 100vh;
    background-color: rgba(188, 170, 173, 0.4);
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
        background-color: #e6f0ff;

        .lititle {
            display: flex;
            justify-content: space-between;
            height: 60px;
            border-bottom: 1px solid #67686b;

            .title1 {
                display: flex;
                padding: 20px 90px 20px 32px;

                >div {
                    margin-right: 10px;
                }
            }
        }
    }
}

.bighuachu1 {
    left: 0;
}
</style>