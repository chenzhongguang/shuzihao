<template>
    <div class="myfooter">
        <div class="foot">
            <span index="1" class="sfoot">关于数字号</span>
            <span index="2" class="sfoot">用户协议</span>
            <span index="3" class="sfoot">隐私政策</span>
            <span index="4" class="sfoot">社区规范</span>
            <span index="5" class="sfoot">自律公约</span>
            <span index="6" class="sfoot">侵权投诉</span>
            <span index="7" class="sfoot">联系我们</span>
            <span index="8" class="sfoot">@2022 shuzitoutiao.com</span>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "MyFooter",
});
</script>

<style lang="scss" scoped>
.myfooter {
    height: 32px;
    width: 100%;
    margin-top: 100px;
    display: flex;
    background-color: #f8f8f8;

    .foot {
        margin: auto;
        text-align: center;
        color: #999;
        line-height: 32px;
        display: flex;
        justify-content: space-between;

        .sfoot {
            font-size: 12px;
            margin: 0 12px;
        }
    }
}
</style>
