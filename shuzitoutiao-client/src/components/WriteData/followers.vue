<template>
    <div>
        <div class="nav">
            <div>共有{{Sbean.length}}个粉丝
                <el-icon>
                    <QuestionFilled />
                </el-icon>
            </div>
        </div>
        <div class="con">
            <div class="bor" v-for="item in Sbean" :key="item.uid">
                <div class="fans">
                    <div class="avatar"><img src="{{item.avatar}}" alt=""></div>
                    <div class="name">{{item.username}}</div>
                    <div class="btn" @click="btnContentFn">
                        <el-button :plain="true" @click="open" v-if="isShow1">已关注</el-button>
                        <el-button :plain="true" @click="openVn" v-else>关注</el-button>
                        <button class="but2 but"><span>私信</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { getbean } from '@/utils/api';
interface objectI {
    attention: string[];
    avatar: string[];
    fans: string[];
    username: string[];
    uid: string[];
    introduce: string[]
}
interface objtype {
    attention: string,
    avatar: string,
    fans: string,
    username: string,
    uid: string,
    introduce: string,
}
export default defineComponent({
    data() {
        return {
            isShow1: true,
            Sbean: [
                {
                    attention: '',
                    avatar: '',
                    fans: '',
                    username: '',
                    uid: '',
                    introduce: '',
                }
            ],
            obj: [],

        }
    },
    methods: {
        // 发起请求，把所有粉丝的头像、用户名、渲染到页面上
        genBean() {
            getbean()
                .then((res) => {
                    this.Sbean = res.data.attention
                    console.log(77, res.data.attention)
                    res.data.attention.forEach((item: objectI) => {
                        (this.obj as unknown as Array<objtype>).push({
                            attention: item.attention as unknown as string,
                            avatar: item.avatar as unknown as string,
                            fans: item.fans as unknown as string,
                            username: item.username as unknown as string,
                            uid: item.uid as unknown as string,
                            introduce: item.introduce as unknown as string
                        })
                    })
                    this.Sbean = this.obj
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // 点击关注与取消关注
        btnContentFn(event: Event) {
            console.log((event.target as HTMLElement).dataset.bit);
            if ((event.target as HTMLElement).dataset.bit == '1') {
                console.log('点的是关注');

            } else if ((event.target as HTMLElement).dataset.bit == '2') {
                console.log('点的是取消关注');

            } else if ((event.target as HTMLElement).dataset.bit == '3') {
                console.log('点的是私信');
            }
        },
        open() {
            ElMessage('取消关注');
            this.isShow1 = false
        },
        openVn() {
            ElMessage({
                message: h('p', null, [
                    h('span', null, '关注成功'),
                ]),
            })
            this.isShow1 = true
        }
    },
    mounted() {
        this.genBean()
    },
})
</script>

<style lang="scss" scoped>
.nav {
    display: flex;

    >div {
        margin: 20px 0;
    }
}

.con {
    display: flex;
    flex-wrap: wrap;
}

.bor {
    padding: 0 12px;
    border: 1px solid rgb(144, 141, 141);
    border-radius: 4px;
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 25px;


    &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }


    .fans {
        width: 100%;
        text-align: center;

        .avatar {
            img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }

        }

        .name {
            color: #505050;
            font-size: 16px;
            margin: 16px 0;
        }

        .btn {
            .but {
                height: 30px;
                padding: 0 16px;
                background-color: #fff;
                border-radius: 4px;
                cursor: pointer;
            }

            .but1 {
                margin-right: 25px;
                border: 1px solid #aeaaaa;


            }

            .but2 {
                border: 1px solid #f04142;
                color: #f04142;
                margin-left: 15px;
            }
        }
    }
}
</style>