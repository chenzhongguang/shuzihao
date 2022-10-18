<template>
  <div class="box">
    <div class="box-nav">
      <div class="box-logo"><LeftView></LeftView></div>
      <div class="box-center"></div>
      <div class="box-rigth">
        <RigthView></RigthView>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeftView from "./nav/LeftView.vue";
import RigthView from "./nav/RigthView.vue";

export default defineComponent({
  data() {
    return {
      
    };
  },
  components:{
    LeftView,
    RigthView
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box {
  z-index: 10000;
  position: fixed;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  > .box-nav {
    margin: auto;
    width: 1411px;
    height: 100%;
    min-width: 1141px;
    display: flex;
    // justify-content: space-between;
    // background-color: yellow;
    > .box-logo {
      width: 79px;
      height: 100%;
      // background-color: pink;
    }
    .box-center{
      flex: 1;
    //   background-color: blueviolet;
    }
    > .box-rigth {
      width: 325px;
      height: 64px;
      // background-color: pink;
    }
  }
}
</style>
