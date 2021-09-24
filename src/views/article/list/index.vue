<template>
  <div v-if="!isTrue">
    <page-table
      :params="searchFormData"
      :config="config"
      :show="true"
      apiUrl="article"
      ref="tableRef"
      @add="openEditModal(false)"
      @batchDel="del"
      @exports="exports"
    ></page-table>
    <page-form-dialog
      :title="isEdit?'用户编辑':'用户新增'"
      :isEdit="isEdit"
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
import * as moment from "moment";
import PageFormDialog from "@/components/PageFormDialog";
import { ElMessageBox, ElMessage } from "element-plus";
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
        pageSize: 10,
        name: "",
        classTime: "",
        classPrice: "",
      },
      config: {
        tableConfig: {
          headerRowClassName: "header-row-class-name",
        },
        searchConfig: [
          {
            name: "name",
            fieldType: "text-input",
            width: "auto",
            attrs: {
              type: "text",
              label: "姓名",
              labelWidth: "40px",
              placeholder: "请填写",
              onInputEvent: (val) => {
                state.searchFormData.name = val;
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
            label: "姓名",
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
            props: "password",
            label: "密码",
            align: "left",
          },
          {
            props: "reg_date",
            label: "注册时间",
            custom: "reg_date",
            formatter: (row) => {
              return moment(row["reg_date"]).format("yyyy-MM-DD");
            },
            align: "left",
          },
          {
            props: "handle",
            label: "操作",
            align: "right",
            handleEvent: [
              // {
              //   text: "编辑",
              //   type: "text",
              //   event: ({ id }) => {
              //     router.push({
              //       path: `/article/list/edit`,
              //       query: { id: id },
              //     });
              //   },
              // },
              {
                text: "编辑",
                type: "text",
                event: (row) => {
                  //处理删除
                  openEditModal(true, row);
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
      isEdit: true,
      tableData: [],
      formData: {},
      formDialogConfig: [
        {
          name: "name",
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
              state.formData.name = val;
            },
          },
        },
        {
          name: "password",
          fieldType: "text-input",
          attrs: {
            label: "密码",
            labelWidth: "45px",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.formData.password = val;
            },
          },
        },
        {
          name: "reg_date",
          fieldType: "text-date-picker",
          attrs: {
            label: "时间",
            labelWidth: "45px",
            placeholder: "请时间",
            type: "date", //表单类型
            dateChange: (val) => {
              console.log(val);
              state.formData.reg_date = val;
            },
          },
        },
      ],
      apiUrl: "articleEdit",
    });
    //导出
    const exports = () => {
      console.log("批量导出");
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
              proxy.$api.articleDelete({ id: params }).then((res) => {
                if (res.code === 0) {
                  instance.confirmButtonLoading = false;
                  ElMessage.success({
                    message: res.message,
                    type: "success",
                  });
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
    const openEditModal = (isEdit, row={}) => {
      dialogFormVisible.value = true;
      row.reg_date = moment(row.reg_date).format("yyyy-MM-DD");
      state.apiUrl = isEdit ? "articleEdit" : "articleAdd";
      state.isEdit = isEdit;
      state.formData = isEdit ? row : {};
    };
    const handleDialogCancel = (val) => {
                 const table = unref(tableRef);
      dialogFormVisible.value = val;
      state.formData = {};
           table.getList();
    };
    const handleDialogSave = (val) => {
      dialogFormVisible.value = val;
      const table = unref(tableRef);
      state.formData = {};
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
      openEditModal,
      del,
      exports,
    };
  },
});
</script>
