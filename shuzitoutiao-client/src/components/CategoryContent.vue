<!-- 内容 -->
<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
  .content{
    min-width: 1000px;
    min-height: 600px;
    padding: 79px 48px 10px 50px;
    margin-bottom: 100px;
    background-color: #ffffff;
  }
</style>
