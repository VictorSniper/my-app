<!--
 * @Author: chenxb
-->
<template>
  <div
    class="page-content-search"
    :class="{ 'page-content-search-isCollapse': isCollapse }"
  >
    <div class="page-content-search-row">
      <div class="search-left">
        <el-form
          :model="params"
          :hide-required-asterisk="true"
          inline="inline"
          ref="formRef"
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
      </div>
      <div class="search-right">
        <div class="search-handle">
          <el-button @click="handleReset" size="mini" icon="el-icon-refresh"
            >重置</el-button
          >
          <el-button
            @click="handleSearch"
            size="mini"
            icon="el-icon-search"
            type="primary"
            >查询</el-button
          >
          <el-button
            type="text"
            v-if="show"
            @click="toggle"
            :icon="!isCollapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            style="direction: rtl"
            >{{ !isCollapse ? "展开" : "收起" }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <div class="page-content-table">
    <el-alert
      v-if="indexs.length != 0"
      :title="`您已选择${indexs.length}项`"
      type="primary"
      close-text="取消选择"
      @close="handleSelectCancel"
    >
    </el-alert>
    <el-table
      :data="tableData"
      v-loading="loading"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
      v-bind="config.tableConfig"
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
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount"
  >
  </el-pagination>
  <div v-if="indexs.length != 0" class="page-table-footer-bar">
    <div class="footer-bar-left">footer-bar-left</div>
    <div>
      <el-button @click="getMultipleSelection(true)">批量删除</el-button>
      <el-button @click="getMultipleSelection(false)" type="primary">批量下载</el-button>
    </div>
  </div>
</template>
<script>
import TextInput from "@/components/BaseField/TextInput";
import TextSelect from "@/components/BaseField/TextSelect";
import TextDatePicker from "@/components/BaseField/TextDatePicker";
import TextDatePickerStartEnd from "@/components/BaseField/TextDatePickerStartEnd";
import {
  defineComponent,
  reactive,
  ref,
  unref,
  getCurrentInstance,
  toRefs,
  toRaw,
  onMounted,
} from "vue";
export default defineComponent({
  components: {
    TextInput,
    TextSelect,
    TextDatePicker,
    TextDatePickerStartEnd,
  },
  props: ["params", "apiUrl", "show", "config"],
  emits: ["batchDel","exports"],
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
    onMounted(() => {
      getList();
    });
    const formRef = ref(null);
    const isCollapse = ref(false);
    const { proxy } = getCurrentInstance();
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
    const customHandle = (currentHandle, row) => {
      currentHandle.event(row);
    };
    //表单重置清空
    const resetFields = () => {
      const form = unref(formRef);
      form.resetFields();
    };
    const handleSelectCancel = () => {
      const form = unref(multipleTable);
      form.clearSelection();
      state.indexs = state.multipleSelection = [];
    };
    const getMultipleSelection = (bool) => {
      bool?emit("batchDel", state.multipleSelection):emit ("exports",state.multipleSelection)
    };
    return {
      ...toRefs(state),
      isCollapse,
      multipleTable,
      formRef,
      tableRowClassName,
      toggle,
      handleSearch,
      handleReset,
      getList,
      getMultipleSelection,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      handleSelectCancel,
      customHandle,
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
  .search-handle {
    text-align: right;
  }
  .el-row {
    margin-bottom: 15px;
  }
  .page-content-search-row {
    box-sizing: border-box;
    margin-bottom: unset;
    display: flex;
    .search-left {
      flex-direction: row;

      flex-basis: auto;
      box-sizing: border-box;
      min-width: 0;
      flex-shrink: 1;
    }
    .search-right {
      overflow: hidden;
      flex: 0 0 210px;
    }
  }
}
.page-content-search-isCollapse {
  overflow: auto;
  height: auto;
}
.page-content-table {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  .el-alert {
    margin-bottom: 15px;
  }
  .el-alert.is-light .el-alert__closebtn {
    color: #1890ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    top: 16px;
  }
  .el-alert--primary {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    padding: 12px 24px;
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
.page-table-footer-bar {
  width: calc(100% - 208px);
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  line-height: 44px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -6px 16px -8px rgb(0 0 0 / 8%), 0 -9px 28px 0 rgb(0 0 0 / 5%),
    0 -12px 48px 16px rgb(0 0 0 / 3%);
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  .footer-bar-left {
    flex: 1 1;
  }
}
</style>
