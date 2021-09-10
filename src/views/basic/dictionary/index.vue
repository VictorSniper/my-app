<template>
  <div v-if="!isTrue">
    <!-- 搜索模块start -->
    <page-content-search
      :formData="currentApi"
      :formConfig="fieldsConfig"
      :inline="true"
      @on-search="onSearch"
      @on-reset="onReset"
    ></page-content-search>
    <!-- 搜索模块end -->
    <!-- 表格模块start -->
    <div class="page-content-table">
      <el-row :gutter="20">
        <el-col :span="18"
          ><div class="page-content-table-title">查询表格</div></el-col
        >
        <el-col :span="6"
          ><div class="page-content-table-handle">
            <el-button
              type="primary"
              @click="openDialogVisible"
              icon="el-icon-plus"
              >新建</el-button
            >
            <el-dropdown trigger="click" :hide-on-click="false">
              <el-tooltip content="列设置" placement="top">
                <el-button
                  icon="el-icon-s-tools"
                  style="color:#777"
                ></el-button>
              </el-tooltip>
              <template #dropdown>
                <el-dropdown-menu class="dropdown-padding">
                  <el-dropdown-item>自定义字段</el-dropdown-item>
                  <el-divider class="el-divider-margin"></el-divider>
                  <el-dropdown-item
                    v-for="(item, index) in allTableDataColumn"
                    :key="index"
                  >
                    <el-checkbox-group
                      v-model="checkeds"
                      @change="handleCheckChange"
                    >
                      <el-checkbox
                        :label="item.label"
                        :key="index"
                        :disabled="index == allTableDataColumn.length - 1"
                        >{{ item.label }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-tooltip content="导出" placement="top">
              <el-button
                ><svg-icon name="export" :size="10" color="#777"
              /></el-button>
            </el-tooltip></div
        ></el-col>
      </el-row>
      <page-content-table
        :tableData="tableData"
        :tableDataColumn="tableDataColumn"
        :loading="loading"
      ></page-content-table>
      <el-pagination
        class="pagination-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[20, 40, 60, 80, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="20"
        :pager-count="11"
        :total="totalCount"
      >
      </el-pagination>
    </div>
    <!-- 表格模块end -->
  </div>
  <router-view></router-view>
</template>
<script>
let sum = (...a) => a.reduce((x, y) => x + y, 0);
console.log(sum(...[1000, 200, 300, 400]));
console.time();
("use strict");
import {
  reactive,
  defineComponent,
  toRefs,
  computed,
  getCurrentInstance,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import PageContentSearch from "@/components/PageContentSearch";
import PageContentTable from "@/components/PageContentTable";
export default defineComponent({
  components: {
    PageContentSearch,
    PageContentTable,
  },
  setup() {
    const store = useStore();
    const isTrue = computed(() => store.state.isTrue);
    const router = useRouter();
    const state = reactive({
      apiUrl: "getCityCategory",
      tableData: [],
      allTableDataColumn: [
        {
          props: "courseNname",
          label: "课程名称",
          custom: "href",
          align: "left",
        },
        {
          props: "store",
          label: "适用门店",
          custom: false,
          align: "left",
        },
        {
          props: "createUserId",
          label: "课程金额(¥)",
          custom: "createUserId",
          align: "right",
        },
        {
          props: "courseType",
          label: "课程类型",
          custom: false,
          align: "left",
        },
        {
          props: "status",
          label: "状态",
          custom: "status",
          align: "left",
          formatter: function(row) {
            return row["status"] == 1 ? "上线" : "下线";
          },
        },
        {
          props: "parentId",
          label: "GUID",
          custom: false,
          align: "left",
        },
        {
          props: "handle",
          label: "操作",
          align: "right",
          handleEvent: [
            {
              text: "查看",
              type: "text",
              event: (row) => {
                handleView(row);
              },
            },
            {
              text: "编辑",
              type: "text",
              event: (row) => {
                handleEdit(row);
              },
            },
            {
              text: "删除",
              type: "text",
              event: (row) => {
                //处理删除
                handleEdit(row.id);
              },
            },
          ],
        },
      ],
      tableDataColumn: [
        {
          props: "courseNname",
          label: "课程名称",
          custom: "href",
          align: "left",
          formatter: function(row) {
            return row["courseNname"];
          },
        },
        {
          props: "store",
          label: "适用门店",
          custom: false,
          align: "left",
        },
        {
          props: "createUserId",
          label: "课程金额(¥)",
          custom: "createUserId",
          align: "right",
        },
        {
          props: "handle",
          label: "操作",
          align: "right",
          handleEvent: [
            {
              text: "查看",
              type: "text",
              event: (row) => {
                handleView(row);
              },
            },
            {
              text: "编辑",
              type: "text",
              event: (row) => {
                handleEdit(row);
              },
            },
            {
              text: "删除",
              type: "text",
              event: (row) => {
                handleDel(row.id);
              },
            },
          ],
        },
      ],
      checkeds: ["课程名称", "适用门店", "课程金额(¥)", "操作"],
      checkAll: false,
      isIndeterminate: true,
      totalCount: 0,
      loading: true,
      currentApi: {
        currentPage: 1,
        pageSize: 10,
        courseNname: "",
        store: "",
        courseType: "",
        status: "",
      },
      //搜索表单配置
      fieldsConfig: [
        {
          name: "store", //字段名与保存currentApi的字段相对应
          fieldType: "text-input", //表单属性类型
          attrs: {
            label: "姓名",
            labelWidth: "45px",
            placeholder: "请填写",
            type: "text", //表单类型
            onInputEvent: (val) => {
              state.currentApi.store = val;
            },
          },
        },
        {
          name: "courseNname",
          fieldType: "text-select",
          attrs: {
            label: "时间",
            labelWidth: "45px",
            placeholder: "请填写",
            onSelectEvent: (val) => {
              state.currentApi.courseNname = val;
            },
          },
        },
      ],
    });
    const { proxy } = getCurrentInstance();
    //获取列表数据
    const getList = () => {
      state.loading = true;
      proxy.$api.CATEGORY(state.currentApi).then((res) => {
        if (res.code === "0") {
          state.totalCount = res.data.totalCount;
          state.tableData = res.data.list;
          state.loading = false;
        }
      });
    };
    //
    onMounted(() => {
      getList();
      getCityCategory();
    });
    //搜索
    const onSearch = () => {
      state.currentApi.currentPage = 1;
      getList();
    };
    //重置
    const onReset = () => {
      getList();
    };
    //改变每页显示多少条信息
    const handleSizeChange = (page) => {
      state.currentApi.currentPage = 1;
      state.currentApi.pageSize = page;
      getList();
    };
    //跳转到当前页
    const handleCurrentChange = (page) => {
      state.currentApi.currentPage = page;
      getList();
    };
    //打开添加弹出框
    const openDialogVisible = () => {
      router.push({
        path: `/basic/dictionary/edit`,
      });
    };
    //设置上线下线
    const handleSwitchStatus = (bool, row) => {
      console.log(row);
      //根据ID处理当前选择的数据进行上线/下线操作
      ElMessageBox.confirm(
        bool ? "该课程是否上线?" : "该课程是否下线?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          ElMessage.success({
            message: bool ? "上线成功" : "下线成功",
          });
        })
        .catch(() => {
          ElMessage.info({
            message: bool ? "已取消上线" : "已取消下线",
          });
        });
    };
    //全选列表显示项
    // const handleCheckAllChange = (val) => {
    //   state.tableDataColumn = val ? state.allTableDataColumn : [];
    //   if (val) {
    //     state.allTableDataColumn.map((item) => {
    //       state.checkeds.push(item.label);
    //     });
    //   } else {
    //     state.checkeds = [];
    //   }
    //   state.isIndeterminate = false;
    // };
    //点选单个
    const handleCheckChange = (val) => {
      const checkedCount = val.length;
      state.tableDataColumn = [];
      state.allTableDataColumn.map((item) => {
        val.map((label) => {
          if (item.label == label) {
            state.tableDataColumn.push(item);
          }
        });
      });
      state.checkAll = checkedCount === state.allTableDataColumn.length;
      state.isIndeterminate =
        checkedCount > 0 && checkedCount < state.allTableDataColumn.length;
    };
    //获取城市分类数据列表
    const getCityCategory = () => {
      proxy.$api.getCityCategory().then((res) => {
        if (res.code === "0") {
          state.fieldsConfig[1].options = res.data.list;
        }
      });
    };
    const handleEdit = (row) => {
      router.push({
        path: `/basic/dictionary/edit`,
        query: { id: row.id },
      });
    };
    const handleView = (row) => {
      router.push({
        path: `/basic/dictionary/details`,
        query: { id: row.id },
      });
    };
    //删除
    const handleDel = (id) => {
      ElMessageBox.confirm("该课程是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "删除中...";
            done();
            proxy.$api.districtDdelete({ id: id }).then((res) => {
              if (res.code === "0") {
                instance.confirmButtonLoading = false;
                getList();
              }
            });
          } else {
            done();
          }
        },
      }).then((action) => {
        console.log(action);
      });
    };
    const customHandle = (handleItem, row, bool) => {
      handleItem.event(row, bool);
    };

    return {
      ...toRefs(state),
      isTrue,
      openDialogVisible,
      getList,
      onSearch,
      onReset,
      handleSizeChange,
      handleCurrentChange,
      handleCheckChange,
      //  handleCheckAllChange,
      getCityCategory,
      handleSwitchStatus,
      customHandle,
      handleEdit,
      handleView,
      handleDel,
    };
  },
});
console.timeEnd();
</script>
<style lang="scss" scoped>
.page-content-table {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  .page-content-table-title {
    line-height: 32px;
  }
  .page-content-table-handle {
    text-align: right;
  }
  .page-content-table-handle button {
    margin-left: 10px;
    cursor: pointer;
  }
}
.el-divider-margin {
  margin: 0;
}
.dropdown-padding {
  padding: 0;
}
</style>
