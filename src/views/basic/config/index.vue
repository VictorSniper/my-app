<template>
  <div class="page-pro-form">
    <el-button type="primary" @click="settings">主要按钮</el-button>
  </div>
  {{ tableData }}
  <page-content-table
    :tableData="tableData"
    :tableDataColumn="tableDataColumn"
    :loading="loading"
  ></page-content-table>
  <page-form-dialog
    title="参数设置"
    :isEdit="true"
    :formData="formData"
    :formConfig="formConfig"
    apiUrl="getCityCategory"
    dialogWidth="30%"
    @handleCancel="handleDialogCancel"
    @handleSave="handleDialogSave"
  ></page-form-dialog>
</template>
<script>
import PageContentTable from "@/components/PageContentTable";
import PageFormDialog from "@/components/PageFormDialog";
import {
  defineComponent,
  nextTick,
  reactive,
  toRefs,
  provide,
  ref,
  onMounted,
  getCurrentInstance,
  toRaw,
} from "vue";
export default defineComponent({
  components: {
    PageFormDialog,
    PageContentTable,
  },
  setup() {
    const dialogFormVisible = ref(false);
    const { proxy } = getCurrentInstance();
    const state = reactive({
      formData: {
        props: "",
        label: "",
      },
      tableData: [],
      totalCount: 0,
      loading: true,
      tableDataColumn: [
        {
          props: "props",
          label: "字段名称",
          custom: "props",
          align: "left",
        },
        {
          props: "label",
          label: "备注",
          custom: "label",
          align: "left",
        },
      ],
      formConfig: [
        {
          name: "props",
          fieldType: "text-input",
          width: "220px",
          attrs: {
            type: "text",
            label: "字段名称",
            labelWidth: "80px",
            placeholder: "请填写",
            rules: [
              { required: true, message: "字段名称不能为空", trigger: "blur" },
            ],
            onInputEvent: (val) => {
              state.formData.props = val;
            },
          },
        },
        {
          name: "label",
          fieldType: "text-input",
          width: "220px",
          attrs: {
            type: "text",
            label: "备注",
            labelWidth: "80px",
            placeholder: "请填写",
            rules: [
              {
                required: true,
                message: "备注不能为空",
                trigger: "blur",
              },
            ],
            onInputEvent: (val) => {
              state.formData.label = val;
            },
          },
        },
      ],
    });
    //加载数据
    onMounted(() => {
      getList();
    });
    //获取列表数据
    const getList = () => {
      state.loading = true;
      proxy.$api.getRedBlackList(state.currentApi).then((res) => {
        if (res.code === 0) {
          //  state.totalCount = res.data.totalCount;
          //  state.tableData = state.tableDataColumn;
          console.log(toRaw(state.tableData));
          state.loading = false;
        }
      });
    };
    const handleDialogCancel = (val) => {
      dialogFormVisible.value = val;
    };
    const settings = () => {
      dialogFormVisible.value = true;
      //  state.formData = row;
    };
    const addField = () => {
      nextTick(() => {
        state.formConfig.push();
      });
    };
    const handleDialogSave = (val) => {
      dialogFormVisible.value = val;
      state.tableData.push(Object.assign({}, state.formData));
      getList();
    };
    provide("dialogFormVisible", dialogFormVisible);
    return {
      ...toRefs(state),
      dialogFormVisible,
      getList,
      handleDialogSave,
      handleDialogCancel,
      settings,
      addField,
    };
  },
});
</script>
<style lang="scss" scoped>
.page-pro-form {
  background-color: white;
  padding: 15px;
}
</style>
