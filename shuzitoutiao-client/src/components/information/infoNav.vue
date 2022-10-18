<!-- 消息内容导航组件 -->
<template>
    <div class="contentnav">
      <div class="first"></div>
      <div class="two">
        <slot></slot>
      </div> 
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
    .contentnav{
      width: 100%;
      position: fixed;
      height: 79px;
      background-color: aliceblue;
      .first{
        height: 24px;
        background-color: #F8F8F8;
      }
      .two{
        line-height: 55px;
        display: flex;
        padding-left: 50px;
        background-color: aquamarine;
        height: 55px;
      }
    }
  </style>
  