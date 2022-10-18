<template>
  <div class="acon">
    <div class="userinfo">
      <div class="accountinfo">账号信息</div>
      <div class="inforight">
        <div class="usersname accpublic">
          <div class="nickname infoleft">用户名</div>
          <div class="usersname-right inforig">
            <div class="usenick">{{ username }}</div>
            <div class="usersedit edit">
              <el-button text @click="open(0)">编辑</el-button>
            </div>
          </div>
        </div>
        <hr />
        <div class="brief-introduction accpublic">
          <div class="introduct-left infoleft">用户简介</div>
          <div class="introduct-right inforig">
            <div class="intd-prompt">{{ introduce }}</div>
            <div class="intd-edit edit">
              <el-button text @click="open(1)">编辑</el-button>
            </div>
          </div>
        </div>
        <hr />
        <div class="usersavat">
          <div class="avatar infoleft">用户头像</div>
          <div class="replaceavat">
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </div>
        </div>
        <hr />
        <div class="type accpublic">
          <div class="typeleft infoleft">性别</div>
          <div class="typeright inforig">
            <div class="typeself usenick">{{ value }}</div>
            <div class="replacetype edit">
              <el-select
                v-model="value"
                class="m-2"
                placeholder="更改性别"
                @change="change(1)"
              >
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <hr />
        <div class="type accpublic">
          <div class="typeleft infoleft">数字号类型</div>
          <div class="typeright inforig">
            <div class="typeself usenick">{{ values }}</div>
            <div class="replacetype edit">
              <el-select
                v-model="values"
                class="m-2"
                placeholder="更改类型"
                @change="change(2)"
              >
                <el-option
                  v-for="item in type"
                  :key="item.values"
                  :label="item.label"
                  :value="item.values"
                />
              </el-select>
            </div>
          </div>
        </div>
        <hr />
        <div class="accpublic">
          <div class="typeleft infoleft">数字号ID</div>
          <div class="typeright inforig">
            <div class="typeself usenick">17446566464515</div>
            <div class="copyid edit">复制ID</div>
          </div>
        </div>
        <hr />
      </div>
    </div>

    <div class="userinfo">
      <div class="accountinfo">运营人信息</div>
      <div class="inforight">
        <div class="usersname accpublic">
          <div class="nickname infoleft">运营人</div>
          <div class="usersname-right inforig">
            <div class="usenick">无</div>
          </div>
        </div>
        <hr />
        <div class="brief-introduction accpublic">
          <div class="introduct-left infoleft">联系邮箱</div>
          <div class="introduct-right inforig">
            <div class="usernick">{{ email }}</div>
            <div class="edit">
              <el-button text @click="open(2)">填写邮箱</el-button>
            </div>
          </div>
        </div>
        <hr />
        <div class="type accpublic">
          <div class="infoleft">所在地</div>
          <div class="inforig">
            <div class="usenick">
              <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { provinceAndCityDataPlus } from "element-china-area-data";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import { genderSet, updateSet, updateSets } from "../utils/api";
import item from "element-plus/es/components/space/src/item";
import { type } from "os";
export default defineComponent({
  data() {
    return {
      value: "",
      values: "",
      options: provinceAndCityDataPlus,
      selectedOptions: [],
      option: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      type: [
        {
          values: "个人",
          label: "个人",
        },
        {
          values: "企业",
          label: "企业",
        },
      ],
      avatar: "",
      editnum: 0,
      username: "",
      introduce: "填写简介更容易获得大家的关注哦",
      email: "无",
      edit: [
        {
          name: "请输入用户名",
          tip: "内容不能为空",
          msg: "你的用户名是",
        },
        {
          name: "请输入简介",
          tip: "内容不能为空",
          msg: "你的简介是",
        },
        {
          name: "请输入邮箱",
          ruler:
            /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          tip: "邮箱格式不正确",
          msg: "你的邮箱是",
        },
        {
          name: "",
          save: "",
          cancel: "",
          ruler: "",
          edi: [],
        },
      ],
      imageUrl: "",
      ArrowDown,
      Plus,
    };
  },

  methods: {
    //地址设置
    handleChange(val: any) {
      console.log(val);
    },
    //头像上传成功
    handleAvatarSuccess(response: any, uploadFile: any) {
      console.log(response);
      const data = response.data.url;
      this.imageUrl = data;
    },

    //头像上传之前格式判断
    beforeAvatarUpload(file: { type: string; size: number }) {
      //在头像上传之前需要做的判断，如判断文件格式
      if (file.type !== "image/jpeg") {
        ElMessage.error("头像图片必须是jpg格式!");
        return false;
      } else if (file.size / 1024 / 1024 > 2) {
        ElMessage.error("头像图片大小不能超过2M!");
        return false;
      }
      return true;
    },

    //修改性别,数字号类型
    change(pla: number) {
      console.log(2222, pla);
      console.log(3333, this.value);
      if (pla == 1) {
        genderSet({ value: this.value })
          .then((res) => {
            // console.log(res);
            const sss = res.data.value;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (pla == 2) {
        genderSet({ value: this.values })
          .then((res) => {
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    //编辑用户名，用户简介，用户邮箱
    open(edi: number) {
      const ruler = this.edit[edi].ruler as RegExp;
      const tip = this.edit[edi].tip;
      const name1 = this.edit[edi].name;
      const msg = this.edit[edi].msg;
      ElMessageBox.prompt(name1, {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
        inputPattern: ruler,
        inputErrorMessage: tip,
      })
        .then(({ value }) => {
          updateSet({
            edi,
            usersinfo: value,
          })
            .then((res) => {
              const data = res.data.usersinfo;
              const edi = res.data.edi;
              // console.log(data);
              if (edi == 0) {
                this.username = data;
              } else if (edi == 1) {
                this.introduce = data;
              } else if (edi == 2) {
                this.email = data;
              }
            })
            .catch((error) => {
              console.log(error);
            });

          ElMessage({
            type: "success",
            message: `${msg}:${value}`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  mounted() {
    const _this = this;
    console.log(_this);
    updateSets({})
      .then((res) => {
        console.log(res.data);
        _this.username = res.data[0].username;
        _this.introduce = res.data[0].introduce;
        _this.email = res.data[0].email;
        _this.imageUrl = res.data[0].avatar;
        if (res.data[0].gender == 1) {
          _this.value = "男";
        } else if (res.data[0].gender == 2) {
          _this.value = "女";
        }
        if (res.data[0].type == 1) {
          _this.values = "个人";
        } else if (res.data[0].type == 2) {
          _this.values = "企业";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/sass/set.scss";
</style>
<style>
.m-2 {
  width: 100px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
