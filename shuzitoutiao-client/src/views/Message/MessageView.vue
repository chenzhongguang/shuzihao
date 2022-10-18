<template>
  <div class="content">
    <div class="center">
      <div class="msg-center-header">
        <div>消息中心</div>
        <div>消息设置</div>
      </div>
      <div class="msg-center-md">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-change="handleClick"
        >
          <el-tab-pane label="系统通知" name="system">
            <div class="msgitem">
              <el-empty v-if="!showInfo" description="暂无通知" />
              <MsgInfo v-if="showInfo"></MsgInfo>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评论" name="comments">
            <div class="msgitem">
              <el-empty v-if="showInfo" description="暂无评论" />
              <MsgInfo v-if="!showInfo"></MsgInfo>
            </div>
          </el-tab-pane>
          <el-tab-pane label="粉丝" name="fans">
            <div class="msgitem">
              <el-empty v-if="showInfo" description="暂无粉丝" />
              <MsgInfo v-if="!showInfo"></MsgInfo>
            </div>
          </el-tab-pane>
          <el-tab-pane label="点赞" name="supports">
            <div class="msgitem">
              <el-empty v-if="showInfo" description="暂无点赞" />
              <MsgInfo v-if="!showInfo"></MsgInfo>

            </div>
          </el-tab-pane>
          <el-tab-pane label="@我" name="at_me">
            <div class="msgitem">
              <el-empty v-if="showInfo" description="暂无@我" />
              <MsgInfo v-if="!showInfo"></MsgInfo>

            </div>
          </el-tab-pane>
          <el-tab-pane label="私信" name="private_letter">
            <div class="msgitem">
              <el-empty v-if="showInfo" description="暂无私信" />
              <MsgInfo v-if="!showInfo"></MsgInfo>

            </div>
          </el-tab-pane>
          <el-tab-pane label="问答邀请" name="ask">
            <div class="msgitem">
              <el-empty v-if="showInfo" description="暂无邀请" />
              <MsgInfo v-if="!showInfo"></MsgInfo>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MsgInfo from "@/views/Message/MsgInfo.vue";
import { message } from "@/utils/api";

interface DataType {
  activeName: string;
  showInfo: boolean;
}

export default defineComponent({
  name: "MessAge",
  components: {
    MsgInfo,
  },
  data(): DataType {
    return {
      activeName: "",
      showInfo: true,
    };
  },
  methods: {
    handleClick(name: any) {
      console.log(name);
      // 带查询参数，传递过去的内容会自动拼接变成/message?keyword=name
      this.$router.push({ path: "/message", query: { keyword: name } });
      let uid:number = Number(localStorage.getItem("uid"));
      message(uid)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    let activeName: string = this.$route.query.keyword as unknown as string;
    this.activeName = activeName;
  },
});
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  height: 532px !important;
}

.el-tabs__item.is-active {
  color: #999;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.content {
  width: 1216px;
  height: 100%;
  padding-top: 24px;
  margin-left: 5px;

  .msg-center-header {
    width: 1216px;
    height: 48px;
    padding: 24px 48px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    > div {
      width: 64px;
      height: 17px;
      color: #222;
      font-size: 16px;
      line-height: 17px;
      text-align: center;
      cursor: pointer;

      &:hover {
        color: #999;
      }
    }
  }

  .msg-center-md {
    padding: 0px 48px 0;
    background-color: #fff;

    .el-empty {
      margin-top: 50px;
    }
  }
}

.msgitem {
  width: 100%;
  height: 500px;
  position: relative;
}
</style>
