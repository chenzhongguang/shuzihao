<!-- 图片素材 -->
<template>
    <div class="Option2">
        <div v-for="item in content" :key="item.pid" ref="hhh">
            <!-- <template #default="scope"> -->
            <el-button text @click="delete" class="picture">
                <div>
                    <img @click="handleRemove" :src="item.content" alt="" :data-pid="item.pid" />
                </div>
            </el-button>
        </div>

        <el-upload action="/api/uploads" list-type="picture-card" :on-success="handleAvatarSuccess">
            <el-icon>
                <Plus />
            </el-icon>
            <template>
                <div>
                    <img class="el-upload-list__item-thumbnail" src="" alt="" />
                </div>
            </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>

</template>
    
<script lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent } from "vue"
import { deletePic, pictureSets } from '@/utils/api';
let dialogImageUrl = ref('');
let dialogVisible = ref(false);
const disabled = ref(false)

export default defineComponent({
    data() {
        return {
            disabled,
            dialogVisible,
            dialogImageUrl,
            content: [] as Array<{ content: string, pid: number }>,
            fileUrl: '',
            file: [] as any,
            data: [],

        }
    },

    methods: {
        //上传成功
        handleAvatarSuccess(
            response: any,
        ) {
            console.log(2222222, response)
            const data = response.data.url
            this.fileUrl = data;
        },
        //删除图片
        handleRemove(event: MouseEvent) {
            const target = event.target as HTMLElement;
            console.dir(target.dataset.pid);
            const pid = target.dataset.pid as unknown as number;
            ElMessageBox.confirm(
                '是否删除',
                '警告',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    deletePic({ pid }).then((res) => {
                        if(res.data.r.code === 1){
                            // console.log(pid);
                            // let arr = [];
                            // arr = this.content;
                            // console.log(arr);
                            this.content.forEach((item,ind,arr) => {     
                                if(item.pid === pid/1){
                                    arr.splice(ind,1);
                                    // console.log('删除成功');
                                }
                            })
                        }
                        
                        

                    }).catch((error) => {
                        console.log(error);
                    });
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消删除',
                    })
                })

        },

    },
    mounted() {
        // console.log(555, this.$refs.hhh)
        const _this = this;
        // console.log(_this);
        pictureSets({}).then((res) => {
            // console.log(1111, res)
            _this.content = res.data
            // console.log(1, _this.content)
            _this.content.forEach(item => {
                // console.log(item.content)
            })
        }).catch((error) => {
            console.log(error);
        });

    },
})
</script>
    
<style lang="scss" scoped>
.Option2 {
    min-height: 550px;
    display: flex;
    flex-wrap: wrap;

    .picture {
        position: relative;
        height: 180px;

        img {
            width: 148px;
            height: 148px;
            margin-left: 20px;
        }

        .icon {
            width: 148px;
            height: 148px;
            position: absolute;
            bottom: 32px;
            left: 20px;
            background-color: #ccc;
            line-height: 148px;
            text-align: center;
            opacity: 0.6;
            display: none;
            font-size: 20px;
            color: black;
        }

        &:hover .icon {
            display: block;
        }
    }
}
</style>
    
    