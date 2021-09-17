<template>
  <div v-if="!isTrue">
    <page-table
      :params="searchFormData"
      :config="config"
      :show="true"
      apiUrl="todos"
      ref="tableRef"
      @add="add"
      @batchDel="del"
      @exports="exports"
    ></page-table>
    <page-form-dialog
      title="参数设置"
      :isEdit="true"
      :formData="formData"
      :formConfig="formDialogConfig"
      :apiUrl="apiUrl"
      dialogWidth="30%"
      @handleCancel="handleDialogCancel"
      @handleSave="handleDialogSave"
    ></page-form-dialog>
  </div>
  <router-view></router-view>
</template>
<script>
import PageFormDialog from "@/components/PageFormDialog";
import { ElMessageBox } from "element-plus";
import PageTable from "@/components/PageTable";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  unref,
  computed,
  provide,
} from "vue";
export default defineComponent({
  components: {
    PageTable,
    PageFormDialog,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const dialogFormVisible = ref(false);
    const isTrue = computed(() => store.state.isTrue);
    const { proxy } = getCurrentInstance();
    const tableRef = ref(null);
    const state = reactive({
      searchFormData: {
        currentPage: 1,
        pageSize: 15,
        createUserId: "",
        classTime: "",
        classPrice: "",
      },
      config: {
        tableConfig: {
          headerRowClassName: "header-row-class-name",
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
              labelWidth: "70px",
              placeholder: "请填写",
              dateChange: (val) => {
                state.searchFormData.classTime = val;
              },
            },
          },
          {
            name: "createUserId",
            fieldType: "text-input",
            width: "auto",
            attrs: {
              type: "text",
              label: "金额",
              labelWidth: "40px",
              placeholder: "请填写",
              onInputEvent: (val) => {
                state.searchFormData.createUserId = val;
              },
            },
          },
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
            props: "name",
            label: "标题",
            custom: "href",
            event: ({ id }) => {
              router.push({
                path: `/article/list/details`,
                query: { id: id },
              });
            },
            align: "left",
          },
          {
            props: "description",
            label: "姓名",
            align: "left",
          },
          {
            props: "reg_date",
            label: "注册时间",
            custom: "reg_date",
            align: "left",
          },
          {
            props: "isFinished",
            label: "金额",
            custom: "isFinished",
            align: "right",
            formatter: (row) => {
              return `¥${row["isFinished"]}`;
            },
          },
          {
            props: "handle",
            label: "操作",
            align: "right",
            handleEvent: [
              {
                text: "编辑",
                type: "text",
                event: ({ id }) => {
                  router.push({
                    path: `/article/list/edit`,
                    query: { id: id },
                  });
                },
              },
              {
                text: "设置",
                type: "text",
                event: (row) => {
                  //处理删除
                  settings(row);
                },
              },
              {
                text: "删除",
                type: "text",
                event: ({ id }) => {
                  //处理删除
                  del(id);
                },
              },
            ],
          },
        ],
      },
      tableData: [],
      formData: {},
      formDialogConfig: [
        {
          name: "createUser",
          fieldType: "text-input",
          attrs: {
            label: "姓名",
            labelWidth: "45px",
            placeholder: "请填写",
            type: "text", //表单类型
            rules: [
              { required: true, message: "请输入活动名称", trigger: "blur" },
            ],
            onInputEvent: (val) => {
              state.formData.createUser = val;
            },
          },
        },
        {
          name: "date",
          fieldType: "text-date-picker",
          attrs: {
            label: "时间",
            labelWidth: "45px",
            placeholder: "请时间",
            type: "date", //表单类型
            dateChange: (val) => {
              console.log(val);
              state.formData.date = val;
            },
          },
        },
        {
          name: "updateUserId",
          fieldType: "text-input",
          attrs: {
            label: "金额",
            labelWidth: "45px",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.formData.updateUserId = val;
            },
          },
        },
      ],
      apiUrl: "getCityCategory",
    });
    //导出
    const exports = () => {
      console.log("批量导出");
    };
    //添加
    const add = () => {
      router.push({
        path: `/article/list/edit`,
      });
    };
    //批量删除/单个删除
    const del = (id) => {
      let params = Array.isArray(id)
        ? id.map((item) => item.id).toString()
        : id;
      const table = unref(tableRef);
      ElMessageBox.confirm(
        Array.isArray(id) ? "您是否需要批量删除?" : "您是否需要删除?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "删除中...";
              done();
              proxy.$api.districtDdelete({ id: params }).then((res) => {
                if (res.code === "0") {
                  instance.confirmButtonLoading = false;
                  table.getList();
                  table.handleSelectCancel();
                }
              });
            } else {
              done();
            }
          },
        }
      )
        .then((action) => {
          console.log(action);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const settings = (row) => {
      dialogFormVisible.value = true;
      state.formData = row;
    };
    const handleDialogCancel = (val) => {
      dialogFormVisible.value = val;
    };
    const handleDialogSave = (val) => {
      dialogFormVisible.value = val;
      const table = unref(tableRef);
      table.getList();
    };
    provide("dialogFormVisible", dialogFormVisible);
    return {
      ...toRefs(state),
      isTrue,
      tableRef,
      dialogFormVisible,
      handleDialogCancel,
      handleDialogSave,
      settings,
      add,
      del,
      exports,
    };
  },
});
</script>
