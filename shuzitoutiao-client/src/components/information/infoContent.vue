<!-- 消息内容组件 -->
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
      padding-top: 79px;
      height: 700px;
      padding-left: 50px;
    }
  </style>
  