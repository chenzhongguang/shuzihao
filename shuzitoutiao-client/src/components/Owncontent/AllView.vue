<!-- 管理全部  -->
<template>
  <div class="Option2">
    <!-- 文章列表 -->
    <el-table :data="alArr" style="width: 100%" stripe>
      <el-table-column label="封面" width="60">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-popover placement="top-start" height="150" trigger="hover">
              <img
                slot="reference"
                :src="scope.row.mainpic"
                min-width="125"
                height="125"
              />
              <template #reference>
                <img :src="scope.row.mainpic" min-width="30" height="30" />
              </template>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="250px"
        header-align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="username"
        label="用户"
        width="100px"
        align="center"
      />
      <el-table-column
        prop="categorys"
        label="分类"
        width="90px"
        align="center"
      />
      <el-table-column
        prop="collects"
        label="收藏量"
        width="90px"
        align="center"
      />
      <el-table-column
        prop="impress"
        label="展现量"
        width="90px"
        align="center"
      />
      <el-table-column
        prop="reading"
        label="阅读量"
        width="90px"
        align="center"
      />
      <el-table-column
        prop="addtime"
        label="上传时间"
        width="200px"
        align="center"
      />
      <el-table-column align="right">
        <!-- 搜索 -->
        <template #header>
          <el-input v-model="search" size="default" placeholder="输入类别" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleDetail(scope.row)">
            详情
          </el-button>
          <el-button size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tabpage"
        :page-size="10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { articleList, delArticle } from "@/utils/api";
import getYMDHMS from "@/utils/filter";
import { ElMessage, ElMessageBox } from "element-plus";
interface IactionType {
  aid: number;
  title: string;
  username: string;
  mainpic: string;
  categorys: string;
  collects: number;
  impress: number;
  reading: number;
  addtime: string;
}
interface IdataType {
  tableData: Array<IactionType>;
  alArr: Array<IactionType>;
  current: number;
  tabpage: number;
  search: string;
}
export default defineComponent({
  data(): IdataType {
    return {
      current: 1,
      tabpage: 0,
      tableData: [],
      alArr: [],
      search: "",
    };
  },
  methods: {
    // 详情
    handleDetail(row: IactionType) {
      console.log(row);
      this.$router.push({ path: "/articledetail", query: { aid: row.aid } });
    },
    // 编辑
    handleEdit(row: IactionType) {
      console.log(row);
      this.$router.push({ path: "/publish", query: { aid: row.aid } });
    },
    // 删除
    async handleDelete(row: IactionType) {
      //   console.log(row);
      // 获取删除文章的ID
      let aid: number = row.aid;
      ElMessageBox.confirm("你确定要删除本文章吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: false,
      })
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          //  判断是否删除
          if (res === "confirm") {
            console.log(11);
            // 发起删除请求
            delArticle(aid)
              .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                  this.getArticle();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页设置1
    handleSizeChange(val: number) {
      this.current = val;
    },
    // 分页设置2
    handleCurrentChange(val: number) {
      this.current = val;
    },
    // 获取文章信息
    getArticle() {
      let uid: number = Number(window.localStorage.getItem("uid"));
      articleList(uid)
        .then((res) => {
          console.log(res);
          let articleArr = res.data.articleList;
          articleArr.forEach((item: any) => {
            item.addtime = getYMDHMS(item.addtime);
            // if (item.status === 1) {
            //     this.tableData.push(item);
            // }
            this.tableData = articleArr;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 搜索
    tables(search: string) {
      //当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
      if (search == "") {
        this.search = "";
        this.current = 1;
        return this.alArr;
      }
      if (search) {
        this.alArr = [];
        this.tableData.forEach((item) => {
          if (!item.categorys.indexOf(search)) {
            this.alArr.push(item);
          }
        });
      }
      return this.alArr;
    },
  },
  watch: {
    // 搜索
    search() {
      if (!this.search) {
        this.alArr = this.tableData;
      } else {
        this.tables(this.search);
      }
    },
    // 分页
    current() {
      this.alArr = this.tableData.slice(
        (this.current - 1) * 10,
        this.current * 10
      );
      this.tabpage = this.tableData.length;
    },
    // 默认分页
    tableData() {
      this.alArr = this.tableData.slice(0, 10);
      this.tabpage = this.tableData.length;
    },
  },
  mounted() {
    this.getArticle();
  },
});
</script>

<style lang="scss" scoped>
.Option2 {
  width: 100%;
  height: 100%;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
</style>
