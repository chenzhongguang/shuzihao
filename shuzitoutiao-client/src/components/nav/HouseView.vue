<!-- 房子和头像 -->
<template>
  <div class="hose">
    <!-- 房子 -->
    <div class="info-house">
      <el-icon><HomeFilled /></el-icon>
    </div>
    <!-- 头像 -->
    <div class="house-rigth" v-for="item in user" :key="item.uid">
      <!-- 头像 -->
      <div class="left"></div>
      <!-- 名称 -->
      <div class="rigth">
        <div class="imge">
          <img :src="item.avatar" alt="" />
        </div>
        <div class="name">
          <span> {{ item.username }} </span>
        </div>
      </div>
      <!-- 划出框 -->
      <div class="hua">
        <div class="hua-content">
          <div class="shang">{{ item.username }}</div>
          <div class="xia">
            <div class="name">
              <router-link to="/equity" class="router-b"
                ><el-icon><Edit /></el-icon>创作权益</router-link
              >
            </div>
            <div class="name">
              <router-link to="/sample/" class="router-b"
                ><el-icon><Promotion /></el-icon>管理</router-link
              >
            </div>
            <div class="name">
              <router-link to="/set" class="router-b"
                ><el-icon><Tools /></el-icon>设置</router-link
              >
            </div>
            <div style="cursor: pointer" @click="onLogout">
              <div class="lgout">
                <el-icon><Fold /></el-icon>退出登录
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { userInfo } from "@/utils/api";

interface userType {
  username: string;
  time: string;
  uid: number;
  avatar: string;
}
interface DataType {
  user: Array<userType>;
}
export default defineComponent({
  data(): DataType {
    return {
      user: [],
    };
  },
  methods: {
    userInfo() {
      let uid: number = Number(window.localStorage.getItem("uid"));
      userInfo(uid)
        .then((res) => {
          //   console.log(res);
          let uinfo = res.data;
          this.user = uinfo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onLogout() {
      this.$confirm("确认退出吗？", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 把用户的登录状态清除
          window.localStorage.removeItem("uid");
          // 跳转到登录页面
          this.$router.push("/reg");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
  mounted() {
    this.userInfo();
  },
});
</script>
<style lang="scss" scoped>
.hose {
  width: 100%;
  height: 64px;
  display: flex;
  .info-house {
    line-height: 64px;
    text-align: center;
    height: 100%;
    width: 64px;
  }
  .house-rigth {
    height: 100%;
    flex: 1;
    line-height: 64px;
    position: relative;
    cursor: pointer;
    .rigth {
      display: flex;
      .imge {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 64px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .name {
        padding-left: 10px;
        flex: 1;
      }
    }
    .hua {
      position: absolute;
      top: 64px;
      width: 200px;
      height: 0;
      transition: all 0.2s;
      padding: 7px;
      z-index: 10000;
      .hua-content {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        border-radius: 7px;
        .shang {
          padding-left: 20px;
          width: 100%;
          height: 60px;
          border-bottom: 2px solid rgb(221, 212, 212);
        }
        .xia {
          margin-top: 9px;
          width: 100%;
          height: 180px;
          .name {
            height: 45px;
            .router-b {
              height: 45px;
              padding-left: 20px;
              line-height: 45px;
              display: flex;
              align-items: center;
              width: 100%;
            }
            .router-b:hover {
              background-color: #f8f8f8;
            }
          }
        }
      }
    }
  }
  .lgout {
    font-size: 14px;
    color: #222;
    height: 45px;
    padding-left: 20px;
    line-height: 45px;
    display: flex;
    align-items: center;
    width: 100%;
    &:hover {
      background-color: #f8f8f8;
    }
  }
  .house-rigth:hover .hua {
    height: 270px;
  }
}
</style>
