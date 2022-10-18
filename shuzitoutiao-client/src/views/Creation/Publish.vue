<!-- 文章 -->
<template>
  <div class="Option2">
    <MyNav></MyNav>
    <BasicEditor></BasicEditor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyNav from "@/components/MyNav.vue";
import BasicEditor from "@/components/publish/BasicEditor.vue";

export default defineComponent({
  name: "Publish",
  components: {
    MyNav,
    BasicEditor,
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}
</style>
