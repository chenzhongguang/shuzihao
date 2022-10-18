<!-- 导航左 -->
<template>
    <div class="logo">
    <router-link to="/first" class="logo">数字号</router-link>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        
    })
</script>
<style lang="scss" scoped>
    .logo {
      font-weight: 600;
      color: #ff373c;
      font-size: 25px;
      text-align: center;
      line-height: 64px;
      width: 79px;
      height: 64px;
    //   background-color: pink;
    }
</style>