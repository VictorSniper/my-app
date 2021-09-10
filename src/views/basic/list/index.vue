<template>
  <page-table
    :params="searchFormData"
    :multipleSelection="multipleSelection"
    :config="config"
    :show="true"
    apiUrl="getRedBlackList"
    ref="tableRef"
  ></page-table>
</template>
<script>
import { ElMessageBox } from "element-plus";
import PageTable from "@/components/PageTable";
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  unref,
} from "vue";
export default defineComponent({
  components: {
    PageTable,
  },
  setup() {
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
          {
            props: "handle",
            label: "操作",
            align: "right",
            handleEvent: [
              {
                text: "编辑",
                type: "text",
                event: (row) => {
                  eidt(row, true);
                },
              },
              {
                text: "删除",
                type: "text",
                event: (row) => {
                  //处理删除
                  del(row.id);
                },
              },
            ],
          },
        ],
      },
      tableData: [],
      multipleSelection: [],
    });
    const eidt = (row, bool) => {
      console.log(row);
      console.log(bool);
    };
    //删除
    const del = (id) => {
      const table = unref(tableRef);
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
                table.getList();
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
    return {
      ...toRefs(state),
      tableRef,
      eidt,
      del,
    };
  },
});
</script>
