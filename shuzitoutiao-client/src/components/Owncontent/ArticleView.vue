<!-- 管理文章 -->
<template>
  <div class="Option2">
    <div class="box-article">
      <div class="box-a">
        <div class="left">
          <div>状态</div>
          <div>全部</div>
          <div>已发布</div>
          <div>审核中</div>
          <div>未通过</div>
          <div>仅我可见</div>
        </div>
        <div class="rigth">
          <div class="rigth-a"></div>
          <div class="rigth-b"></div>
        </div>
      </div>
      <ownarticleView></ownarticleView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ownarticleView from "@/components/Ownarticle/ownarticleView.vue";
export default defineComponent({
  name: "articleDetail",
  components: {
    ownarticleView,
  },
  data() {
    return {
      data: {
        article: [
          {
            title: "2222",
            time: "09.57 9.27",
          },
        ],
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  width: 100%;
  // height: 100%;
//   background-color: rgb(216, 216, 204);
  .box-article {
    margin-top: 32px;
    .box-a {
      height: 32px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .left {
        width: 385px;
        line-height: 32px;
        // background-color: pink;
        display: flex;
        div {
          padding: 0 9px;
        //   border: 1px solid black;
        }
      }
      .rigth {
        display: flex;
        .rigth-a {
          height: 32px;
          width: 238px;
          background-color: blueviolet;
        }
        .rigth-b {
          height: 32px;
          margin-left: 20px;
          width: 150px;
          background-color: blueviolet;
        }
      }
    }
    // .tiao {
    //   width: 100%;
    //   height: 20px;
    //   margin: 20px 0 8px 0;
    //   background-color: yellow;
    // }
    // .neirong {
    //   width: 100%;
    //   .box-content {
    //     height: 157px;
    //     background-color: pink;
    //     display: flex;
    //     align-items: center;
    //     .box-center {
    //       width: 100%;
    //       height: 106px;
    //       background-color: yellow;
    //       display: flex;
    //       .img {
    //         border-radius: 7px;
    //         overflow: hidden;
    //         width: 166px;
    //         height: 106px;
    //         img {
    //           width: 166px;
    //           height: 106px;
    //         }
    //       }
    //       .artcle-card {
    //         height: 106px;
    //         flex: 1;
    //         margin-left: 30px;
    //         // background-color: rgb(127, 171, 171);
    //         .title {
    //           color: #222222;
    //           height: 24px;
    //           background-color: blanchedalmond;
    //           display: flex;
    //           justify-content: space-between;
    //           align-items: flex-end;
    //           .box-title{
    //           font-weight: 600;
    //           }
    //           .box-tiem{
    //             color: #7f7575;
    //             font-size: 13px;
    //           }
    //         }
    //         .issue {
    //             color: #999999;
    //         line-height: 20px;
    //           height: 20px;
    //           margin-top: 12px;
    //         //   background-color: rgb(211, 72, 95);
    //           font-size: 12px;
    //           display: flex;
    //           div{
    //             padding: 0 3px;
    //             margin-right: 6px;
    //           }
    //           .first{
    //             background-color: #F4F4F4;
    //           }
    //           .two{
    //             color: #3D89FF;
    //             background-color: #E6F0FF;
    //           }
    //         }
    //         .show {
    //           margin-top: 30px;
    //           height: 20px;
    //           background-color: rgb(10, 232, 154);
    //           display: flex;
    //           justify-content: space-between;
    //           .top{
    //             display: flex;
    //             div{
    //                 color: #666666;
    //                 padding: 0 5px;
    //             }
    //           }
    //           .bottom{
    //             display: flex;
    //             div{
    //             padding: 0 5px;
    //             border: 1px solid black;
    //             margin-left: 5px;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
</style>
