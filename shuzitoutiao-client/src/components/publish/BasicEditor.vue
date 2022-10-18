<template>
  <div class="editor">
    <div style="margin: 65px auto 0px">
      <!-- 编辑区 -->
      <Toolbar
        style="
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        "
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <!-- 文章标题 -->
      <div class="article-title">
        <div class="">
          <input
            class="input-title"
            ref="inputVal"
            type="text"
            v-model="article.title"
            placeholder="请输入文章标题(输入2-30个字)"
          />
        </div>
      </div>
      <!-- 内容区 -->
      <Editor
        style="
          min-height: 200px;
          width: 816px;
          padding: 0 64px;
          margin: auto;
          background-color: #fff;
        "
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
      <div class="form-container">
        <span id="heng"></span>
        <el-form :model="article" label-width="50px">
          <el-form-item label="封面">
            <el-radio-group
              v-model="article.mainpic.type"
              style="dispaly: block"
            >
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="pic">
            <!-- 主图 -->
            <template v-if="article.mainpic.type > 0">
              <uploadCover
                :key="mainpic"
                v-for="(mainpic, index) in article.mainpic.type"
                v-model="article.mainpic.images[index]"
                @getImgUrl="getImgUrl"
                :setPicUrl="picUrl"
              />
            </template>
          </div>
          <el-form-item label="类别" prop="category_id">
            <el-select v-model="article.categorys" placeholder="请选择类别">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="!Editdata.aid" @click="onPublish(false)">发表</el-button>
            <el-button
              type="primary"
              v-if="Editdata.aid"
              @click="onEditor(false)"
              >发表</el-button
            >
            <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { defineComponent, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import Partial, { IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import uploadCover from "./upload-cover.vue";
import { publish, draftarticle, editArticle } from "@/utils/api";

export default defineComponent({
  name: "BasicEditor",
  components: {
    Editor,
    Toolbar,
    uploadCover,
  },

  data() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    const toolbarConfig: Partial<IToolbarConfig> = {};

    // 初始化 MENU_CONF 属性
    const editorConfig: Partial<IEditorConfig> = {
      placeholder: "请输入正文",
      MENU_CONF: {},
    };

    // 修改 uploadImage 菜单配置
    if (editorConfig.MENU_CONF) {
      editorConfig.MENU_CONF["uploadImage"] = {
        server: "/api/upload",
        fieldName: "uofiles",
        maxFileSize: 10 * 1024 * 1024,
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ["image/*"],

        withCredentials: true,
        // 单个文件上传失败
        onFailed(file: File, res: any) {
          // TS 语法

          console.log(`${file.name} 上传失败`, res);
        },
      };
      editorConfig.MENU_CONF["fontSize"] = {
        fontSizeList: ["12px", "16px", { name: "24px", value: "24px" }, "40px"],
      };
    }
    return {
      editorRef,
      toolbarConfig,
      editorConfig,
      mode: "default",
      valueHtml: "",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      Editdata: {
        aid: 0,
        categorys: "",
        title: "",
        content: "",
        mainpic: {
          type: 1, 
          images: [], 
        },
        status: 0,
      },
      picUrl:"",
      article: {
        categorys: "", // 文章类别
        title: "", // 文章标题
        content: "", // 文章内容
        mainpic: {
          // 文章封面
          type: 1, // 封面类型 0-无图，1-1张，3-3张
          images: [], // 封面图片的地址
        },
        status: 0,
      },
      options: [
        {
          value: "数码",
          label: "数码",
        },
        {
          value: "手机",
          label: "手机",
        },
        {
          value: "平板",
          label: "平板",
        },
        {
          value: "周边",
          label: "周边",
        },
        {
          value: "摄影",
          label: "摄影",
        },
        {
          value: "视频",
          label: "视频",
        },
        {
          value: "汽车",
          label: "汽车",
        },
        {
          value: "插画",
          label: "插画",
        },
      ],
    };
  },
  watch:{
    'article.title'(){
        console.log(this.article.title);
    }
  },
  methods: {
    handleCreated(editor: typeof Editor) {
      this.editorRef = editor; // 记录 editor 实例，重要！
      //   console.log(editor.getAllMenuKeys());
    },
    getImgUrl(value: any) {
      this.article.mainpic.images = value;
      this.Editdata.mainpic.images= value;
    },
    onPublish(value: boolean) {
      this.article.content = this.valueHtml;
      if (value == false) {
        this.article.status = 1;
      } else {
        this.article.status = 0;
      }
      // 发布文章请求
      publish(this.article)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            this.$router.push({ path: "/sample/artcle" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取草稿
    getArticle() {
      let aid: number = this.$route.query.aid as unknown as number;
      this.Editdata.aid = aid;
      if (!aid) return;
      draftarticle(aid)
        .then((res) => {
          console.log(res,"获取草稿");
          let alInfo = res.data[0];
          this.editorRef.setHtml(alInfo.content);
          this.article.title = alInfo.title;
          this.article.categorys = alInfo.categorys;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改文章
    onEditor(value: boolean) {
      let aid: number = this.$route.query.aid as unknown as number;
      if (value == false) {
        this.Editdata.status = 1;
        this.Editdata.aid = aid;
        this.Editdata.title = this.article.title;
        this.Editdata.content = this.valueHtml;
        this.Editdata.categorys = this.article.categorys;
        // 修改文章请求
        editArticle(this.Editdata)
          .then((res) => {
            console.log(res);
            if (res.data.code === 1) {
              this.$router.push({ path: "/sample/artcle" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  // 模拟 ajax 异步获取内容
  mounted() {
    this.getArticle();
  },
  // 组件销毁时，也及时销毁编辑器
  beforeUnmount() {
    const editor = this.editorRef;
    if (editor == null) return;
    editor.destroy();
  },
});
</script>

<style>
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>

<style lang="scss" scoped>
.el-form-item {
  margin: 20px 0px;
}
.editor {
  display: flex;
  flex-wrap: wrap;

  .article-title {
    margin: 20px auto 0;
    width: 816px;
    background-color: #fff;
    padding: 5px;

    > div {
      border-bottom: 1px solid #ccc;
      height: 60px;
      width: 688px;
      margin: auto;
      input.input-title {
        height: 60px;
        width: 100%;
        line-height: 60px;
        font-size: 20px;
        font-weight: 700;
        border: 0px;
        border-bottom: 1px solid #ccc;
      }

      input:focus {
        outline: none;
      }
    }
  }

  #heng {
    display: inline-block;
    height: 1px;
    box-sizing: border-box;
    width: 688px;
    margin: 20px auto;
    background-color: #ccc;
  }
}

.form-container {
  width: 816px;
  margin: auto;
  padding: 48px 64px 12px;
  background-color: #fff;
}

.pic {
  display: flex;
  margin-left: 38px;

  > div {
    margin: 10px;
  }
}
</style>
