<!--
 * @Author: chenxb
  弹窗多选组件
      <page-select-dialog
      :params="searchFormData"//搜索参数
      :formConfig="searchConfig"//搜索表单配置
      :tableDataColumn="tableDataColumn"//表格配置
      :multipleSelection="multipleSelection"//已选中的数据
      apiUrl="getRedBlackList"//列表Api接口
      @handleCancel="handleSelectDialogCancel"//取消
      @handleSave="handleSelectDialogSave"//确认选择
    ></page-select-dialog>
-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    :before-close="handleCancel"
    v-model="dialogFormVisible"
    v-bind="config.dialog"
    @open="getList"
  >
    <template #title>
      <div class="dialog-title">
        {{ config.customDialog.title }}
      </div>
    </template>
    <div
      class="page-content-search"
      :class="{ 'page-content-search-isCollapse': isCollapse }"
    >
      <el-space alignment="stretch" direction="horizontal" wrap>
        <el-form
          :model="params"
          :hide-required-asterisk="true"
          ref="formRef"
          inline="inline"
        >
          <template v-for="field in config.searchConfig" :key="field.name">
            <component
              :is="field.fieldType"
              :width="field.width"
              :name="field.name"
              :options="field.options"
              :value="params[field.name]"
              v-bind="field.attrs"
              :ref="field.name"
            />
          </template>
        </el-form>
        <div class="search-handle">
          <el-button @click="handleReset" icon="el-icon-refresh"
            >重置</el-button
          >
          <el-button @click="handleSearch" icon="el-icon-search" type="primary"
            >查询</el-button
          >
          <el-button
            type="text"
            v-if="show"
            @click="toggle"
            :icon="!isCollapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            style="direction: rtl;"
            >{{ !isCollapse ? "展开" : "收起" }}</el-button
          >
        </div>
      </el-space>
    </div>
    <div class="page-content-table">
      <el-table
        :data="tableData"
        v-loading="loading"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
        v-bind="config"
      >
        <template v-for="(item, index) in config.tableDataColumn" :key="index">
          <el-table-column v-bind="item" :prop="item.props">
            <template v-if="item.props === 'handle'" #default="scope">
              <el-button
                v-for="(handleItem, ind) in item.handleEvent"
                :key="ind"
                @click="customHandle(handleItem, scope.row)"
                :type="handleItem.type"
                >{{ handleItem.text }}
              </el-button>
            </template>
            <template v-else-if="item.type === 'expand'" #default="scope">
              <slot :scop="scope"></slot>
            </template>
          </el-table-column>
        </template>
        <template #empty>
          <el-empty description="暂无数据"></el-empty>
        </template>
      </el-table>
    </div>
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
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel()">{{
          config.customDialog.btnCancelText
        }}</el-button>
        <el-button type="primary" @click="submitForm()">{{
          config.customDialog.btnEnterText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import TextInput from "@/components/BaseField/TextInput";
import TextSelect from "@/components/BaseField/TextSelect";
import TextDatePicker from "@/components/BaseField/TextDatePicker";
import TextDatePickerStartEnd from "@/components/BaseField/TextDatePickerStartEnd";
import {
  defineComponent,
  inject,
  reactive,
  ref,
  unref,
  getCurrentInstance,
  toRefs,
  toRaw,
} from "vue";
export default defineComponent({
  components: {
    TextInput,
    TextSelect,
    TextDatePicker,
    TextDatePickerStartEnd,
  },
  props: [
    "params",
    "multipleSelection",
    "apiUrl",
    "show",
    "config",
  ],
  emits: ["handleCancel", "handleSave"],
  setup(props, { emit }) {
    const multipleTable = ref(null);
    const state = reactive({
      tableData: [],
      multipleSelection: [],
      loading: false,
      totalCount: 0,
      getIndex: "",
      pageApi: {
        currentPage: 1,
        pageSize: 10,
      },
      indexs: [],
    });
    const formRef = ref(null);
    const isCollapse = ref(false);
    const { proxy } = getCurrentInstance();
    const dialogFormVisible = inject("dialogFormVisible");
    const toggle = () => {
      isCollapse.value = !isCollapse.value;
    };
    const handleSearch = () => {
      getList();
    };
    const handleReset = () => {
      resetFields();
      getList();
    };
    //改变每页显示多少条信息
    const handleSizeChange = (page) => {
      state.pageApi.currentPage = 1;
      state.pageApi.pageSize = page;
      getList();
    };
    //跳转到当前页
    const handleCurrentChange = (page) => {
      state.pageApi.currentPage = page;
      getList();
    };
    const getList = () => {
      let params = Object.assign(state.pageApi, toRaw(props.params));
      state.loading = true;
      proxy.$api[props.apiUrl](params).then((res) => {
        if (res.code === "0") {
          state.totalCount = res.data.totalCount;
          state.tableData = res.data.list;
          state.loading = false;
          const form = unref(multipleTable);
          state.tableData.forEach((item) => {
            props.multipleSelection.forEach((i) => {
              if (item.id == i.id) {
                form.toggleRowSelection(item, true);
              }
            });
          });
        }
      });
    };
    //给选中的行添加样式
    const tableRowClassName = ({ rowIndex }) => {
      let arr = state.indexs;
      for (let i = 0; i < arr.length; i++) {
        if (rowIndex === arr[i]) {
          return "select-row";
        }
      }
    };
    //获取所选数据的index和所选数据
    const handleSelectionChange = (val) => {
      var arr = [];
      val.forEach((val) => {
        state.tableData.forEach((v, i) => {
          if (val.id == v.id) {
            arr.push(i);
          }
        });
      });
      state.indexs = arr;
      state.multipleSelection = val;
    };
    const handleCancel = () => {
      state.multipleSelection = [];
      emit("handleCancel", false);
      resetFields();
    };
    const submitForm = () => {
      emit("handleSave", state.multipleSelection);
      resetFields();
    };
    //表单重置清空
    const resetFields = () => {
      const form = unref(formRef);
      form.resetFields();
    };
    return {
      ...toRefs(state),
      isCollapse,
      dialogFormVisible,
      multipleTable,
      formRef,
      tableRowClassName,
      toggle,
      handleSearch,
      handleReset,
      getList,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      handleCancel,
      submitForm,
      resetFields,
    };
  },
});
</script>
<style lang="scss">
.page-content-search {
  background-color: white;
  padding: 15px 15px 5px 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
  height: 40px;
  // .el-form-item {
  //   // margin-bottom: unset;
  // }
  // .el-form-item__content{
  //   width: 200px;
  // }
  .search-handle {
    text-align: right;
  }
  .el-row {
    margin-bottom: 15px;
  }
  .page-content-search-row {
    margin-bottom: unset;
  }
}
.page-content-search-isCollapse {
  overflow: auto;
  height: auto;
}
.table-select-dialog {
  //   background-color: #fafafa;
  .el-dialog__header {
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;
    color: rgba(0, 0, 0, 0.85);
    background: #fff;
  }
  .page-content-table {
    background-color: white;

    border-radius: 4px;
    .header-row-class-name th {
      background-color: #ebeef5;
    }
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
    .select-row {
      background-color: rgba(159, 217, 255, 0.2);
    }
  }
  .el-dialog__footer {
    padding: unset;
    .dialog-footer {
       border-top: 1px solid #f0f0f0;
      padding: 10px 16px;
      display: block;
    }
  }
}
</style>
