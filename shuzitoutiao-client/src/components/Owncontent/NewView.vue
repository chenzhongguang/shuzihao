<!-- 微消息 -->
<template>
    <div class="Option2">
        <el-empty description="暂无微消息" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
        }
    }
})
</script>

<style lang="scss" scoped>
.Option2 {
    width: 100%;
    height: 100%;
}
.el-empty{
        height: 540px;
    }
</style>