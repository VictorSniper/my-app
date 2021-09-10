<template>
  <div class="page-pro-form">
    <page-pro-form
      :formData="formData"
      :formConfig="formConfig"
      labelPosition="top"
      apiUrl="getCityCategory"
      submitText="保存"
    ></page-pro-form>
    <page-select-dialog
      :params="searchFormData"
      :multipleSelection="multipleSelection"
      :config="config"
      apiUrl="getRedBlackList"
      @handleCancel="handleSelectDialogCancel"
      @handleSave="handleSelectDialogSave"
    ></page-select-dialog>
  </div>
</template>
<script>
import PageProForm from "@/components/PageProForm";
import PageSelectDialog from "@/components/PageSelectDialog";
import { defineComponent, reactive, toRefs, ref, provide, toRaw } from "vue";
export default defineComponent({
  components: {
    PageProForm,
    PageSelectDialog,
  },
  setup() {
    const dialogFormVisible = ref(false);
    const state = reactive({
      formData: {
        createUserId: "",
        classTime: "",
        className: "",
        classPrice: "",
      },
      formConfig: [
        {
          name: "className",
          fieldType: "text-input",
          width: "220px",
          attrs: {
            type: "text",
            label: "课程名称",
            labelWidth: "80px",
            placeholder: "请填写",
            rules: [
              { required: true, message: "课程名称不能为空", trigger: "blur" },
            ],
            onInputEvent: (val) => {
              state.formData.className = val;
            },
          },
        },
        {
          name: "createUserId",
          fieldType: "text-input-select",
          width: "auto",
          attrs: {
            type: "text",
            label: "人员选择",
            readonly: true,
            labelWidth: "80px",
            placeholder: "请选择",
            rules: [
              { required: true, message: "人员不能为空", trigger: "change" },
            ],
            onInputEvent: (val) => {
              state.formData.createUserId = val;
            },
            openDialog: () => {
              dialogFormVisible.value = true;
              console.log("打开弹窗");
            },
          },
        },
        {
          name: "classTime",
          fieldType: "text-date-picker",
          width: "auto",
          attrs: {
            type: "text",
            label: "课程时间",
            labelWidth: "80px",
            placeholder: "请填写",
            rules: [
              {
                required: true,
                message: "课程时间不能为空",
                trigger: "change",
              },
            ],
            dateChange: (val) => {
              state.formData.classTime = val;
            },
          },
        },
        {
          name: "classPrice",
          fieldType: "text-input",
          width: "220px",
          attrs: {
            type: "number",
            label: "课程金额",
            labelWidth: "80px",
            placeholder: "请填写",
            rules: [
              { required: true, message: "课程金额不能为空", trigger: "blur" },
            ],
            onInputEvent: (val) => {
              state.formData.classPrice = val;
            },
          },
        },
      ],
      searchFormData: {
        currentPage: 1,
        pageSize: 15,
        createUserId: "",
        classTime: "",
        classPrice: "",
      },
      config: {
        size: "mini",
        headerRowClassName: "header-row-class-name",
        dialog: {
          width: "50%",
          appendToBody: true,
          customClass: "table-select-dialog",
        },
        customDialog: {
          title: "人员选择",
          btnCancelText: "取消",
          btnEnterText: "确认",
        },
        searchConfig: [
          {
            name: "createUserId",
            fieldType: "text-input",
            width: "auto",
            attrs: {
              type: "text",
              label: "姓名",
              labelWidth: "40px",
              placeholder: "请填写",
              onInputEvent: (val) => {
                state.searchFormData.createUserId = val;
              },
            },
          },
          {
            name: "classTime",
            fieldType: "text-date-picker",
            width: "auto",
            attrs: {
              type: "text",
              label: "课程时间",
              labelWidth: "86px",
              placeholder: "请填写",
              dateChange: (val) => {
                state.searchFormData.classTime = val;
              },
            },
          },
        ],
        //表格列表配置
        tableDataColumn: [
          { type: "selection" },
          {
            type: "index",
            props: "index",
            align: "center",
            width: "55",
            label: "序号",
          },
          {
            props: "createUser",
            label: "姓名",
            custom: "createUser",
            align: "left",
          },
          {
            props: "createTime",
            label: "课程时间",
            custom: "createTime",
            align: "left",
          },
          {
            props: "createUserId",
            label: "金额",
            custom: "createUserId",
            align: "right",
            formatter: (row) => {
              return `¥${row["createUserId"]}`;
            },
          },
        ],
      },
      tableData: [],
      multipleSelection: [],
    });
    const handleSelectDialogCancel = (val) => {
      dialogFormVisible.value = val;
    };
    const handleSelectDialogSave = (val) => {
      let allId = toRaw(val).map((item) => {
        return item.auditPerson;
      });
      state.multipleSelection = val;
      state.formData.createUserId = allId.toString();
      dialogFormVisible.value = false;
    };
    provide("dialogFormVisible", dialogFormVisible);
    return {
      ...toRefs(state),
      handleSelectDialogCancel,
      handleSelectDialogSave,
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
