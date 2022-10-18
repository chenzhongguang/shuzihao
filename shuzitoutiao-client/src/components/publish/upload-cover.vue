<template>
  <el-upload
    class="avatar-uploader"
    action="/api/upload"
    :show-file-list="false"
    :on-success="handleUpImage"
    :before-upload="beforeAvatarUpload"
    accept="image/jpg,image/jpeg,image/png"
  >
    <img v-if="imageUrl" :src="imageUrl ? imageUrl : picUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  components: {
    Plus,
  },
  props: ["picUrl"],
  data() {
    return {
      imageUrl: "",
    };
  },

  methods: {
    // 上传成功，获取返回的图片地址
    handleUpImage(response: any, uploadFile: any) {
      console.log(response);
      let file: string = response.data.url;
      this.imageUrl = file;
      this.$emit("getImgUrl", this.imageUrl);
    },

    beforeAvatarUpload(file: { size: number }) {
      // 大小限制
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
  mounted() {
    console.log(this.picUrl);
  },
});
</script>

<style lang="scss" scoped>
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
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
<style>
.el-upload-dragger {
  padding: 0 !important;
  width: 100px;
  height: 100px;
}
</style>
