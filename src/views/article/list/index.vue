<template>
  <div v-if="!isTrue">
    <page-table
      :params="searchFormData"
      :config="config"
      :show="true"
      apiUrl="getRedBlackList"
      ref="tableRef"
      @batchDel="del"
      @exports="exports"
    ></page-table>
  </div>
  <router-view></router-view>
</template>
<script>
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
} from "vue";
export default defineComponent({
  components: {
    PageTable,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
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
            props: "title",
            label: "标题",
            custom: "href",
            hrefEvent: ({ id }) => {
              router.push({
                path: `/article/list/details`,
                query: { id: id },
              });
            },
            align: "left",
          },
          {
            props: "createUser",
            label: "姓名",
            align: "left",
          },
          {
            props: "updateTime",
            label: "课程时间",
            custom: "updateTime",
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
                event: ({ id }) => {
                  router.push({
                    path: `/article/list/edit`,
                    query: { id: id },
                  });
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
    });
    //导出
    const exports = () => {
      console.log("批量导出");
    };
    //批量删除/单个删除
    const del = (val) => {
      let params = Array.isArray(val)
        ? val.map((item) => item.id).toString()
        : val;
      const table = unref(tableRef);
      ElMessageBox.confirm(
        Array.isArray(val) ? "您是否需要批量删除?" : "您是否需要删除?",
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
    return {
      ...toRefs(state),
      isTrue,
      tableRef,
      del,
      exports,
    };
  },
});
</script>
