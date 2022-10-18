<template>
    <div class="acon">
        <div class="choose">
        <!-- 整体的组件 -->
        <div>
        <router-link to="">全部</router-link>
        </div>
        <div>
        <router-link to="">文章</router-link>
        </div>
        <div>
        <router-link to="">视频</router-link>
        </div>
        <div>
        <router-link to="">微头条</router-link>
        </div>
        <div>
        <router-link to="">问答</router-link>
        </div>
        <div>
        <router-link to="">小视频</router-link>
        </div>

    </div>

    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        
    })
</script>

<style lang="scss" scoped>
    .acon {
        width: 1000px;
        height: 1000px;
        background-color: azure;
    }

</style>